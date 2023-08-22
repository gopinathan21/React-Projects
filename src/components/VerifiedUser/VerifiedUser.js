import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Route, useNavigate } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "../../features/userData";

const VerifiedUser = ({props, children}) => {
  console.log(children)
  
  const [UserTokenVerified, setUserTokenVerified] = useState(false);
  const users = useSelector(selectUser);
  const token = Cookies.get("gopi-app-token");
  const uid = Cookies.get("user-uid");
  const navigation = useNavigate();
  console.log(UserTokenVerified ,"Statring la")

  useEffect(() => {
    
    const fetchData = async () => {
      // console.log(token)
      console.log(users, "use effect la varudhu")
      if (token !== undefined) {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: users.name,
            email: users.EmailId,
            uid: uid,
            token: token,
          }), // Convert the object to JSON string
        };
        console.log(options.body,"options body")
        const response = await fetch(
          "http://localhost:3006/authenticate",
          options
        );
        const data = await response.json();
        console.log(data,"Verification la Varuthu");
        console.log(children)
        if(data.TokenVerified){
          setUserTokenVerified(data.TokenVerified)
        }
        else{
          setUserTokenVerified(false)
        }
      }

    };
  
    fetchData(); // Call the fetchData function
  
 
    return () => {
      
    };
  }, []); 


  const NotVerifiedJSX = () =>{
    return(

      <div>
      <p>You are not verified, please log in again</p>
      <button onClick={()=> navigation('/')}>Click Me to Login again</button>
    </div>
    )

  }
  

  return UserTokenVerified ? children : NotVerifiedJSX();

};

export default VerifiedUser;
