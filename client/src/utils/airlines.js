// utils/airlines.js
export const airlines = {
    AA: {
      name: 'American Airlines',
      logo: '/logos/AA.png', // Path relative to the public directory
    },
    DL: {
      name: 'Delta Airlines',
      logo: '/logos/DL.png',
    },
    UA: {
      name: 'United Airlines',
      logo: '/logos/UA.png',
    },
    F9: {
      name: 'Frontier Airlines',
      logo: '/logos/F9.png',
    },
    // Add more airline codes as needed
  };
  
  export const getAirlineInfo = (code) => {
    return airlines[code] || { name: code, logo: '' };
  };
  