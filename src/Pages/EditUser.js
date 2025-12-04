import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditUser() {
    const { id } = useParams(); // Get user ID from URL
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Fetch specific user data
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/user/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            setEmail(data.email);
            setPassword(""); // Always empty for security

        } catch (err) {
            console.error("Error fetching user:", err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/auth/user/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    email,
                    password: password.trim() === "" ? undefined : password,
                    plainPassword: password.trim() === "" ? undefined : password,
                }),
            });

            const result = await response.json();
            console.log("Update result:", result);

            alert("User updated successfully!");
            navigate("/dashboard");

        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Edit User</h2>

            <form onSubmit={handleUpdate} style={styles.form}>
                <label style={styles.label}>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />

                <label style={styles.label}>New Password (optional):</label>
                <input
                    type="password"
                    value={password}
                    placeholder="Enter new password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>
                    Update User
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        width: "400px",
        margin: "50px auto",
        padding: "20px",
        textAlign: "center",
        border: "1px solid #ccc",
        borderRadius: "6px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        textAlign: "left",
        marginBottom: "5px",
        fontWeight: "bold",
    },
    input: {
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "4px",
        border: "1px solid #aaa",
    },
    button: {
        padding: "10px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
    },
};

export default EditUser;
