
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 px-4 text-center text-merrymoment-brown text-sm">
      <div className="max-w-md mx-auto">
        <p className="mb-3">
          © 2025 merry.moment Studio. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs">
          <a 
            href="https://www.instagram.com/merrymoment.studio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-merrymoment-darkbrown transition-colors"
          >
            인스타그램 @merrymoment.studio
          </a>
          <span className="hidden md:inline">|</span>
          <span>연락처: 02-455-8303</span>
          <span className="hidden md:inline">|</span>
          <span>카카오톡 상담: 사용자 검색 themerry</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
