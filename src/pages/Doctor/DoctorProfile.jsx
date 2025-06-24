import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className="min-h-screen bg-blue-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-blue-800">Admin Profile</h1>
                    <p className="text-blue-600">Manage your professional information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="md:flex">
                        {/* Profile Image */}
                        <div className="md:w-1/3 p-6 bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-center">
                            <img 
                                className="w-48 h-48 rounded-full border-4 border-white object-cover shadow-lg" 
                                src={profileData.image} 
                                alt="Profile" 
                            />
                            <h2 className="mt-4 text-2xl font-bold text-white text-center">{profileData.name}</h2>
                            <p className="text-blue-100 text-center">{profileData.degree} - {profileData.speciality}</p>
                            <span className="mt-2 px-3 py-1 bg-blue-400 text-white rounded-full text-sm font-medium">
                                {profileData.experience} years experience
                            </span>
                        </div>

                        {/* Profile Details */}
                        <div className="md:w-2/3 p-8">
                            {/* About Section */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-blue-800">About</h3>
                                    {!isEdit && (
                                        <button 
                                            onClick={() => setIsEdit(true)}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                </div>
                                {isEdit ? (
                                    <textarea 
                                        onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                                        className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows={5}
                                        value={profileData.about}
                                    />
                                ) : (
                                    <p className="text-gray-700">{profileData.about || "No description provided"}</p>
                                )}
                            </div>

                            {/* Details Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-blue-600 mb-1">Appointment Fee</h4>
                                    {isEdit ? (
                                        <input 
                                            type="number" 
                                            onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                                            value={profileData.fees}
                                            className="w-full p-2 border border-blue-200 rounded-lg"
                                        />
                                    ) : (
                                        <p className="text-gray-800 font-medium">{currency} {profileData.fees}</p>
                                    )}
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-blue-600 mb-1">Availability</h4>
                                    <label className="flex items-center space-x-2">
                                        <input 
                                            type="checkbox" 
                                            onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                                            checked={profileData.available}
                                            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                            disabled={!isEdit}
                                        />
                                        <span className={`${profileData.available ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                            {profileData.available ? "Available for appointments" : "Not available"}
                                        </span>
                                    </label>
                                </div>

                                <div className="md:col-span-2">
                                    <h4 className="text-sm font-medium text-blue-600 mb-1">Address</h4>
                                    {isEdit ? (
                                        <div className="space-y-2">
                                            <input 
                                                type="text" 
                                                onChange={(e) => setProfileData(prev => ({ 
                                                    ...prev, 
                                                    address: { ...prev.address, line1: e.target.value } 
                                                }))}
                                                value={profileData.address.line1}
                                                className="w-full p-2 border border-blue-200 rounded-lg"
                                                placeholder="Address Line 1"
                                            />
                                            <input 
                                                type="text" 
                                                onChange={(e) => setProfileData(prev => ({ 
                                                    ...prev, 
                                                    address: { ...prev.address, line2: e.target.value } 
                                                }))}
                                                value={profileData.address.line2}
                                                className="w-full p-2 border border-blue-200 rounded-lg"
                                                placeholder="Address Line 2"
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-gray-800">{profileData.address.line1}</p>
                                            <p className="text-gray-800">{profileData.address.line2}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {isEdit && (
                                <div className="flex justify-end space-x-3 mt-8">
                                    <button 
                                        onClick={() => setIsEdit(false)}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={updateProfile}
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile