import React, { useState } from "react";
import "./Login.css";
import icon from "../../Images/Login/Art.png";
import { FiEye } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FiEyeOff } from "react-icons/fi";
const Login = () => {
  const [showMailPlaceHolder, setShowMailPlaceHolder] = useState(true);
  const [showPasswordPlaceHolder, setShowPasswordPlaceHolder] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const handleTypingMail = (event) => {
    if (event.target.value) {
      setShowMailPlaceHolder(false);
    }
    setMail(event.target.value);
  };
  const handleTypingPassword = (event) => {
    if (event.target.value) {
      setShowPasswordPlaceHolder(false);
    }
    setPassword(event.target.value);
  };
  const setMailPlaceHolder = (mail) => {
    if (!mail) {
      setShowMailPlaceHolder(true);
    }
  };

  const setPasswordPlaceHolder = (password) => {
    if (!password) {
      setShowPasswordPlaceHolder(true);
    }
  };
  const handleLogin = () => {
    try {
      setMailError("");
      setPasswordError("");
      if (!mail && !password) {
        setMailError("Please insert a valid email!");
        setPasswordError("Please insert a valid password!");
      } else if (!mail) {
        setMailError("Please insert a valid email!");
      } else if (!password) {
        setPasswordError("Please insert a valid password!");
      } else {
        const userInfo = {
          userEmail: mail,
          userPassword: password,
        };
        setMail("");
        setPassword("");
        setShowMailPlaceHolder(true);
        setShowPasswordPlaceHolder(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="login-container">
      <div className="left-container">
        <div className="image">
          <img src={icon} alt="icon" className="big-img" />
          <div className="round-background"></div>
        </div>

        <div className="text-flex">
          <span className="big-tag">Welcome aboard my friend</span>
          <span className="small-tag">
            {" "}
            just a couple of clicks and we start
          </span>
        </div>
      </div>
      <div className="right-container">
        <div className="container-up">
          <span className="title-text">Login</span>
          <div className="form">
            <div className="login-form">
              <div className="input-box">
                {showMailPlaceHolder && (
                  <div className="input-placeholder">
                    <span className="mail-icon">
                      <CiMail />
                    </span>

                    <span className="label">Email</span>
                  </div>
                )}
                <input
                  onChange={(e) => handleTypingMail(e)}
                  onMouseDownCapture={() => setShowMailPlaceHolder(false)}
                  onMouseLeave={() => setMailPlaceHolder(mail)}
                  type="text"
                  className="input"
                  value={mail}
                />
                <span className="input-error-msg ">{mailError}</span>
              </div>
              <div className="input-box">
                {showPasswordPlaceHolder && (
                  <div className="input-placeholder">
                    <span className="mail-icon">
                      <CiLock />
                    </span>

                    <span className="password">Password</span>
                  </div>
                )}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
                <input
                  onChange={(e) => handleTypingPassword(e)}
                  onMouseDownCapture={() => setShowPasswordPlaceHolder(false)}
                  onMouseLeave={() => setPasswordPlaceHolder(password)}
                  type={`${showPassword ? "text" : "password"}`}
                  className="input"
                  value={password}
                />
                <span className="input-error-msg">{passwordError}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container-down">
          <button onClick={() => handleLogin()} className="login-btn">
            Login
          </button>
          <span className="no-account">have no account yet?</span>
          <button className="register-btn">Register</button>
        </div>
      </div>
    </section>
  );
};

export default Login;
