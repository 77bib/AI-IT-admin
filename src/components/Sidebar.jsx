import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const activeStyle = {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderRight: '4px solid #3B82F6',
    color: '#1E40AF',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
  };

  const menuItems = aToken ? [
    { 
      to: '/admin-dashboard', 
      icon: assets.home_icon, 
      text: 'Dashboard',
      description: 'Overview & Analytics'
    },
    { 
      to: '/all-appointments', 
      icon: assets.appointment_icon, 
      text: 'Appointments',
      description: 'Manage Bookings'
    },
    { 
      to: '/add-doctor', 
      icon: assets.add_icon, 
      text: 'Add Doctor',
      description: 'Register New Doctor'
    },
    { 
      to: '/doctor-list', 
      icon: assets.people_icon, 
      text: 'Doctors List',
      description: 'View All Doctors'
    }
  ] : [
    { 
      to: '/doctor-dashboard', 
      icon: assets.home_icon, 
      text: 'Dashboard',
      description: 'My Overview'
    },
    { 
      to: '/doctor-appointments', 
      icon: assets.appointment_icon, 
      text: 'Appointments',
      description: 'My Schedule'
    },
    { 
      to: '/doctor-profile', 
      icon: assets.people_icon, 
      text: 'Profile',
      description: 'My Information'
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 border-r border-blue-200 shadow-2xl relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="p-6 border-b border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {aToken ? 'Admin Menu' : 'Doctor Menu'}
              </h2>
              <p className="text-xs text-blue-100">Navigation</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <motion.ul 
          initial="closed"
          animate="open"
          className="p-4 space-y-2"
        >
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                x: 5
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <NavLink 
                to={item.to}
                style={({ isActive }) => isActive ? activeStyle : {}}
                className="group flex items-center gap-4 py-4 px-6 rounded-2xl transition-all duration-300 hover:bg-blue-200/80 hover:shadow-md relative overflow-hidden bg-white/50 backdrop-blur-sm"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                {/* Icon */}
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-300 shadow-sm">
                    <img 
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 filter brightness-0 invert" 
                      src={item.icon} 
                      alt="" 
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="relative z-10 flex-1">
                  <span className="font-semibold text-blue-900 group-hover:text-blue-800 transition-colors duration-300">
                    {item.text}
                  </span>
                  <p className="text-xs text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="relative z-10">
                  <svg 
                    className="w-4 h-4 text-blue-500 group-hover:text-blue-600 transition-all duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
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
      `}</style>
    </motion.div>
  );
};

export default Sidebar;