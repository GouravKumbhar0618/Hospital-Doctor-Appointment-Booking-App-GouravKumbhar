import React, { useEffect, useState } from "react";
import { getAppointments } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateB - dateA;
        });
        setAppointments(sortedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <div className="loading">Loading appointments...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>All Booked Appointments</h1>
        <button onClick={() => navigate('/')} className="home-button">
          Back to Home
        </button>
      </div>
      
      <div className="table-container">
        {appointments.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.name}</td>
                  <td>{appointment.phone}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.doctor}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.consultationType}</td>
                  <td>{appointment.reason || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;