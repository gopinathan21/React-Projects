import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import firebaseapp from "../../Firebase/firebase.init";
import {Link} from 'react-router-dom'

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebaseapp);

  const handleLogin = async () => {
    const user = await signInWithPopup(auth, provider);
    console.log(user);
  };


  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form className="needs-validation" onSubmit={handleLogin} >
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-success me-2">Sign In with Google account</button>
          <Link to = '/SignUp'>
          <button className="btn btn-outline-success">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
