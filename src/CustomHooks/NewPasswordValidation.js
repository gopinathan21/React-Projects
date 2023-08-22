import { useState,useEffect } from "react";

const useNewPasswordvalidation = ()=>{
 const [newPassword, setNewPassword] = useState('');
 const [newPasswordValid,setNewPasswordValid] = useState(false)


    const handleNewPassword = (e) => {
      console.log(e.target.value)
        setNewPassword(e.target.value);     
      };

      useEffect(()=>{
const fetchAndValidation = async()=>{
    try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        };
        const response = await fetch(
          "http://localhost:3006/newpassword",
          options
        );
        if (response.ok) {
          const data = await response.json();
          setNewPasswordValid(data.validation);
        } else {
          setNewPasswordValid(false);
        }
      } catch (e) {
        console.log(e);
        setNewPasswordValid(false);
      }

      
      
}
fetchAndValidation(); },[newPassword,newPasswordValid])

      return {newPassword,newPasswordValid,handleNewPassword}
}


export default useNewPasswordvalidation
