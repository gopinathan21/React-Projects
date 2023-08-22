// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMkdBBl-mt652vSYUlPBDoGCvCbj9OpiI",
  authDomain: "stopwatch-90296.firebaseapp.com",
  projectId: "stopwatch-90296",
  storageBucket: "stopwatch-90296.appspot.com",
  messagingSenderId: "327636959907",
  appId: "1:327636959907:web:0fb6262d74473b18abb516",
  measurementId: "G-5B0JYG1MX4"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseapp