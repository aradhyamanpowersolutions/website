import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid';

function Footer() {
  return (
   
<footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h3 className="text-xl font-bold mb-4">Aradhya Manpower</h3>
        <p className="text-lg">Your trusted partner for industrial & corporate services</p>
        <div className="flex items-center mt-4">
          <Link to="/about-us" className="hover:text-blue-300 transition duration-300">Learn More</Link>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          {['About Us', 'Our Services', 'Careers', 'Contact Us'].map((item) => (
            <li key={item}>
              <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-300 transition duration-300">{item}</Link>
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <h3 className="text-xl font-bold mb-4">Our Services</h3>
        <ul className="space-y-2">
          {['Housekeeping', 'Catering', 'Manpower Staffing', 'Material Handling', 'Horticulture'].map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
        <ul className="space-y-2">
          {[
            { icon: PhoneIcon, text: '+1 (123) 456-7890' },
            { icon: EnvelopeIcon, text: 'info@aradhyamanpower.com' },
            { icon: MapPinIcon, text: '123 Business Street, City, Country' },
          ].map(({ icon: Icon, text }, index) => (
            <li key={index} className="flex items-center">
              <Icon className="h-5 w-5 mr-2" />
              {text}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-8 pt-8 border-t border-white border-opacity-20 text-center"
    >
      <p>&copy; 2024 Aradhya Manpower Supplier. All rights reserved.</p>
    </motion.div>
  </div>
</footer>
  );
}

export default Footer;