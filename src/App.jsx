import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { CacheProvider } from './context/CacheContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { LoyaltyProvider } from './context/LoyaltyContext';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './components/accessibility/AccessibilityProvider';
import MobileBottomNav from './components/layout/MobileBottomNav';
import PageTransition from './components/ui/PageTransition';
import LiveChat from './components/chat/LiveChat';
import { PWAInstallButton } from './utils/pwa.jsx';
import EnhancedCheckout from './components/checkout/EnhancedCheckout';
import AIRecommendations from './components/ai/AIRecommendations';
import LiveOrderTracking from './components/realtime/LiveOrderTracking';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import CategoryPage from './pages/CategoryPage';
import Account from './pages/Account';
import Orders from './pages/Orders';
import Prime from './pages/Prime';
import About from './pages/About';
import Blog from './pages/Blog';
import Investor from './pages/Investor';
import Devices from './pages/Devices';
import Sell from './pages/Sell';
import Services from './pages/Services';
import Advertising from './pages/Advertising';
import Host from './pages/Host';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Help from './pages/Help';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Admin from './pages/Admin';
import Wishlist from './pages/Wishlist';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import SignIn from './pages/SignIn';
import ReturnsOrders from './pages/ReturnsOrders';
import YourPrime from './pages/YourPrime';
import YourLists from './pages/YourLists';
import CreateList from './pages/CreateList';
import FindGift from './pages/FindGift';
import BrowsingHistory from './pages/BrowsingHistory';
import GiftCards from './pages/GiftCards';
import DisabilitySupport from './pages/DisabilitySupport';

function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <ThemeProvider>
          <CacheProvider>
            <RecentlyViewedProvider>
              <WishlistProvider>
                <OrderProvider>
                  <NotificationProvider>
                    <LoyaltyProvider>
                <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black">
        <Header />
        <main className="flex-grow">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/account" element={<Account />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/prime" element={<Prime />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/investor" element={<Investor />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/services" element={<Services />} />
              <Route path="/advertising" element={<Advertising />} />
              <Route path="/host" element={<Host />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/help" element={<Help />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/checkout" element={<EnhancedCheckout />} />
              <Route path="/recommendations" element={<AIRecommendations />} />
              <Route path="/track-order/:orderId" element={<LiveOrderTracking />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/returns-orders" element={<ReturnsOrders />} />
              <Route path="/your-prime" element={<YourPrime />} />
              <Route path="/lists" element={<YourLists />} />
              <Route path="/create-list" element={<CreateList />} />
              <Route path="/find-gift" element={<FindGift />} />
              <Route path="/browsing-history" element={<BrowsingHistory />} />
              <Route path="/gift-cards" element={<GiftCards />} />
              <Route path="/disability-support" element={<DisabilitySupport />} />
            </Routes>
          </PageTransition>
        </main>
      <Footer />
      <ToastContainer 
        position="bottom-right" 
        toastClassName="glass"
        bodyClassName="text-white"
      />
                  <MobileBottomNav />
                  <LiveChat />
                  <PWAInstallButton />
                </div>
                    </LoyaltyProvider>
                  </NotificationProvider>
                </OrderProvider>
              </WishlistProvider>
            </RecentlyViewedProvider>
          </CacheProvider>
        </ThemeProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;
