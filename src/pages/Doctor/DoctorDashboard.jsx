import React, { useContext, useEffect, useRef, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)
  const fileInputRef = useRef(null)
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  const handleCompleteClick = (appointmentId) => {
    setSelectedAppointmentId(appointmentId)
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && selectedAppointmentId) {
      completeAppointment(selectedAppointmentId, file)
      setSelectedAppointmentId(null)
      e.target.value = null // Reset file input
    }
  }

  return dashData && (
    <div className='p-6 bg-blue-50 min-h-screen'>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-blue-800'>Admin Dashboard</h1>
        <p className='text-blue-600'>Welcome back! Here's your overview</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
        <div className='bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition duration-300'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-blue-400 rounded-full'>
              <img className='w-8 h-8' src={assets.earning_icon} alt="Earnings" />
            </div>
            <div>
              <p className='text-2xl font-bold'>{currency} {dashData.earnings}</p>
              <p className='text-blue-100'>Total Earnings</p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition duration-300'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-blue-400 rounded-full'>
              <img className='w-8 h-8' src={assets.appointments_icon} alt="Appointments" />
            </div>
            <div>
              <p className='text-2xl font-bold'>{dashData.appointments}</p>
              <p className='text-blue-100'>Total Appointments</p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition duration-300'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-blue-400 rounded-full'>
              <img className='w-8 h-8' src={assets.patients_icon} alt="Patients" />
            </div>
            <div>
              <p className='text-2xl font-bold'>{dashData.patients}</p>
              <p className='text-blue-100'>Total Patients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Bookings Section */}
      <div className='bg-white rounded-xl shadow-md overflow-hidden'>
        <div className='bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center gap-3'>
          <div className='p-2 bg-blue-500 rounded-lg'>
            <img className='w-5 h-5' src={assets.list_icon} alt="List" />
          </div>
          <h2 className='text-xl font-semibold text-white'>Latest Bookings</h2>
        </div>

        <div className='divide-y divide-blue-100'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-4 gap-4 hover:bg-blue-50 transition-colors' key={index}>
              <img 
                className='rounded-full w-12 h-12 object-cover border-2 border-blue-200' 
                src={item.userData.image} 
                alt={item.userData.name} 
              />
              <div className='flex-1'>
                <p className='text-lg font-medium text-blue-800'>{item.userData.name}</p>
                <p className='text-blue-600 text-sm'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <span className='px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium'>
                  Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium'>
                  Completed
                </span>
              ) : (
                <div className='flex gap-2'>
                  <button 
                    onClick={() => cancelAppointment(item._id)}
                    className='p-2 bg-red-100 hover:bg-red-200 rounded-full transition-colors'
                    title='Cancel Appointment'
                  >
                    <img className='w-5 h-5' src={assets.cancel_icon} alt="Cancel" />
                  </button>
                  <button 
                    onClick={() => handleCompleteClick(item._id)}
                    className='p-2 bg-green-100 hover:bg-green-200 rounded-full transition-colors'
                    title='Complete Appointment'
                  >
                    <img className='w-5 h-5' src={assets.tick_icon} alt="Complete" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Empty state if no appointments */}
      {dashData.latestAppointments.length === 0 && (
        <div className='bg-white rounded-xl shadow-md p-8 text-center'>
          <img src={assets.empty_icon} alt="No appointments" className='w-24 h-24 mx-auto mb-4' />
          <h3 className='text-xl font-medium text-blue-800 mb-2'>No Appointments Yet</h3>
          <p className='text-blue-600'>You don't have any upcoming appointments scheduled.</p>
        </div>
      )}
    </div>
  )
}

export default DoctorDashboard