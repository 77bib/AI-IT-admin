import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, changeAvailability , aToken , getAllDoctors} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
        getAllDoctors()
    }
}, [aToken])

  return (
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              All Doctors
            </h1>
          </div>
          <p className="text-gray-600">Manage and monitor all registered healthcare professionals</p>
        </div>

        {/* Stats card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Total Doctors</h3>
                <p className="text-2xl font-bold text-blue-600">{doctors.length}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Available doctors</p>
              <p className="text-lg font-semibold text-green-600">
                {doctors.filter(doc => doc.available).length} Available
              </p>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.map((item, index) => (
            <div 
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-500 hover:scale-105 group cursor-pointer" 
              key={index}
            >
              {/* Doctor Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-500">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  src={item.image} 
                  alt={item.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.available 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                {/* Speciality Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-blue-600/90 text-white rounded-full text-xs font-medium backdrop-blur-sm">
                    {item.speciality}
                  </span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.speciality}</p>
                    <p className="text-gray-500 text-sm">{item.experience} Experience</p>
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span>Fees: ${item.fees}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    <span>{item.degree}</span>
                  </div>
                </div>

                {/* Availability Toggle */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input 
                        onChange={() => changeAvailability(item._id)} 
                        type="checkbox" 
                        checked={item.available}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
                        item.available ? 'bg-blue-600' : 'bg-gray-300'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          item.available ? 'translate-x-6' : 'translate-x-1'
                        }`}></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </label>
                  
                  <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {doctors.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-500 text-lg mb-2">No doctors found</p>
              <p className="text-gray-400 text-sm">Doctors will appear here once registered</p>
            </div>
          </div>
        )}
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

export default DoctorsList