import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { NotificationToast } from './components/common/NotificationToast';

import { HeroSlider } from './components/sections/HeroSlider';
import { CategoryIconsBar } from './components/sections/CategoryIconsBar';
import { BestSellingSection } from './components/sections/BestSellingSection';
import { PromotionalBanners } from './components/sections/PromotionalBanners';
import { TopTierStaplesBanner } from './components/sections/TopTierStaplesBanner';
import { SeasonsHarvest } from './components/sections/SeasonsHarvest';
import { WinterSaleBanner } from './components/sections/WinterSaleBanner';
import { ExploreDailyEssential } from './components/sections/ExploreDailyEssential';
import { GradientPromoCards } from './components/sections/GradientPromoCards';
import { GroceriesDeliverySection } from './components/sections/GroceriesDeliverySection';
import { BestSellerShopsSection } from './components/sections/BestSellerShopsSection';
import { NewLaunchItems } from './components/sections/NewLaunchItems';
import { LatestBlogSection } from './components/sections/LatestBlogSection';

import { ShopPage } from './components/pages/ShopPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrderSuccessPage } from './components/pages/OrderSuccessPage';
import { UserDashboard } from './components/pages/UserDashboard';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { AuthModal } from './components/pages/AuthModal';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { PagesOverviewPage } from './components/pages/PagesOverviewPage';

import { CartDrawer } from './components/common/CartDrawer';
import { WishlistDrawer } from './components/common/WishlistDrawer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { SearchModal } from './components/common/SearchModal';
import { AIAssistantModal } from './components/common/AIAssistantModal';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#fafcfb] text-slate-800 font-sans selection:bg-[#72bf44] selection:text-white">
      <NotificationToast />
      <Header />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSlider />
            <CategoryIconsBar />
            <BestSellingSection />
            <PromotionalBanners />
            <TopTierStaplesBanner />
            <SeasonsHarvest />
            <WinterSaleBanner />
            <ExploreDailyEssential />
            <GradientPromoCards />
            <GroceriesDeliverySection />
            <BestSellerShopsSection />
            <NewLaunchItems />
            <LatestBlogSection />
          </>
        )}

        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product-detail' && <ProductDetailPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'order-success' && <OrderSuccessPage />}
        {currentView === 'user-dashboard' && <UserDashboard />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'pages' && <PagesOverviewPage />}
        {currentView === 'wishlist' && <ShopPage />}
        {currentView === 'store-detail' && <ShopPage />}
        {currentView === 'blog-detail' && <ShopPage />}
      </main>

      <Footer />

      {/* Overlays & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <SearchModal />
      <AIAssistantModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
