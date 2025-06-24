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
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRight: '4px solid #3B82F6',
    color: '#1E40AF'
  };

  return (
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: 'auto' }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white border-r border-blue-100 shadow-lg"
    >
      {aToken && (
        <motion.ul 
          initial="closed"
          animate="open"
          className="text-blue-900 mt-8 space-y-2 px-4"
        >
          {[
            { to: '/admin-dashboard', icon: assets.home_icon, text: 'Dashboard' },
            { to: '/all-appointments', icon: assets.appointment_icon, text: 'Appointments' },
            { to: '/add-doctor', icon: assets.add_icon, text: 'Add Doctor' },
            { to: '/doctor-list', icon: assets.people_icon, text: 'Doctors List' }
          ].map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <NavLink 
                to={item.to}
                style={({ isActive }) => isActive ? activeStyle : {}}
                className="flex items-center gap-4 py-3 px-6 rounded-xl transition-all duration-200 hover:bg-blue-100"
              >
                <img className="w-5 h-5" src={item.icon} alt="" />
                <span className="font-medium">{item.text}</span>
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {dToken && (
        <motion.ul 
          initial="closed"
          animate="open"
          className="text-blue-900 mt-8 space-y-2 px-4"
        >
          {[
            { to: '/doctor-dashboard', icon: assets.home_icon, text: 'Dashboard' },
            { to: '/doctor-appointments', icon: assets.appointment_icon, text: 'Appointments' },
            { to: '/doctor-profile', icon: assets.people_icon, text: 'Profile' }
          ].map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <NavLink 
                to={item.to}
                style={({ isActive }) => isActive ? activeStyle : {}}
                className="flex items-center gap-4 py-3 px-6 rounded-xl transition-all duration-200 hover:bg-blue-100"
              >
                <img className="w-5 h-5" src={item.icon} alt="" />
                <span className="font-medium">{item.text}</span>
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default Sidebar;