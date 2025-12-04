import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, Home, BookOpen, Info, Phone, MapPin, Mail, Music, VolumeX, Image as ImageIcon, Menu, X } from 'lucide-react';
import { useToast } from './Toast';

import audio from "./audioPlayer";
const API_BASE = "https://ganeshmandir.onrender.com"; // change to Railway URL after deploy
console.log("API Base:", API_BASE);

  
export default function GaneshAkharaWebsite() {
  const [activeSection, setActiveSection] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return hash || 'home'; // If no hash, default to 'home'
  });
  const { showToast, ToastContainer } = useToast();
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
    guests: 1,
    rooms: 1
  });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inquiry, setInquiry] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isInquiryLoading, setIsInquiryLoading] = useState(false);



  let isPlayingRequestInProgress = false;
  let audioActionLocked = false;
  // Set active section based on URL hash on page load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setActiveSection(hash);
    } else {
      // If no hash, default to home
      setActiveSection('home');
    }
  }, []);
  // Sync browser back/forward with activeSection
  useEffect(() => {
    const handleHashChange = () => {
      const newSection = window.location.hash.replace("#", "");
      if (newSection) {
        setActiveSection(newSection);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    // Cleanup
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);



  // Scroll to the active section on state change
  useEffect(() => {
    const element = document.getElementById(activeSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSection]);

  // Handler for music play/pause
  const toggleMusic = async () => {
    try {
      if (!isMusicPlaying) {
        await audio.play();
        setIsMusicPlaying(true);
      } else {
        audio.pause();
        setIsMusicPlaying(false);
      }
      setShowMusicPrompt(false);
    } catch (err) {
      console.log("Audio error:", err);
    }
  };




  const handleBookingSubmit = async () => {
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone || !bookingForm.checkIn || !bookingForm.checkOut || !bookingForm.roomType) {
      showToast('Please fill in all required fields',"error");
      return;
    }
     setIsBookingLoading(true); 
    try {
      const res = await fetch(`${API_BASE}/api/bookings/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingForm),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Booking API Response:", data);
        setIsBookingLoading(false);
        showToast(data.error || "Something went wrong.","error");

        return;
      }
      setIsBookingLoading(false);
      showToast("🙏 Booking request submitted! You will receive a confirmation email soon.");

      setBookingForm({
        name: "",
        phone: "",
        email: "",
        checkIn: "",
        checkOut: "",
        roomType: "",
        guests: 1,
        rooms: 1
      });

    } catch (error) {
      console.log(error);
      setIsBookingLoading(false);
      showToast("Server error. Please try again later.","error");
    }
  };
  const handleInquirySubmit = async () => {
    if (!inquiry.name || !inquiry.email || !inquiry.message) {
      showToast("Please fill all fields","error");
      return;
    }
    setIsInquiryLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/inquiries/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry)
      });

      const data = await res.json();

      if (!res.ok) {
         setIsInquiryLoading(false); 
        showToast(data.error || "Failed to send inquiry.","error");
        return;
      }
       setIsInquiryLoading(false); 
      showToast("🙏 Inquiry sent! You will receive an acknowledgement email shortly.");

      setInquiry({ name: "", email: "", message: "" });

    } catch (err) {
      console.log(err);
       setIsInquiryLoading(false); 
      showToast("Server error. Please try again later.","error");
    }
  };

  const [donationError, setDonationError] = useState("");
 const [showQR, setShowQR] = useState(false);

  // const handleDonation = () => {
  //   if (!donationAmount || donationAmount <= 0) {
  //     setDonationError("Please enter a valid donation amount");
  //     return;
  //   }

  //   setDonationError("")

  //   // Replace with your actual UPI ID
  //   const upiId = 'ganeshakhragauripur@sbi'; // Change this to your actual UPI ID
  //   const name = 'Ganesh Akhara Gauripur';
  //   const amount = donationAmount;

  //   // Create UPI payment URL
  //   const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Donation to Ganesh Akhara')}`;

  //   // Open UPI app
  //   window.location.href = upiUrl;

  //   // Show thank you message

  // };
  
  const handleDonation = () => {
  if (!donationAmount || donationAmount <= 0) {
    setDonationError("Please enter a valid donation amount");
    return;
  }

  setDonationError("");

  // Just open the QR modal
  setShowQR(true);
};

  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);


  const [previewImage, setPreviewImage] = useState(null);

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: BookOpen, label: 'About' },
    { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
    { id: 'timings', icon: Clock, label: 'Timings' },
    { id: 'booking', icon: Calendar, label: 'Stay' },
    { id: 'donation', icon: Info, label: 'Donate' },
    { id: 'contact', icon: Phone, label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 font-sans">
        <ToastContainer />


      {activeSection === "home" && showMusicPrompt && (
        <div className="fixed top-0 left-0 w-full bg-red-800 text-white text-center p-3 z-50 shadow-2xl">
          <p className="inline-block mr-4">Would you like to play Lord Ganesha's devotional music? 🎶</p>
          <button
            onClick={() => { toggleMusic(); }}
            className="bg-yellow-400 text-red-800 font-bold py-1 px-4 rounded-full hover:bg-yellow-300 transition"
          >
            Yes, Play
          </button>
          <button
            onClick={() => setShowMusicPrompt(false)}
            className="ml-4 text-white underline hover:no-underline transition"
          >
            No Thanks
          </button>
        </div>
      )}


      {/* 1c. Floating Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-20 right-6 bottom-20 sm:bottom-6 p-4 rounded-full bg-red-700 text-white shadow-2xl hover:bg-red-800 transition z-50 transform hover:scale-110"
        aria-label={isMusicPlaying ? "Pause Music" : "Play Music"}
      >
        {isMusicPlaying ? <VolumeX className="w-6 h-6 animate-pulse" /> : <Music className="w-6 h-6" />}
      </button>

      {/* 2. Header (Sticky & Catchy) */}
      <header className="bg-gradient-to-r from-red-700 via-orange-600 to-red-700 text-white shadow-2xl sticky top-0 z-40 border-b-4 border-yellow-400">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl animate-bounce-slow">🕉️</div> {/* Subtle animation */}
              <div>
                <h1 className="text-3xl font-extrabold tracking-wider">Ganesh Akhara</h1>
                <p className="text-sm text-yellow-300 font-semibold"> Gauripur ॥ ESTD 1901</p>
              </div>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`} // Use anchor link for smooth scrolling
                  onClick={() => {
                    setActiveSection(item.id);
                    window.location.hash = item.id;
                  }}

                  className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105 ${activeSection === item.id ? 'bg-red-600 text-yellow-300 font-bold shadow-inner' : 'font-medium'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="capitalize">{item.label}</span>
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-red-600 transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation (Fixed Bottom) */}
      {/* Mobile Navigation Menu (Slide-in from right) */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Menu Panel */}
          <div className="md:hidden fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-red-700 to-red-800 text-white shadow-2xl z-50 transform transition-transform duration-300">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-red-600 transition"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col px-4 space-y-2">
              {menuItems.map((item) => (

                <a key={item.id}
                  href={`#${item.id}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    window.location.hash = item.id;
                    setIsMobileMenuOpen(false);
                  }}

                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 transition duration-300 ${activeSection === item.id ? 'bg-red-600 text-yellow-300 font-bold' : 'font-medium'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="capitalize">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* Main Content Sections */}
      <main className="pb-20 md:pb-0">

        {/* Home Section */}
        <section id="home" className="pt-0">
          {activeSection === 'home' && (
            <div className="relative">
              {/* Hero Section - Image Background for Catchiness */}
              {/* HERO SECTION */}
              {/* Hero Section */}
              <div className="relative bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white py-20 md:py-32 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-10">
                  <div className="text-9xl animate-pulse mt-6">🕉️</div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                  <div className="flex flex-col items-center">

                    {/* Lotus Petals with Ganesha Image */}
                    <div className="relative flex items-center justify-center w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80 mb-8 md:mb-12">

                      {/* Lotus Petals Background */}
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 200 200"
                        style={{ filter: 'drop-shadow(0 10px 30px rgba(251, 146, 60, 0.5))' }}
                      >
                        {/* Outer Petals Layer */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                          <ellipse
                            key={`outer-${i}`}
                            cx="100"
                            cy="100"
                            rx="45"
                            ry="20"
                            fill="#fb923c"
                            opacity="0.6"
                            transform={`rotate(${angle} 100 100)`}
                          />
                        ))}

                        {/* Middle Petals Layer */}
                        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
                          <ellipse
                            key={`middle-${i}`}
                            cx="100"
                            cy="100"
                            rx="40"
                            ry="18"
                            fill="#fdba74"
                            opacity="0.7"
                            transform={`rotate(${angle} 100 100)`}
                          />
                        ))}

                        {/* Inner Petals Layer */}
                        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                          <ellipse
                            key={`inner-${i}`}
                            cx="100"
                            cy="100"
                            rx="35"
                            ry="16"
                            fill="#fed7aa"
                            opacity="0.8"
                            transform={`rotate(${angle} 100 100)`}
                          />
                        ))}
                      </svg>

                      {/* Glow Layers */}
                      <div className="absolute inset-0 rounded-full bg-orange-400 opacity-20 scale-110 animate-pulse"></div>
                      <div className="absolute inset-0 rounded-full bg-orange-300 opacity-15 scale-125 animate-pulse" style={{ animationDelay: '0.5s' }}></div>

                      {/* Ganesha Image Placeholder - Replace with actual image */}
                      <div className="relative rounded-full w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-white border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                        {/* Uncomment below and replace with your actual image */}
                        <img
                          src="/ganeshji.png"
                          alt="Lord Ganesha"
                          className="w-full h-full object-cover object-fit"
                        />
                      </div>
                    </div>

                    {/* Text Content */}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-300 text-center drop-shadow-lg mb-3">
                      Divine Darshan Awaits
                    </h2>

                    <p className="text-xl sm:text-2xl md:text-3xl italic text-yellow-100 mb-4 text-center">
                      Vighnaharta, The Remover of Obstacles
                    </p>

                    <p className="text-lg md:text-xl text-orange-100 mb-8 text-center max-w-2xl">
                      ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥<br />
                      ॥ निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <button
                        onClick={() => setActiveSection('booking')}
                        className="bg-yellow-400 text-red-700 px-8 py-3 sm:px-10 rounded-full font-bold hover:bg-yellow-300 shadow-xl transition-all transform hover:scale-105"
                      >
                        Book Your Stay Now
                      </button>

                      <button
                        onClick={() => setActiveSection('timings')}
                        className="bg-red-800 text-white px-8 py-3 sm:px-10 rounded-full font-bold border-2 border-yellow-400 hover:bg-red-900 shadow-xl transition-all transform hover:scale-105"
                      >
                        Aarti & Timings
                      </button>
                    </div>
                  </div>
                </div>
              </div>



              {/* Features - Visually engaging cards */}
              <div className="container mx-auto px-4 py-22 mt-10 mb-20">
                <h3 className="text-4xl font-extrabold text-center text-orange-700 mb-20 mt-20">Experience Divine Bliss</h3>
                <div className="grid md:grid-cols-3 gap-8 mb-10 ">
                  {/* Card 1 */}
                  <div className="bg-white rounded-xl shadow-2xl p-8 text-center hover:shadow-red-300 transition border-b-8 border-red-500 transform hover:-translate-y-2">
                    <div className="text-6xl mb-4 text-red-500">🛕</div>
                    <h4 className="text-2xl font-bold text-red-600 mb-2">Sacred Temple</h4>
                    <p className="text-gray-600">A peaceful sanctuary for devotion and meditation. Daily rituals and pujas.</p>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-white rounded-xl shadow-2xl p-8 text-center hover:shadow-orange-300 transition border-b-8 border-orange-500 transform hover:-translate-y-2">
                    <div className="text-6xl mb-4 text-orange-500">🏨</div>
                    <h4 className="text-2xl font-bold text-orange-600 mb-2">Pilgrim Accommodation</h4>
                    <p className="text-gray-600">Clean, serene, and affordable lodging for all devotees and families.</p>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-white rounded-xl shadow-2xl p-8 text-center hover:shadow-yellow-300 transition border-b-8 border-yellow-500 transform hover:-translate-y-2">
                    <div className="text-6xl mb-4 text-yellow-500">🪔</div>
                    <h4 className="text-2xl font-bold text-yellow-700 mb-2">Community Seva</h4>
                    <p className="text-gray-600">Participate in volunteer activities and contribute to the community .</p>
                  </div>
                </div>
              </div>


              {/* Quote Section - More Prominent */}
              <div className="bg-gradient-to-r from-red-100 to-orange-100 py-16 border-t-2 border-b-2 border-orange-300 mt-5">

                <div className="container mx-auto py-5 mb-5 px-4 text-center">
                  <blockquote className="mt-6 text-red-800 font-semibold text-xl leading-relaxed animate-fadeInSlow">
                    🪔 ॥ ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि । तन्नो दन्ती प्रचोदयात् ॥ 🪔
                  </blockquote>

                </div>
                {/* Divine Ganesha Section */}
                <div className="relative pt-8 pb-12 bg-gradient-to-b from-orange-50 to-yellow-50 text-center mb-1">


                  {/* Ganesha Image */}
                  <img
                    src="/ganesha1.png"
                    alt="Lord Ganesha"
                    className=" sm:w-52 md:w-64 mx-auto drop-shadow-2xl animate-fadeIn w-22 h-70"
                  />

                  {/* Slokas */}
                  <div className="mt-6 text-red-800 font-semibold text-xl leading-relaxed animate-fadeInSlow">
                    <p>॥ गणपति बाप्पा मोरया ॥</p>
                    <p>॥ मंगल मूर्ति मोरया ॥</p>
                    <p className="mt-3 text-lg text-gray-700">
                      “May Lord Ganesha bless you with wisdom, prosperity and strength.”
                    </p>
                  </div>

                  {/* Diyas placed ABOVE the footer */}
                  <div className="absolute -bottom-6 w-full flex justify-around px-10">
                    <img src="/diya.jpg" className="w-10 h-10 rounded-full object-cover animate-float" />
                    <img src="/diya.jpg" className="w-12 h-12 rounded-full object-cover animate-float delay-300" />
                    <img src="/diya.jpg" className="w-10 h-10 rounded-full object-cover animate-float delay-500" />
                  </div>

                </div>
              </div>

            </div>
          )}
        </section>

        {/* About Section */}
        {activeSection === 'about' && (
          <section id="about" className="py-8 md:py-12">
            <div className="container mx-auto px-3 md:px-4">
              <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-5 sm:p-8 md:p-12 border-t-8 border-red-700">
                <div className="text-center mb-6 md:mb-10">
                  {/* Ganesha Symbol */}
                  <img
                    src="/ganeshapic.png"
                    alt="Ganesha Symbol"
                    className="w-16 h-24 sm:w-20 sm:h-32 md:w-22 md:h-35 mx-auto mb-3 md:mb-4 opacity-90"
                  />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-700 mb-2">Our Divine Sanctuary</h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-500">The Legend and Significance of Ganesh Akhara</p>
                </div>

                <div className="space-y-5 md:space-y-8 text-base md:text-lg text-gray-700">
                  <div className="p-3 sm:p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500 transition hover:shadow-md">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600 mb-2">The Remover of Obstacles 🐘</h3>
                    <p className="leading-relaxed text-sm sm:text-base md:text-lg">
                      Lord Ganesha, the embodiment of wisdom and intellect, is worshipped before any undertaking. Our temple, <strong>Ganesh Akhara Gauripur</strong>, is a divine center where devotees seek his blessings for a life free of impediments.
                      His iconography teaches profound spiritual lessons: the <strong>large head</strong> for thinking big, <strong>large ears</strong> for listening carefully, a <strong>small mouth</strong> for speaking less, and the <strong>single tusk</strong> to retain good and discard bad.
                    </p>
                  </div>

                  <div className="p-3 sm:p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500 transition hover:shadow-md">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-700 mb-2">About Mandir</h3>
                    <p className="leading-relaxed text-sm sm:text-base md:text-lg">
                      Ganesh Akhara in Gauripur is a popular Ganesh temple in the Dhubri district, known for its energy and being a significant site for religious activities, especially during Ganesh Chaturthi. It is a place where devotees gather for prayers and celebrations, and it also serves as a venue for weddings and other events. The temple is noted for its peaceful atmosphere, particularly during evening aartis. It also has wheelchair-accessible features, making it more accessible to the public.
                      <br /><br />
                      <strong>Religious significance:</strong> The temple is a central spot for devotion to Lord Ganesha, with many pilgrims visiting daily. It becomes especially vibrant during Ganesh Chaturthi, when large crowds gather to celebrate.
                      <br /><br />
                      <strong>Atmosphere:</strong> It is described as a place with a divine and energetic atmosphere, with the evening aarti creating a peaceful and calming environment.
                      <br /><br />
                      <strong>Functionality:</strong> Beyond its religious use, it is also equipped with amenities for hosting events like grand weddings.
                      <br /><br />
                      <strong>Accessibility:</strong> The temple provides a wheelchair-accessible entrance and parking lot.
                    </p>
                  </div>
                </div>
                <div className="text-center mt-8">
                    <button
                      onClick={() => setShowCertificate(true)}
                      className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition"
                    >
                      View Registration Certificate
                    </button>
                  </div>

              </div>
            </div>
          </section>
        )}

        {showCertificate && (
  <div
    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999]"
    onClick={() => setShowCertificate(false)}
  >
    <div
      className="bg-white rounded-xl p-6 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold text-center text-red-700 mb-4">
        Registration Certificate
      </h2>

      {/* Certificate Image */}
      <img
        src="/certificate.jpg"     // <-- replace with your actual image
        alt="Registration Certificate"
        className="rounded-xl shadow-lg w-full"
      />

      {/* Close Button */}
      <button
        onClick={() => setShowCertificate(false)}
        className="mt-6 w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
      >
        Close
      </button>
    </div>
  </div>
)}

        {/* Timings Section */}
        {activeSection === 'timings' && (
          <section id="timings" className="py-12">

            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12 border-t-8 border-orange-700">
                <div className="text-center mb-10">
                  <Calendar className="w-12 h-12 mx-auto text-orange-600 mb-4" />
                  <h2 className="text-4xl font-extrabold text-orange-700 mb-2">Daily Darshan & Aarti Timings</h2>
                  <p className="text-gray-600">Plan your visit for a spiritually enriching experience</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  {/* Morning Timings */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-4 border-yellow-300 shadow-lg hover:shadow-xl transition">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4">🌅</div>
                      <h3 className="text-2xl font-bold text-orange-600">Morning Rituals</h3>
                    </div>
                    <div className="space-y-3 text-lg">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-gray-700 font-semibold">Temple Opens:</span>
                        <span className="text-orange-700 font-extrabold">6:00 AM</span>
                      </div>
                        <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-gray-700 font-semibold">Morning Aarti:</span>
                        <span className="text-orange-600 font-extrabold">7:00 AM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Darshan Ends:</span>
                        <span className="text-orange-700 font-extrabold">1:00 PM</span>
                      </div>
                    </div>
                  </div>

                  {/* Evening Timings */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-4 border-red-300 shadow-lg hover:shadow-xl transition">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4">🌆</div>
                      <h3 className="text-2xl font-bold text-red-600">Evening Rituals</h3>
                    </div>
                    <div className="space-y-3 text-lg">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-gray-700 font-semibold">Temple Re-opens:</span>
                        <span className="text-red-700 font-extrabold">4:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-gray-700 font-semibold">Sandhya Aarti:</span>
                        <span className="text-orange-600 font-extrabold">5:30 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Temple Closes:</span>
                        <span className="text-red-700 font-extrabold">8:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                  <h3 className="text-xl font-bold text-yellow-700 mb-3">Special Occasions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span><strong>Ganesh Chaturthi:</strong> Extended hours with special pujas and celebrations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span><strong>*Timings are subject to occasions and seasons.*</strong></span>
                    </li>

                  </ul>
                </div>

                <div className="mt-6 text-center text-gray-600">
                  <p className="italic">All devotees are welcome. Please maintain sanctity and silence in the temple premises.</p>
                </div>
              </div>
            </div>

          </section>
        )}
        {/* Gallery Section */}
        {activeSection === 'gallery' && (
          <section id="gallery" className="py-12 sm:py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
            <div className="container mx-auto px-4">

              <div className="text-center mb-10 md:mb-14">
                <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-red-600 mb-3" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-700 mb-2">Temple Gallery</h2>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
                  Moments of devotion, culture, and divinity captured at Ganesh Akhara
                </p>
              </div>

              {/* Masonry-style Gallery Grid */}
              <div className="max-w-5xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {[
                  { src: "/ganeshji.png", title: "Lord Ganesha", height: "h-60 sm:h-65" },
                  { src: "/ganeshji1.jpg", title: "Ganesh Puja", height: "h-60 sm:h-56" },
                  { src: "/ganeshji2.png", title: "Night View", height: "h-60 sm:h-64" },
                ].map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setPreviewImage(item.src)}
                    className="
              group
              relative
              cursor-pointer 
              overflow-hidden 
              rounded-2xl 
              shadow-lg 
              border-2 border-orange-200/50
              bg-white
              break-inside-avoid
              mb-4
              transition-all
              duration-500
              hover:shadow-2xl
              hover:border-orange-400
              hover:-translate-y-1
            "
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className={`w-full ${item.height} object-cover transition-transform duration-700 group-hover:scale-110`}
                    />

                    {/* Gradient Overlay */}
                    <div className="
              absolute inset-0 
              bg-gradient-to-t from-red-900/80 via-orange-900/20 to-transparent 
              opacity-0 
              group-hover:opacity-100 
              transition-opacity duration-500
            "/>

                    {/* Title on hover */}
                    <div className="
              absolute bottom-0 left-0 right-0 
              p-4 
              translate-y-full 
              group-hover:translate-y-0 
              transition-transform duration-500
            ">
                      <h3 className="text-white font-bold text-lg drop-shadow-lg">{item.title}</h3>
                      <p className="text-orange-200 text-sm">Click to view</p>
                    </div>

                    {/* Corner accent */}
                    <div className="
              absolute top-3 right-3 
              w-8 h-8 
              rounded-full 
              bg-orange-500/80 
              flex items-center justify-center
              opacity-0 
              group-hover:opacity-100 
              scale-0 
              group-hover:scale-100
              transition-all duration-300 delay-100
            ">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative elements */}
              <div className="text-center mt-10">
                <div className="inline-flex items-center gap-2 text-orange-600/70 text-sm">
                  <span className="w-8 h-px bg-orange-300"></span>
                  <span>🙏 Jai Shree Ganesh 🙏</span>
                  <span className="w-8 h-px bg-orange-300"></span>
                </div>
              </div>
            </div>
          </section>
        )}


        {/* Booking Section - More prominent pricing and form layout */}
        {activeSection === 'booking' && (
          <section id="booking" className="py-12">

            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12 border-t-8 border-yellow-700">
                <div className="text-center mb-10">
                  <Home className="w-12 h-12 mx-auto text-yellow-600 mb-4" />
                  <h2 className="text-4xl font-extrabold text-yellow-700 mb-2">| आपका स्वागत है |</h2>
                  <p className="text-xl text-gray-600">Simple and clean accommodation for pilgrims</p>
                </div>

                {/* Room Pricing Cards */}
                <div className="grid lg:grid-cols-3 gap-8 mb-10">
                  {/* Card 1 */}

                  {/* Card 2 */}
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-4 border-red-300 shadow-lg text-center transform hover:scale-[1.02] transition">
                    <h3 className="text-2xl font-bold text-red-700 mb-3">Deluxe Room</h3>
                    <p className="text-4xl font-extrabold text-red-900 mb-3">₹1500<span className="text-lg font-medium text-gray-500">/night</span></p>
                    <ul className="space-y-2 text-gray-700 text-sm text-left">
                      <li className="flex items-center gap-2">✅ AC Facility</li>
                      <li className="flex items-center gap-2">✅ Attached BathRoom</li>
                      <li className="flex items-center gap-2">✅ WiFi</li>
                      <li className="flex items-center gap-2">👥 2 Persons</li>
                    </ul>

                  </div>
                  {/* Card 3 */}
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-4 border-yellow-300 shadow-lg text-center transform hover:scale-[1.02] transition">
                    <h3 className="text-2xl font-bold text-yellow-700 mb-3">Bhawan</h3>
                    <p className="text-4xl font-extrabold text-yellow-900 mb-3">₹33000<span className="text-lg font-medium text-gray-500">/Day</span></p>
                    <ul className="space-y-2 text-gray-700 text-sm text-left">
                      <li className="flex items-center gap-2">✅ Spacious</li>
                      <li className="flex items-center gap-2">✅ Attached BathRoom</li>
                    </ul>

                  </div>
                </div>
                <div className="text-center mb-8">
  <button
    onClick={() => setShowBookingDetails(true)}
    className="px-6 py-3 bg-yellow-500 text-red-800 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition"
  >
    Click here for more details
  </button>
</div>

                {/* Booking Form */}
                <form onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(); }} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Phone Number <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        placeholder="Enter your email"
                        required
                      />
                    </div>


                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Check-in Date <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        value={bookingForm.checkIn}
                        onChange={(e) => setBookingForm({ ...bookingForm, checkIn: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Check-out Date <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        value={bookingForm.checkOut}
                        onChange={(e) => setBookingForm({ ...bookingForm, checkOut: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Booking Type<span className="text-red-500"> *</span></label>
                      <select
                        value={bookingForm.roomType}
                        onChange={(e) => setBookingForm({ ...bookingForm, roomType: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white"
                        required
                      >
                        <option value="">-- Select Room Type --</option>
                        <option value="Room">Deluxe Room (₹1500/night)</option>
                        <option value="Bhawan">Bhawan (₹33000/day)</option>
                      </select>


                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Number of Guests <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={bookingForm.guests}
                        onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Number of Rooms <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={bookingForm.rooms}
                        onChange={(e) => setBookingForm({ ...bookingForm, rooms: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        required
                      />
                    </div>
                  </div>
                  <ToastContainer />
                  <button
                        type="submit"
                        disabled={isBookingLoading}
                        className={`w-full py-4 rounded-xl font-extrabold text-xl text-white 
                            transition shadow-2xl transform hover:scale-[1.01] 
                            ${isBookingLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-red-600 to-orange-700"}
                        `}
                      >
                        {isBookingLoading ? " Sending Booking Inquiry..." : "Send Booking Inquiry "}
                      </button>


                  <p className="text-sm text-gray-600 text-center italic">
                    * This is a request form. Our team will contact you for final confirmation and payment details.
                  </p>
                </form>
              </div>
            </div>

          </section>
        )}
        {/* Donation Section - Add this before the Contact Section */}
        {activeSection === 'donation' && (
          <section id="donation" className="py-12">

            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12 border-t-8 border-orange-700">
                <div className="text-center mb-10">
                  <div className="text-6xl mb-4">🪔</div>
                  <h2 className="text-4xl font-extrabold text-orange-700 mb-2">Support Our Sacred Mission</h2>
                  <p className="text-xl text-gray-600">Your contribution helps maintain the temple and serve devotees</p>
                </div>

                {/* Donation Benefits */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 mb-8 border-l-4 border-yellow-500">
                  <h3 className="text-2xl font-bold text-orange-700 mb-4">Your Donation Helps:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">🙏</span>
                      <span>Daily puja rituals and temple maintenance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">🍽️</span>
                      <span>Free prasad distribution to devotees</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">📚</span>
                      <span>Religious education and cultural programs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">🤝</span>
                      <span>Community service and charitable activities</span>
                    </li>
                  </ul>
                </div>

                {/* Quick Donation Buttons */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Quick Donation</h3>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {[51, 101, 251, 501, 1001].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setDonationAmount(amt.toString())}
                        className="bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-300 rounded-lg py-3 px-2 font-bold text-orange-700 hover:from-orange-200 hover:to-red-200 hover:border-orange-400 transition transform hover:scale-105 shadow-md"
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount Input */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 shadow-inner">
                  <h3 className="text-xl font-bold text-red-700 mb-4 text-center">Enter Custom Amount</h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-red-700">₹</span>
                      <input
                        type="number"
                        min="1"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full pl-6 pr-4 py-4 text-2xl font-bold text-center border-2 border-orange-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-300 outline-none transition"
                      />


                    </div>
                    {donationError && (
                      <p className="text-red-600 text-center font-semibold mt-2">
                        {donationError}
                      </p>
                    )}
                    <button
                      onClick={handleDonation}
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl font-extrabold text-xl hover:from-red-700 hover:to-orange-700 transition shadow-2xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
                    >
                      <span>🙏</span>
                      <span>Donate via UPI</span>
                      <span>🙏</span>
                    </button>

                    <p className="text-sm text-gray-600 text-center italic mt-3">
                      * Secure UPI payment *
                    </p>
                  </div>
                </div>

                {/* Blessing Message */}
                <div className="mt-8 text-center">
                  <p className="text-lg text-orange-700 font-semibold">
                    ॥ गणपति बाप्पा मोरया ॥
                  </p>
                  <p className="text-gray-600 italic mt-2">
                    May Lord Ganesha shower his blessings upon you and your family
                  </p>
                </div>
              </div>
            </div>

          </section>)}
        {/* Contact Section - Clean and organized */}
        {activeSection === 'contact' && (
          <section id="contact" className="py-12">

            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12 border-t-8 border-red-700">
                <div className="text-center mb-10">
                  <MapPin className="w-12 h-12 mx-auto text-red-600 mb-4" />
                  <h2 className="text-4xl font-extrabold text-red-700 mb-2">Connect with Us</h2>
                  <p className="text-xl text-gray-600">We are happy to assist you with any inquiries.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  {/* Contact Details */}

                  <div className="space-y-8">
                            <ContactInfo 
                              icon={MapPin} 
                              title="Our Location" 
                              text="Ganesh Akhara, Gauripur, Assam, India (Pin Code: 783331)" 
                            />

                            <ContactInfo 
                              icon={Phone} 
                              title="Call Us" 
                              text="Main: +91 XXXXX XXXXX | Accommodation: +91 XXXXX XXXXX" 
                            />

                            <ContactInfo 
                              icon={Mail} 
                              title="Email Us" 
                              text="inquiry@ganeshakhara.com | booking@ganeshakhara.com" 
                            />

                            <ContactInfo 
                              icon={Clock} 
                              title="Office Hours" 
                              text="Monday - Sunday | 7:00 AM - 9:00 PM (IST)" 
                            />

                            <ContactInfo
                              icon={Mail}
                              title="Feedback & Suggestions"
                              text={
                                <span>
                                  We welcome your valuabe feedback to help us improve.  
                                  You can write to us at{" "}
                                  <a 
                                    href="mailto:rishabh134we@gmail.com" 
                                    className="text-red-600 font-semibold underline"
                                  >
                                    rishabh134we@gmail.com
                                  </a>{" "}
                                  or{" "}
                                  <a 
                                    href="https://docs.google.com/forms/d/e/1FAIpQLSdxCjPcE10au9HgtHRN7oStUoFfe6pEqrW-Vvs5NIZru9d_Lg/viewform?usp=publish-editor " 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 font-semibold underline"
                                  >
                                    click here
                                  </a>{" "}
                                  to fill out our feedback form.
                                </span>
                              }
                            />
                          </div>


                  {/* Quick Inquiry Form */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 shadow-inner">
                    <h3 className="text-2xl font-bold text-orange-700 mb-4">Quick Message</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={inquiry.name}
                        onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                        className="w-full px-4 py-3 border border-orange-300 rounded-lg"
                      />

                      <input
                        type="email"
                        placeholder="Your Email"
                        value={inquiry.email}
                        onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                        className="w-full px-4 py-3 border border-orange-300 rounded-lg"
                      />

                      <textarea
                        rows="4"
                        placeholder="Your Message"
                        value={inquiry.message}
                        onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                        className="w-full px-4 py-3 border border-orange-300 rounded-lg"
                      />
                       <ToastContainer />
                      <button
                        onClick={handleInquirySubmit}
                        disabled={isInquiryLoading}
                        className={`w-full bg-red-600 text-white py-3 rounded-lg font-semibold transition shadow-lg 
                          ${isInquiryLoading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-700"}`}
                      >
                        {isInquiryLoading ? "Sending Inquiry..." : "Send Message"}
                      </button>


                    </div>
                  </div>
                </div>
              </div>
              {/* Google Map */}
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-red-700 mb-4 text-center">Find Us on Map</h3>
                <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-red-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.8144747699744!2d89.96919!3d26.63856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e352c06e8a4b4b%3A0x8a8a8a8a8a8a8a8a!2sGauripur%2C%20Assam%20783331!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ganesh Akhara Location"
                  ></iframe>
                </div>
                <div className="text-center mt-4">
                  <a
                    href="https://maps.app.goo.gl/hawu7ELPwUGN2y2ZA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition shadow-lg"
                  >
                    <MapPin className="w-5 h-5" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>



          </section>
        )}

      </main>
      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[999]"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}

{showQR && (
  <div
    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999]"
    onClick={() => setShowQR(false)}
  >
    <div
      className="bg-white rounded-xl p-6 shadow-2xl text-center relative"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-bold text-red-700 mb-4">
        Scan to Donate 🙏
      </h2>

      <img
        src="/qr.jpg"   // replace with your QR path
        alt="Donation QR"
        className="mx-auto w-64 h-64 rounded-lg shadow-lg"
      />

      <p className="text-gray-700 font-medium mt-4">
        UPI ID:{" "}
        <span className="text-red-700 font-bold">
          ganeshakhragauripur@sbi
        </span>
      </p>

      {/* I Have Paid Button */}
      <button
        onClick={() => {
          setShowQR(false);
          showToast("🙏 Thank you for your kind donation!", "success");
        }}
        className="mt-5 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition w-full"
      >
        I Have Paid
      </button>

      {/* Close Button */}
      <button
        onClick={() => setShowQR(false)}
        className="mt-3 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition w-full"
      >
        Close
      </button>
      
    </div>
    
  </div>
)}


{showBookingDetails && (
  <div
    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999]"
    onClick={() => setShowBookingDetails(false)}
  >
    <div
      className="bg-white rounded-xl p-6 shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto relative"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold text-center text-yellow-700 mb-4">
        Booking Details & Rules
      </h2>

      {/* FIRST IMAGE */}
      <img
        src="/booking-details.jpg"
        alt="Pricing & Booking Details"
        className="rounded-lg shadow-md w-full mb-6"
      />

      {/* SECOND IMAGE */}
      <img
        src="/booking-rules.jpg"
        alt="Rules for Booking"
        className="rounded-lg shadow-md w-full mb-6"
      />

      {/* CLOSE BUTTON - always visible */}
      <button
        onClick={() => setShowBookingDetails(false)}
        className="
          mt-3 w-full py-3 bg-red-600 text-white rounded-lg 
          font-semibold hover:bg-red-700 transition
          sticky bottom-0
        "
      >
        Close
      </button>
    </div>
  </div>
)}



      {/* Footer (Enhanced) */}
      <footer className="bg-gradient-to-r from-red-900 to-orange-900 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          {/* Legacy Round Seal */}
          <div className="flex justify-center mt-4 mb-2">
            <div className="
          w-20 h-20 md:w-24 md:h-24 
          rounded-full 
          overflow-hidden 
          border-2 border-yellow-300 
          shadow-xl 
          bg-white
      ">
              <img
                src="/stamp.jpg"
                alt="Ganesh Akhara Legacy Seal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h3 className="text-xl font-extrabold mb-2 tracking-wider">
            Ganesh Akhara Gauripur
          </h3>


          <p className="text-lg text-yellow-200 mb-4">॥ शुभ लाभ ॥ - May Lord Ganesha bless you with prosperity.</p>
          <div className="flex justify-center space-x-6 text-sm text-yellow-300 font-medium">
            <a href="#about" onClick={() => setActiveSection('about')} className="hover:text-white transition">Our History</a>
            <a href="#timings" onClick={() => setActiveSection('timings')} className="hover:text-white transition">Pooja Schedule</a>
            <a href="#contact" onClick={() => setActiveSection('contact')} className="hover:text-white transition">Support</a>
          </div>
          {/* Legacy Seal */}



          <div className="mt-6 text-sm text-orange-200">
            © 2025 <b> Ganesh Akhara Gauripur</b>. All rights reserved.Developed with Devotion by <b>Rishabh Gupta</b>.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper component for Contact Section (optional but good practice)
const ContactInfo = ({ icon: Icon, title, text }) => (
  <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg border-l-4 border-red-500 shadow-md">
    <Icon className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
    <div>
      <h3 className="font-bold text-lg text-red-800 mb-1">{title}</h3>
      <p className="text-gray-700">{text}</p>
    </div>
  </div>
);
