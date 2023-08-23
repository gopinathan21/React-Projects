const admin = require('firebase-admin');
const express = require("express");
const router = express.Router();
var serviceAccount = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const tokenverify = async (body) => {
  console.log(body)
  const uid = body.uid
  const email = body.email
  const token = body.token
  console.log(token , "token from taoken verify")

  try {
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseUID = decodedToken.uid;
    console.log("try  vanchu")

    if (uid === firebaseUID && email === decodedToken.email) {
      console.log("if vanchu")
      return { success: true, message: "Valid Token" };
      
    } else {
      console.log("else vanchu")
      return { success: false, error: "Invalid token or email" };

    }
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return { success: false, error: error};
  }
};


// router.post('/authenticate' ,async (req,res)=>{
//   const data = await tokenverify(req.body);
//   const verificationSuccess = data.success;
// try{
//   if(verificationSuccess){
//     return res.status(200).json({TokenVerified:true});
//   }
//   else{
//     return res.status(401).json({errorInfo:data.error})
//   }
// }
// catch(e){
//      console.log("error verifying token",e)
//      return res.status(500).json({TokenVerified:false})
// }
// })


module.exports = tokenverify


