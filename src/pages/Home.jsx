import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const Home = () => {
  return (
    <div className="bg-gray-900 text-white pt-20 px-6 flex flex-col items-center justify-center mt-10">
      
      {/* Hero Section with Full Background */}
      <div className="relative w-full">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat opacity-40"></div>

        {/* Hero Content */}
        <div className="relative text-center max-w-3xl mx-auto py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            The Future of Research Collaboration
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Discover, discuss, and collaborate on research papers, datasets, and trending discussions.
          </p>

          <div className="mt-6 flex space-x-4 justify-center">
            <Link to="/signup" className="px-6 py-2 bg-neonPink text-white rounded-full shadow-neon hover:opacity-80">           
              Get Started
            </Link>
            <Link to="/research" className="px-6 py-2 bg-neonGreen text-black rounded-full shadow-neon hover:opacity-80">
              Browse Research
            </Link>
          </div>
        </div>
      </div>

      {/* Trending Research Papers */}
      <Section title="Trending Research Papers" link="/trending" />

      {/* Datasets */}
      <Section title="Datasets" link="/datasets" />

      {/* Research Papers */}
      <Section title="Research Papers" link="/papers" />

    </div>
  );
};

// Reusable Section Component
const Section = ({ title, link }) => {
  return (
    <div className="max-w-7xl mx-auto my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Link to={link} className="text-green-400 hover:text-green-300 transition duration-300">
          View All →
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;



// import React from "react";
// import { Link } from "react-router-dom";
// import Card from "../components/Card";

// const Home = () => {
//   return (
//     <div className="bg-gray-900 text-white pt-20 px-6 flex flex-col items-center justify-center">
      
//       {/* Hero Section with Background UNDER it */}
//       <div className="relative w-full text-center max-w-3xl mx-auto mt-16 pb-10 pt-5">
//         <h1 className="text-4xl md:text-5xl font-bold text-neonGreen py-8">
//           The Future of Research Collaboration
//         </h1>
//         <p className="mt-4 text-lg text-gray-300">
//           Discover, discuss, and collaborate on research papers, datasets, and trending discussions.
//         </p>

//         <div className="mt-6 flex space-x-4 justify-center">
//           <Link to="/signup" className="px-6 py-2 bg-neonPink text-white rounded-full shadow-neon hover:opacity-80">           
//             Get Started
//           </Link>
//           <Link to="/research" className="px-6 py-2 bg-neonGreen text-black rounded-full shadow-neon hover:opacity-80">
//             Browse Research
//           </Link>
//         </div>

//         {/* Background UNDER Hero */}
//         <div className="absolute bottom-[-40px] left-0 w-full h-40 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat opacity-40"></div>
//       </div>

//       {/* Trending Research Papers */}
//       <Section title="Trending Research Papers" link="/trending" />

//       {/* Datasets */}
//       <Section title="Datasets" link="/datasets" />

//       {/* Research Papers */}
//       <Section title="Research Papers" link="/papers" />

//     </div>
//   );
// };

// // Reusable Section Component
// const Section = ({ title, link }) => {
//   return (
//     <div className="max-w-7xl mx-auto my-12">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold">{title}</h2>
//         <Link to={link} className="text-green-400 hover:text-green-300 transition duration-300">
//           View All →
//         </Link>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {[1, 2, 3, 4].map((item) => (
//           <Card key={item} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


// // import React from "react";
// // import { Link } from "react-router-dom";
// // import Card from "../components/Card"

// // const Home = () => {
// //   return (
// //     <div className="bg-gray-900 text-white pt-20 px-6 flex flex-col items-center justify-center">
// //        {/* Background Image */}
// //   <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat opacity-40">
// //       <div className="text-center max-w-3xl mx-auto mt-16 pb-10 pt-5">
// //         <h1 className="text-4xl md:text-5xl font-bold text-neonGreen py-8">
// //           The Future of Research Collaboration
// //         </h1>
// //         <p className="mt-4 text-lg text-gray-300">
// //           Discover, discuss, and collaborate on research papers, datasets, and trending discussions.
// //         </p>

// //         <div className="mt-6 flex space-x-4">
// //           <Link to="/signup" className="px-6 py-2 bg-neonPink text-white rounded-full shadow-neon hover:opacity-80">           Get Started
// //           </Link>
// //           <Link to="/research" className="px-6 py-2 bg-neonGreen text-black rounded-full shadow-neon hover:opacity-80">
// //             Browse Research
// //           </Link>
// //         </div>
// //         {/* </div> */}
// //       </div>
// //       </div>
      

// //       {/* Trending Research Papers */}
// //       <Section title="Trending Research Papers" link="/trending" />

// //       {/* Datasets */}
// //       <Section title="Datasets" link="/datasets" />

// //       {/* Research Papers */}
// //       <Section title="Research Papers" link="/papers" />

// //     </div>
// //   );
// // };

// // // Reusable Section Component
// // const Section = ({ title, link }) => {
// //   return (
// //     <div className="max-w-7xl mx-auto my-12">
// //       <div className="flex justify-between items-center mb-6">
// //         <h2 className="text-3xl font-bold">{title}</h2>
// //         <Link to={link} className="text-green-400 hover:text-green-300 transition duration-300">
// //           View All →
// //         </Link>
// //       </div>

// //       {/* Cards */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //         {[1, 2, 3, 4].map((item) => (
// //           <Card key={item} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };



// // export default Home;



// // import React from "react";
// // import { Link } from "react-router-dom";

// // const Home = () => {
// //   return (
// //     <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
// //       <div className="text-center max-w-3xl">
// //         <h1 className="text-4xl md:text-6xl font-bold text-neonGreen">
// //           The Future of Research Collaboration
// //         </h1>
// //         <p className="mt-4 text-lg text-gray-300">
// //           Discover, discuss, and collaborate on research papers, datasets, and trending discussions.
// //         </p>

// //         <div className="mt-6 flex space-x-4">
// //           <Link to="/signup" className="px-6 py-2 bg-neonPink text-white rounded-full shadow-neon hover:opacity-80">
// //             Get Started
// //           </Link>
// //           <Link to="/research" className="px-6 py-2 bg-neonGreen text-black rounded-full shadow-neon hover:opacity-80">
// //             Browse Research
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;
