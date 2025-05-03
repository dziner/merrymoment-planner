
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center bg-merrymoment-cream py-10">
        <div className="text-center px-4">
          <h1 className="text-4xl font-serif font-medium mb-4 text-merrymoment-darkbrown">404</h1>
          <p className="text-xl text-merrymoment-brown mb-6">페이지를 찾을 수 없습니다</p>
          <Link to="/" className="inline-block bg-merrymoment-brown text-white py-2 px-6 rounded hover:bg-merrymoment-darkbrown transition-colors">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
