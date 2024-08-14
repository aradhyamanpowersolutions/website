import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BeakerIcon, InboxIcon, UserGroupIcon, TruckIcon, Cog6ToothIcon, CogIcon, ClipboardDocumentListIcon, ComputerDesktopIcon, WrenchScrewdriverIcon, ChartBarIcon, BuildingOfficeIcon, PresentationChartLineIcon, CheckCircleIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const services = [
  {
    category: "Skilled Labor",
    icon: WrenchScrewdriverIcon,
    items: [
      {
        name: 'Maintenance Technicians',
        description: 'Experienced technicians for equipment maintenance and repair.',
        details: 'Our maintenance technicians are trained to handle a wide range of industrial equipment, ensuring optimal performance and minimal downtime.',
        image: '/images/MT.jpg',
        icon: CogIcon,
      },
      {
        name: 'Lab Assistants',
        description: 'Skilled assistants for laboratory operations and research support.',
        details: 'Our lab assistants are well-versed in various laboratory techniques and can provide valuable support in research and quality control processes.',
        image: '/images/lab.jpg',
        icon: BeakerIcon,
      },
      {
        name: 'Specialized Operators',
        description: 'Operators trained for specific industrial machinery and processes.',
        details: 'We provide specialized operators who are experts in handling complex industrial machinery, ensuring efficient and safe operations.',
        image: '/images/so.jpg',
        icon: Cog6ToothIcon,
      },
    ]
  },
  {
    category: "Unskilled Labor",
    icon: UserGroupIcon,
    items: [
      {
        name: 'Packing Staff',
        description: 'Efficient workers for product packaging and preparation.',
        details: 'Our packing staff are trained to handle various types of products, ensuring proper packaging for safe transportation and storage.',
        image: '/images/pack.jpg',
        icon: InboxIcon,
      },
      {
        name: 'Loading & Unloading Crew',
        description: 'Strong and efficient team for material handling.',
        details: 'Our loading and unloading crew are experienced in handling diverse types of goods, ensuring quick and safe transfer of materials.',
        image: '/images/loading.jpg',
        icon: TruckIcon,
      },
      {
        name: 'Warehouse Workers',
        description: 'Versatile staff for various warehouse operations.',
        details: 'Our warehouse workers are trained in inventory management, order fulfillment, and general warehouse maintenance, ensuring smooth logistics operations.',
        image: '/images/war.jpg',
        icon: BuildingOfficeIcon,
      },
    ]
  },
  {
    category: "Administrative Support",
    icon: ClipboardDocumentListIcon,
    items: [
      {
        name: 'Office Assistants',
        description: 'Supportive staff for general office administration.',
        details: 'Our office assistants are proficient in various administrative tasks, from data entry to document management, helping to keep your office running smoothly.',
        image: '/images/oa.jpg',
        icon: ComputerDesktopIcon,
      },
      {
        name: 'Clerks',
        description: 'Detail-oriented personnel for record-keeping and data management.',
        details: 'Our clerks are skilled in maintaining accurate records, managing databases, and handling clerical duties with precision and efficiency.',
        image: '/images/cl.jpg',
        icon: ClipboardDocumentListIcon,
      },
      {
        name: 'Receptionist',
        description: 'Professional front-desk staff for a welcoming business environment.',
        details: 'Our receptionists are trained to handle visitor management, phone systems, and basic administrative tasks, presenting a positive first impression of your company.',
        image: '/images/rec.jpg',
        icon: UserGroupIcon,
      },
    ]
  },
  {
    category: "Project-Based Staffing",
    icon: PresentationChartLineIcon,
    items: [
      {
        name: 'Project Coordinators',
        description: 'Skilled professionals to oversee and manage specific projects.',
        details: 'Our project coordinators are experienced in planning, executing, and closing projects across various industries, ensuring timely and successful project completion.',
        image: '/images/pc.jpg',
        icon: ChartBarIcon,
      },
      {
        name: 'Temporary Technical Staff',
        description: 'Specialized technicians for short-term technical projects.',
        details: 'We provide temporary technical staff with specific skill sets to support your short-term projects or to fill in during peak periods.',
        image: '/images/tech.jpg',
        icon: WrenchScrewdriverIcon,
      },
      {
        name: 'Seasonal Workers',
        description: 'Flexible workforce for seasonal business fluctuations.',
        details: 'Our seasonal workers are ready to support your business during peak seasons, helping you manage increased workload without long-term commitments.',
        image: '/images/temp.jpg',
        icon: UserGroupIcon,
      },
    ]
  },
];

function ServiceHighlight({ icon: Icon, title, description, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300"
      onClick={onClick}
    >
      <Icon className="h-12 w-12 text-blue-500 mb-4" />
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}

function ServiceCard({ service, onClick }) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0 20px 30px rgba(0,0,0,0.2)',
        borderRadius: '30px',
      }}
      whileTap={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={() => onClick(service)}
    >
      <div className="p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <service.icon className="h-12 w-12 text-blue-400 mr-4 transition-transform duration-300 group-hover:rotate-12" />
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-blue-400 transition-colors duration-300">{service.name}</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 transform -skew-y-3">
        <span className="text-white text-sm font-semibold block transform skew-y-3">Learn More</span>
      </div>
    </motion.div>
  );
}

function ServiceModal({ service, onClose, navigate, position }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        style={{ top: `${position}px` }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl relative mt-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mb-4">
          <service.icon className="h-12 w-12 text-blue-500 mr-4" />
          <h2 className="text-2xl font-bold dark:text-white">{service.name}</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{service.details}</p>
        <img src={service.image} alt={service.name} className="w-full h-64 object-cover mb-4 rounded-lg" />
        <div className="flex justify-between">
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition duration-300"
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}


function WhyChooseUsCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300"
    >
      <Icon className="h-12 w-12 text-blue-500 mb-4" />
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}

function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [modalPosition, setModalPosition] = useState(0);
  const navigate = useNavigate();
  const servicesRef = useRef(null);
  const whyChooseUsRef = useRef(null);

  useEffect(() => {
    if (selectedService) {
      const scrollPosition = window.scrollY;
      setModalPosition(scrollPosition);
    }
  }, [selectedService]);

  const scrollToServices = () => {
    servicesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWhyChooseUs = () => {
    whyChooseUsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="services min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">      
      <section className="hero-section min-h-screen flex flex-col items-center justify-center pt-16 text-center relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Our Staffing Solutions
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-cursive"
            >
              Tailored Staffing Solutions for Your Unique Needs
            </motion.div>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                className="bg-orange-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-orange-600  transition duration-300 text-lg inline-flex items-center justify-center"
                onClick={scrollToServices}
              >
                Discover Our Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
              <button
                className="bg-transparent border-2 border-purple-500 text-purple-500 py-3 px-8 rounded-full font-semibold hover:bg-purple-500 hover:text-white transition duration-300 text-lg inline-flex items-center justify-center cursor-pointer"
                onClick={scrollToWhyChooseUs}
              >
                Why Choose Us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((category, index) => (
              <ServiceHighlight
                key={index}
                icon={category.icon}
                title={category.category}
                description={`Explore our ${category.category.toLowerCase()} services`}
                onClick={scrollToServices}
              />
            ))}
          </div>
        </div>
      </section>

      <section ref={whyChooseUsRef} className="why-choose-us py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <WhyChooseUsCard
              icon={UserGroupIcon}
              title="Experienced Team"
              description="Our recruitment professionals have extensive experience in various industries, ensuring you receive top talent."
            />
            <WhyChooseUsCard
              icon={CheckCircleIcon}
              title="Quality Manpower"
              description="We adhere to strict quality control measures as per current industry requirements like employee hygiene and tobacco checks before entering premises."
            />
            <WhyChooseUsCard
              icon={ClipboardDocumentListIcon}
              title="Expertise in Statutory Compliance"
              description="We conduct audits to assess compliance with policies and regulations, keeping accurate records of compliance efforts."
            />
            <WhyChooseUsCard
              icon={Cog6ToothIcon}
              title="Customized Solutions"
              description="We offer tailored staffing solutions to match your specific requirements and business objectives."
            />
            <WhyChooseUsCard
              icon={ClockIcon}
              title="Reliability"
              description="Our commitment to reliability and punctuality ensures that your operations run smoothly without interruptions."
            />
            <WhyChooseUsCard
              icon={CurrencyDollarIcon}
              title="Competitive Pricing"
              description="We offer cost-effective solutions without compromising on quality, providing excellent value for your investment."
            />
          </div>
        </div>
      </section>
  
      <section ref={servicesRef} className="services-section py-16 sm:py-24 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((category, index) => (
            <div key={index} className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                {category.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((service, serviceIndex) => (
                  <ServiceCard key={serviceIndex} service={service} onClick={setSelectedService} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
            navigate={navigate}
            position={modalPosition}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Services;