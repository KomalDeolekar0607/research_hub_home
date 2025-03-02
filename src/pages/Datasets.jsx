import React, { useState, useEffect } from "react";
import axios from "axios";
import DatasetList from "../components/DatasetList";
import { useNavigate } from "react-router-dom";

const DatasetsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatasets = async () => {
      setLoading(true);
      const url = `https://ckan.publishing.service.gov.uk/api/3/action/package_search?q=${searchTerm}`;

      try {
        const response = await axios.get(url);
        console.log("API Response:", response.data); // Log the full response

        // Check if the response contains the expected data
        if (response.data && response.data.result && response.data.result.results) {
          const formattedDatasets = response.data.result.results.map((item) => ({
            id: item.id, // Use the actual dataset ID from the API
            title: item.title,
            description: item.notes || "No description available",
            category: item.tags?.[0]?.name || "Uncategorized",
            download_link: item.resources?.[0]?.url || "#",
          }));
          setDatasets(formattedDatasets);
        } else {
          console.error("Invalid response format: results field is missing");
          setDatasets([]); // Set datasets to an empty array if the response is invalid
        }
      } catch (error) {
        console.error("Error fetching datasets:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
  }, [searchTerm, selectedCategory]);

  const handleViewDataset = (dataset) => {
    navigate(`/dataset/${dataset.id}`, { state: { dataset } });
  };

  const filteredDatasets = (datasets || []).filter((dataset) => {
    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    const matchesCategory = selectedCategory === "All" || dataset.category === selectedCategory;
    const matchesSearch =
      dataset.title?.toLowerCase().includes(lowerSearchTerm) ||
      dataset.description?.toLowerCase().includes(lowerSearchTerm);

    return matchesCategory && matchesSearch;
  });

   // State for upload modal
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newDataset, setNewDataset] = useState({
    title: "",
    source: "",
    category: "Real Estate",
    description: "",
    file: null,
  });

  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDataset({ ...newDataset, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setNewDataset({ ...newDataset, file: e.target.files[0] });
  };

  // Submit new dataset
  const handleUpload = () => {
    if (!newDataset.title || !newDataset.source || !newDataset.file) {
      alert("Please fill in all fields and upload a file.");
      return;
    }

    const uploadedDataset = {
      id: datasets.length + 1,
      title: newDataset.title,
      source: newDataset.source,
      category: newDataset.category,
      description: newDataset.description,
      downloadLink: URL.createObjectURL(newDataset.file), // Temporary link
    };

    setDatasets([...datasets, uploadedDataset]);
    setIsUploadOpen(false); // Close modal
    setNewDataset({
      title: "",
      source: "",
      category: "Real Estate",
      description: "",
      file: null,
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Research Datasets</h1>

        {/* Search Bar */}
        <div className="mb-6 flex items-center bg-gray-800 rounded-lg p-2">
          <input
            type="text"
            placeholder="Search datasets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Upload Button */}
         <button
          onClick={() => setIsUploadOpen(true)}
          className="mb-6 bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition mr-8"
        >
          + Upload Dataset
        </button>

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded border-gray-600 mb-8"
        >
          <option value="All">All Categories</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Social Media">Social Media</option>
          <option value="Health">Health</option>
          <option value="Finance">Finance</option>
        </select>

        {/* Dataset List or Loading Message */}
        {loading ? (
          <p className="text-white text-center">Loading datasets...</p>
        ) : (
          <DatasetList datasets={filteredDatasets} onViewDataset={handleViewDataset} />
        )}

        {/* Upload Modal */}
        {isUploadOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl font-semibold mb-4">Upload Dataset</h2>

              {/* Title */}
              <input
                type="text"
                name="title"
                value={newDataset.title}
                onChange={handleInputChange}
                placeholder="Dataset Title"
                className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
              />

              {/* Source */}
              <input
                type="text"
                name="source"
                value={newDataset.source}
                onChange={handleInputChange}
                placeholder="Source (e.g., Kaggle, GitHub)"
                className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
              />

              {/* Category */}
              <select
                name="category"
                value={newDataset.category}
                onChange={handleInputChange}
                className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
              >
                <option value="Real Estate">Real Estate</option>
                <option value="Social Media">Social Media</option>
                <option value="Health">Health</option>
                <option value="Finance">Finance</option>
              </select>

              {/* Description */}
              <textarea
                name="description"
                value={newDataset.description}
                onChange={handleInputChange}
                placeholder="Short Description"
                className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
              />

              {/* File Upload */}
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 mb-3 text-white"
              />

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  className="bg-green-500 px-4 py-2 rounded text-black font-semibold hover:bg-green-400"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DatasetsPage;


// import React, { useState } from "react";
// import DatasetList from "../components/DatasetList";

// const DatasetsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [datasets, setDatasets] = useState([
//     {
//       id: 1,
//       title: "House Price Prediction Dataset",
//       source: "Kaggle",
//       category: "Real Estate",
//       description: "A dataset containing housing market data for price prediction.",
//       downloadLink: "https://www.kaggle.com/datasets",
//     },
//     {
//       id: 2,
//       title: "Twitter Sentiment Analysis",
//       source: "Kaggle",
//       category: "Social Media",
//       description: "A dataset of tweets labeled as positive, neutral, or negative.",
//       downloadLink: "https://www.kaggle.com/datasets",
//     },
//     {
//       id: 3,
//       title: "COVID-19 Global Cases",
//       source: "Johns Hopkins University",
//       category: "Health",
//       description: "Worldwide COVID-19 cases and vaccination statistics.",
//       downloadLink: "https://github.com/CSSEGISandData/COVID-19",
//     },
//     {
//       id: 4,
//       title: "Stock Market Data",
//       source: "Yahoo Finance",
//       category: "Finance",
//       description: "Historical stock prices and market trends.",
//       downloadLink: "https://finance.yahoo.com",
//     },
//   ]);

//   // State for upload modal
//   const [isUploadOpen, setIsUploadOpen] = useState(false);
//   const [newDataset, setNewDataset] = useState({
//     title: "",
//     source: "",
//     category: "Real Estate",
//     description: "",
//     file: null,
//   });

//   // Search & Filter Logic
//   const filteredDatasets = datasets.filter((dataset) => {
//     const lowerSearchTerm = searchTerm.toLowerCase().trim();
//     const matchesCategory = selectedCategory === "All" || dataset.category === selectedCategory;
//     const matchesSearch =
//       dataset.title.toLowerCase().includes(lowerSearchTerm) ||
//       dataset.source.toLowerCase().includes(lowerSearchTerm) ||
//       dataset.description.toLowerCase().includes(lowerSearchTerm);

//     return matchesCategory && matchesSearch;
//   });

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewDataset({ ...newDataset, [name]: value });
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     setNewDataset({ ...newDataset, file: e.target.files[0] });
//   };

//   // Submit new dataset
//   const handleUpload = () => {
//     if (!newDataset.title || !newDataset.source || !newDataset.file) {
//       alert("Please fill in all fields and upload a file.");
//       return;
//     }

//     const uploadedDataset = {
//       id: datasets.length + 1,
//       title: newDataset.title,
//       source: newDataset.source,
//       category: newDataset.category,
//       description: newDataset.description,
//       downloadLink: URL.createObjectURL(newDataset.file), // Temporary link
//     };

//     setDatasets([...datasets, uploadedDataset]);
//     setIsUploadOpen(false); // Close modal
//     setNewDataset({
//       title: "",
//       source: "",
//       category: "Real Estate",
//       description: "",
//       file: null,
//     });
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6 text-center">Research Datasets</h1>

//         {/* Search Bar */}
//         <div className="mb-6 flex items-center bg-gray-800 rounded-lg p-2">
//           <input
//             type="text"
//             placeholder="Search datasets..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//         </div>

//         {/* Upload Button */}
//         <button
//           onClick={() => setIsUploadOpen(true)}
//           className="mb-6 bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition"
//         >
//           + Upload Dataset
//         </button>

//         {/* Category Dropdown */}
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="p-2 bg-gray-800 text-white rounded border-gray-600 mb-8 ml-8"
//         >
//           <option value="All">All Categories</option>
//           <option value="Real Estate">Real Estate</option>
//           <option value="Social Media">Social Media</option>
//           <option value="Health">Health</option>
//           <option value="Finance">Finance</option>
//         </select>

//         {/* Dataset List */}
//         <DatasetList datasets={filteredDatasets} />

//         {/* Upload Modal */}
//         {isUploadOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
//               <h2 className="text-2xl font-semibold mb-4">Upload Dataset</h2>

//               {/* Title */}
//               <input
//                 type="text"
//                 name="title"
//                 value={newDataset.title}
//                 onChange={handleInputChange}
//                 placeholder="Dataset Title"
//                 className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
//               />

//               {/* Source */}
//               <input
//                 type="text"
//                 name="source"
//                 value={newDataset.source}
//                 onChange={handleInputChange}
//                 placeholder="Source (e.g., Kaggle, GitHub)"
//                 className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
//               />

//               {/* Category */}
//               <select
//                 name="category"
//                 value={newDataset.category}
//                 onChange={handleInputChange}
//                 className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
//               >
//                 <option value="Real Estate">Real Estate</option>
//                 <option value="Social Media">Social Media</option>
//                 <option value="Health">Health</option>
//                 <option value="Finance">Finance</option>
//               </select>

//               {/* Description */}
//               <textarea
//                 name="description"
//                 value={newDataset.description}
//                 onChange={handleInputChange}
//                 placeholder="Short Description"
//                 className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
//               />

//               {/* File Upload */}
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="w-full p-2 mb-3 text-white"
//               />

//               {/* Buttons */}
//               <div className="flex justify-end space-x-4">
//                 <button
//                   onClick={() => setIsUploadOpen(false)}
//                   className="bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleUpload}
//                   className="bg-green-500 px-4 py-2 rounded text-black font-semibold hover:bg-green-400"
//                 >
//                   Upload
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default DatasetsPage;


// // import React, { useState } from "react";
// // import DatasetDetails from "../components/DatasetDetails";
// // import DatasetList from "../components/DatasetList";

// // const DatasetsPage = () => {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState("All");
// //   const [selectedDataset, setSelectedDataset] = useState(null);
// //   const [datasets, setDatasets] = useState([
// //     {
// //       id: 1,
// //       title: "House Price Prediction Dataset",
// //       source: "Kaggle",
// //       category: "Real Estate",
// //       description: "A dataset containing housing market data for price prediction.",
// //       downloadLink: "https://www.kaggle.com/datasets",
// //     },
// //     {
// //       id: 2,
// //       title: "Twitter Sentiment Analysis",
// //       source: "Kaggle",
// //       category: "Social Media",
// //       description: "A dataset of tweets labeled as positive, neutral, or negative.",
// //       downloadLink: "https://www.kaggle.com/datasets",
// //     },
// //     {
// //       id: 3,
// //       title: "COVID-19 Global Cases",
// //       source: "Johns Hopkins University",
// //       category: "Health",
// //       description: "Worldwide COVID-19 cases and vaccination statistics.",
// //       downloadLink: "https://github.com/CSSEGISandData/COVID-19",
// //     },
// //     {
// //       id: 4,
// //       title: "Stock Market Data",
// //       source: "Yahoo Finance",
// //       category: "Finance",
// //       description: "Historical stock prices and market trends.",
// //       downloadLink: "https://finance.yahoo.com",
// //     },
// //   ]);

// //   // ✅ Final Fixed Search & Filter Logic
// //   const filteredDatasets = datasets.filter((dataset) => {
// //     const lowerSearchTerm = searchTerm.toLowerCase().trim();
// //     const matchesCategory = selectedCategory === "All" || dataset.category === selectedCategory;
// //     const matchesSearch =
// //       dataset.title.toLowerCase().includes(lowerSearchTerm) ||
// //       dataset.source.toLowerCase().includes(lowerSearchTerm) ||
// //       dataset.description.toLowerCase().includes(lowerSearchTerm);

// //     return matchesCategory && matchesSearch;
// //   });

// //   return (
// //     <div className="bg-gray-900 text-white min-h-screen p-8">
// //       <div className="max-w-7xl mx-auto">
// //         <h1 className="text-3xl font-bold mb-6 text-center">Research Datasets</h1>

// //         {/* ✅ SEARCH BAR FIXED! */}
// //         <div className="mb-6 flex items-center bg-gray-800 rounded-lg p-2">
// //           <input
// //             type="text"
// //             placeholder="Search datasets..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
// //           />
// //         </div>

// //         {/* Category Dropdown */}
// //         <select
// //           value={selectedCategory}
// //           onChange={(e) => setSelectedCategory(e.target.value)}
// //           className="p-2 bg-gray-800 text-white rounded border-gray-600 mb-8"
// //         >
// //           <option value="All">All Categories</option>
// //           <option value="Real Estate">Real Estate</option>
// //           <option value="Social Media">Social Media</option>
// //           <option value="Health">Health</option>
// //           <option value="Finance">Finance</option>
// //         </select>

// //         {/* Dataset List or Details View */}
// //         {/* {selectedDataset ? ( */}
// //         {/* //   <DatasetDetails dataset={selectedDataset} onBack={() => setSelectedDataset(null)} /> */}
// //         {/* // ) : ( */}
// //           {/* <DatasetList datasets={filteredDatasets} onSelect={setSelectedDataset} /> */}
// //         {/* // )} */}

// //         <DatasetList datasets={filteredDatasets} />

// //       </div>
// //     </div>
// //   );
// // };

// // export default DatasetsPage;


// // import React, { useState } from "react";
// // import DatasetDetails from "../components/DatasetDetails";
// // import DatasetList from "../components/DatasetList";

// // const DatasetsPage = () => {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState("All");
// //   const [selectedDataset, setSelectedDataset] = useState(null);
// //   const [newDataset, setNewDataset] = useState({
// //     title: "",
// //     category: "",
// //     description: "",
// //     downloadLink: "",
// //     source: "",
// //   });

// //   const [datasets, setDatasets] = useState([
// //     {
// //       id: 1,
// //       title: "House Price Prediction Dataset",
// //       source: "Kaggle",
// //       category: "Real Estate",
// //       description: "A dataset containing housing market data for price prediction.",
// //       downloadLink: "https://www.kaggle.com/datasets",
// //     },
// //     {
// //       id: 2,
// //       title: "Twitter Sentiment Analysis",
// //       source: "Kaggle",
// //       category: "Social Media",
// //       description: "A dataset of tweets labeled as positive, neutral, or negative.",
// //       downloadLink: "https://www.kaggle.com/datasets",
// //     },
// //     {
// //       id: 3,
// //       title: "COVID-19 Global Cases",
// //       source: "Johns Hopkins University",
// //       category: "Health",
// //       description: "Worldwide COVID-19 cases and vaccination statistics.",
// //       downloadLink: "https://github.com/CSSEGISandData/COVID-19",
// //     },
// //     {
// //       id: 4,
// //       title: "Stock Market Data",
// //       source: "Yahoo Finance",
// //       category: "Finance",
// //       description: "Historical stock prices and market trends.",
// //       downloadLink: "https://finance.yahoo.com",
// //     },
// //   ]);

// //   // ✅ Search & Filter Logic: Filters by both title and source
// //   const filteredDatasets = datasets.filter((dataset) => {
// //     const matchesCategory = selectedCategory === "All" || dataset.category === selectedCategory;
// //     const matchesSearch = dataset.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
// //                           dataset.source.toLowerCase().includes(searchTerm.toLowerCase().trim());
    
// //     return matchesCategory && matchesSearch;
// //   });

// //   // ✅ Handle New Dataset Upload
// //   const handleUpload = () => {
// //     if (
// //       newDataset.title.trim() &&
// //       newDataset.category.trim() &&
// //       newDataset.description.trim() &&
// //       newDataset.downloadLink.trim()
// //     ) {
// //       setDatasets([...datasets, { id: datasets.length + 1, ...newDataset }]);
// //       setNewDataset({ title: "", category: "", description: "", downloadLink: "", source: "" });
// //     }
// //   };

// //   return (
// //     <div className="bg-gray-900 text-white min-h-screen p-8">
// //       <div className="max-w-7xl mx-auto">
// //         <h1 className="text-3xl font-bold mb-6 text-center">Research Datasets</h1>

// //         {/* ✅ SEARCH BAR FIXED! */}
// //         <div className="mb-6 flex items-center bg-gray-800 rounded-lg p-2">
// //           <input
// //             type="text"
// //             placeholder="Search datasets..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
// //           />
// //         </div>

// //         {/* Category Dropdown */}
// //         <select
// //           value={selectedCategory}
// //           onChange={(e) => setSelectedCategory(e.target.value)}
// //           className="p-2 bg-gray-800 text-white rounded border-gray-600"
// //         >
// //           <option value="All">All Categories</option>
// //           <option value="Real Estate">Real Estate</option>
// //           <option value="Social Media">Social Media</option>
// //           <option value="Health">Health</option>
// //           <option value="Finance">Finance</option>
// //         </select>

// //         {/* Dataset List or Details View */}
// //         {selectedDataset ? (
// //           <DatasetDetails dataset={selectedDataset} onBack={() => setSelectedDataset(null)} />
// //         ) : (
// //           <DatasetList datasets={filteredDatasets} onSelect={setSelectedDataset} />
// //         )}

// //         {/* Upload New Dataset Form */}
// //         <div className="mt-8 max-w-2xl mx-auto">
// //           <h2 className="text-xl font-semibold mb-3">Upload a New Dataset</h2>
// //           <div className="bg-gray-800 p-6 rounded-lg">
// //             <input
// //               type="text"
// //               placeholder="Dataset Title"
// //               value={newDataset.title}
// //               onChange={(e) => setNewDataset({ ...newDataset, title: e.target.value })}
// //               className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none"
// //             />
// //             <input
// //               type="text"
// //               placeholder="Source"
// //               value={newDataset.source}
// //               onChange={(e) => setNewDataset({ ...newDataset, source: e.target.value })}
// //               className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none"
// //             />
// //             <input
// //               type="text"
// //               placeholder="Category"
// //               value={newDataset.category}
// //               onChange={(e) => setNewDataset({ ...newDataset, category: e.target.value })}
// //               className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none"
// //             />
// //             <textarea
// //               placeholder="Short Description"
// //               value={newDataset.description}
// //               onChange={(e) => setNewDataset({ ...newDataset, description: e.target.value })}
// //               className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none"
// //             />
// //             <input
// //               type="text"
// //               placeholder="Dataset Download Link"
// //               value={newDataset.downloadLink}
// //               onChange={(e) => setNewDataset({ ...newDataset, downloadLink: e.target.value })}
// //               className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none"
// //             />
// //             <button
// //               onClick={handleUpload}
// //               className="bg-green-500 px-6 py-3 text-black font-semibold rounded-lg hover:bg-green-400 transition w-full"
// //             >
// //               Upload Dataset
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DatasetsPage;



// // // import React, { useState } from "react";
// // // import DatasetDetails from "../components/DatasetDetails";
// // // import DatasetList from "../components/DatasetList";

// // // const DatasetsPage = () => {
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [selectedCategory, setSelectedCategory] = useState("All");
// // //   const [selectedDataset, setSelectedDataset] = useState(null);
// // //   const [newDataset, setNewDataset] = useState({
// // //     title: "",
// // //     category: "",
// // //     description: "",
// // //     downloadLink: "",
// // //     source: "",
// // //   });

// // //   const [datasets, setDatasets] = useState([
// // //     {
// // //       id: 1,
// // //       title: "House Price Prediction Dataset",
// // //       source: "Kaggle",
// // //       category: "Real Estate",
// // //       description: "A dataset containing housing market data for price prediction.",
// // //       downloadLink: "https://www.kaggle.com/datasets",
// // //     },
// // //     {
// // //       id: 2,
// // //       title: "Twitter Sentiment Analysis",
// // //       source: "Kaggle",
// // //       category: "Social Media",
// // //       description: "A dataset of tweets labeled as positive, neutral, or negative.",
// // //       downloadLink: "https://www.kaggle.com/datasets",
// // //     },
// // //     {
// // //       id: 3,
// // //       title: "COVID-19 Global Cases",
// // //       source: "Johns Hopkins University",
// // //       category: "Health",
// // //       description: "Worldwide COVID-19 cases and vaccination statistics.",
// // //       downloadLink: "https://github.com/CSSEGISandData/COVID-19",
// // //     },
// // //     {
// // //       id: 4,
// // //       title: "Stock Market Data",
// // //       source: "Yahoo Finance",
// // //       category: "Finance",
// // //       description: "Historical stock prices and market trends.",
// // //       downloadLink: "https://finance.yahoo.com",
// // //     },
// // //   ]);

// // //   // Filter datasets based on search term and category
// // //   const filteredDatasets = datasets.filter(
// // //     (dataset) =>
// // //       (selectedCategory === "All" || dataset.category === selectedCategory) &&
// // //       (dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         dataset.source.toLowerCase().includes(searchTerm.toLowerCase()))
// // //   );

// // //   // Handle new dataset submission
// // //   const handleUpload = () => {
// // //     if (
// // //       newDataset.title.trim() &&
// // //       newDataset.category.trim() &&
// // //       newDataset.description.trim() &&
// // //       newDataset.downloadLink.trim()
// // //     ) {
// // //       setDatasets([...datasets, { id: datasets.length + 1, ...newDataset }]);
// // //       setNewDataset({ title: "", category: "", description: "", downloadLink: "", source: "" });
// // //     }
// // //   };

// // //   return (
// // //     <div className="bg-gray-900 text-white min-h-screen p-8">
// // //       <div className="max-w-7xl mx-auto">
// // //         <h1 className="text-3xl font-bold mb-6 text-center">Research Datasets</h1>

// // //         {/* Search Bar */}
// // //         <div className="mb-6 flex items-center bg-gray-800 rounded-lg p-2">
// // //           <input
// // //             type="text"
// // //             placeholder="Search datasets..."
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //             className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400 mr-3"
// // //           />
// // //         </div>

// // //         {/* Category Dropdown */}
// // //         <select
// // //           value={selectedCategory}
// // //           onChange={(e) => setSelectedCategory(e.target.value)}
// // //           className="p-2 bg-gray-800 text-white rounded border-gray-600"
// // //         >
// // //           <option value="All">All Categories</option>
// // //           <option value="Real Estate">Real Estate</option>
// // //           <option value="Social Media">Social Media</option>
// // //           <option value="Health">Health</option>
// // //           <option value="Finance">Finance</option>
// // //         </select>

// // //         {/* Dataset List / Details View */}
// // //         {selectedDataset ? (
// // //           <DatasetDetails dataset={selectedDataset} onBack={() => setSelectedDataset(null)} />
// // //         ) : (
// // //           <DatasetList datasets={filteredDatasets} onSelect={setSelectedDataset} />
// // //         )}

// // //         {/* Upload New Dataset */}
// // //         <div className="mt-8 max-w-2xl mx-auto">
// // //           <h2 className="text-xl font-semibold mb-3">Upload a New Dataset</h2>
// // //           <div className="bg-gray-800 p-6 rounded-lg">
// // //             <input
// // //               type="text"
// // //               placeholder="Dataset Title"
// // //               value={newDataset.title}
// // //               onChange={(e) => setNewDataset({ ...newDataset, title: e.target.value })}
// // //               className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none"
// // //             />
// // //             <input
// // //               type="text"
// // //               placeholder="Source"
// // //               value={newDataset.source}
// // //               onChange={(e) => setNewDataset({ ...newDataset, source: e.target.value })}
// // //               className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none"
// // //             />
// // //             <input
// // //               type="text"
// // //               placeholder="Category"
// // //               value={newDataset.category}
// // //               onChange={(e) => setNewDataset({ ...newDataset, category: e.target.value })}
// // //               className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none"
// // //             />
// // //             <textarea
// // //               placeholder="Short Description"
// // //               value={newDataset.description}
// // //               onChange={(e) => setNewDataset({ ...newDataset, description: e.target.value })}
// // //               className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none"
// // //             />
// // //             <input
// // //               type="text"
// // //               placeholder="Dataset Download Link"
// // //               value={newDataset.downloadLink}
// // //               onChange={(e) => setNewDataset({ ...newDataset, downloadLink: e.target.value })}
// // //               className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none"
// // //             />
// // //             <button
// // //               onClick={handleUpload}
// // //               className="bg-green-500 px-6 py-3 text-black font-semibold rounded-lg hover:bg-green-400 transition w-full"
// // //             >
// // //               Upload Dataset
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default DatasetsPage;


// // // // import React, { useState } from "react";
// // // // import DatasetDetails from "../components/DatasetDetails";
// // // // import DatasetList from "../components/DatasetList";

// // // // const DatasetsPage = () => {
// // // //   const [searchTerm, setSearchTerm] = useState("");
// // // //   const [newDataset, setNewDataset] = useState({
// // // //     title: "",
// // // //     category: "",
// // // //     description: "",
// // // //     downloadLink: "",
// // // //     source : "",
// // // //   });

// // // //   const [datasets, setDatasets] = useState([
// // // //     {
// // // //         id: 1,
// // // //         title: "House Price Prediction Dataset",
// // // //         source: "Kaggle",
// // // //         category: "Real Estate",
// // // //         description: "A dataset containing housing market data for price prediction.",
// // // //         downloadLink: "https://www.kaggle.com/datasets",
// // // //       },
// // // //       {
// // // //         id: 2,
// // // //         title: "Twitter Sentiment Analysis",
// // // //         source: "Kaggle",
// // // //         category: "Social Media",
// // // //         description: "A dataset of tweets labeled as positive, neutral, or negative.",
// // // //         downloadLink: "https://www.kaggle.com/datasets",
// // // //       },
// // // //       {
// // // //         id: 3,
// // // //         title: "COVID-19 Global Cases",
// // // //         source: "Johns Hopkins University",
// // // //         category: "Health",
// // // //         description: "Worldwide COVID-19 cases and vaccination statistics.",
// // // //         downloadLink: "https://github.com/CSSEGISandData/COVID-19",
// // // //       },
// // // //       {
// // // //         id: 4,
// // // //         title: "Stock Market Data",
// // // //         source: "Yahoo Finance",
// // // //         category: "Finance",
// // // //         description: "Historical stock prices and market trends.",
// // // //         downloadLink: "https://finance.yahoo.com",
// // // //       },
// // // //   ]);

// // // //   // Filter datasets based on search term
// // // // //   const filteredDatasets = datasets.filter((dataset) =>
// // // // //     dataset.title.toLowerCase().includes(searchTerm.toLowerCase())
// // // // //   );

// // // // const [searchTerm2, setSearchTerm2] = useState("");
// // // //   const [selectedCategory, setSelectedCategory] = useState("All");
// // // //   const [selectedDataset, setSelectedDataset] = useState(null);

// // // //   // Filter datasets based on search term and category
// // // //   const filteredDatasets = () => datasets.filter((dataset) =>
// // // //     (selectedCategory === "All" || dataset.category === selectedCategory) &&
// // // //     (dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //      dataset.source.toLowerCase().includes(searchTerm.toLowerCase()))
// // // //   );


// // // //   // Handle new dataset submission
// // // //   const handleUpload = () => {
// // // //     if (
// // // //       newDataset.title.trim() &&
// // // //       newDataset.category.trim() &&
// // // //       newDataset.description.trim() &&
// // // //       newDataset.link.trim()
// // // //     ) {
// // // //       setDatasets([...datasets, { id: datasets.length + 1, ...newDataset }]);
// // // //       setNewDataset({ title: "", category: "", description: "", link: "" });
// // // //     }
// // // //   };

// // // //   return (
      
// // // //     <div className="bg-gray-900 text-white min-h-screen p-8">
// // // //         <div className="max-w-7xl mx-auto">
// // // //       <h1 className="text-3xl font-bold mb-6 text-center ">Research Datasets</h1>

// // // //       {/* Search Bar */}
// // // //       <div className="mb-6 flex items-center bg-gray-800 rounded-lg p-2">
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Search datasets..."
// // // //           value={searchTerm2}
// // // //           onChange={(e) => setSearchTerm2(e.target.value)}
// // // //           className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400 mr-3"
// // // //         />
// // // //         <button 
// // // //        onClick={filteredDatasets} className="bg-green-500 px-6 py-2 rounded-lg text-black font-semibold hover:bg-green-400 transition">
// // // //           Search
// // // //         </button>
// // // //       </div>

// // // //       {/* Category Dropdown */}
// // // //       <select
// // // //           value={selectedCategory}
// // // //           onChange={(e) => setSelectedCategory(e.target.value)}
// // // //           className="p-2 bg-gray-800 text-white rounded border-gray-600"
// // // //         >
// // // //           <option value="All">All Categories</option>
// // // //           <option value="Real Estate">Real Estate</option>
// // // //           <option value="Social Media">Social Media</option>
// // // //           <option value="Health">Health</option>
// // // //           <option value="Finance">Finance</option>
// // // //         </select>
// // // //       {/* </div> */}

// // // //       {/* Datasets List */}
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

// // // //       {/* Dataset List / Details View */}
// // // //       {selectedDataset ? (
// // // //         <DatasetDetails dataset={selectedDataset} onBack={() => setSelectedDataset(null)} />
// // // //       ) : (
// // // //         <DatasetList datasets={filteredDatasets} onSelect={setSelectedDataset} />
// // // //       )}

// // // //       {/* Upload New Dataset */}
// // // //       <div className="mt-8 max-w-2xl mx-auto">
// // // //         <h2 className="text-xl font-semibold mb-3">Upload a New Dataset</h2>
// // // //         <div className="bg-gray-800 p-6 rounded-lg">
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Dataset Title"
// // // //             value={newDataset.title}
// // // //             onChange={(e) => setNewDataset({ ...newDataset, title: e.target.value })}
// // // //             className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none"
// // // //           />
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Category"
// // // //             value={newDataset.category}
// // // //             onChange={(e) => setNewDataset({ ...newDataset, category: e.target.value })}
// // // //             className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none"
// // // //           />
// // // //           <textarea
// // // //             placeholder="Short Description"
// // // //             value={newDataset.description}
// // // //             onChange={(e) => setNewDataset({ ...newDataset, description: e.target.value })}
// // // //             className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none"
// // // //           />
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Dataset Link"
// // // //             value={newDataset.link}
// // // //             onChange={(e) => setNewDataset({ ...newDataset, link: e.target.value })}
// // // //             className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none"
// // // //           />
// // // //           <button
// // // //             onClick={handleUpload}
// // // //             className="bg-green-500 px-6 py-3 text-black font-semibold rounded-lg hover:bg-green-400 transition w-full"
// // // //           >
// // // //             Upload Dataset
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //      </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DatasetsPage;
