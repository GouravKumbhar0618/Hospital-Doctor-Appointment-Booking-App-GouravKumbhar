import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import Clock from './Clock'; // Import the Clock component

function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
    consultationType: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(formData.phone)) {
      setError("❌ Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), formData);
      setSuccess("Appointment booked successfully!");
      setError("");
      setFormData({
        name: "",
        phone: "",
        email: "",
        doctor: "",
        date: "",
        time: "",
        reason: "",
        consultationType: "",
        notes: "",
      });
      alert("Appointment booked successfully!");
    } catch (err) {
      console.error(err);
      setError("❌ Something went wrong. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div style={formContainer}>
      <h2 style={titleStyle}>🩺 Book a Doctor Appointment</h2>
      <Clock /> {/* Display the live clock and today's date */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="name"
          placeholder="Full Name *"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">-- Select Doctor --</option>
          <option value="Dr. Rohan Deshmukh (Dental Specialist)">Dr. Rohan Deshmukh (Dental Specialist)</option>
          <option value="Dr. Aisha Sharma (Cardiologist)">Dr. Aisha Sharma (Cardiologist)</option>
          <option value="Dr. Rahul Mehta (Orthopedic Surgeon)">Dr. Rahul Mehta (Orthopedic Surgeon)</option>
          <option value="Dr. Neha Iyer (Neurologist)">Dr. Neha Iyer (Neurologist)</option>
          <option value="Dr. Arjun Patel (Dermatologist)">Dr. Arjun Patel (Dermatologist)</option>
          <option value="Dr. Priya Desai (Gynecologist)">Dr. Priya Desai (Gynecologist)</option>
          <option value="Dr. Vikram Rao (Pulmonologist)">Dr. Vikram Rao (Pulmonologist)</option>
          <option value="Dr. Sneha Joshi (Psychiatrist)">Dr. Sneha Joshi (Psychiatrist)</option>
          <option value="Dr. Karan Malhotra (Gastroenterologist)">Dr. Karan Malhotra (Gastroenterologist)</option>
          <option value="Dr. Anjali Verma (Oncologist)">Dr. Anjali Verma (Oncologist)</option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <textarea
          name="reason"
          placeholder="Reason for Visit"
          value={formData.reason}
          onChange={handleChange}
          style={inputStyle}
        ></textarea>

        <select
          name="consultationType"
          value={formData.consultationType}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">Select Consultation Type *</option>
          <option value="In-Person">In-Person</option>
          <option value="Online">Online</option>
        </select>

        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
          style={inputStyle}
        ></textarea>

        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={buttonStyle}>Book Appointment</button>
      </form>
    </div>
  );
}

// Add simple inline styles
const formContainer = { maxWidth: "500px", margin: "auto", padding: "20px" };
const titleStyle = { textAlign: "center", marginBottom: "20px" };
const formStyle = { display: "flex", flexDirection: "column", gap: "10px" };
const inputStyle = { padding: "10px", fontSize: "16px" };
const buttonStyle = { padding: "10px", fontSize: "16px", backgroundColor: "#28a745", color: "#fff", border: "none", cursor: "pointer" };

export default AppointmentForm;
