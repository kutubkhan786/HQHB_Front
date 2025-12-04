import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const styles = {
        container: {
            marginTop: "50px",
            textAlign: "center",
        },
        title: {
            fontSize: "28px",
            marginBottom: "20px",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            width: "300px",
            margin: "0 auto",
        },
        input: {
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
        },
        button: {
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
        },
        button2: {
            padding: "10px",
            margin: "10px 0 0 0",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "#00ff62ff",
            color: "black",
            border: "none",
        },
        message: {
            marginTop: "10px",
            color: "red",
        },
    };
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const baseURL = process.env.REACT_APP_API_URL;

    const AddUser = () => navigate("/register");

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("Processing...");

        try {
            const res = await fetch(`${baseURL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Login failed");
                return;
            }
            localStorage.setItem("token", data.token);
            setMessage("Login successful!");

            // 🔥 Redirect to Dashboard
            navigate("/dashboard");

        } catch (err) {
            console.error(err);
            setMessage("Server error");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login</h2>

            <form onSubmit={handleLogin} style={styles.form}>
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
                    Login
                </button>
                <button type="submit" style={styles.button2} onClick={AddUser}>
                    AddUser
                </button>
            </form>
            <p style={styles.message}>{message}</p>
        </div>
    );
}
export default LoginPage;