import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/routeAuth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        console.log("json error response:");
        throw new Error("Server error: " + res.status);
      }
      const data = await res.json();
      console.log("login successful", data);
      navigate("/dashboard");
    } catch (error) {
      console.log("network error", error);
      alert("Couldn't Login - Redirecting to register page");
      navigate("/register");
    }
  };

  return (
    <div>
      <h1>Shop Software</h1>
      <div className="authPage">
        <h2>Login Here:</h2>
        <form className="authForm" onSubmit={handleSubmit}>
          <input
            type="text"
            autoComplete="off"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Type your username"
          />
          <input
            type="password"
            autoComplete="new-password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter password here"
          />
          <button type="submit">LogIn</button>
        </form>
        <div>
          <h3>Don't have account? Register Here:</h3>
          <a href="/register">
            <button className="authBtn">Register</button>
          </a>
        </div>
      </div>
    </div>
  );
}
