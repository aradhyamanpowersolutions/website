/**
 * The service catalogue. Every entry renders as real, crawlable page content on
 * /services (the old build hid the `details` copy inside a modal, so search
 * engines never saw it) and feeds one `Service` node in the JSON-LD graph.
 */

export const serviceCategories = [
  {
    slug: 'skilled-labor',
    category: 'Skilled Labor',
    icon: 'wrench',
    summary:
      'Trained technicians, laboratory staff and machine operators for pharmaceutical and manufacturing plants.',
    items: [
      {
        slug: 'maintenance-technicians',
        name: 'Maintenance Technicians',
        description: 'Experienced technicians for equipment maintenance and repair.',
        details:
          'Our maintenance technicians are trained to handle a wide range of industrial equipment, ensuring optimal performance and minimal downtime. They cover preventive maintenance schedules, breakdown response and shift-based plant coverage.',
        image: '/roles/maintenance-technicians.jpg',
        icon: 'cog',
      },
      {
        slug: 'lab-assistants',
        name: 'Lab Assistants',
        description: 'Skilled assistants for laboratory operations and research support.',
        details:
          'Our lab assistants are well-versed in various laboratory techniques and can provide valuable support in research and quality control processes, including sample handling, documentation and GMP-compliant record keeping.',
        image: '/roles/lab-assistants.jpg',
        icon: 'beaker',
      },
      {
        slug: 'specialized-operators',
        name: 'Specialized Operators',
        description: 'Operators trained for specific industrial machinery and processes.',
        details:
          'We provide specialized operators who are experts in handling complex industrial machinery, ensuring efficient and safe operations across packaging lines, granulation, compression and coating equipment.',
        image: '/roles/specialized-operators.jpg',
        icon: 'cog6',
      },
    ],
  },
  {
    slug: 'unskilled-labor',
    category: 'Unskilled Labor',
    icon: 'users',
    summary:
      'Reliable general workforce for packing, material handling and warehouse operations.',
    items: [
      {
        slug: 'packing-staff',
        name: 'Packing Staff',
        description: 'Efficient workers for product packaging and preparation.',
        details:
          'Our packing staff are trained to handle various types of products, ensuring proper packaging for safe transportation and storage, with attention to batch coding, labelling accuracy and line hygiene.',
        image: '/roles/packing-staff.jpg',
        icon: 'inbox',
      },
      {
        slug: 'loading-unloading-crew',
        name: 'Loading & Unloading Crew',
        description: 'Strong and efficient team for material handling.',
        details:
          'Our loading and unloading crew are experienced in handling diverse types of goods, ensuring quick and safe transfer of materials with correct manual-handling practice and dispatch documentation support.',
        image: '/roles/loading-unloading-crew.jpg',
        icon: 'truck',
      },
      {
        slug: 'warehouse-workers',
        name: 'Warehouse Workers',
        description: 'Versatile staff for various warehouse operations.',
        details:
          'Our warehouse workers are trained in inventory management, order fulfillment, and general warehouse maintenance, ensuring smooth logistics operations, accurate stock counts and organised storage.',
        image: '/roles/warehouse-workers.jpg',
        icon: 'building',
      },
    ],
  },
  {
    slug: 'administrative-support',
    category: 'Administrative Support',
    icon: 'clipboard',
    summary:
      'Front-office and back-office staff who keep your plant administration running.',
    items: [
      {
        slug: 'office-assistants',
        name: 'Office Assistants',
        description: 'Supportive staff for general office administration.',
        details:
          'Our office assistants are proficient in various administrative tasks, from data entry to document management, helping to keep your office running smoothly day to day.',
        image: '/roles/office-assistants.jpg',
        icon: 'computer',
      },
      {
        slug: 'clerks',
        name: 'Clerks',
        description: 'Detail-oriented personnel for record-keeping and data management.',
        details:
          'Our clerks are skilled in maintaining accurate records, managing databases, and handling clerical duties with precision and efficiency, including statutory registers and shift attendance.',
        image: '/images/cl.jpg',
        icon: 'clipboard',
      },
      {
        slug: 'receptionist',
        name: 'Receptionist',
        description: 'Professional front-desk staff for a welcoming business environment.',
        details:
          'Our receptionists are trained to handle visitor management, phone systems, and basic administrative tasks, presenting a positive first impression of your company to every visitor and auditor.',
        image: '/images/rec.jpg',
        icon: 'users',
      },
    ],
  },
  {
    slug: 'project-based-staffing',
    category: 'Project-Based Staffing',
    icon: 'presentation',
    summary:
      'Flexible teams for short-term projects, shutdowns and seasonal demand peaks.',
    items: [
      {
        slug: 'project-coordinators',
        name: 'Project Coordinators',
        description: 'Skilled professionals to oversee and manage specific projects.',
        details:
          'Our project coordinators are experienced in planning, executing, and closing projects across various industries, ensuring timely and successful project completion with clear reporting.',
        image: '/images/pc.jpg',
        icon: 'chart',
      },
      {
        slug: 'temporary-technical-staff',
        name: 'Temporary Technical Staff',
        description: 'Specialized technicians for short-term technical projects.',
        details:
          'We provide temporary technical staff with specific skill sets to support your short-term projects, plant shutdowns, validation runs or to fill in during peak periods.',
        image: '/images/tech.jpg',
        icon: 'wrench',
      },
      {
        slug: 'seasonal-workers',
        name: 'Seasonal Workers',
        description: 'Flexible workforce for seasonal business fluctuations.',
        details:
          'Our seasonal workers are ready to support your business during peak seasons, helping you manage increased workload without long-term commitments or fixed headcount.',
        image: '/images/temp.jpg',
        icon: 'users',
      },
    ],
  },
];

/** Three-letter code per category, used by the roster board. */
export const categoryCodes = {
  'skilled-labor': 'SKL',
  'unskilled-labor': 'UNS',
  'administrative-support': 'ADM',
  'project-based-staffing': 'PRJ',
};

export const allServices = serviceCategories.flatMap((category) =>
  category.items.map((item, index) => ({
    ...item,
    category: category.category,
    categorySlug: category.slug,
    code: `${categoryCodes[category.slug]}-${String(index + 1).padStart(2, '0')}`,
  }))
);

export const whyChooseUs = [
  {
    icon: 'users',
    title: 'Experienced Team',
    description:
      'Our recruitment professionals have extensive experience in various industries, ensuring you receive top talent.',
  },
  {
    icon: 'check',
    title: 'Quality Manpower',
    description:
      'We adhere to strict quality control measures as per current industry requirements like employee hygiene and tobacco checks before entering premises.',
  },
  {
    icon: 'clipboard',
    title: 'Expertise in Statutory Compliance',
    description:
      'We conduct audits to assess compliance with policies and regulations, keeping accurate records of compliance efforts.',
  },
  {
    icon: 'cog6',
    title: 'Customized Solutions',
    description:
      'We offer tailored staffing solutions to match your specific requirements and business objectives.',
  },
  {
    icon: 'clock',
    title: 'Reliability',
    description:
      'Our commitment to reliability and punctuality ensures that your operations run smoothly without interruptions.',
  },
  {
    icon: 'currency',
    title: 'Competitive Pricing',
    description:
      'We offer cost-effective solutions without compromising on quality, providing excellent value for your investment.',
  },
];

export const processSteps = [
  {
    title: 'Needs Assessment',
    description:
      'We conduct a thorough assessment of your manpower needs to understand the specific requirements for each role.',
    icon: 'magnifier',
  },
  {
    title: 'Recruitment & Selection',
    description:
      'We leverage a robust recruitment process to source and vet candidates, ensuring they meet your standards and job requirements.',
    icon: 'users',
  },
  {
    title: 'Deployment',
    description:
      'Our team manages the deployment of personnel to your site, providing continuous support and ensuring smooth integration.',
    icon: 'trending',
  },
  {
    title: 'Monitoring & Support',
    description:
      'We offer ongoing support and monitor performance to address any issues promptly and maintain high standards.',
    icon: 'chart',
  },
  {
    title: 'Feedback & Improvement',
    description:
      'We actively seek feedback to continuously improve our services and adapt to your evolving needs.',
    icon: 'arrowPath',
  },
];

export const interestOptions = [
  'Lab Assistants',
  'Maintenance Technicians',
  'Office Assistants',
  'Project Coordinators',
  'Receptionist',
  'Security',
  'Facility Management',
  'Human Resources',
  'Administration',
  'Customer Service',
  'Operations',
  'Other',
];
