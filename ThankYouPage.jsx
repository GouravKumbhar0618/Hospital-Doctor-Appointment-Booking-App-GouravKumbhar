import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const appointment = state?.appointmentDetails || {};

  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <h1>✅ Appointment Booked Successfully!</h1>
        
        <div className="booking-details">
          <h2>Your Appointment Details:</h2>
          <p><strong>Name:</strong> {appointment.name || 'N/A'}</p>
          <p><strong>Doctor:</strong> {appointment.doctor || 'N/A'}</p>
          <p><strong>Date:</strong> {appointment.date || 'N/A'}</p>
          <p><strong>Time:</strong> {appointment.time || 'N/A'}</p>
          <p><strong>Type:</strong> {appointment.consultationType || 'N/A'}</p>
        </div>

        <div className="action-buttons">
          <button 
            onClick={() => navigate('/')}
            className="home-button"
          >
            Back to Home
          </button>
          <button 
            onClick={() => navigate('/appointments')}
            className="appointments-button"
          >
            View All Appointments
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;