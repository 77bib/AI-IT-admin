import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-white/20 shadow-xl"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Role */}
          <motion.div 
            className="flex items-center space-x-4"
            whileHover="hover"
          >
            <motion.div
              onClick={() => navigate('/')}
              variants={logoVariants}
              className="cursor-pointer group"
            >
              <div className="relative">
                <img
                  className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
                  src={assets.admin_logo}
                  alt="Logo"
                  style={{ width: '175px', height: 'auto' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <motion.span
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200/50 shadow-sm"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {aToken ? 'Admin Panel' : 'Medical System'}
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Right side - User info and logout */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* User info */}
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-100/50">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-800">
                  {aToken ? 'Administrator' : 'Doctor'}
                </p>
                <p className="text-gray-500 text-xs">Logged in</p>
              </div>
            </div>

            {/* Logout Button */}
            <motion.button
              onClick={logout}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="relative overflow-hidden inline-flex items-center px-4 py-2 text-sm font-medium rounded-full text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-full"
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
          </motion.div>
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
      `}</style>
    </motion.nav>
  );
};

export default Navbar;