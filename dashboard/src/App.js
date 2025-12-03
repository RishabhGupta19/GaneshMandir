// import React, { useEffect, useState } from "react";
// import Toast from "./Toast";
// const API_BASE = "http://localhost:5000"; // or your LAN / deployed URL



// export default function AdminBookingDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [actionLoadingId, setActionLoadingId] = useState(null);
//   const [error, setError] = useState("");
//   const [toast, setToast] = useState(null);
//             // For Success/Error messages
//   const [confirmData, setConfirmData] = useState(null);

// const triggerToast = (message, type = "info") => {
//     setToast({ message, type });
//   };

//   // Helper to close toast
//   const closeToast = () => {
//     setToast(null);
//   };

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch(`${API_BASE}/api/bookings?status=pending`);
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to load bookings");
//         setBookings([]);
//         setLoading(false);
//         return;
//       }

//       setBookings(data.bookings || []);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("Server error while loading bookings");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleAction = async (id, status) => {
//     if (!window.confirm(`Are you sure you want to mark this as ${status}?`)) return;

//     try {
//       setActionLoadingId(id);
//       const res = await fetch(`${API_BASE}/api/bookings/${id}/status`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         triggerToast(data.error || "Update failed", "error");
//         setActionLoadingId(null);
//         return;
//       }

//       setBookings((prev) => prev.filter((b) => b.id !== id));
//       setActionLoadingId(null);
//       triggerToast(`Booking ${status} successfully!`, "success");
//     } catch (err) {
//       console.error(err);
//       triggerToast("Server error during update", "error");
//       setActionLoadingId(null);
//     }
//   };

//   return (
//     // 1. MAIN BACKGROUND: Premium Gradient (Saffron/Red)
//     <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 p-4 md:p-10 font-sans text-gray-800">
      
//       <div className="max-w-7xl mx-auto">
        
//         {/* 2. HEADER CARD: Glassmorphism Effect */}
//         <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
//           <div>
//             <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-orange-600 drop-shadow-sm">
//               Admin Dashboard
//             </h1>
//             <p className="text-gray-600 mt-2 font-medium flex items-center gap-2">
//               <span className="text-2xl">🕉️</span> Ganesh Akhara Gauripur Management
//             </p>
//           </div>
          
//           <div className="mt-4 md:mt-0">
//              <div className="bg-gradient-to-r from-orange-100 to-red-100 px-6 py-3 rounded-xl border border-orange-200 shadow-inner text-center">
//                 <span className="block text-xs font-bold text-orange-800 uppercase tracking-wider">Pending Requests</span>
//                 <span className="block text-3xl font-black text-red-600">{bookings.length}</span>
//              </div>
//           </div>
//         </div>

//         {/* 3. CONTENT CARD */}
//         <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-white/50">
          
//           {/* Loading State */}
//           {loading && (
//             <div className="p-20 text-center">
//               <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-xl font-semibold text-gray-600">Loading bookings...</p>
//             </div>
//           )}

//           {/* Error State */}
//           {error && (
//             <div className="p-8 m-6 bg-red-50 border-l-8 border-red-500 rounded-r-lg">
//               <h3 className="text-lg font-bold text-red-800">⚠️ Connection Error</h3>
//               <p className="text-red-700 mt-1">{error}</p>
//             </div>
//           )}

//           {/* Empty State */}
//           {!loading && bookings.length === 0 && !error && (
//             <div className="p-24 text-center">
//               <div className="text-6xl mb-4">✅</div>
//               <h3 className="text-2xl font-bold text-gray-800">All Caught Up!</h3>
//               <p className="text-gray-500">No pending requests right now.</p>
//             </div>
//           )}

//           {/* 4. PREMIUM TABLE */}
//           {!loading && bookings.length > 0 && (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-red-800 via-red-700 to-orange-700 text-white">
//                     <th className="py-5 px-6 text-left text-sm font-bold uppercase tracking-wider">Guest Info</th>
//                     <th className="py-5 px-6 text-left text-sm font-bold uppercase tracking-wider">Schedule</th>
//                     <th className="py-5 px-6 text-left text-sm font-bold uppercase tracking-wider">Requirements</th>
//                     <th className="py-5 px-6 text-left text-sm font-bold uppercase tracking-wider">Contact</th>
//                     <th className="py-5 px-6 text-center text-sm font-bold uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {bookings.map((b) => (
//                     <tr key={b.id} className="hover:bg-orange-50 transition-colors duration-200">
                      
//                       {/* Name & Avatar */}
//                       <td className="py-5 px-6">
//                         <div className="flex items-center gap-4">
//                           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
//                             {b.name.charAt(0).toUpperCase()}
//                           </div>
//                           <div>
//                             <div className="font-bold text-gray-900 text-lg">{b.name}</div>
//                             <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">#{b.id}</span>
//                           </div>
//                         </div>
//                       </td>

//                       {/* Dates */}
//                       <td className="py-5 px-6">
//                         <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 w-max">
//                            <div className="flex items-center gap-2 mb-1 text-sm">
//                               <span className="w-2 h-2 rounded-full bg-green-500"></span>
//                               <span className="font-semibold text-gray-700">In:</span> {b.check_in}
//                            </div>
//                            <div className="flex items-center gap-2 text-sm">
//                               <span className="w-2 h-2 rounded-full bg-red-500"></span>
//                               <span className="font-semibold text-gray-700">Out:</span> {b.check_out}
//                            </div>
//                         </div>
//                       </td>

//                       {/* Rooms */}
//                       <td className="py-5 px-6">
//                          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 mb-2">
//                             🏠 {b.room_type}
//                          </span>
//                          <div className="text-sm text-gray-600 font-medium">
//                             <div>👥 {b.guests} Guests</div>
//                             <div>🚪 {b.rooms} Rooms</div>
//                          </div>
//                       </td>

//                       {/* Contact */}
//                       <td className="py-5 px-6">
//                         <div className="flex flex-col gap-1">
//                           <a href={`tel:${b.phone}`} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600">
//                             <span>📞</span> {b.phone}
//                           </a>
//                           <a href={`mailto:${b.email}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600">
//                             <span>✉️</span> {b.email}
//                           </a>
//                         </div>
//                       </td>

//                       {/* Buttons */}
//                       <td className="py-5 px-6 text-center">
//                         <div className="flex justify-center gap-3">
//                           <button
//                             onClick={() => handleAction(b.id, "rejected")}
//                             disabled={actionLoadingId === b.id}
//                             className={`px-4 py-2 rounded-lg font-semibold text-sm border transition-all ${
//                                 actionLoadingId === b.id 
//                                 ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
//                                 : "bg-white text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 shadow-sm"
//                             }`}
//                           >
//                              {actionLoadingId === b.id ? "..." : "Reject"}
//                           </button>

//                           <button
//                             onClick={() => handleAction(b.id, "accepted")}
//                             disabled={actionLoadingId === b.id}
//                             className={`px-5 py-2 rounded-lg font-semibold text-sm text-white shadow-md transition-all ${
//                                 actionLoadingId === b.id
//                                 ? "bg-gray-400 cursor-not-allowed"
//                                 : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 hover:shadow-lg"
//                             }`}
//                           >
//                             {actionLoadingId === b.id ? "..." : "Accept"}
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
        
//         <div className="text-center mt-6 text-white/80 font-medium text-sm">
//            Designed for Ganesh Akhara Gauripur
//         </div>

//       </div>
    
 
//       {/* RENDER TOAST CONTAINER */}
//       {toast && (
//         <div className="toast-container">
//           <Toast 
//             message={toast.message} 
//             type={toast.type} 
//             onClose={closeToast} 
//           />
//         </div>
//       )}
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import Toast from "./Toast"; // Your existing Toast component
import ConfirmationToast from "./ConfirmationToast"; // Your existing Confirmation component

const API_BASE = "https://ganeshmandir.onrender.com"; // or your LAN / deployed URL

export default function AdminBookingDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");
  const [allBookings, setAllBookings] = useState([]);
const [filterStatus, setFilterStatus] = useState("all");
const [loadingAll, setLoadingAll] = useState(false);

  
  // UI States
  const [toast, setToast] = useState(null);
  const [confirmData, setConfirmData] = useState(null); // Stores data for the confirmation dialog


const fetchAllBookings = async (status = "all") => {
  try {
    setLoadingAll(true);

    const url =
      status === "all"
        ? `${API_BASE}/api/bookings/all`
        : `${API_BASE}/api/bookings/all?status=${status}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      triggerToast(data.error || "Failed to load all bookings", "error");
      setLoadingAll(false);
      return;
    }

    setAllBookings(data.bookings);
    setLoadingAll(false);
  } catch (err) {
    console.error(err);
    triggerToast("Server error while loading all bookings", "error");
    setLoadingAll(false);
  }
};

useEffect(() => {
  fetchAllBookings("all");
}, []);


  // --- Toast Helpers ---
  const triggerToast = (message, type = "info") => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  // --- Data Fetching ---
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE}/api/bookings?status=pending`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load bookings");
        setBookings([]);
        setLoading(false);
        return;
      }

      setBookings(data.bookings || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Server error while loading bookings");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // --- Action Logic ---

  // 1. User clicks a button -> Opens the Confirmation Dialog
  const handleActionClick = (id, status) => {
    setConfirmData({ id, status });
  };

  // 2. User clicks "Cancel" in dialog
  const cancelAction = () => {
    setConfirmData(null);
  };

  // 3. User clicks "Yes, Confirm" -> Executes API Call
  const executeAction = async () => {
    if (!confirmData) return;
    
    const { id, status } = confirmData;
    setConfirmData(null); // Close the dialog immediately

    try {
      setActionLoadingId(id);
      const res = await fetch(`${API_BASE}/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        triggerToast(data.error || "Update failed", "error");
        setActionLoadingId(null);
        return;
      }

      // Success: Update UI
      setBookings((prev) => prev.filter((b) => b.id !== id));
      setActionLoadingId(null);
      triggerToast(`Booking ${status} successfully!`, "success");

    } catch (err) {
      console.error(err);
      triggerToast("Server error during update", "error");
      setActionLoadingId(null);
    }
  };

  return (
    // 1. MAIN BACKGROUND: Premium Gradient (Saffron/Red)
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 p-4 md:p-10 font-sans text-gray-800 relative">
      
      {/* --- RENDER CONFIRMATION DIALOG --- */}
      {confirmData && (
        <ConfirmationToast 
          message={`Are you sure you want to mark this as ${confirmData.status.toUpperCase()}?`}
          onConfirm={executeAction}
          onCancel={cancelAction}
        />
      )}

      {/* --- RENDER TOAST ALERTS --- */}
      {toast && (
        <div className="toast-container" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={closeToast} 
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* 2. HEADER CARD: Glassmorphism Effect */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 mb-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            {/* UPDATED: Changed text-4xl to 'text-3xl md:text-4xl' and added whitespace-nowrap to force one line */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-orange-600 drop-shadow-sm whitespace-nowrap">
              Admin Dashboard
            </h1>
            {/* UPDATED: Added justify-center for mobile alignment and text-sm for better fit */}
            <p className="text-gray-600 mt-2 font-medium flex items-center justify-center md:justify-start gap-2 text-sm md:text-base">
              <span className="text-xl md:text-2xl">🕉️</span> 
              <span className="whitespace-nowrap">Ganesh Akhara Gauripur Management</span>
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
             <div className="bg-gradient-to-r from-orange-100 to-red-100 px-6 py-3 rounded-xl border border-orange-200 shadow-inner text-center">
                <span className="block text-xs font-bold text-orange-800 uppercase tracking-wider">Pending Requests</span>
                <span className="block text-3xl font-black text-red-600">{bookings.length}</span>
             </div>
          </div>
        </div>

        {/* 3. CONTENT CARD */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-white/50 min-h-[400px]">
          
          {/* Loading State */}
          {loading && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xl font-semibold text-gray-600">Loading bookings...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-8 m-6 bg-red-50 border-l-8 border-red-500 rounded-r-lg">
              <h3 className="text-lg font-bold text-red-800">⚠️ Connection Error</h3>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && bookings.length === 0 && !error && (
            <div className="p-24 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-gray-800">All Caught Up!</h3>
              <p className="text-gray-500">No pending requests right now.</p>
            </div>
          )}

          {/* 4. PREMIUM TABLE */}
          {!loading && bookings.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-red-800 via-red-700 to-orange-700 text-white">
                    <th className="py-5 px-6 text-left text-sm font-bold uppercase tracking-wider">Guest Info</th>
                    <th className="py-5 px-6 text-left text-sm font-bold uppercase tracking-wider">Schedule</th>
                    <th className="py-5 px-6 text-left text-sm font-bold uppercase tracking-wider">Requirements</th>
                    <th className="py-5 px-6 text-left text-sm font-bold uppercase tracking-wider">Contact</th>
                    <th className="py-5 px-6 text-center text-sm font-bold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-orange-50 transition-colors duration-200">
                      
                      {/* Name & Avatar */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {b.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-lg">{b.name}</div>
                            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">#{b.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Dates */}
                      <td className="py-5 px-6">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 w-max">
                           <div className="flex items-center gap-2 mb-1 text-sm">
                              <span className="w-2 h-2 rounded-full bg-green-500"></span>
                              <span className="font-semibold text-gray-700">In:</span> {b.check_in}
                           </div>
                           <div className="flex items-center gap-2 text-sm">
                              <span className="w-2 h-2 rounded-full bg-red-500"></span>
                              <span className="font-semibold text-gray-700">Out:</span> {b.check_out}
                           </div>
                        </div>
                      </td>

                      {/* Rooms */}
                      <td className="py-5 px-6">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 mb-2">
                             🏠 {b.room_type}
                          </span>
                          <div className="text-sm text-gray-600 font-medium">
                             <div>👥 {b.guests} Guests</div>
                             <div>🚪 {b.rooms} Rooms</div>
                          </div>
                      </td>

                      {/* Contact */}
                      <td className="py-5 px-6">
                        <div className="flex flex-col gap-1">
                          <a href={`tel:${b.phone}`} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600">
                            <span>📞</span> {b.phone}
                          </a>
                          <a href={`mailto:${b.email}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600">
                            <span>✉️</span> {b.email}
                          </a>
                        </div>
                      </td>

                      {/* Buttons */}
                      <td className="py-5 px-6 text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleActionClick(b.id, "rejected")}
                            disabled={actionLoadingId === b.id}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm border transition-all ${
                                actionLoadingId === b.id 
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                : "bg-white text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 shadow-sm"
                            }`}
                          >
                             {actionLoadingId === b.id ? "..." : "Reject"}
                          </button>

                          <button
                            onClick={() => handleActionClick(b.id, "accepted")}
                            disabled={actionLoadingId === b.id}
                            className={`px-5 py-2 rounded-lg font-semibold text-sm text-white shadow-md transition-all ${
                                actionLoadingId === b.id
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 hover:shadow-lg"
                            }`}
                          >
                            {actionLoadingId === b.id ? "..." : "Accept"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
       <div className="mt-14 bg-white/90 rounded-2xl p-4 md:p-6 shadow-xl">
  <h2 className="text-xl md:text-2xl font-bold mb-4">All Bookings</h2>

  {/* FILTER BUTTONS */}
  {/* Changed: Added flex-wrap for mobile and adjusted gap */}
  <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
    {["all", "accepted", "rejected", "pending"].map((s) => (
      <button
        key={s}
        onClick={() => {
          setFilterStatus(s);
          fetchAllBookings(s);
        }}
        /* Changed: Added text-sm, transition effects, and better mobile padding */
        className={`px-4 py-2 rounded-lg border font-semibold text-sm md:text-base capitalize transition-all duration-200 ${
          filterStatus === s
            ? "bg-orange-600 text-white border-orange-600 shadow-md transform scale-105"
            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
        }`}
      >
        {s}
      </button>
    ))}
  </div>

  {/* LOADING */}
  {loadingAll && (
    <div className="flex justify-center items-center py-20">
       <p className="text-gray-500 animate-pulse">Loading...</p>
    </div>
  )}

  {/* TABLE CONTAINER */}
  {/* Changed: Added overflow-x-auto to make table responsive */}
  {!loadingAll && allBookings.length > 0 && (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-800 text-gray-100 uppercase text-xs font-semibold">
          <tr>
            {/* Changed: Added whitespace-nowrap to keep headers clean */}
            <th className="px-6 py-4 whitespace-nowrap">ID</th>
            <th className="px-6 py-4 whitespace-nowrap">Name</th>
            <th className="px-6 py-4 whitespace-nowrap">Room Type</th>
            <th className="px-6 py-4 whitespace-nowrap">Check-In</th>
            <th className="px-6 py-4 whitespace-nowrap">Check-Out</th>
            <th className="px-6 py-4 whitespace-nowrap">Guests</th>
            <th className="px-6 py-4 whitespace-nowrap">Rooms</th>
            <th className="px-6 py-4 whitespace-nowrap">Phone</th>
            <th className="px-6 py-4 whitespace-nowrap">Email</th>
            <th className="px-6 py-4 whitespace-nowrap">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {allBookings.map((b) => (
            <tr key={b.id} className="bg-white hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                #{b.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                {b.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {b.room_type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {b.check_in}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {b.check_out}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {b.guests}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {b.rooms}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {b.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {b.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* Changed: Converted text color to Badge style (Background + Text) */}
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    b.status === "accepted"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : b.status === "rejected"
                      ? "bg-red-100 text-red-800 border border-red-200"
                      : "bg-orange-100 text-orange-800 border border-orange-200"
                  }`}
                >
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {/* EMPTY */}
  {!loadingAll && allBookings.length === 0 && (
    <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <p className="text-gray-500 font-medium">No bookings found.</p>
    </div>
  )}
</div>

        <div className="text-center mt-6 text-white/80 font-medium text-sm">
           Designed for Ganesh Akhara Gauripur
        </div>
      </div>
    </div>
  );
}
