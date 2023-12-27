import React, { useEffect, useState } from "react";
import "./Login.css";
import BackgroundLayer from "../Shared/BackgroundLayer";
import MainLoginImage from "./../Images/MainLogin.jpg";
import signupPageSideImage from "./../Images/SignupPage__sidePhoto.jpg";
import loginPageSideImage from "./../Images/loginPage__sidePhoto.jpg";
import { ImCancelCircle } from "react-icons/im";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  let history = useHistory();

  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [pass, setPass] = useState(false);
  const [data, setData] = useState("");
  const [signupButtonControl, setSignupButtonControl] = useState(true);
  const [loginButtonControl, setLoginButtonControl] = useState(true);
  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");

  const [signupForm, setSignupForm] = useState({
    username: "",
    emailId: "",
    password: "",
    repassword: "",
    signupSelector: "",
  });

  const [signupFormCheck, setSignupFormCheck] = useState({
    username: true,
    emailId: true,
    password: true,
    repassword: true,
    signupSelector: true,
  });

  const [loginForm, setLoginForm] = useState({
    loginEmail: "",
    loginPassword: "",
    loginSelector: "",
  });

  const [loginFormCheck, setLoginFormCheck] = useState({
    loginEmail: true,
    loginPassword: true,
    loginSelector: true,
  });

  const [loginData, setLoginData] = useState([]);

  var loginClickHandler = () => {
    setLogin(true);
  };

  var signupClickHandler = () => {
    setSignUp(true);
  };

  var loginCloseHandler = () => {
    setLogin(false);
    setSignUp(false);

    setLoginForm((prev) => {
      return { ...prev, loginEmail: "", loginPassword: "", loginSelector: "" };
    });

    setSignupForm((prev) => {
      return {
        ...prev,
        username: "",
        emailId: "",
        password: "",
        repassword: "",
        signupSelector: "",
      };
    });

    setSignupFormCheck((prev) => {
      return {
        ...prev,
        loginEmail: true,
        loginPassword: true,
        loginSelector: true,
      };
    });

    setLoginFormCheck((prev) => {
      return {
        ...prev,
        username: true,
        emailId: true,
        password: true,
        repassword: true,
        signupSelector: true,
      };
    });

    cancelErrorHandler();
  };

  var cancelErrorHandler = () => {
    setErrorMessagePassword("");
    setErrorMessageUsername("");
    setErrorMessageEmail("");
    setPasswordMatch("");
  };

  useEffect(() => {
    if (signupFormCheck.username != true) {
      if (signupFormCheck.emailId != true) {
        if (signupFormCheck.password != true) {
          if (signupFormCheck.repassword != true) {
            if (signupFormCheck.signupSelector != true) {
              setSignupButtonControl(false);
            } else {
              setSignupButtonControl(true);
            }
          } else {
            setSignupButtonControl(true);
          }
        } else {
          setSignupButtonControl(true);
        }
      } else {
        setSignupButtonControl(true);
      }
    } else {
      setSignupButtonControl(true);
    }
  }, [signupForm]);

  useEffect(() => {
    if (loginFormCheck.loginEmail != true) {
      if (loginFormCheck.loginPassword != true) {
        if (loginFormCheck.loginSelector != true) {
          setLoginButtonControl(false);
        } else {
          setLoginButtonControl(true);
        }
      } else {
        setLoginButtonControl(true);
      }
    } else {
      setLoginButtonControl(true);
    }
  }, [loginForm]);

  var signupSelectHandler = (e) => {
    setSignupFormCheck((prev) => {
      return { ...prev, signupSelector: false };
    });

    setLoginFormCheck((prev) => {
      return { ...prev, loginSelector: false };
    });

    let name = e.target.name;
    let value = e.target.value;
    setLoginForm((prev) => {
      return { ...prev, [name]: value };
    });

    setSignupForm((prev) => {
      return { ...prev, [name]: value };
    });

    console.log("selector change");
  };

  var handleUsername = (e) => {
    setErrorMessageUsername("Enter a name");
    let name = e.target.name;
    let value = e.target.value;

    setSignupForm((prev) => {
      return { ...prev, [name]: value };
    });

    setSignupFormCheck((prev) => {
      return { ...prev, username: false };
    });
  };

  var handleEmail = (e) => {
    setErrorMessageEmail("Enter a email id");
    let name = e.target.name;
    let value = e.target.value;

    setLoginForm((prev) => {
      return { ...prev, [name]: value };
    });

    setSignupForm((prev) => {
      return { ...prev, [name]: value };
    });

    var sign = /@/g;

    if (value.match(sign)) {
      setSignupFormCheck((prev) => {
        return { ...prev, emailId: false };
      });
      setLoginFormCheck((prev) => {
        return { ...prev, loginEmail: false };
      });
    } else {
      setSignupFormCheck((prev) => {
        return { ...prev, emailId: true };
      });
      setLoginFormCheck((prev) => {
        return { ...prev, loginEmail: true };
      });
    }
  };

  var handlePassword = (event) => {
    let new_pass = event.target.value;
    setPass(new_pass);

    setLoginFormCheck((prev) => {
      return { ...prev, loginPassword: false };
    });

    let name = event.target.name;
    let value = event.target.value;

    setLoginForm((prev) => {
      return { ...prev, [name]: value };
    });

    setSignupForm((prev) => {
      return { ...prev, [name]: value };
    });

    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if (!new_pass.match(lowerCase)) {
      setErrorMessagePassword("Password should contains lowercase letters!");
      setSignupFormCheck((prev) => {
        return { ...prev, password: true };
      });
    } else if (!new_pass.match(upperCase)) {
      setErrorMessagePassword("Password should contain uppercase letters!");
      setSignupFormCheck((prev) => {
        return { ...prev, password: true };
      });
    } else if (!new_pass.match(numbers)) {
      setErrorMessagePassword("Password should contains numbers also!");
      setSignupFormCheck((prev) => {
        return { ...prev, password: true };
      });
    } else if (new_pass.length < 10) {
      setErrorMessagePassword("Password length should be more than 10.");
      setSignupFormCheck((prev) => {
        return { ...prev, password: true };
      });
    } else {
      setErrorMessagePassword("Password is strong!");
      setSignupFormCheck((prev) => {
        return { ...prev, password: false };
      });
    }
  };

  var passwordMatchHandler = (event) => {
    var rePassword = event.target.value;

    if (rePassword.length > 0) {
      if (rePassword != pass) {
        setPasswordMatch("Password doesn't match");
        setSignupFormCheck((prev) => {
          return { ...prev, repassword: true };
        });
      } else {
        setPasswordMatch("Password matched");
        setSignupFormCheck((prev) => {
          return { ...prev, repassword: false };
        });
      }
    }
    let name = event.target.name;
    let value = event.target.value;

    setSignupForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  var signupHandler = (e) => {
    var signupURL = process.env.REACT_APP_SIGN_UP;

    const form = document.forms["signupForm"];

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(signupURL, { method: "POST", body: new FormData(form) })
        .then((response) => console.log(response.text()))
        .then((res) => console.log(res))
        .then(() => {
          signupForm.username = "";
          signupForm.emailId = "";
          signupForm.password = "";
          signupForm.repassword = "";
        })
        .catch((error) => console.error("Error!", error.message));
    });

    Swal.fire({
      title: "Signup Successful",
      text: "Your account has been created successfully",
      icon: "success",
      confirmButtonColor: "#ffcc00",
      confirmButtonText: "OK",
    }).then(setSignUp(false), setLogin(true));
  };

  let credentials = [];

  useEffect(() => {
    var assetDataURL1 = process.env.REACT_APP_DATA;

    fetch(assetDataURL1).then((result) => {
      result.json().then((resp) => {
        setLoginData(resp);
      });
    });
  }, [signupButtonControl]);

  for (var j = 1; j < loginData.length; j++) {
    credentials.push(loginData[j]);
  }

  var loginToMainPage = (id) => {
    Swal.fire({
      title: "Login Successful",
      text: "Have a good day !!",
      icon: "success",
      confirmButtonColor: "#ffcc00",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push(`/${id}/mainPage`);
      }
    });
  };

  var loginHandler = (e) => {
    e.preventDefault();

    const identifiedUser = credentials.filter(
      (user) => user.email == loginForm.loginEmail
    );
    identifiedUser.length === 0
      ? Swal.fire({
          title: "Login Failed",
          text: "Please try again.",
          icon: "warning",
          confirmButtonColor: "#ffcc00",
          confirmButtonText: "OK",
        })
      : console.log();
    identifiedUser.find((user) => {
      user.password == loginForm.loginPassword &&
      user.role == loginForm.loginSelector
        ? loginToMainPage(user.userid)
        : Swal.fire({
            title: "Login Failed",
            text: "Please try again.",
            icon: "warning",
            confirmButtonColor: "#ffcc00",
            confirmButtonText: "OK",
          });
    });
  };

  return (
    <>
      <BackgroundLayer className="login__backgroundLayer__custom">
        <>
          <div className={"login__cardContainer"}>
            <h1>RideShare</h1>
            <div className="login__imageArea">
              <img src={MainLoginImage} />
            </div>
            <h2>Hello !</h2>
            <p>
              Best place to choose your ride.
              <br />
              Ride with us
            </p>
            <div className="buttonGroup">
              <button className="buttonStyle" onClick={loginClickHandler}>
                LOGIN
              </button>
              <button className="buttonStyle" onClick={signupClickHandler}>
                SIGN UP
              </button>
            </div>
          </div>
        </>
        <>
          {/* login form  */}

          <div className={login ? "cardContainer openPopup" : "cardContainer"}>
            <div className="imageSideContainer">
              <h1>RideShare</h1>
              <img src={loginPageSideImage} />
            </div>

            <div className="loginDetails">
              <h1>LOGIN</h1>
              <form>
                <div className="inputFieldGroup">
                  <label>Username</label>
                  <input
                    type="email"
                    name="loginEmail"
                    value={loginForm.loginEmail}
                    onChange={handleEmail}
                    onFocus={handleEmail}
                    onBlur={cancelErrorHandler}
                    required
                    autoComplete="off"
                  />
                  <p>{errorMessageEmail}</p>
                </div>
                <div className="inputFieldGroup">
                  <label>Password</label>
                  <input
                    name="loginPassword"
                    type="password"
                    value={loginForm.loginPassword}
                    onChange={handlePassword}
                    onFocus={handlePassword}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="inputFieldGroup">
                  <label>Role</label>
                  <select
                    name="loginSelector"
                    onClick={signupSelectHandler}
                    required
                  >
                    <option disabled selected>
                      Choose a role
                    </option>
                    <option>Passenger</option>
                    <option>Driver</option>
                  </select>
                </div>
                <div className="inputFieldGroup">
                  <button
                    className="buttonStyle"
                    disabled={loginButtonControl ? true : false}
                    onClick={loginHandler}
                  >
                    LOGIN
                  </button>
                </div>
              </form>
              <ImCancelCircle
                className="closeIcon"
                onClick={loginCloseHandler}
              />
            </div>
          </div>

          {/* sign up form  */}

          <div
            className={
              signUp
                ? "cardContainer__signup openPopup"
                : "cardContainer__signup"
            }
          >
            <div className="loginDetails">
              <h1>SIGN UP</h1>
              <form name="signupForm">
                <div className="inputFieldGroup">
                  <label>Username</label>
                  <input
                    type="type"
                    name="username"
                    value={signupForm.username}
                    onChange={handleUsername}
                    onFocus={handleUsername}
                    onBlur={cancelErrorHandler}
                    required
                    autoComplete="off"
                  />
                  <p>{errorMessageUsername}</p>
                </div>
                <div className="inputFieldGroup">
                  <label>Email-id</label>
                  <input
                    type="email"
                    name="emailId"
                    value={signupForm.emailId}
                    onChange={handleEmail}
                    onFocus={handleEmail}
                    onBlur={cancelErrorHandler}
                    required
                    autoComplete="off"
                  />
                  <p>{errorMessageEmail}</p>
                </div>
                <div className="inputFieldGroup">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={signupForm.password}
                    onChange={handlePassword}
                    onFocus={handlePassword}
                    onBlur={cancelErrorHandler}
                    required
                    autoComplete="off"
                  />
                  <p>{errorMessagePassword}</p>
                </div>
                <div className="inputFieldGroup">
                  <label>Re-Password</label>
                  <input
                    type="password"
                    name="repassword"
                    value={signupForm.repassword}
                    onChange={passwordMatchHandler}
                    onFocus={passwordMatchHandler}
                    onBlur={cancelErrorHandler}
                    required
                    autoComplete="off"
                  />
                  <p>{passwordMatch}</p>
                </div>
                <input type="hidden" name="userid" value={uuidv4()}></input>
                <div className="inputFieldGroup">
                  <label>Role</label>
                  <select
                    required
                    onClick={signupSelectHandler}
                    name="signupSelector"
                  >
                    <option>Choose a role</option>
                    <option value="Passenger">Passenger</option>
                    <option value="Driver">Driver</option>
                  </select>
                  <div className="inputFieldGroup">
                    <button
                      className="buttonStyle"
                      onClick={signupHandler}
                      disabled={signupButtonControl ? true : false}
                    >
                      SIGN UP
                    </button>
                  </div>
                </div>
              </form>
              <ImCancelCircle
                className="closeIcon"
                onClick={loginCloseHandler}
              />
            </div>
            <div className="imageSideContainer__signup">
              <h1>RideShare</h1>
              <img src={signupPageSideImage} />
            </div>
          </div>
        </>
      </BackgroundLayer>
    </>
  );
};

export default Login;
