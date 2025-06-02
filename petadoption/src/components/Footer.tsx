

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 p-4 text-center mt-8 shadow-inner">
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Pet Adoption. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;