import React, { useEffect, useState } from "react";
import icon from "../../Images/Login/Art.png";
import { FiEye } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FiEyeOff } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Register.css";
import { registerUserAsync, toggle, user } from "../../Redux/User/UserSlice";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameErorr, setNameError] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToggle = useSelector(toggle);
  const registerUser = useSelector(user);

  const handleTypingMail = (event) => {
    setMail(event.target.value);
  };
  const handleTypingName = (event) => {
    setName(event.target.value);
  };
  const handleTypingConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleTypingPassword = (event) => {
    setPassword(event.target.value);
  };
  const handleNavigateToLoinPage = (route) => {
    navigate(route);
  };

  const handleRegister = async () => {
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
        setLoader(true);
        const userInfo = {
          name: name,
          email: mail,
          password: password,
        };
        dispatch(registerUserAsync(userInfo));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (registerUser?.name) {
      setMail("");
      setPassword("");
      setName("");
      setConfirmPassword("");
      navigate("/");
      setLoader(false);
    }
  }, [userToggle]);
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
                <span className="input-error-msg ">{nameErorr}</span>
              </div>
              <div className="input-box">
                <span className="mail-icon">
                  <CiMail />
                </span>

                <input
                  onChange={(e) => handleTypingMail(e)}
                  type="text"
                  placeholder="Email"
                  className="input"
                  value={mail}
                />
                <span className="input-error-msg ">{mailError}</span>
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
            {!loader ? "Register" : <BeatLoader size={13} color="white" />}
          </button>
          <span className="no-account">Have an account?</span>
          <button
            onClick={() => handleNavigateToLoinPage("/login")}
            className="login-btn"
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
