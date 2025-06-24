import React, { useContext, useEffect, useRef, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    acceptAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);
  const fileInputRef = useRef(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [actionType, setActionType] = useState(null); // 'accept', 'complete', or 'addFile'

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const handleActionClick = (appointmentId, type) => {
    setSelectedAppointmentId(appointmentId);
    setActionType(type);
    if (type === 'addFile') {
      fileInputRef.current.click();
    } else {
      if (type === 'accept') {
        acceptAppointment(appointmentId);
      } else if (type === 'complete') {
        completeAppointment(appointmentId);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && selectedAppointmentId) {
      if (actionType === 'addFile') {
        acceptAppointment(selectedAppointmentId, file);
      }
      setSelectedAppointmentId(null);
      setActionType(null);
      e.target.value = null; // Reset file input
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">
          Appointment Management
        </h2>
        <p className="text-blue-600">
          {appointments.length}{" "}
          {appointments.length === 1 ? "Appointment" : "Appointments"}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-4 bg-blue-50 text-blue-800 font-medium p-4 border-b border-blue-100">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Patient</div>
          <div className="col-span-1">Payment</div>
          <div className="col-span-1">Age</div>
          <div className="col-span-3">Date & Time</div>
          <div className="col-span-1">Fees</div>
          <div className="col-span-2">Status</div>
        </div>

        {/* Appointments List */}
        <div className="divide-y divide-blue-50 max-h-[70vh] overflow-y-auto">
          {appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 hover:bg-blue-50 transition-colors"
              >
                {/* Index */}
                <div className="hidden sm:block col-span-1 text-gray-500">
                  {index + 1}
                </div>

                {/* Patient */}
                <div className="col-span-1 sm:col-span-3 flex items-center space-x-3">
                  <img
                    src={item.userData.image}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                    alt={item.userData.name}
                  />
                  <span className="font-medium text-gray-700">
                    {item.userData.name}
                  </span>
                </div>

                {/* Payment */}
                <div className="col-span-1 sm:col-span-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      item.payment
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {item.payment ? "Online" : "CASH"}
                  </span>
                </div>

                {/* Age */}
                <div className="hidden sm:block col-span-1 text-gray-500">
                  {calculateAge(item.userData.dob)}
                </div>

                {/* Date & Time */}
                <div className="col-span-1 sm:col-span-3 text-gray-700">
                  <p className="font-medium">{slotDateFormat(item.slotDate)}</p>
                  <p className="text-sm text-blue-600">{item.slotTime}</p>
                </div>

                {/* Fees */}
                <div className="col-span-1 text-blue-700 font-medium">
                  {currency}
                  {item.amount}
                </div>

                {/* Status/Actions */}
                <div className="col-span-1 sm:col-span-2">
                  {item.cancelled ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <div className="flex flex-col space-y-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleActionClick(item._id, 'addFile')}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          title="Add File"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                        {item.scanImage && (
                          <a
                            href={item.scanImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                            title="View File"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  ) : item.isAccepted ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Cancel Appointment"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleActionClick(item._id, 'complete')}
                        className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                        title="Complete Appointment"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Cancel Appointment"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleActionClick(item._id, 'accept')}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Accept Appointment"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-700">
                No appointments scheduled
              </h3>
              <p className="mt-2 text-gray-500">
                You have no appointments at the moment
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;