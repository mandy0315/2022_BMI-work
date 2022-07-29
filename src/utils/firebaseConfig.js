import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyA_MUkVOvMPC4T98TxxzFG_SupoKsjI1ko",
  authDomain: "project-43df0.firebaseapp.com",
  databaseURL: "https://project-43df0-default-rtdb.firebaseio.com",
  projectId: "project-43df0",
  storageBucket: "project-43df0.appspot.com",
  messagingSenderId: "44231851974",
  appId: "1:44231851974:web:c20ad9a79556b3a796fcc7",
  measurementId: "G-YDF65SJ0L4",
};
const database = firebase.initializeApp(config).firestore();
// 資料庫
export { database };
