import React, { useState } from "react";
import icon from "../../Images/Login/Art.png";
import { FiEye } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FiEyeOff } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import "./Register.css";
const Register = () => {
  const [showMailPlaceHolder, setShowMailPlaceHolder] = useState(true);
  const [showPasswordPlaceHolder, setShowPasswordPlaceHolder] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showConfirmPasswordPlaceholder, setShowConfirmPasswordPlaceholder] =
    useState(true);
  const [showNamePlaceholder, setShowNamePlaceholder] = useState(true);
  const [nameErorr, setNameError] = useState("");

  const handleTypingMail = (event) => {
    if (event.target.value) {
      setShowMailPlaceHolder(false);
    }
    setMail(event.target.value);
  };
  const handleTypingName = (event) => {
    if (event.target.value) {
      setShowNamePlaceholder(false);
    }
    setName(event.target.value);
  };
  const handleTypingConfirmPassword = (event) => {
    if (event.target.value) {
      setShowConfirmPasswordPlaceholder(false);
    }
    setConfirmPassword(event.target.value);
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
  const setNamePlaceHolder = (name) => {
    if (!name) {
      setShowNamePlaceholder(true);
    }
  };

  const setPasswordPlaceHolder = (password) => {
    if (!password) {
      setShowPasswordPlaceHolder(true);
    }
  };
  const setConfirmPasswordPlaceHolder = (confirmPassword) => {
    if (!confirmPassword) {
      setShowConfirmPasswordPlaceholder(true);
    }
  };
  const handleRegister = () => {
    try {
      setMailError("");
      setPasswordError("");
      setConfirmPasswordError("");
      setNameError("");
      if (!name && !mail && !password && !confirmPassword) {
        setNameError("Please insert a valid name!");
        setMailError("Please insert a valid email!");
        setPasswordError("Please insert a valid password!");
        setConfirmPasswordError("Please insert a valid confirm password!");
      } else if (!mail) {
        setMailError("Please insert a valid email!");
      } else if (!password) {
        setPasswordError("Please insert a valid password!");
      } else if (password !== confirmPassword) {
        setConfirmPasswordError(
          "Confirm password doesn't match with password!"
        );
      } else {
        const userInfo = {
          userEmail: mail,
          userPassword: password,
        };
        setMail("");
        setPassword("");
        setName("");
        setConfirmPassword("");
        setShowMailPlaceHolder(true);
        setShowPasswordPlaceHolder(true);
        setShowConfirmPasswordPlaceholder(true);
        setShowNamePlaceholder(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="register-container">
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
          <span className="title-text">Register</span>
          <div className="form">
            <div className="register-form">
              <div className="input-box">
                {showNamePlaceholder && (
                  <div className="input-placeholder">
                    <span className="name-icon">
                      <CiUser />
                    </span>

                    <span className="label">Name</span>
                  </div>
                )}
                <input
                  onChange={(e) => handleTypingName(e)}
                  onMouseDownCapture={() => setShowNamePlaceholder(false)}
                  onMouseLeave={() => setNamePlaceHolder(name)}
                  type="text"
                  className="input"
                  value={name}
                />
                <span className="input-error-msg ">{nameErorr}</span>
              </div>
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
                  className="input"
                  value={mail}
                />
                <span className="input-error-msg">{mailError}</span>
              </div>
              <div className="input-box">
                {showPasswordPlaceHolder && (
                  <div className="input-placeholder">
                    <span className="password-icon">
                      <CiLock />
                    </span>

                    <span className="label">Password</span>
                  </div>
                )}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye"
                >
                  {!showPassword ? <FiEyeOff /> : <FiEye />}
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
              <div className="input-box">
                {showConfirmPasswordPlaceholder && (
                  <div className="input-placeholder">
                    <span className="confirmpassword-icon">
                      <CiLock />
                    </span>

                    <span className="label">Confirm password</span>
                  </div>
                )}
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="eye"
                >
                  {!showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </span>
                <input
                  onChange={(e) => handleTypingConfirmPassword(e)}
                  onMouseDownCapture={() =>
                    setShowConfirmPasswordPlaceholder(false)
                  }
                  onMouseLeave={() =>
                    setConfirmPasswordPlaceHolder(confirmPassword)
                  }
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  className="input"
                  value={confirmPassword}
                />
                <span className="input-error-msg">{confirmPasswordError}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container-down">
          <button onClick={() => handleRegister()} className="register-btn">
            Register
          </button>
          <span className="no-account">Have an account?</span>
          <button className="login-btn">Login</button>
        </div>
      </div>
    </section>
  );
};

export default Register;
