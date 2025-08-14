import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setForm({ username: "", password: "" });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/routeAuth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(data.message);
      if (res.ok) {
        navigate("/login");
      } else {
        alert("Couldn't register");
        navigate("/");
      }
    } catch (error) {
      console.log("Registration failed", error);
    }
  };

  return (
    <div>
      <h1>Shop Software</h1>
      <div className="authPage">
        <h2>Register Here:</h2>
        <form className="authForm" onSubmit={handleSubmit}>
          <input
            type="text"
            autoComplete="off"
            value={form.username}
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            value={form.password}
            placeholder="Password"
            autoComplete="new-password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">Register</button>
        </form>
        <div>
          <h3>Have an account ? Login Here:</h3>
          <a href="/login">
            {" "}
            <button className="authBtn">Login</button>
          </a>
        </div>
      </div>
    </div>
  );
}
