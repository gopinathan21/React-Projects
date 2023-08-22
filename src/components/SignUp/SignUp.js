import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import usePasswordValidation from "../../CustomHooks/ConfirmPasswordValidation";
import firebaseapp from "../../components../../Firebase/firebase.init";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import useNewPasswordvalidation from "../../CustomHooks/NewPasswordValidation";

const SignUp = () => {

  const [newPasswordValid,setNewPasswordValid] = useState('');
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [email, setemail] = useState("");
  

  const handleNewPassword = async (e) => {
    try {
      const newPasswordValue = e.target.value; // Get the new password value
      const requestData = { newPassword: newPasswordValue }; // Create an object with the field name and value
  
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData), // Convert the object to JSON string
      };
  
      const response = await fetch(
        "http://localhost:3006/newPassword",
        options
      );
  
      if (response.ok) {
        const data = await response.json();
        setNewPasswordValid(data.validation);
      } else {
        setNewPasswordValid(false);
      }
    } catch (error) {
      console.log(error);
      setNewPasswordValid(false);
    }
  };
  



  const handleSignUp = async () => {
    if (newPasswordValid && confirmPasswordValid && email !== "") {
      const newPassword = document.getElementById('newPassword').value;
      const auth = getAuth(firebaseapp);
      try {
        const user = await createUserWithEmailAndPassword(auth, email, newPassword);
        console.log(user);
        JSON.stringify(user)
        if (user !== null) {
          const url = "http://localhost:3006/testing"; 
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user), // Convert user object to JSON string
          };
          const validateToken = await fetch(url, options); 
          const responseData = await validateToken.json(); 
          console.log(responseData);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please enter all the fields");
    }
  };
  

  const handleEmail = (e) => {
    setemail(e.target.value);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Sign Up</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={handleEmail}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  (newPasswordValid !=="")
                    ? newPasswordValid 
                      ? "is-valid"
                      : "is-invalid"
                    : ""
                }`}
                id="newPassword"
                onChange={handleNewPassword}
                required
              />
            </div>
            {( newPasswordValid!=="") && !newPasswordValid && (
              <div className="mb-3 ">
                <small className="text-danger">
                  Password must contain at least one lowercase character, one
                  uppercase character, one digit, and be at least 8 characters
                  long.
                </small>
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  newPasswordValid
                    ? confirmPasswordValid
                      ? "is-valid"
                      : "is-invalid"
                    : ""
                }`}
                id="confirmPassword"
                // onChange={handleConfirmPassword}
                disabled={!newPasswordValid}
                required
              />
            </div>
            {newPasswordValid && !confirmPasswordValid && (
              <div className="mb-3">
                <small className="text-danger">Passwords Do Not match</small>
              </div>
            )}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;



// const [email, setemail] = useState("");
// const {newPassword, newPasswordValid,handleNewPassword} = useNewPasswordvalidation()
// const {
//   confirmPasswordValid,
//   handleConfirmPassword,
// } = usePasswordValidation(newPassword);