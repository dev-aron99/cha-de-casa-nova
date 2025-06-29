// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMS1hwRAkEsw82YZkGdLDcofgn60SMJ6Q",
  authDomain: "cha-de-casa-nova-6ee9c.firebaseapp.com",
  projectId: "cha-de-casa-nova-6ee9c",
  storageBucket: "cha-de-casa-nova-6ee9c.appspot.com",
  messagingSenderId: "47375351021",
  appId: "1:47375351021:web:30da8a1da47da68a2920e4"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Exporta db para usar em outros scripts
export { db };
