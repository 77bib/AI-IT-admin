import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  // Getting Doctor appointment data from Database using API
  const getAppointments = async () => {
    try {
      console.log("Getting appointments...");
      console.log("Token:", dToken);

      if (!dToken) {
        toast.error("Please login first");
        return;
      }

      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        { headers: { dToken } }
      );

      console.log("Appointments response:", data);

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log("Error getting appointments:", error);
      toast.error(error.message);
    }
  };

  // Getting Doctor profile data from Database using API
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dToken },
      });
      console.log(data.profileData);
      setProfileData(data.profileData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to cancel doctor appointment using API
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        // after creating dashboard
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Function to Mark appointment completed using API
  const completeAppointment = async (appointmentId, file) => {
    try {
      console.log("Completing appointment:", appointmentId);
      console.log("File:", file);

      const formData = new FormData();
      formData.append("appointmentId", appointmentId);
      if (file) {
        formData.append("scanImage", file);
      }

      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        formData,
        {
          headers: {
            dToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Complete appointment response:", data);

      if (data.success) {
        toast.success(data.message);
        // Update the appointments list with the new appointment data
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId ? data.appointment : appointment
          )
        );
        getDashData();
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Function to accept appointment with file upload
  const acceptAppointment = async (appointmentId, file) => {
    try {
      console.log("Accepting appointment:", appointmentId);
      console.log("File:", file);

      const formData = new FormData();
      formData.append("appointmentId", appointmentId);
      if (file) {
        formData.append("scanImage", file);
      }

      const { data } = await axios.post(
        backendUrl + "/api/doctor/accept-appointment",
        formData,
        {
          headers: {
            dToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Accept appointment response:", data);

      if (data.success) {
        toast.success(data.message);
        // Update the appointments list with the new appointment data
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId ? data.appointment : appointment
          )
        );
        getDashData();
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Getting Doctor dashboard data using API
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { dToken },
      });

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    acceptAppointment,
    dashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;