import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-950 text-white shadow-lg py-4 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        
        {/* Logo Section (Left) */}
        <div className="text-2xl font-bold text-green-400 flex-1 whitespace-nowrap">
          <Link to="/">Research Hub</Link>
        </div>

        {/* Navigation Links (Centered) */}
        <div className="flex-1 flex justify-center gap-6 text-gray-300 flex-nowrap">
          <Link to="/" className="hover:text-green-400 transition duration-300 whitespace-nowrap">Home</Link>
          <Link to="/papers" className="hover:text-green-400 transition duration-300 whitespace-nowrap">Research Papers</Link>
          <Link to="/datasets" className="hover:text-green-400 transition duration-300 whitespace-nowrap">Datasets</Link>
          <Link to="/trending" className="hover:text-green-400 transition duration-300 whitespace-nowrap">Trending</Link>
          {/* <Link to="/saved" className="hover:text-green-400 transition duration-300 whitespace-nowrap">Saved Discussions</Link> */}
          <Link to="/discussions" className="hover:text-green-400 transition duration-300 whitespace-nowrap">Discussions</Link>

          <Link to="/signup" className="hover:text-green-400 transition duration-300 whitespace-nowrap">Sign Up</Link>
          <Link to="/login" className="hover:text-green-400 transition duration-300 whitespace-nowrap">Login</Link>
        </div>

        {/* Call to Action Button (Right) */}
        <div className="flex-1 flex justify-end">
          <Link to="/start" className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 whitespace-nowrap">
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;



// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-gray-950 text-white shadow-lg py-4">
//       <div className="max-w-7xl mx-auto px-8 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        
//         {/* Logo */}
//         <div className="text-2xl font-bold text-green-400 flex-1 whitespace-nowrap">
//           <Link to="/">Research Hub</Link>
//         </div>

//         {/* Navigation Links */}
//         <div className="flex gap-3 justify-center text-gray-300 flex-1 flex-nowrap px-20">
//           <Link to="/" className="px-5 py-2 hover:text-green-400 transition duration-300 whitespace-nowrap">Home</Link>
//           <Link to="/papers" className="px-5 py-2 hover:text-green-400 transition duration-300 whitespace-nowrap">Research Papers</Link>
//           <Link to="/datasets" className="px-5 py-2 hover:text-green-400 transition duration-300 whitespace-nowrap">Datasets</Link>
//           <Link to="/trending" className="px-5 py-2 hover:text-green-400 transition duration-300 whitespace-nowrap">Trending</Link>
//           <Link to="/saved" className="px-5 py-2 hover:text-green-400 transition duration-300 whitespace-nowrap">Saved Discussions</Link>
//           <Link to="/signup" className="px-5 py-2 hover:text-green-400 transition duration-300 whitespace-nowrap">Sign Up</Link>
//           <Link to="/login" className="px-5 py-2 hover:text-green-400 transition duration-300 whitespace-nowrap">Login</Link>
//         </div>

//         {/* Call to Action Button */}
//         <div className="flex-1 flex justify-end">
//           <Link to="/start" className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 whitespace-nowrap">
//             Get Started
//           </Link>
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// export default Navbar;



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-gray-900 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
          
//           {/* Logo */}
//           <div className="text-2xl font-bold">
//             <Link to="/">Research Hub</Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6">
//             <Link to="/" className="hover:text-neonGreen">Home</Link>
//             <Link to="/signup" className="hover:text-neonGreen">Sign Up</Link>
//             <Link to="/login" className="hover:text-neonGreen">Login</Link>
//             <Link to="/papers" className="hover:text-neonGreen">Research Papers</Link>
//             <Link to="/datasets" className="hover:text-neonGreen">Datasets</Link>
//             <Link to="/trending" className="hover:text-neonGreen">Trending</Link>
//             <Link to="/saved" className="hover:text-neonGreen">Saved Discussions</Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)}>
//               {isOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-gray-800">
//           <div className="flex flex-col space-y-4 p-4">
//             <Link to="/" className="hover:text-neonGreen" onClick={() => setIsOpen(false)}>Home</Link>
//             <Link to="/signup" className="hover:text-neonGreen" onClick={() => setIsOpen(false)}>Sign Up</Link>
//             <Link to="/login" className="hover:text-neonGreen" onClick={() => setIsOpen(false)}>Login</Link>
//             <Link to="/papers" className="hover:text-neonGreen" onClick={() => setIsOpen(false)}>Research Papers</Link>
//             <Link to="/datasets" className="hover:text-neonGreen" onClick={() => setIsOpen(false)}>Datasets</Link>
//             <Link to="/trending" className="hover:text-neonGreen" onClick={() => setIsOpen(false)}>Trending</Link>
//             <Link to="/saved" className="hover:text-neonGreen" onClick={() => setIsOpen(false)}>Saved Discussions</Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import { Menu, X } from "lucide-react";

// // const Navbar = () => {
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <nav className="bg-black text-white p-4 shadow-md">
// //       <div className="container mx-auto flex justify-between items-center">
// //         <h1 className="text-2xl font-bold text-neonGreen">Research Hub</h1>

// //         <div className="hidden md:flex space-x-6">
// //           <Link to="/" className="hover:text-neonGreen">Home</Link>
// //           <Link to="/signup" className="hover:text-neonGreen">Sign Up</Link>
// //           <Link to="/login" className="hover:text-neonGreen">Login</Link>
// //           <Link to="/research" className="hover:text-neonGreen">Research Papers</Link>
// //           <Link to="/datasets" className="hover:text-neonGreen">Datasets</Link>
// //           <Link to="/trending" className="hover:text-neonGreen">Trending</Link>
// //           <Link to="/saved" className="hover:text-neonGreen">Saved Discussions</Link>
// //         </div>

// //         <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
// //           {isOpen ? <X size={24} className="text-neonPink" /> : <Menu size={24} className="text-neonPink" />}
// //         </button>
// //       </div>

// //       {isOpen && (
// //         <div className="md:hidden bg-black p-4">
// //           <Link to="/" className="block py-2 hover:text-neonGreen">Home</Link>
// //           <Link to="/signup" className="block py-2 hover:text-neonGreen">Sign Up</Link>
// //           <Link to="/login" className="block py-2 hover:text-neonGreen">Login</Link>
// //           <Link to="/research" className="block py-2 hover:text-neonGreen">Research Papers</Link>
// //           <Link to="/datasets" className="block py-2 hover:text-neonGreen">Datasets</Link>
// //           <Link to="/trending" className="block py-2 hover:text-neonGreen">Trending</Link>
// //           <Link to="/saved" className="block py-2 hover:text-neonGreen">Saved Discussions</Link>
// //         </div>
// //       )}
// //     </nav>
// //   );
// // };

// // export default Navbar;
