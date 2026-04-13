import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD4l69HUI5hbczgw7_UGa23feK3WmC9-6g",
    authDomain: "curio-agent.firebaseapp.com",
    projectId: "curio-agent",
    storageBucket: "curio-agent.firebasestorage.app",
    messagingSenderId: "252865984518",
    appId: "1:252865984518:web:dbf75d7636ccd27efeab87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
