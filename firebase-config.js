// Importações para Firebase App e Realtime Database
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Configuração do seu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAnViXtYbOPSCAWEkYUoSmKHbgKqAMf4ok",
  authDomain: "cha-de-casa-nova-75fd3.firebaseapp.com",
  databaseURL: "https://cha-de-casa-nova-75fd3-default-rtdb.firebaseio.com",
  projectId: "cha-de-casa-nova-75fd3",
  storageBucket: "cha-de-casa-nova-75fd3.firebasestorage.app",
  messagingSenderId: "64932178547",
  appId: "1:64932178547:web:ffab112ed34ac427699806",
  measurementId: "G-E6JC94CR5X"
};

// Inicializa Firebase e Database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Exporta para usar em outros arquivos
export { db, ref, onValue, set };
