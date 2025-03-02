import React from "react";
import { useNavigate } from "react-router-dom";

const DatasetList = ({ datasets = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {datasets.map((dataset) => (
        <div
          key={dataset.id}
          className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition"
          onClick={() => navigate(`/datasets/${dataset.id}`)}  // Navigate to details page
        >
          <h3 className="text-xl font-semibold mb-2 text-white">{dataset.title}</h3>
          <p className="text-sm text-green-400 mb-1">Category: {dataset.category}</p>
          <p className="text-gray-300 mb-4 truncate">{dataset.description}</p>
          <a
            href={dataset.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition duration-300"
            onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking link
          >
            View Dataset →
          </a>
        </div>
      ))}
    </div>
  );
};

export default DatasetList;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const DatasetList = ({ datasets = [] }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {datasets.map((dataset) => (
//         <div
//           key={dataset.id}
//           className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition"
//           onClick={() => navigate(`/datasets/${dataset.id}`)}  // Navigate to details page
//         >
//           <h3 className="text-xl font-semibold mb-2 text-white">{dataset.title}</h3>
//           <p className="text-sm text-green-400 mb-1">Category: {dataset.category}</p>
//           <p className="text-gray-300 mb-4 truncate">{dataset.description}</p>
//           <a
//             href={dataset.downloadLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-green-400 hover:text-green-300 transition duration-300"
//             onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking link
//           >
//             View Dataset →
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DatasetList;



// // import React from "react";

// // const DatasetList = ({ datasets = [], onSelect }) => {
// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
// //       {datasets.length > 0 ? (
// //         datasets.map((dataset) => (
// //           <div
// //             key={dataset.id}
// //             className="p-4 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
// //             onClick={() => onSelect && onSelect(dataset)}
// //           >
// //             <h3 className="text-xl font-bold">{dataset.title}</h3>
// //             <p className="text-gray-400">Source: {dataset.source}</p>
// //             <p className="mt-2">{dataset.description}</p>
// //           </div>
// //         ))
// //       ) : (
// //         <p className="text-gray-400">No datasets available.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default DatasetList;


// // // import React from "react";

// // // const DatasetList = ({ datasets = [], onSelect }) => {
// // //   return (
// // //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // //       {datasets.length > 0 ? (
// // //         datasets.map((dataset) => (
// // //           <div
// // //             key={dataset.id}
// // //             className="p-4 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
// // //             onClick={() => onSelect && onSelect(dataset)}
// // //           >
// // //             <h3 className="text-xl font-bold">{dataset.title}</h3>
// // //             <p className="text-gray-400">Source: {dataset.source}</p>
// // //             <p className="mt-2">{dataset.description}</p>
// // //           </div>
// // //         ))
// // //       ) : (
// // //         <p className="text-gray-400">No datasets available.</p>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default DatasetList;


// // // // import React from "react";

// // // // const DatasetList = ({ datasets, onSelect }) => {
// // // //   return (
// // // //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //       {datasets.map((dataset) => (
// // // //         <div
// // // //           key={dataset.id}
// // // //           className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700"
// // // //           onClick={() => onSelect(dataset)}
// // // //         >
// // // //           <h3 className="text-xl font-semibold mb-2">{dataset.title}</h3>
// // // //           <p className="text-gray-400 text-sm mb-1">Source: {dataset.source}</p>
// // // //           <p className="text-gray-300 mb-4 truncate">{dataset.description}</p>
// // // //           <a
// // // //               href={dataset.link}
// // // //               target="_blank"
// // // //               rel="noopener noreferrer"
// // // //               className="text-green-400 hover:text-green-300 transition duration-300"
// // // //             >
// // // //               View Dataset →
// // // //             </a>
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DatasetList;


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