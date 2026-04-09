// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTeYYuBt5EqZRnhhQfJ2d4rcLI-RP_4GU",
  authDomain: "mushtari-collection.firebaseapp.com",
  databaseURL: "https://mushtari-collection-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mushtari-collection",
  storageBucket: "mushtari-collection.firebasestorage.app",
  messagingSenderId: "541245067810",
  appId: "1:541245067810:web:9d8fa6f8fb35230260307b",
  measurementId: "G-X2NQZJYJGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

// Make database available globally
window.database = database;
window.ref = ref;
window.set = set;
window.onValue = onValue;
window.get = get;