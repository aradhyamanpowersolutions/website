import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, UserIcon, BriefcaseIcon, PhoneIcon, AcademicCapIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { ThemeContext } from '../contexts/ThemeContext';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  
  const navigationItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'About', path: '/about', icon: UserIcon },
    { name: 'Services', path: '/services', icon: BriefcaseIcon },
    { name: 'Careers', path: '/careers', icon: AcademicCapIcon },
    { name: 'Contact Us', path: '/contact', icon: PhoneIcon },
  ];

  return (
    <>
      {/* Top Navigation for Larger Screens */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`hidden md:flex fixed w-full z-10 transition-all duration-300 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 ${isDarkMode ? '' : 'backdrop-filter backdrop-blur-lg bg-opacity-30'
          } shadow-md border-b border-gray-200 dark:border-gray-700 py-4`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center text-gray-800 dark:text-white">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <img src="/images/logo1.png" alt="Aradhya Manpower Logo" className="h-10 w-10 mr-2" />
                <div className="flex flex-col">
                  <span className="text-xl font-bold leading-tight text-blue-600">Aradhya Manpower Supplier</span>
                </div>
              </motion.div>
            </Link>
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex space-x-6 items-center"
            >
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`hover:text-blue-400 transition duration-300 text-sm font-medium ${location.pathname === item.path
                    ? 'text-blue-500 hover:text-blue-600'
                    : item.name === 'Contact Us'
                      ? 'text-green-500 hover:text-green-600'
                      : 'text-gray-800 dark:text-gray-300'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg"
              >
                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </motion.button>
            </motion.nav>
          </div>
        </div>
      </motion.header>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 z-20">
        <div className="flex justify-around items-center py-2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center p-2 ${location.pathname === item.path
                  ? 'text-blue-600' // Active state color
                  : item.name === 'Contact Us'
                    ? 'text-green-600' // Contact Us color
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-400' // Default and hover color
                }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}

        </div>
      </nav>

      {/* Dark Mode Toggle for Mobile */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleDarkMode}
        className="md:hidden fixed bottom-20 right-4 p-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg z-20"
      >
        {isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
      </motion.button>
    </>
  );
}

export default Header;
