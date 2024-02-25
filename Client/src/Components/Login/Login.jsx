import React, { useEffect, useState } from "react";
import "./Login.css";
import icon from "../../Images/Login/Art.png";
import { FiEye } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FiEyeOff } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync, toggle, user } from "../../Redux/User/UserSlice";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToggle = useSelector(toggle);
  const userInfo = useSelector(user);
  const handleTypingMail = (event) => {
    setMail(event.target.value);
  };
  const handleTypingPassword = (event) => {
    setPassword(event.target.value);
  };
  const handleNavigateToSignUpPage = (route) => {
    navigate(route);
  };

  const handleLogin = async () => {
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
        setLoader(true);
        const userInfo = {
          email: mail,
          password: password,
        };
        dispatch(loginUserAsync(userInfo));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userInfo?._id) {
      setMail("");
      setPassword("");
      setLoader(false);
      navigate("/");
    }
  }, [userToggle]);
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
                <div className="input-placeholder">
                  <span className="mail-icon">
                    <CiMail />
                  </span>
                </div>

                <input
                  onChange={(e) => handleTypingMail(e)}
                  type="mail"
                  className="input"
                  placeholder="Email"
                  value={mail}
                />
                <span className="input-error-msg ">{mailError}</span>
              </div>
              <div className="input-box">
                <span className="lock-icon">
                  <CiLock />
                </span>

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
            </div>
          </div>
        </div>
        <div className="container-down">
          <button onClick={() => handleLogin()} className="login-btn">
            {!loader ? "Login" : <BeatLoader size={13} color="white" />}
          </button>
          <span className="no-account">have no account yet?</span>
          <button
            onClick={() => handleNavigateToSignUpPage("/register")}
            className="register-btn"
          >
            Register
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
