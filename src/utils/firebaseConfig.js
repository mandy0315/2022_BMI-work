import firebase from "firebase/app";
import "firebase/firestore";

// TODO firebase 控制台去貼上設定值
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const database = firebase.initializeApp(config).firestore();
// 資料庫
export { database };
