  import React, { useState, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';


  const testimonials = [
    {
      name: "Ajanta Pharma Ltd.",
      company: "SEZ Pithampur",
      logo: "/images/ajanta.png",
      text: "Aradhya's expertise in staffing solutions has significantly enhanced our operational efficiency. Their commitment to excellence is impressive!",
    },
    {
      name: "Cipla Limited",
      company: "SEZ Pithampur",
      logo: "/images/cipla.png",
      text: "Aradhya's innovative approach to facility management has transformed our workspace. Their attention to detail is exceptional!",
    },
    {
      name: "Ipca Laboratories Ltd.",
      company: "SEZ Pithampur",
      logo: "/images/ipca.png",
      text: "Aradhya's catering services have received rave reviews from our employees. Their dedication to quality is evident in every meal!",
    },
    {
      name: "Lupin Ltd.",
      company: "SEZ Pithampur",
      logo: "/images/lupin.png",
      text: "Aradhya's horticulture services have created a serene atmosphere in our office. Their expertise is truly remarkable!",
    },
    {
      name: "Kusum Healthcare Pvt. Ltd.",
      company: "SEZ Pithampur",
      logo: "/images/kusum.png",
      text: "Aradhya's staffing solutions have streamlined our operations, allowing us to focus on core business activities. Their support is invaluable!",
    },
    {
      name: "Par formulations Ltd.",
      company: "SEZ Pithampur",
      logo: "/images/par.png",
      text: "Aradhya's facility management services have exceeded our expectations. Their professionalism is commendable!",
    },
    {
      name: "Temple Packaging",
      company: "SEZ Pithampur",
      logo: "/images/temple.png",
      text: "Aradhya's innovative solutions have optimized our packaging processes. Their expertise has saved us time and resources!",
    },
    {
      name: "Symbioctec Pharmalab",
      company: "SEZ Pithampur ",
      logo: "/images/symbiotec.png",
      text: "Aradhya's catering services have become an integral part of our corporate events. Their quality and reliability are unmatched!",
    },
    {
      name: "Innovative Clad Solutions",
      company: "SEZ Pithampur",
      logo: "/images/clad.png",
      text: "Aradhya's staffing solutions have enhanced our operational capacity. Their commitment to excellence is truly impressive!",
    },
    {
      name: "Motherson Sumi Wiring India",
      company: "SEZ Pithampur",
      logo: "/images/mother.png",
      text: "Aradhya's facility management services have created a conducive work environment. Their attention to detail is exceptional!",
    },
    {
      name: "Knovea Pharmaceuticals Pvt. Ltd.",
      company: "Rau, Indore",
      logo: "/images/knovea.png",
      text: "Aradhya's innovative solutions have optimized our pharmaceutical processes. Their expertise has saved us time and resources!",
    },
  ];

  const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextTestimonial, setNextTestimonial] = useState(true);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setNextTestimonial(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(intervalId);
    }, []);

    const nextTestimonialHandler = () => {
      setNextTestimonial(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevTestimonialHandler = () => {
      setNextTestimonial(false);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    return (
      <div className="relative max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: nextTestimonial ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: nextTestimonial ? -50 : 50 }}
            transition={{ duration: 0.8 }}
            className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12"
          >
            <div className="flex flex-col sm:flex-row items-center mb-6">
              <img
                src={testimonials[currentIndex].logo}
                alt={testimonials[currentIndex].company}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full mb-4 sm:mb-0 sm:mr-6"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-black font-bold text-xl sm:text-2xl">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-black text-base sm:text-lg">{testimonials[currentIndex].company}</p>
              </div>
            </div>
            <p className="text-black italic mb-6 text-base sm:text-lg text-center sm:text-left">
              "{testimonials[currentIndex].text}"
            </p>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prevTestimonialHandler}
          className="absolute top-1/2 -left-4 sm:-left-8 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full p-2 sm:p-4 shadow-md hover:bg-gray-100 transition duration-300"
        >
          <ChevronLeftIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
        </button>
        <button
          onClick={nextTestimonialHandler}
          className="absolute top-1/2 -right-4 sm:-right-8 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full p-2 sm:p-4 shadow-md hover:bg-gray-100 transition duration-300"
        >
          <ChevronRightIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
        </button>
      </div>
    );
  };

  export default Testimonials;