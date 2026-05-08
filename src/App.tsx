import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Work from './components/sections/Work';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Faq from './components/sections/Faq';
import Clients from './components/sections/Clients';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import ModalPrivacy from './components/ModalPrivacy';
import ModalFreelancer from './components/ModalFreelancer';
import ModalBusiness from './components/ModalBusiness';

export default function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [freelancerOpen, setFreelancerOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);

  return (
    <main>
      <Navbar />
      <div id="hero"><Hero /></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div id="work"><Work /></div>
        <div id="services"><Services /></div>
        <div id="about"><About /></div>
        <div id="faq"><Faq /></div>
        <div id="clients"><Clients /></div>
        <div id="contact">
          <Contact
            onBusinessClick={() => setBusinessOpen(true)}
            onFreelancerClick={() => setFreelancerOpen(true)}
          />
        </div>
      </div>
      <div id="footer"><Footer onPrivacyClick={() => setPrivacyOpen(true)} /></div>
      <ModalPrivacy isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <ModalFreelancer
        isOpen={freelancerOpen}
        onClose={() => setFreelancerOpen(false)}
        onPrivacyClick={() => setPrivacyOpen(true)}
      />
      <ModalBusiness
        isOpen={businessOpen}
        onClose={() => setBusinessOpen(false)}
        onPrivacyClick={() => setPrivacyOpen(true)}
      />
    </main>
  );
}
