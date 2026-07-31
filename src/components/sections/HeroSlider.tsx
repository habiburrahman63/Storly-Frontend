import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    badge: 'Exclusive offer 25% OFF',
    title: 'Shop the Smart Way Anytime, Anywhere',
    subtitle: 'Discover your favorite organic brands, latest fresh harvests, and exclusive discounts in one place.',
    discountBadge: 'UP TO 25% OFF',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80',
    cta: 'Shop Now',
  },
  {
    badge: '100% Certified Organic',
    title: 'Farm Fresh Goodness Delivered in 30 Mins',
    subtitle: 'Harvested directly from certified local sustainable farms and delivered straight to your kitchen doorstep.',
    discountBadge: 'FRESH 30 MINS',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80',
    cta: 'Explore Produce',
  },
];

export const HeroSlider: React.FC = () => {
  const { navigate } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 my-6">
      <div className="relative overflow-hidden bg-[#034848] rounded-3xl min-h-[420px] sm:min-h-[480px] flex items-center shadow-xl">
        {/* Background Subtle Wave Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#72bf44_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center w-full p-8 sm:p-12 gap-8">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5 text-white">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#72bf44] text-white text-xs font-bold rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              {slide.badge}
            </span>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight sm:leading-none">
              {slide.title}
            </h1>

            <p className="text-slate-200 text-sm sm:text-base font-medium max-w-xl leading-relaxed opacity-90">
              {slide.subtitle}
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigate('shop')}
                className="px-8 py-3.5 bg-[#72bf44] hover:bg-[#5da835] active:scale-98 text-white font-extrabold text-sm rounded-2xl flex items-center gap-3 shadow-lg transition-all group cursor-pointer"
              >
                <span>{slide.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Hero Image & Badge */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Circular Discount Tag */}
            <div className="absolute -top-4 right-4 z-20 w-24 h-24 bg-rose-600 text-white rounded-full flex flex-col items-center justify-center font-black text-center p-2 shadow-2xl rotate-12 border-4 border-white animate-bounce">
              <span className="text-[10px] uppercase font-bold tracking-widest leading-none">SAVE</span>
              <span className="text-base leading-tight">25%</span>
              <span className="text-[9px] font-bold">OFF</span>
            </div>

            {/* Hero Main Image Frame */}
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80';
                }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Carousel Slider Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-[#034848] rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md z-20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-[#034848] rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md z-20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentSlide ? 'w-8 bg-[#72bf44]' : 'w-2.5 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
