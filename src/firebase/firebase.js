// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaVRTRRHSN2C41p3I8R9-a-pXS2BKVlzY",
  authDomain: "hospital-appointment-sys-cbcf6.firebaseapp.com",
  projectId: "hospital-appointment-sys-cbcf6",
  storageBucket: "hospital-appointment-sys-cbcf6.appspot.com",
  messagingSenderId: "177425856061",
  appId: "1:177425856061:web:a3c570ee864d9055615c54"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get all appointments
export const getAppointments = async () => {
  const querySnapshot = await getDocs(collection(db, "appointments"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add new appointment
export const addAppointment = async (appointmentData) => {
  return await addDoc(collection(db, "appointments"), appointmentData);
};

// Check doctor availability
export const checkDoctorAvailability = async (doctor, date, time) => {
  const q = query(
    collection(db, "appointments"),
    where("doctor", "==", doctor),
    where("date", "==", date),
    where("time", "==", time)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

export { db };