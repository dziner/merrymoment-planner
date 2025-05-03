
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 flex justify-center items-center">
      <Link to="/" className="inline-block">
        <h1 className="text-2xl md:text-3xl text-merrymoment-darkbrown font-brandon font-light tracking-wide">
          MerryMoment
        </h1>
      </Link>
    </header>
  );
};

export default Header;
