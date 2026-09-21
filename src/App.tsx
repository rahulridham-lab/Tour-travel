import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ItineraryModal } from './components/ItineraryModal';
import { HomePage } from './pages/HomePage';
import { ToursPage } from './pages/ToursPage';
import { CustomPlannerPage } from './pages/CustomPlannerPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { CircuitDetailPage } from './pages/CircuitDetailPage';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { MobileBottomNav } from './components/MobileBottomNav';
import { siteConfig, CurrencyConfig } from './data/siteConfig';
import { Circuit, circuitsData } from './data/circuits';
import { MessageSquare } from 'lucide-react';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyConfig>(
    siteConfig.currencies[0] // default EUR
  );
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCircuitForModal, setSelectedCircuitForModal] = useState<Circuit | null>(null);
  const [selectedCircuitForDetail, setSelectedCircuitForDetail] = useState<Circuit | null>(null);
  const [targetCircuitForBooking, setTargetCircuitForBooking] = useState<string | undefined>(undefined);

  // Hash-based routing synchronization
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) return;
      // Check circuit detail direct deep links
      if (hash.startsWith('circuit/') || hash.startsWith('circuit-detail/')) {
        const id = hash.replace('circuit/', '').replace('circuit-detail/', '');
        const match = circuitsData.find((c) => c.id === id);
        if (match) {
          setSelectedCircuitForDetail(match);
          setCurrentPage('circuit-detail');
          return;
        }
      }

      // Check known pages
      if (['home', 'tours', 'custom-planner', 'about', 'contact', 'privacy', 'terms'].includes(hash)) {
        setCurrentPage(hash);
      } else if (hash === 'circuits') {
        setCurrentPage('tours');
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (circuitId?: string) => {
    if (circuitId) {
      setTargetCircuitForBooking(circuitId);
    }
    // If not on home page, switch to home or planner
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.location.hash = 'home';
      setTimeout(() => {
        const bookingSection = document.getElementById('booking-section');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const bookingSection = document.getElementById('booking-section');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectCircuit = (circuit: Circuit) => {
    setSelectedCircuitForModal(circuit);
  };

  const handleOpenCircuitDetail = (circuit: Circuit) => {
    setSelectedCircuitForDetail(circuit);
    setCurrentPage('circuit-detail');
    window.location.hash = `circuit/${circuit.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0D9488] selection:text-white relative font-sans pb-16 md:pb-0">
        {/* 1. Header Navigation with Sleek Top Bar */}
        <Navbar
          currentCurrency={currentCurrency}
          currentPage={currentPage}
          onSelectCurrency={setCurrentCurrency}
          onNavigate={navigateTo}
          onOpenBooking={(circuitId) => handleOpenBooking(circuitId)}
          onSelectCircuit={handleOpenCircuitDetail}
        />

        {/* 2. Main Page Render */}
        <main className="pt-8 sm:pt-10">
          {currentPage === 'home' && (
            <HomePage
              currentCurrency={currentCurrency}
              onSelectCircuit={handleOpenCircuitDetail}
              onBookCircuit={handleOpenBooking}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'tours' && (
            <ToursPage
              currentCurrency={currentCurrency}
              onSelectCircuit={handleOpenCircuitDetail}
              onBookCircuit={handleOpenBooking}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'circuit-detail' && selectedCircuitForDetail && (
            <CircuitDetailPage
              circuit={selectedCircuitForDetail}
              currentCurrency={currentCurrency}
              onBack={() => navigateTo('tours')}
              onSelectCircuit={handleOpenCircuitDetail}
              onBookCircuit={handleOpenBooking}
            />
          )}

          {currentPage === 'custom-planner' && (
            <CustomPlannerPage
              currentCurrency={currentCurrency}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'about' && (
            <AboutPage onNavigate={navigateTo} />
          )}

          {currentPage === 'contact' && (
            <ContactPage onNavigate={navigateTo} />
          )}

          {currentPage === 'privacy' && (
            <PrivacyPolicy onNavigate={navigateTo} />
          )}

          {currentPage === 'terms' && (
            <TermsOfService onNavigate={navigateTo} />
          )}
        </main>

        {/* 3. Luxury High-Info Footer */}
        <Footer
          onNavigate={navigateTo}
          onSelectCircuit={handleOpenCircuitDetail}
        />

        {/* 4. Interactive Itinerary Modal (Day-by-Day Timeline View) */}
        <ItineraryModal
          circuit={selectedCircuitForModal}
          currentCurrency={currentCurrency}
          onClose={() => setSelectedCircuitForModal(null)}
          onBookNow={(circuitId) => handleOpenBooking(circuitId)}
          onViewFullPage={handleOpenCircuitDetail}
        />

        {/* 5. Floating Interactive WhatsApp Concierge */}
        <WhatsAppWidget onOpenBooking={(circuitId) => handleOpenBooking(circuitId)} />

        {/* 6. Native Mobile Application Bottom Navigation Bar */}
        <MobileBottomNav
          currentPage={currentPage}
          onNavigate={navigateTo}
          onOpenBooking={() => handleOpenBooking()}
        />
      </div>
    </LanguageProvider>
  );
}
