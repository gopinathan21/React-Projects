import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import firebaseapp from "../../Firebase/firebase.init";
import { Link } from "react-router-dom";
import "./signIn.css";
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // for now I will just use state for storing passwords later an hashing algo will be used
  const [validEmail, setValidEmail] = useState(true);
  const navigation = useNavigate();
  const disPatch = useDispatch();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(email)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);
    setValidEmail(isValid);
  };


  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebaseapp);

  const handleLogin = () => {
    navigation('/home');
    console.log(email);
    console.log(password);
  };

  const onSignInSuccessViaGoogle = (user) => {
    const {uid} = user.user;
    const tokenResponse = user._tokenResponse;
    console.log(tokenResponse);
    const { displayName, email, expiresIn, idToken, providerId } = tokenResponse;
    const userData = {
      displayName,
      email,
      expiresIn,
      idToken,
      providerId,
      uid
    };  
    disPatch({ type: "users/add", payload: {name:displayName,email:email} });  
    console.log(userData);
    Cookies.set('gopi-app-token',userData.idToken,{expires:7})
    Cookies.set('user-uid',uid,{expires:7})
    navigation('/home');
  };

  const handleGoogleLogin = async () => {
 try{
  const userCredential = await signInWithPopup(auth, provider);
  const emailVerified = userCredential.user.emailVerified;

  console.log(userCredential)
   emailVerified? onSignInSuccessViaGoogle(userCredential): alert("Sign-in not successfull")

 }
 catch(e){
  console.log(e)
  alert(e)
 }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h1>Login</h1>
        <div className="input-field">
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmail}
            onClick={handleEmail}
            required
          />
          <span id="email-span">Email</span>
          {!validEmail && (
            <p
              style={{
                color: "red",
                fontSize: "12px",
                margin: "0",
                padding: "0",
              }}
            >
              Please Enter a valid Email
            </p>
          )}
        </div>
        <div className="input-field">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span>Password</span>
        </div>
        <div>
          <button className="btn" onClick={handleLogin}>
            Log In
          </button>
        </div>
        <h3 className="divider">OR</h3>
        <div className="button-container">
          <div>
            <button onClick={handleGoogleLogin} className="btn">
              Sign In With Google
            </button>
          </div>
          <div>
            <Link to="/SignUp">
              <button className="btn">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
