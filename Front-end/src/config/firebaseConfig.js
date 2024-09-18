// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5GqmUeWmm9OE2iGM1H_edgKsZCIOjWz0",
  authDomain: "student-management-cccc7.firebaseapp.com",
  projectId: "student-management-cccc7",
  storageBucket: "student-management-cccc7.appspot.com",
  messagingSenderId: "105978084808",
  appId: "1:105978084808:web:660ec19854389f568a54fd",
  measurementId: "G-0YSLBQEP0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);