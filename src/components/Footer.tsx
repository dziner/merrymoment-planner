
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 px-4 text-center text-merrymoment-brown text-sm">
      <div className="max-w-md mx-auto">
        <p className="mb-3">
          © 2025 MerryMoment Studio. 모든 권리 보유.
        </p>
        <div className="flex justify-center items-center space-x-4 text-xs">
          <span>인스타그램 @merrymoment.studio</span>
          <span>|</span>
          <span>연락처: 010-1234-5678</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
