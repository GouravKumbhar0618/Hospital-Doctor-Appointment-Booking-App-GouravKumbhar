import React, { useState } from "react";
import { addAppointment, checkDoctorAvailability } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";


const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
    consultationType: "In-Person",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const doctorsList = [
    "Dr. Rohan Deshmukh (Dental Specialist)",
    "Dr. Aisha Sharma (Cardiologist)",
    "Dr. Rahul Mehta (Orthopedic Surgeon)",
    "Dr. Neha Iyer (Neurologist)",
    "Dr. Arjun Patel (Dermatologist)",
    "Dr. Priya Desai (Gynecologist)",
    "Dr. Vikram Rao (Pulmonologist)",
    "Dr. Sneha Joshi (Psychiatrist)",
    "Dr. Karan Malhotra (Gastroenterologist)",
    "Dr. Anjali Verma (Oncologist)",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (!/^\d{10}$/.test(formData.phone)) {
        throw new Error("Please enter a valid 10-digit phone number");
      }

      const isAvailable = await checkDoctorAvailability(
        formData.doctor,
        formData.date,
        formData.time
      );

      if (!isAvailable) {
        throw new Error("This doctor is already booked at this time");
      }

      await addAppointment(formData);

      setSuccess(true);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        doctor: "",
        date: "",
        time: "",
        reason: "",
        consultationType: "In-Person",
        notes: "",
      });

      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>🧑🏻‍⚕️ Book a Doctor Appointment</h1>
      <form onSubmit={handleSubmit}>
        <label>Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>Phone Number *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
          title="10 digit phone number"
        />

        <label>Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Select Doctor *</label>
        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Doctor --</option>
          {doctorsList.map((doc, idx) => (
            <option key={idx} value={doc}>
              {doc}
            </option>
          ))}
        </select>

        <label>Appointment Date *</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]}
        />

        <label>Appointment Time *</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          min="09:00"
          max="18:00"
        />

        <label>Reason for Visit</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
        ></textarea>

        <label>Preferred Consultation Type *</label>
        <select
          name="consultationType"
          value={formData.consultationType}
          onChange={handleChange}
          required
        >
          <option value="In-Person">In-Person</option>
          <option value="Online">Online</option>
        </select>

        <label>Additional Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>

        {success && <p className="success">✅ Booking Successful! Redirecting to admin page...</p>}
        {error && <p className="error">❌ {error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
