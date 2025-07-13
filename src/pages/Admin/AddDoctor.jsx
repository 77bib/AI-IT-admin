import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { backendUrl } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!docImg) {
        toast.error("Image Not Selected");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 p-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg mb-4">
            <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Add New Doctor
            </h1>
          </div>
          <p className="text-gray-600">Complete the form below to register a new doctor</p>
        </div>

        {/* Main form card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 transform transition-all duration-500 hover:scale-[1.01]">
          <form onSubmit={onSubmitHandler} className="space-y-8">
            {/* Image upload section */}
            <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <label htmlFor="doc-img" className="cursor-pointer group">
                <div className="relative">
                  <img
                    className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                    src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                    alt="Doctor"
                  />
                  <div className="absolute inset-0 bg-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                </div>
              </label>
              <input
                onChange={(e) => setDocImg(e.target.files[0])}
                type="file"
                name=""
                id="doc-img"
                hidden
                accept="image/*"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Upload Doctor Photo</h3>
                <p className="text-gray-600 text-sm">Click to upload a professional photo</p>
              </div>
            </div>

            {/* Form fields in two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left column */}
              <div className="space-y-6">
                {/* Name field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Doctor Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    type="text"
                    placeholder="Enter doctor's full name"
                    required
                  />
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    Email Address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    type="email"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    type="password"
                    placeholder="Set a secure password"
                    required
                  />
                </div>

                {/* Experience field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                    Years of Experience
                  </label>
                  <select
                    onChange={(e) => setExperience(e.target.value)}
                    value={experience}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="1 Year">1 Year</option>
                    <option value="2 Year">2 Years</option>
                    <option value="3 Year">3 Years</option>
                    <option value="4 Year">4 Years</option>
                    <option value="5 Year">5 Years</option>
                    <option value="6 Year">6 Years</option>
                    <option value="8 Year">8 Years</option>
                    <option value="9 Year">9 Years</option>
                    <option value="10 Year">10 Years</option>
                  </select>
                </div>

                {/* Fees field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Consultation Fees
                  </label>
                  <input
                    onChange={(e) => setFees(e.target.value)}
                    value={fees}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    type="number"
                    placeholder="Enter consultation fees"
                    required
                  />
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Speciality field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Speciality
                  </label>
                  <select
                    onChange={(e) => setSpeciality(e.target.value)}
                    value={speciality}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="General physician">General Physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatricians">Pediatrician</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                  </select>
                </div>

                {/* Degree field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    Medical Degree
                  </label>
                  <input
                    onChange={(e) => setDegree(e.target.value)}
                    value={degree}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    type="text"
                    placeholder="e.g., MBBS, MD, etc."
                    required
                  />
                </div>

                {/* Address fields */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Address
                  </label>
                  <input
                    onChange={(e) => setAddress1(e.target.value)}
                    value={address1}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm mb-2"
                    type="text"
                    placeholder="Address Line 1"
                    required
                  />
                  <input
                    onChange={(e) => setAddress2(e.target.value)}
                    value={address2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    type="text"
                    placeholder="Address Line 2"
                    required
                  />
                </div>
              </div>
            </div>

            {/* About Doctor section */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                About Doctor
              </label>
              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                rows={5}
                placeholder="Write a brief description about the doctor's expertise, achievements, and approach to patient care..."
              ></textarea>
            </div>

            {/* Submit button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center min-w-[200px]"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Doctor...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Doctor
                  </>
                )}
              </button>
            </div>
          </form>
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
  );
};

export default AddDoctor;
