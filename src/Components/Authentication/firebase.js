import { initializeApp } from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBvz8shL_CFYesTQwnQyrQbXRCCtwGfCto",
  authDomain: "otp-app-demo-721d0.firebaseapp.com",
  projectId: "otp-app-demo-721d0",
  storageBucket: "otp-app-demo-721d0.appspot.com",
  messagingSenderId: "179957758862",
  appId: "1:179957758862:web:30521844bb17940fdd02df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
