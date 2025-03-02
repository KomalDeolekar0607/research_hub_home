import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaDownload, FaDatabase } from "react-icons/fa";
import axios from "axios";

const DatasetDetailsPage = () => {
  const { id } = useParams(); // Get dataset ID from URL
  const navigate = useNavigate();
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatasetDetails = async () => {
      try {
        const response = await axios.get(
          `https://ckan.publishing.service.gov.uk/api/3/action/package_show?id=${id}`
        );
        console.log("API Response:", response.data); // Log the full response

        if (response.data && response.data.result) {
          const datasetData = response.data.result;
          setDataset({
            id: datasetData.id,
            title: datasetData.title,
            description: datasetData.notes || "No description available",
            category: datasetData.tags?.[0]?.name || "Uncategorized",
            download_link: datasetData.resources?.[0]?.url || "#",
          });
        } else {
          setError("Invalid response format: dataset not found");
        }
      } catch (error) {
        console.error("Error fetching dataset details:", error);
        setError("Failed to fetch dataset details");
      } finally {
        setLoading(false);
      }
    };

    fetchDatasetDetails();
  }, [id]);

  if (loading) {
    return <p className="text-white text-center">Loading dataset details...</p>;
  }

  if (error) {
    return <p className="text-white text-center">{error}</p>;
  }

  if (!dataset) {
    return <p className="text-white text-center">Dataset not found</p>;
  }

  const handleDownload = () => {
    if (dataset.download_link) {
      window.open(dataset.download_link, "_blank");
    } else {
      alert("Download link not available");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-8 text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Dataset Container */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Panel - Title & Download */}
        <div className="md:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center text-center">
          <FaDatabase className="text-4xl text-green-400 mb-3" />
          <h2 className="text-2xl font-bold mb-2">{dataset.title}</h2>
          <p className="text-sm text-gray-400 mb-4">Category: {dataset.category}</p>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-3 bg-green-500 text-black text-center rounded-lg hover:bg-green-400 transition"
          >
            <FaDownload /> Download Dataset
          </button>
        </div>

        {/* Right Panel - Dataset Details */}
        <div className="md:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Dataset Details</h3>
          <p className="text-gray-300 leading-relaxed">{dataset.description}</p>

          {/* Example Placeholder for Dataset Preview (Table, Chart, etc.) */}
          <div className="mt-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-500 italic">[Dataset preview visualization will go here]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetDetailsPage;


// import React from "react";
// import { useLocation, useNavigate , useParams } from "react-router-dom";
// import { FaArrowLeft, FaDownload, FaDatabase } from "react-icons/fa";


// const DatasetDetailsPage = ({ datasets }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const data = location.state?.dataset; // Get dataset from state


//       const { id } = useParams();
  
//     //   // Find dataset by ID
//      const dataset = datasets.find((d) => d.id === parseInt(id));
    
   
    

//   if (!dataset) {
//     return <p className="text-white text-center">Dataset not found</p>;
//   }

//   return (
//     <div className="bg-gray-900 min-h-screen flex flex-col items-center p-8 text-white">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
//       >
//         <FaArrowLeft /> Back
//       </button>

//       {/* Dataset Container */}
//       <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Left Panel - Title & Download */}
//         <div className="md:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center text-center">
//           <FaDatabase className="text-4xl text-green-400 mb-3" />
//           <h2 className="text-2xl font-bold mb-2">{dataset.title}</h2>
//           <p className="text-sm text-gray-400 mb-4">Source: {dataset.source}</p>

//           <a
//             href={dataset.downloadLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-2 px-4 py-3 bg-green-500 text-black text-center rounded-lg hover:bg-green-400 transition"
//           >
//             <FaDownload /> Download Dataset
//           </a>
//         </div>

//         {/* Right Panel - Dataset Details */}
//         <div className="md:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
//           <h3 className="text-xl font-semibold mb-4">Dataset Preview</h3>
//           <p className="text-gray-300 leading-relaxed">{dataset.description}</p>

//           {/* Example Placeholder for Dataset Preview (Table, Chart, etc.) */}
//           <div className="mt-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
//             <p className="text-gray-500 italic">[Dataset preview visualization will go here]</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DatasetDetailsPage;

// // import React from "react";
// // import { useParams, useNavigate } from "react-router-dom";

// // const DatasetDetailsPage = ({ datasets }) => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   // Find dataset by ID
// //   const dataset = datasets.find((d) => d.id === parseInt(id));

// //   if (!dataset) {
// //     return <p className="text-white text-center">Dataset not found</p>;
// //   }

// //   return (
// //     <div className="bg-gray-900 min-h-screen text-white p-8">
// //       <button 
// //         onClick={() => navigate(-1)} 
// //         className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
// //       >
// //         ← Back
// //       </button>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {/* Left Side - Title & Download Link */}
// //         <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
// //           <h2 className="text-2xl font-bold">{dataset.title}</h2>
// //           <p className="text-sm text-gray-400 mt-2">Source: {dataset.source}</p>
// //           <a
// //             href={dataset.downloadLink}
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="block mt-4 p-3 bg-green-500 text-black text-center rounded-lg hover:bg-green-400 transition"
// //           >
// //             Download Dataset
// //           </a>
// //         </div>

// //         {/* Right Side - Dataset Details / Preview */}
// //         <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
// //           <h3 className="text-xl font-semibold mb-2">Dataset Preview</h3>
// //           <p className="text-gray-300">{dataset.description}</p>
// //           {/* Add dataset preview (example: table, graph, etc.) */}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DatasetDetailsPage;


// // // import React from "react";

// // // const DatasetDetails = ({ dataset, onBack }) => {
// // //   return (
// // //     <div className="p-6 bg-gray-900 rounded">
// // //       <button onClick={onBack} className="mb-4 p-2 bg-gray-700 rounded">
// // //         Back
// // //       </button>
// // //       <h2 className="text-2xl font-bold">{dataset.title}</h2>
// // //       <p className="text-gray-400 mt-1">Source: {dataset.source}</p>
// // //       <p className="mt-2">{dataset.description}</p>
// // //       <a
// // //         href={dataset.downloadLink}
// // //         target="_blank"
// // //         rel="noopener noreferrer"
// // //         className="block mt-4 p-2 bg-blue-500 rounded text-center"
// // //       >
// // //         Download Dataset
// // //       </a>
// // //     </div>
// // //   );
// // // };

// // // export default DatasetDetails;



// // // // import React from "react";


// // // // {/* Datasets List */}
// // // //       {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //         {filteredDatasets.map((dataset) => (
// // // //           <div key={dataset.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
// // // //             <h3 className="text-xl font-semibold mb-2">{dataset.title}</h3>
// // // //             <p className="text-sm text-green-400 mb-1">Category: {dataset.category}</p>
// // // //             <p className="text-gray-300 mb-4 truncate">{dataset.description}</p>
// // // //             <a
// // // //               href={dataset.link}
// // // //               target="_blank"
// // // //               rel="noopener noreferrer"
// // // //               className="text-green-400 hover:text-green-300 transition duration-300"
// // // //             >
// // // //               View Dataset →
// // // //             </a>
// // // //           </div>
// // // //         ))}
// // // //       </div> */}

// // // // const DatasetDetails = ({ dataset, onBack }) => {
// // // //   return (
// // // //     <div className="p-6 bg-gray-900 rounded">
// // // //       <button onClick={onBack} className="mb-4 p-2 bg-gray-700 rounded">
// // // //         Back
// // // //       </button>
// // // //       <h2 className="text-2xl font-bold">{dataset.title}</h2>
// // // //       <p className="text-gray-400 mt-1">Source: {dataset.source}</p>
// // // //       <p className="mt-2">{dataset.description}</p>
// // // //       <a
// // // //         href={dataset.downloadLink}
// // // //         target="_blank"
// // // //         rel="noopener noreferrer"
// // // //         className="block mt-4 p-2 bg-blue-500 rounded text-center"
// // // //       >
// // // //         Download Dataset
// // // //       </a>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DatasetDetails;
