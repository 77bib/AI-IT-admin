import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 p-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg mb-4">
            <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600">Overview of your healthcare management system</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Doctors Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 transform transition-all duration-500 hover:scale-105 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">{dashData.doctors}</p>
                  <p className="text-gray-600 font-medium">Total Doctors</p>
                  <p className="text-sm text-green-600 font-medium">Active Professionals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 transform transition-all duration-500 hover:scale-105 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">{dashData.appointments}</p>
                  <p className="text-gray-600 font-medium">Appointments</p>
                  <p className="text-sm text-blue-600 font-medium">Scheduled Sessions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patients Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 transform transition-all duration-500 hover:scale-105 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">{dashData.patients}</p>
                  <p className="text-gray-600 font-medium">Registered Patients</p>
                  <p className="text-sm text-purple-600 font-medium">Active Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Latest Bookings</h2>
                <p className="text-blue-100 text-sm">Recent appointment activities</p>
              </div>
            </div>
          </div>

          {/* Bookings List */}
          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div 
                className="flex items-center px-6 py-4 hover:bg-blue-50/50 transition-all duration-300 group" 
                key={index}
              >
                <div className="relative mr-4">
                  <img 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" 
                    src={item.docData.image} 
                    alt="Doctor" 
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-white"></div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{item.docData.name}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full font-medium">
                      {item.docData.speciality}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Booking on {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {item.cancelled ? (
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-all duration-300 hover:scale-110 group-hover:shadow-md"
                      title="Cancel Appointment"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {dashData.latestAppointments.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 text-lg">No recent bookings</p>
              <p className="text-gray-400 text-sm">New appointments will appear here</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Dashboard