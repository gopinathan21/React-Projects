const express = require("express");
const router = express.Router();
const tokenverify = require('./TokenVerify.js');



router.post("/newPassword", (req, res) => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const { newPassword } = req.body;
  console.log(newPassword)
  if (!passwordPattern.test(newPassword)) {
    return res.status(200).json({ validation: false });
  } else {
    return res.status(200).json({ validation: true });
  }
});

router.post('/authenticate', async (req, res) => {
  try {
    console.log("authenticate ulla varuthu")
    console.log(req.body)
    const data = await tokenverify(req.body);
    const verificationSuccess = data.success;
    console.log(verificationSuccess);
    if (verificationSuccess) {
      return res.status(200).json({ TokenVerified: true });
    } else {
      return res.status(401).json({ errorInfo: data.error });
    }
  } catch (error) {
    console.log("authenticate ulla varuthu");
    console.error("Error verifying token:", error);
    return res.status(500).json({ TokenVerified: false });
  }
});

module.exports = router;

