import React, { useContext } from "react";
import styles from "./Login.module.css";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GoogleIcon from "@mui/icons-material/Google";

import { auth, provider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const Login = () => {
  const { setLogin, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Google Login
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // User information from Google
      const userData = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      };

      // Send user data to backend
      const response = await axios.post("/user", userData);

      console.log("Backend response:", response.data);
      console.log("USER FROM BACKEND:", response.data.user);

      // Save user information in context
      setUserInfo(response.data.user);
      setLogin(true);

      // Save login information in localStorage
      localStorage.setItem("isLogin", true);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));

      // Go to dashboard
      navigate("/dashboard");
    } catch (err) {
      alert("Something Went Wrong");
      console.log("Login Error:", err);
    }
  };

  return (
    <div className={styles.Login}>
      <div className={styles.loginCard}>
        <div className={styles.loginCardTitle}>
          <h1>Login</h1>
          <VpnKeyIcon />
        </div>

        <div className={styles.googleBtn} onClick={handleLogin}>
          <GoogleIcon sx={{ fontSize: 20, color: "red" }} />
          Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default Login;
