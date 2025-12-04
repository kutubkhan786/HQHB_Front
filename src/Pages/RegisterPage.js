import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_API_URL;


    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("Processing...");

        try {
            const res = await fetch(`${baseURL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Registration failed");
                return;
            }

            setMessage("Registration successful!");
            navigate("/");
            localStorage.setItem("token", data.token);

        } catch (err) {
            console.error(err);
            setMessage("Server error");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Register</h2>

            <form onSubmit={handleRegister} style={styles.form}>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />

                <button type="submit" style={styles.button}>
                    Register
                </button>
            </form>

            <p style={styles.message}>{message}</p>
        </div>
    );
}

const styles = {
    container: {
        width: "350px",
        margin: "100px auto",
        padding: "25px",
        borderRadius: "12px",
        background: "#f7f7f7",
        boxShadow: "0 0 10px rgba(0,0,0,0.15)",
        textAlign: "center",
    },
    title: {
        marginBottom: "20px",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    button: {
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        background: "#28a745",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
    },
    message: {
        marginTop: "15px",
        fontSize: "14px",
    },
};

export default RegisterPage;
