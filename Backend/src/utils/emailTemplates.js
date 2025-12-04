

const headerStyle = `
  background: linear-gradient(135deg, #991b1b 0%, #c2410c 100%);
  padding: 24px;
  text-align: center;
  border-radius: 12px 12px 0 0;
`;

const containerStyle = `
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  background: #fffbeb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const tableStyle = `
  width: 100%;
  border-collapse: collapse;
  margin: 0;
`;

const thStyle = `
  background: #fef3c7;
  color: #92400e;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #fbbf24;
  width: 35%;
`;

const tdStyle = `
  padding: 12px 16px;
  color: #1f2937;
  border-bottom: 1px solid #fde68a;
  background: #ffffff;
`;

const footerStyle = `
  background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
  padding: 16px;
  text-align: center;
  color: #92400e;
  font-size: 14px;
`;

export const bookingAdminTemplate = (data) => `
<div style="${containerStyle}">
  <div style="${headerStyle}">
    <div style="font-size: 28px; margin-bottom: 8px;">🙏</div>
    <h1 style="color: #fbbf24; margin: 0; font-size: 24px; font-weight: bold;">॥ गणपति बाप्पा मोरया ॥</h1>
    <p style="color: #fed7aa; margin: 8px 0 0 0; font-size: 14px;">Ganesh Akhara Gauripur</p>
  </div>
  
  <div style="padding: 24px;">
    <h2 style="color: #991b1b; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #fbbf24; padding-bottom: 10px;">
      🛕 New Booking Request
    </h2>
    
    <table style="${tableStyle}">
      <tr><td style="${thStyle}">👤 Name</td><td style="${tdStyle}">${data.name}</td></tr>
      <tr><td style="${thStyle}">📞 Phone</td><td style="${tdStyle}">${data.phone}</td></tr>
      <tr><td style="${thStyle}">✉️ Email</td><td style="${tdStyle}">${data.email}</td></tr>
      <tr><td style="${thStyle}">📅 Check-In</td><td style="${tdStyle}">${data.check_in}</td></tr>
      <tr><td style="${thStyle}">📅 Check-Out</td><td style="${tdStyle}">${data.check_out}</td></tr>
      <tr><td style="${thStyle}">🏨 Room Type</td><td style="${tdStyle}">${data.room_type}</td></tr>

      <tr><td style="${thStyle}">👥 Guests</td><td style="${tdStyle}">${data.guests}</td></tr>
      <tr><td style="${thStyle}">🚪 Rooms</td><td style="${tdStyle}">${data.rooms}</td></tr>
    </table>
  </div>
  
  <div style="${footerStyle}">
    <p style="margin: 0;">🙏 ॥ मंगल मूर्ति मोरया ॥ 🙏</p>
  </div>
</div>
`;

export const userBookingReply = `
<div style="${containerStyle}">
  <div style="${headerStyle}">
    <div style="font-size: 28px; margin-bottom: 8px;">🙏</div>
    <h1 style="color: #fbbf24; margin: 0; font-size: 24px; font-weight: bold;">॥ गणपति बाप्पा मोरया ॥</h1>
    <p style="color: #fed7aa; margin: 8px 0 0 0; font-size: 14px;">Ganesh Akhara Gauripur</p>
  </div>
  
  <div style="padding: 32px; text-align: center;">
    <div style="font-size: 48px; margin-bottom: 16px;">🪔</div>
    <h2 style="color: #991b1b; margin: 0 0 16px 0; font-size: 22px;">Thank You for Your Booking Request!</h2>
    <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">
      "Your request has been received successfully.<br>
       Once it’s confirmed, you’ll get a direct email, or our team will contact you."
    </p>
    <div style="margin-top: 24px; padding: 16px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <p style="color: #92400e; margin: 0; font-style: italic;">
        "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।<br>निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"
      </p>
    </div>
  </div>
  
  <div style="${footerStyle}">
    <p style="margin: 0;">🙏 ॥ मंगल मूर्ति मोरया ॥ 🙏</p>
  </div>
</div>
`;

export const inquiryAdminTemplate = (data) => `
<div style="${containerStyle}">
  <div style="${headerStyle}">
    <div style="font-size: 28px; margin-bottom: 8px;">🙏</div>
    <h1 style="color: #fbbf24; margin: 0; font-size: 24px; font-weight: bold;">॥ गणपति बाप्पा मोरया ॥</h1>
    <p style="color: #fed7aa; margin: 8px 0 0 0; font-size: 14px;">Ganesh Akhara Gauripur</p>
  </div>
  
  <div style="padding: 24px;">
    <h2 style="color: #991b1b; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #fbbf24; padding-bottom: 10px;">
      📩 New Inquiry Message
    </h2>
    
    <table style="${tableStyle}">
      <tr><td style="${thStyle}">👤 Name</td><td style="${tdStyle}">${data.name}</td></tr>
      <tr><td style="${thStyle}">✉️ Email</td><td style="${tdStyle}">${data.email}</td></tr>
      <tr><td style="${thStyle}">💬 Message</td><td style="${tdStyle}">${data.message}</td></tr>
    </table>
  </div>
  
  <div style="${footerStyle}">
    <p style="margin: 0;">🙏 ॥ मंगल मूर्ति मोरया ॥ 🙏</p>
  </div>
</div>
`;

export const userInquiryReply = `
<div style="${containerStyle}">
  <div style="${headerStyle}">
    <div style="font-size: 28px; margin-bottom: 8px;">🙏</div>
    <h1 style="color: #fbbf24; margin: 0; font-size: 24px; font-weight: bold;">॥ गणपति बाप्पा मोरया ॥</h1>
    <p style="color: #fed7aa; margin: 8px 0 0 0; font-size: 14px;">Ganesh Akhara Gauripur</p>
  </div>
  
  <div style="padding: 32px; text-align: center;">
    <div style="font-size: 48px; margin-bottom: 16px;">🙏</div>
    <h2 style="color: #991b1b; margin: 0 0 16px 0; font-size: 22px;">Thank You for Contacting Us!</h2>
    <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">
      Your message has been received successfully.<br>
      We will reply to you shortly.
    </p>
    <div style="margin-top: 24px; padding: 16px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <p style="color: #92400e; margin: 0; font-style: italic;">
        "May Lord Ganesha bless you with wisdom, prosperity and strength."
      </p>
    </div>
  </div>
  
  <div style="${footerStyle}">
    <p style="margin: 0;">🙏 ॥ मंगल मूर्ति मोरया ॥ 🙏</p>
  </div>
</div>
`;


export const userBookingConfirmed = (booking) => `
<div style="${containerStyle}">
  <div style="${headerStyle}">
    <div style="font-size: 28px; margin-bottom: 8px;">🙏</div>
    <h1 style="color: #fbbf24; margin: 0; font-size: 24px; font-weight: bold;">॥ गणपति बाप्पा मोरया ॥</h1>
    <p style="color: #fed7aa; margin: 8px 0 0 0; font-size: 14px;">Ganesh Akhara Gauripur</p>
  </div>
  
  <div style="padding: 24px;">
    <div style="text-align: center; margin-bottom: 24px;">
      
      <h2 style="color: #166534; margin: 0 0 8px 0; font-size: 22px;">Booking Confirmed!</h2>
      <p style="color: #4b5563; margin: 0; line-height: 1.5;">
        Namaste ${booking.name},<br>
        We are happy to confirm your stay with us.
      </p>
    </div>
    
    <table style="${tableStyle}">
      <tr><td style="${thStyle}">🆔 Status</td><td style="${tdStyle}"><strong style="color: #166534; background: #dcfce7; padding: 2px 8px; border-radius: 4px;">${booking.status}</strong></td></tr>
      <tr><td style="${thStyle}">👤 Name</td><td style="${tdStyle}">${booking.name}</td></tr>
      <tr><td style="${thStyle}">📞 Phone</td><td style="${tdStyle}">${booking.phone}</td></tr>
      <tr><td style="${thStyle}">✉️ Email</td><td style="${tdStyle}">${booking.email}</td></tr>
      <tr><td style="${thStyle}">📅 Check-In</td><td style="${tdStyle}">${booking.check_in}</td></tr>
      <tr><td style="${thStyle}">📅 Check-Out</td><td style="${tdStyle}">${booking.check_out}</td></tr>
      <tr><td style="${thStyle}">🏨 Room Type</td><td style="${tdStyle}">${booking.room_type}</td></tr>
      <tr><td style="${thStyle}">👥 Guests</td><td style="${tdStyle}">${booking.guests}</td></tr>
      <tr><td style="${thStyle}">🚪 Rooms</td><td style="${tdStyle}">${booking.rooms}</td></tr>
    </table>

    <div style="margin-top: 24px; padding: 16px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981; text-align: center;">
      <p style="color: #065f46; margin: 0; font-style: italic;">
        "We look forward to hosting you at Ganesh Akhara."
      </p>
    </div>
  </div>
  
  <div style="${footerStyle}">
    <p style="margin: 0;">🙏 ॥ मंगल मूर्ति मोरया ॥ 🙏</p>
  </div>
</div>
`;
