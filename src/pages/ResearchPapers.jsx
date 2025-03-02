import React, { useState, useEffect } from "react";
import axios from "axios";

const ResearchPapers = () => {
  const [papers, setPapers] = useState([]); // Store research papers
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch research papers
  const fetchPapers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.core.ac.uk/v3/search/works/?q=${searchTerm || "latest"}`
      );
      setPapers(response.data.results || []);
    } catch (error) {
      setError("Error fetching research papers");
      console.error(error);
    }
    setLoading(false);
  };

  // Fetch papers when the component loads or search term changes
  useEffect(() => {
    fetchPapers();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Research Papers</h1>

        {/* Search Bar */}
        <div className="mb-6 flex items-center bg-gray-800 rounded-lg p-2">
          <input
            type="text"
            placeholder="Search research papers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400 mr-3"
          />
          <button
            onClick={fetchPapers}
            className="bg-green-500 text-black px-6 py-2 rounded-lg hover:bg-green-400 transition"
          >
            Search
          </button>
        </div>

        {/* Search Bar */}
{/* <div className="mb-6 flex justify-center">
  <div className="flex w-full max-w-2xl bg-gray-800 rounded-lg overflow-hidden shadow-lg">
    <input
      type="text"
      placeholder="Search research papers..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-3 text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
    />
    <button
      onClick={fetchPapers}
      className="bg-green-500 px-6 py-3 text-black font-semibold hover:bg-green-400 transition duration-300"
    >
      🔍 Search
    </button>
  </div>
  </div> */}

        {/* Loading Indicator */}
        {loading && <p className="text-center text-lg">Loading...</p>}

        {/* Error Message */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Research Paper Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {papers.length > 0 ? (
            papers.map((paper, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{paper.title || "No Title"}</h3>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Authors:</strong> 
                  {paper.authors && paper.authors.length > 0
                    ? paper.authors.length > 5
                      ? paper.authors.slice(0, 5).map((a) => a.name).join(", ") +
                        `, +${paper.authors.length - 5} more`
                      : paper.authors.map((a) => a.name).join(", ")
                    : "Unknown"}
                  {/* {paper.authors?.map(author => author.name).join(", ") || "Unknown"} */}

                  {/* {paper.authors?.join(", ") || "Unknown"} */}
                </p>
                <p className="text-gray-300 mb-4 text-sm">
                {paper.abstract
                    ? paper.abstract.length > 150
                      ? paper.abstract.slice(0, 250) + "..."
                      : paper.abstract
                    : "No Description Available"}
                  {/* {paper.abstract || "No Description Available"} */}
                </p>
                <p className="text-gray-400 text-sm">
                  <strong>Published:</strong> {paper.publishedDate ? new Date(paper.publishedDate).toDateString() : "N/A"}
                </p>
                <a
                  href={paper.downloadUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition duration-300"
                >
                  Read More →
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No research papers found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchPapers;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ResearchPapers = () => {
//   const [papers, setPapers] = useState([]); // Store research papers
//   const [searchQuery, setSearchQuery] = useState("latest"); // Default search term
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Function to fetch research papers
//   const fetchPapers = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(
//         `https://api.core.ac.uk/v3/search/works/?q=${searchQuery}`
//       );
//       setPapers(response.data.results || []);
//     } catch (error) {
//       setError("Error fetching research papers");
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   // Fetch papers when the component loads or searchQuery changes
//   useEffect(() => {
//     fetchPapers();
//   }, [searchQuery]);

//   return (
//     <div className="bg-gray-900 text-white min-h-screen p-8">
//       {/* Search Bar */}
//       <div className="max-w-3xl mx-auto mb-6">
//         <div className="flex items-center bg-gray-800 rounded-lg">
//           <input
//             type="text"
//             placeholder="Search research papers..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full p-3 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonGreen"
//           />
//           <button
//             onClick={fetchPapers}
//             className="bg-neonGreen text-black px-6 py-2 rounded-r-lg"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Loading Indicator */}
//       {loading && <p className="text-center text-lg">Loading...</p>}

//       {/* Error Message */}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {/* Display Research Papers */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {papers.map((paper, index) => (
//           <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold mb-2">{paper.title || "No Title"}</h3>
//             <p className="text-gray-400">Author: {paper.authors?.join(", ") || "Unknown"}</p>
//             <p className="text-gray-400 text-sm my-2">{paper.description || "No Description Available"}</p>
//             <p className="text-gray-300 text-sm">
//               <strong>Published:</strong> {paper.publishedAt ? new Date(paper.publishedAt).toDateString() : "N/A"}
//             </p>
//             <a
//               href={paper.downloadUrl || "#"}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-green-400 hover:text-green-300"
//             >
//               Read More →
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ResearchPapers;




// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const ResearchPapers = () => {
// //   const [papers, setPapers] = useState([]); // Store research papers
// //   const [searchQuery, setSearchQuery] = useState("latest"); // Default search term
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   // Function to fetch research papers
// //   const fetchPapers = async () => {
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const response = await axios.get(
// //         `https://api.core.ac.uk/v3/search/works/?q=${searchQuery}`
// //       );
// //       setPapers(response.data.results || []);
// //     } catch (error) {
// //       setError("Error fetching research papers");
// //       console.error(error);
// //     }
// //     setLoading(false);
// //   };

// //   // Fetch papers when the component loads or searchQuery changes
// //   useEffect(() => {
// //     fetchPapers();
// //   }, [searchQuery]);

// //   return (
// //     <div className="bg-gray-900 text-white min-h-screen p-8">
// //       {/* Search Bar */}
// //       <div className="max-w-2xl mx-auto mb-6">


// //         <input
// //           type="text"
// //           placeholder="Search research papers..."
// //           value={searchQuery}
// //           onChange={(e) => setSearchQuery(e.target.value)}
// //           className="w-full p-3 rounded-lg text-black bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonGreen"
// //         />
// //         <button
// //           onClick={fetchPapers}
// //           className="bg-neonGreen text-black px-6 py-2 rounded-lg mt-2"
// //         >
// //           Search
// //         </button>
// //       </div>

// //       {/* Loading Indicator */}
// //       {loading && <p className="text-center text-lg">Loading...</p>}

// //       {/* Error Message */}
// //       {error && <p className="text-center text-red-500">{error}</p>}

// //       {/* Display Research Papers */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {papers.map((paper, index) => (
// //           <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
// //             <h3 className="text-xl font-semibold mb-2">{paper.title || "No Title"}</h3>
// //             <p className="text-gray-400">Author: {paper.authors?.join(", ") || "Unknown"}</p>
// //             <p className="text-gray-400 text-sm my-2">{paper.description || "No Description Available"}</p>
// //             <p className="text-gray-300 text-sm">
// //               <strong>Published:</strong> {paper.publishedAt ? new Date(paper.publishedAt).toDateString() : "N/A"}
// //             </p>
// //             <a
// //               href={paper.downloadUrl || "#"}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="text-green-400 hover:text-green-300"
// //             >
// //               Read More →
// //             </a>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ResearchPapers;


// // // import React, { useState } from "react";
// // // import { Link } from "react-router-dom";

// // // const ResearchPapers = () => {
// // //   const [searchTerm, setSearchTerm] = useState("");

// // //   const researchPapers = [
// // //     {
// // //       id: 1,
// // //       title: "Deep Learning for Healthcare",
// // //       author: "John Doe",
// // //       description: "An in-depth look into how deep learning is transforming the healthcare industry.",
// // //       link: "/papers/deep-learning-healthcare",
// // //     },
// // //     {
// // //       id: 2,
// // //       title: "Quantum Computing: The Future",
// // //       author: "Jane Smith",
// // //       description: "A comprehensive study on the impact and future of quantum computing.",
// // //       link: "/papers/quantum-computing",
// // //     },
// // //     {
// // //       id: 3,
// // //       title: "AI in Climate Change Mitigation",
// // //       author: "Alice Brown",
// // //       description: "How artificial intelligence is being leveraged to combat climate change.",
// // //       link: "/papers/ai-climate-change",
// // //     },
// // //   ];

// // //   const filteredPapers = researchPapers.filter((paper) =>
// // //     paper.title.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   return (
// // //     <div className="bg-gray-900 text-white min-h-screen p-8">
// // //       <div className="max-w-4xl mx-auto">
// // //         <h1 className="text-3xl font-bold mb-6 text-center">Research Papers</h1>

// // //         {/* Search Bar */}
// // //         <div className="mb-6">
// // //           <input
// // //             type="text"
// // //             placeholder="Search research papers..."
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //             className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonGreen"
// // //           />
// // //         </div>

// // //         {/* Research Paper Cards */}
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// // //           {filteredPapers.map((paper) => (
// // //             <div key={paper.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
// // //               <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
// // //               <p className="text-sm text-gray-400 mb-2">By {paper.author}</p>
// // //               <p className="text-gray-300 mb-4">{paper.description}</p>
// // //               <Link
// // //                 to={paper.link}
// // //                 className="text-green-400 hover:text-green-300 transition duration-300"
// // //               >
// // //                 Read More →
// // //               </Link>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ResearchPapers;
