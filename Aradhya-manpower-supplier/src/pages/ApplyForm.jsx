import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ApplyForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const interestOptions = [
    "Housekeeping",
    "Catering",
    "Security",
    "Facility Management",
    "Human Resources",
    "Administration",
    "Customer Service",
    "Operations",
    "Other"
  ];

  const handleChange = (e) => {
    if (e.target.name === 'resume') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch('https://website-livid-eight-69.vercel.app/apply', {
        method: 'POST',
        body: formDataToSend,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });

      if (response.ok) {
        onSubmit('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          interest: '',
          message: '',
          resume: null,
        });
        setProgress(0);
      } else {
        throw new Error('Application submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      onSubmit('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    if (!formData.interest.trim()) {
      errors.interest = 'Area of interest is required';
    }

    if (!formData.resume) {
      errors.resume = 'Resume is required';
    } else if (!formData.resume.name.endsWith('.pdf')) {
      errors.resume = 'Resume must be a PDF file';
    }

    return errors;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Area of Interest
            </label>
            <select
              name="interest"
              id="interest"
              className={`w-full px-4 py-3 rounded-lg border ${errors.interest ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
              value={formData.interest}
              onChange={handleChange}
              required
            >
              <option value="">Select an area</option>
              {interestOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.interest && <p className="text-red-500 text-sm mt-1">{errors.interest}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Why do you want to join our team? (Optional)
          </label>
          <textarea
            name="message"
            id="message"
            rows="4"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Upload Your Resume (PDF only)
          </label>
          <input
            type="file"
            name="resume"
            id="resume"
            accept=".pdf"
            className={`w-full px-4 py-3 rounded-lg border ${errors.resume ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
            onChange={handleChange}
            required
          />
          {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
        </div>

        <motion.button
          type="submit"
          className={`w-full bg-orange-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-600 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {progress > 0 ? `${progress}%` : 'Submitting...'}
            </div>
          ) : (
            'Submit Application'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default ApplyForm;
