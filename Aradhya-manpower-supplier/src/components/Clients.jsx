import React from 'react';
import { motion } from 'framer-motion';

function Clients() {
  const clients = [
    {
      logo: '/path/to/client1-logo.png',
      name: 'Client 1',
    },
    {
      logo: '/path/to/client2-logo.png',
      name: 'Client 2',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {clients.map((client, index) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <img src={client.logo} alt={client.name} className="h-12 w-12 mb-4" />
          <h3 className="text-lg font-semibold dark:text-white">{client.name}</h3>
        </motion.div>
      ))}
    </div>
  );
}

export default Clients;