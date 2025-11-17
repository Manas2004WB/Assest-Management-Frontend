import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleFormSubmit(e: any) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/token", {
        username: email,
        password: password,
      });

      // Save token in localStorage
      localStorage.setItem("token", res.data.access_token);

      setEmail("");
      setPassword("");

      navigate("/main-page");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password");
    }
  }

  return (
    <div className="main-container-login">
      <div className="app-container-login">
        <h2 className="login-form-title">Asset login</h2>
        <form className="login-from" onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="login-input"
            value={email}
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            required
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-btn">Login</button>
          <span>new user? register</span>
        </form>
      </div>
    </div>
  );
};

export default Login;
