import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeUserPasswordAsync,
  reFatchAlltasksToggle,
  toggle,
  user,
} from "../../Redux/User/UserSlice";
import { FiEye } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FiEyeOff } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { BeatLoader } from "react-spinners";
import "./Settings.css";
const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);
  const userInfo = useSelector(user);

  const handleTypingName = (e) => {
    setName(e.target.value);
  };

  const handleTypingConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleTypingPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = async () => {
    try {
      setPasswordError("");
      setConfirmPasswordError("");

      if (!password && !confirmPassword) {
        setPasswordError("Please insert a valid password!");
        setConfirmPasswordError("Please insert a valid confirm password!");
      } else if (!password) {
        setPasswordError("Please insert a valid password!");
      } else if (password !== confirmPassword) {
        setConfirmPasswordError(
          "Confirm password doesn't match with password!"
        );
      } else {
        setLoader(true);
        const userInfo = {
          name: name,
          password: password,
        };
        dispatch(changeUserPasswordAsync(userInfo));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loader) {
      setLoader(false);
    }
  }, [boardReFatchToggle]);
  return (
    <section className="settings-container">
      <span className="title-text">Settings</span>
      <div className="right-container">
        <div className="container-up">
          <div className="form">
            <div className="register-form">
              <div className="input-box">
                <span className="user-icon">
                  <CiUser />
                </span>

                <input
                  onChange={(e) => handleTypingName(e)}
                  type="text"
                  placeholder="Name"
                  className="input"
                  value={name}
                />
                <span className="input-error-msg "></span>
              </div>

              <div className="input-box">
                <div className="input-placeholder">
                  <span className="password-icon">
                    <CiLock />
                  </span>
                </div>

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye"
                >
                  {!showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
                <input
                  onChange={(e) => handleTypingPassword(e)}
                  type={`${showPassword ? "text" : "password"}`}
                  className="input"
                  placeholder="Password"
                  value={password}
                />
                <span className="input-error-msg">{passwordError}</span>
              </div>
              <div className="input-box">
                <div className="input-placeholder">
                  <span className="confirmpassword-icon">
                    <CiLock />
                  </span>
                </div>

                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="eye"
                >
                  {!showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </span>
                <input
                  onChange={(e) => handleTypingConfirmPassword(e)}
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  className="input"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                />
                <span className="input-error-msg">{confirmPasswordError}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container-down">
          <button onClick={() => handleRegister()} className="register-btn">
            {!loader ? "Update" : <BeatLoader size={13} color="white" />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Settings;
