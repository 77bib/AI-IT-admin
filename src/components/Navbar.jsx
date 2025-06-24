import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Weight } from 'lucide-react';

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext);
  const { aToken, setAToken } = useContext(AdminContext);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    dToken && setDToken('');
    dToken && localStorage.removeItem('dToken');
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
      transition: {
        duration: 0.3
      }
    },
    tap: { scale: 0.98 }
  };

  const logoVariants = {
    hover: {
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Role */}
          <motion.div 
            className="flex items-center space-x-4"
            whileHover="hover"
          >
           <motion.img
  onClick={() => navigate('/')}
  variants={logoVariants}
  className="h-8 w-auto cursor-pointer" // w-auto maintains aspect ratio
  src={assets.admin_logo}
  alt="Logo"
  style={{ width: '175px', height: 'auto' }} // Set both width and height
/>
            <motion.span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                aToken ? 'bg-indigo-100 text-indigo-800' : 'bg-indigo-100 text-indigo-800'
              }`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {aToken ? 'Admin backend + add doctor' : 'Admin Lab Medical'}
            </motion.span>
          </motion.div>
{/* cccccccccccccccccccccccccccccc */}
          {/* Logout Button */}
          <motion.button
            onClick={logout}
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative overflow-hidden inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-500"
                  style={{ zIndex: -1 }}
                />
              )}
            </AnimatePresence>
            <svg 
              className="-ml-1 mr-2 h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" 
                clipRule="evenodd" 
              />
            </svg>
            Sign Out
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;