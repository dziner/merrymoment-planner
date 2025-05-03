
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="font-serif text-3xl md:text-4xl mb-4 font-light text-merrymoment-darkbrown">
                메리모먼트 베이비 스튜디오
              </h1>
              <p className="text-merrymoment-brown text-lg max-w-2xl mx-auto">
                소중한 순간을 아름답게 담아내는 프리미엄 베이비 포토 스튜디오입니다.
                첫 번째 생일과 100일 기념 사진을 특별하게 남겨보세요.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="aspect-[3/4] bg-merrymoment-beige rounded-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1621478374422-35206faedbd5?q=80&w=1000&auto=format&fit=crop" 
                  alt="아기 사진 예시" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <h2 className="font-serif text-2xl mb-3 text-merrymoment-darkbrown">프리미엄 베이비 포토</h2>
                  <p className="text-merrymoment-brown mb-4">
                    아이의 소중한 순간을 담아내는 전문 포토그래퍼와 함께 추억을 만들어보세요.
                    100일 촬영, 돌잔치 촬영, 그리고 가족 사진까지 모두 가능합니다.
                  </p>
                  <ul className="space-y-2 text-sm text-merrymoment-brown">
                    <li>✓ 전문 포토그래퍼 촬영</li>
                    <li>✓ 고급스러운 스튜디오 세팅</li>
                    <li>✓ 한복 의상 대여 포함</li>
                    <li>✓ 모바일 갤러리 제공</li>
                  </ul>
                </div>
                
                <Link 
                  to="/booking"
                  className="inline-block bg-merrymoment-brown text-white py-3 px-6 rounded text-center hover:bg-merrymoment-darkbrown transition-colors duration-200 font-medium"
                >
                  촬영 예약하기
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="border border-merrymoment-beige rounded-md p-5 text-center">
                <h3 className="font-serif text-xl mb-2 text-merrymoment-darkbrown">100일 촬영</h3>
                <p className="text-merrymoment-brown text-sm">
                  아이의 첫 100일을 기념하는 특별한 촬영으로 소중한 순간을 영원히 간직하세요.
                </p>
              </div>
              <div className="border border-merrymoment-beige rounded-md p-5 text-center">
                <h3 className="font-serif text-xl mb-2 text-merrymoment-darkbrown">돌잔치 촬영</h3>
                <p className="text-merrymoment-brown text-sm">
                  첫 번째 생일을 맞이하는 소중한 날을 아름다운 사진으로 기록해보세요.
                </p>
              </div>
              <div className="border border-merrymoment-beige rounded-md p-5 text-center">
                <h3 className="font-serif text-xl mb-2 text-merrymoment-darkbrown">가족 사진</h3>
                <p className="text-merrymoment-brown text-sm">
                  아이와 함께하는 특별한 가족의 모습을 영원히 간직할 수 있습니다.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                to="/booking"
                className="inline-block bg-merrymoment-brown text-white py-3 px-8 rounded text-center hover:bg-merrymoment-darkbrown transition-colors duration-200 font-medium"
              >
                촬영 예약하기
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
