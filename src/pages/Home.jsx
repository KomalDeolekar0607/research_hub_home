import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";

const Home = () => {
  const [trendingPapers, setTrendingPapers] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [researchPapers, setResearchPapers] = useState([]);
  const [trendingError, setTrendingError] = useState("");
  const [datasetsError, setDatasetsError] = useState("");
  const [researchError, setResearchError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const API_URLS = {
    trending: "https://api.core.ac.uk/v3/search/works/?q=trending",
    datasets: "https://ckan.publishing.service.gov.uk/api/3/action/package_search?q=latest", 
    research: "https://api.core.ac.uk/v3/search/works/?q=latest", 
  };

  const fetchData = async (type, setData, setError) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URLS[type]);
      console.log(`${type} API Response:`, response.data);

      if (response.data.results?.length > 0) {
        // if(type == "trending"){
        //   setTrendingPapers(response.data.results.slice(0, 4)); //Limit to top 4
        // }
        // if(type == "datasets"){
        //   setDatasets(response.data.results.slice(0, 4)); //Limit to top 4
        // }
        // if(type == "research"){
        //   setResearchPapers(response.data.results.slice(0, 4)); //Limit to top 4
        // }
        setData(response.data.results.slice(0, 4)); //Limit to top 4
        console.log(`${type} data set in state:`, response.data.results.slice(0, 4));
      } else {
        throw new Error("No data found");
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      setError(`Failed to load ${type}: ${error.message}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData("trending", setTrendingPapers, setTrendingError);
    fetchData("datasets", setDatasets, setDatasetsError);
    fetchData("research", setResearchPapers, setResearchError);

    console.log("trending")
    console.log(trendingPapers)
    console.log("datasets")
    console.log(datasets)
    console.log("papers")
    console.log(researchPapers)
  }, []);

  useEffect(() => {
    console.log("Updated Trending Papers:", trendingPapers);
}, [trendingPapers]); // Runs when trendingPapers updates


useEffect(() => {
  console.log("Updated Trending Papers:", researchPapers);
}, [researchPapers]); // Runs when trendingPapers updates


useEffect(() => {
  console.log("Updated Trending Papers:", datasets);
}, [datasets]); // Runs when trendingPapers updates


  // 🔹 Fallback Static Data (Used if API Fails)
  const fallbackTrending = [
    { id: 1, title: "AI in Healthcare", author: "Dr. John Doe", link: "#" },
    { id: 2, title: "Quantum Computing Advances", author: "Dr. Jane Smith", link: "#" },
    { id: 3, title: "Blockchain for Security", author: "Prof. Alan Turing", link: "#" },
    { id: 4, title: "Neural Networks in Robotics", author: "Dr. Ada Lovelace", link: "#" },
  ];

  const fallbackDatasets = [
    { id: 1, title: "Medical Imaging Dataset", author: "OpenAI Dataset", link: "#" },
    { id: 2, title: "COVID-19 Research Data", author: "WHO", link: "#" },
    { id: 3, title: "Satellite Image Dataset", author: "NASA", link: "#" },
    { id: 4, title: "Financial Market Data", author: "Bloomberg", link: "#" },
  ];

  const fallbackResearchPapers = [
    { id: 1, title: "Deep Learning for NLP", author: "Yann LeCun", link: "#" },
    { id: 2, title: "Advances in Computer Vision", author: "Fei-Fei Li", link: "#" },
    { id: 3, title: "Quantum Algorithms Overview", author: "David Deutsch", link: "#" },
    { id: 4, title: "Cybersecurity Trends", author: "Bruce Schneier", link: "#" },
  ];

  return (
    <div className="bg-gray-900 text-white pt-20 px-6 flex flex-col items-center justify-center mt-10">
      {/* Hero Section */}
      <div className="relative w-full">
        <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center opacity-40"></div>
        <div className="relative text-center max-w-3xl mx-auto py-20">
          <h1 className="text-4xl md:text-5xl font-bold">The Future of Research Collaboration</h1>
          <p className="mt-4 text-lg text-gray-300">
            Discover, discuss, and collaborate on research papers, datasets, and trending discussions.
          </p>
          <div className="mt-6 flex space-x-4 justify-center">
            <Link to="/signup" className="px-6 py-2 bg-neonPink text-white rounded-full shadow-neon hover:opacity-80">           
              Get Started
            </Link>
            <Link to="/research" className="px-6 py-2 bg-neonGreen text-white rounded-full shadow-neon hover:opacity-80">
              Browse Research
            </Link>
          </div>
        </div>
      </div>

      {trendingPapers.length > 0 ? (
    <Section key={trendingPapers.length} title="Trending Research Papers" link="/research-papers" 
    // papers={trendingPapers}  
    papers={fallbackTrending}  

    error={trendingError}/>
) : !trendingError && <p className="text-center text-gray-400">Loading trending papers...</p>}

      {/* Trending Research Papers Section */}
      {/* <Section
        title="Trending Research Papers"
        link="/trending"
        papers={trendingError ? fallbackTrending : trendingPapers}
        // papers={trendingPapers}
        error={trendingError}
      /> */}


{datasets.length > 0 ? (
    <Section
    // key={trendingPapers.length}
    title="Datasets"
    link="/datasets"
    // papers={datasetsError ? fallbackDatasets : datasets}
    papers={fallbackDatasets}
    error={datasetsError}
  />
) : !datasetsError && <p className="text-center text-gray-400">Loading trending Datasets...</p>}

      {/* Datasets Section */}
      {/* <Section
        title="Datasets"
        link="/datasets"
        papers={datasetsError ? fallbackDatasets : datasets}
        // papers={datasets}
        error={datasetsError}
      /> */}




{researchPapers.length > 0 ? (
    <Section
    key={trendingPapers.length}
    title="Datasets"
    link="/datasets"
    // papers={researchError ? fallbackResearchPapers : researchPapers}
    papers={fallbackResearchPapers}
    error={researchError}
  />
) : !researchError && <p className="text-center text-gray-400">Loading trending papers...</p>}

      {/* Research Papers Section */}
      {/* <Section
        title="Research Papers"
        link="/research-papers"
        papers={researchError ? fallbackResearchPapers : researchPapers}
        // papers={researchPapers}
        error={researchError}
      /> */}
    </div>
  );
};

// Modified Section Component to Accept Data
const Section = ({ title, link, papers = [], error }) => {
  console.log("data")
  console.log(papers)
  return (
    
    <div className="max-w-7xl mx-auto my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Link to={link} className="text-green-400 hover:text-green-300 transition duration-300">
          View All →
        </Link>
      </div>

      {/* Show error message if API fails */}
      {error && <p className="text-red-400">{error}</p>}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {papers.map((paper, index) => (
          <Card key={index} title={paper.title} author={paper.author} link={paper.link} />
        ))}
      </div>
    </div>
  );
};

export default Home;



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Card from "../components/Card";

// const Home = () => {
//   const [trendingPapers, setTrendingPapers] = useState([]);
//   const [datasets, setDatasets] = useState([]);
//   const [researchPapers, setResearchPapers] = useState([]);
//   const [trendingError, setTrendingError] = useState(false);
//   const [datasetsError, setDatasetsError] = useState(false);
//   const [researchError, setResearchError] = useState(false);

//   const API_KEY = "your_actual_api_key_here"; // Replace with your valid API Key

//   const API_URLS = {
//     trending: "https://api.core.ac.uk/v3/search/works/?q=trending",
//     datasets: "https://ckan.publishing.service.gov.uk/api/3/action/package_search?q=latest", // Replace with actual dataset API
//     research: "https://api.example.com/research-papers", // Replace with actual research paper API
//   };

//   // useEffect(() => {
//   //   const fetchData = async (type, setData, setError) => {
//   //     try {
//   //       // const response = await fetch(API_URLS[type], {
//   //       //   headers: { Authorization: `Bearer ${API_KEY}` },
//   //       // });

//   //       const response = await axios.get(API_URLS[type]);

//   //       // if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//   //       const data = await response.json();
//   //       console.log(`${type} API Response:`, data);

//   //       if (data.results && data.results.length > 0) {
//   //         setData(data.results.slice(0, 4)); // Show top 4 items
//   //       } else {
//   //         throw new Error("No data found");
//   //       }
//   //     } catch (error) {
//   //       console.error(`Error fetching ${type}:`, error);
//   //       setError(true);
//   //     }
//   //   };

//   //    // Function to fetch research papers
//   // const fetchPapers = async () => {
//   //   setLoading(true);
//   //   setError("");
//   //   try {
//   //     const response = await axios.get(
//   //       `https://api.core.ac.uk/v3/search/works/?q=${searchTerm || "latest"}`
//   //     );
//   //     setPapers(response.data.results || []);
//   //   } catch (error) {
//   //     setError("Error fetching research papers");
//   //     console.error(error);
//   //   }
//   //   setLoading(false);
//   // };

//   // // Fetch papers when the component loads or search term changes
//   // useEffect(() => {
//   //   fetchPapers();
//   // }, []);

//   const fetchData = async (type, setData, setError) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(API_URLS[type]);
//       console.log(`${type} API Response:`, response.data);

//       if (response.data.results && response.data.results.length > 0) {
//         setData(response.data.results.slice(0, 4)); // Show top 4 items
//       } else {
//         throw new Error("No data found");
//       }
//     } catch (error) {
//       console.error(`Error fetching ${type}:`, error);
//       setError(true);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData("trending", setTrendingPapers, setTrendingError);
//     fetchData("datasets", setDatasets, setDatasetsError);
//     fetchData("research", setResearchPapers, setResearchError);
//   }, []);

//   // 🔹 Fallback Static Data (Used if API fails)
//   const fallbackTrending = [
//     { id: 1, title: "AI in Healthcare", author: "Dr. John Doe", link: "#" },
//     { id: 2, title: "Quantum Computing Advances", author: "Dr. Jane Smith", link: "#" },
//     { id: 3, title: "Blockchain for Security", author: "Prof. Alan Turing", link: "#" },
//     { id: 4, title: "Neural Networks in Robotics", author: "Dr. Ada Lovelace", link: "#" },
//   ];

//   const fallbackDatasets = [
//     { id: 1, title: "Medical Imaging Dataset", author: "OpenAI Dataset", link: "#" },
//     { id: 2, title: "COVID-19 Research Data", author: "WHO", link: "#" },
//     { id: 3, title: "Satellite Image Dataset", author: "NASA", link: "#" },
//     { id: 4, title: "Financial Market Data", author: "Bloomberg", link: "#" },
//   ];

//   const fallbackResearchPapers = [
//     { id: 1, title: "Deep Learning for NLP", author: "Yann LeCun", link: "#" },
//     { id: 2, title: "Advances in Computer Vision", author: "Fei-Fei Li", link: "#" },
//     { id: 3, title: "Quantum Algorithms Overview", author: "David Deutsch", link: "#" },
//     { id: 4, title: "Cybersecurity Trends", author: "Bruce Schneier", link: "#" },
//   ];

//   return (
//     <div className="bg-gray-900 text-white pt-20 px-6 flex flex-col items-center justify-center mt-10">
      
//       {/* Hero Section */}
//       <div className="relative w-full">
//         <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center opacity-40"></div>
//         <div className="relative text-center max-w-3xl mx-auto py-20">
//           <h1 className="text-4xl md:text-5xl font-bold">The Future of Research Collaboration</h1>
//           <p className="mt-4 text-lg text-gray-300">
//             Discover, discuss, and collaborate on research papers, datasets, and trending discussions.
//           </p>
//           <div className="mt-6 flex space-x-4 justify-center">
//             <Link to="/signup" className="px-6 py-2 bg-neonPink text-white rounded-full shadow-neon hover:opacity-80">           
//               Get Started
//             </Link>
//             <Link to="/research" className="px-6 py-2 bg-neonGreen text-white rounded-full shadow-neon hover:opacity-80">
//               Browse Research
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Trending Research Papers Section */}
//       <Section
//         title="Trending Research Papers"
//         link="/trending"
//         papers={trendingError ? fallbackTrending : trendingPapers}
//       />

//       {/* Datasets Section */}
//       <Section
//         title="Datasets"
//         link="/datasets"
//         papers={datasetsError ? fallbackDatasets : datasets}
//       />

//       {/* Research Papers Section */}
//       <Section
//         title="Research Papers"
//         link="/research-papers"
//         papers={researchError ? fallbackResearchPapers : researchPapers}
//       />

//     </div>
//   );
// };

// // ✅ Modified Section Component to Accept Data
// const Section = ({ title, link, papers = [] }) => {
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
//         {papers.map((paper, index) => (
//           <Card key={index} title={paper.title} author={paper.author} link={paper.link} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import Section from "../components/Section";

// // const Home = () => {
// //   const [trendingPapers, setTrendingPapers] = useState([]);
// //   const [researchPapers, setResearchPapers] = useState([]);
// //   const [datasets, setDatasets] = useState([]);

// //   const TRENDING_API = `https://api.core.ac.uk/v3/search/works/?q=trending`; 
// //   const RESEARCH_API = "https://api.core.ac.uk/v3/search/works/?q=latest"; 
// //   const DATASETS_API = "https://your-api.com/datasets"; 

// //   useEffect(() => {
// //     const fetchData = async (url, setter) => {
// //       try {
// //         const response = await fetch(url);
// //         const data = await response.json();
// //         setter(data);
// //       } catch (error) {
// //         console.error(`Error fetching from ${url}:`, error);
// //       }
// //     };

// //     fetchData(TRENDING_API, setTrendingPapers);
// //     fetchData(RESEARCH_API, setResearchPapers);
// //     fetchData(DATASETS_API, setDatasets);
// //   }, []);

// //   return (
// //     <div className="bg-gray-900 text-white pt-20 px-6 flex flex-col items-center justify-center mt-10">
      
// //       {/* Hero Section */}
// //       <div className="relative w-full">
// //         <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat opacity-40"></div>
// //         <div className="relative text-center max-w-3xl mx-auto py-20">
// //           <h1 className="text-4xl md:text-5xl font-bold text-white">
// //             The Future of Research Collaboration
// //           </h1>
// //           <p className="mt-4 text-lg text-gray-300">
// //             Discover, discuss, and collaborate on research papers, datasets, and trending discussions.
// //           </p>
// //           <div className="mt-6 flex space-x-4 justify-center">
// //             <Link to="/signup" className="px-6 py-2 bg-neonPink text-white rounded-full shadow-neon hover:opacity-80">
// //               Get Started
// //             </Link>
// //             <Link to="/research" className="px-6 py-2 bg-neonGreen text-white rounded-full shadow-neon hover:opacity-80">
// //               Browse Research
// //             </Link>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Sections */}
// //       <Section title="Trending Research Papers" link="/trending" data={trendingPapers} />
// //       <Section title="Datasets" link="/datasets" data={datasets} />
// //       <Section title="Research Papers" link="/research-papers" data={researchPapers} />
      
// //     </div>
// //   );
// // };

// // export default Home;


// // // import React from "react";
// // // import { Link } from "react-router-dom";
// // // import Card from "../components/Card";

// // // const Home = () => {

// // //   const [trendingPapers, setTrendingPapers] = useState([]);
// // //   const API_URL = "https://your-api.com/trending-papers"; // Replace with actual API

// // //   useEffect(() => {
// // //     const fetchTrendingPapers = async () => {
// // //       try {
// // //         const response = await fetch(API_URL);
// // //         const data = await response.json();
// // //         setTrendingPapers(data); // Assuming API returns an array of papers
// // //       } catch (error) {
// // //         console.error("Error fetching trending papers:", error);
// // //       }
// // //     };

// // //     fetchTrendingPapers();
// // //   }, []);


// // //   return (
// // //     <div className="bg-gray-900 text-white pt-20 px-6 flex flex-col items-center justify-center mt-10">
      
// // //       {/* Hero Section with Full Background */}
// // //       <div className="relative w-full">
// // //         {/* Background Image */}
// // //         <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat opacity-40"></div>

// // //         {/* Hero Content */}
// // //         <div className="relative text-center max-w-3xl mx-auto py-20">
// // //           <h1 className="text-4xl md:text-5xl font-bold text-white">
// // //             The Future of Research Collaboration
// // //           </h1>
// // //           <p className="mt-4 text-lg text-gray-300">
// // //             Discover, discuss, and collaborate on research papers, datasets, and trending discussions.
// // //           </p>

// // //           <div className="mt-6 flex space-x-4 justify-center">
// // //             <Link to="/signup" className="px-6 py-2 bg-neonPink text-white rounded-full shadow-neon hover:opacity-80">           
// // //               Get Started
// // //             </Link>
// // //             <Link to="/research" className="px-6 py-2 bg-neonGreen text-white rounded-full shadow-neon hover:opacity-80">
// // //               Browse Research
// // //             </Link>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Trending Research Papers */}
// // //       <Section title="Trending Research Papers" link="/trending" />

// // //       {/* Datasets */}
// // //       <Section title="Datasets" link="/datasets" />

// // //       {/* Research Papers */}
// // //       <Section title="Research Papers" link="/papers" />

// // //     </div>
// // //   );
// // // };

// // // // Reusable Section Component
// // // // const Section = ({ title, link }) => {
// // // //   return (
// // // //     <div className="max-w-7xl mx-auto my-12">
// // // //       <div className="flex justify-between items-center mb-6">
// // // //         <h2 className="text-3xl font-bold">{title}</h2>
// // // //         <Link to={link} className="text-green-400 hover:text-green-300 transition duration-300">
// // // //           View All →
// // // //         </Link>
// // // //       </div>

// // // //       {/* Cards */}
// // // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// // // //         {[1, 2, 3, 4].map((item) => (
// // // //           <Card key={item} />
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // Reusable Section Component
// // // const Section = ({ title, link, data }) => {
// // //   return (
// // //     <div className="max-w-7xl mx-auto my-12">
// // //       <div className="flex justify-between items-center mb-6">
// // //         <h2 className="text-3xl font-bold">{title}</h2>
// // //         <Link to={link} className="text-green-400 hover:text-green-300 transition duration-300">
// // //           View All →
// // //         </Link>
// // //       </div>

// // //       {/* Cards */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// // //         {data.slice(0, 4).map((paper) => (
// // //           <div key={paper.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
// // //             <h3 className="text-xl font-semibold">{paper.title}</h3>
// // //             <p className="text-gray-400 text-sm">{paper.author}</p>
// // //             <Link to={`/paper/${paper.id}`} className="text-green-400 hover:underline mt-2 block">
// // //               Read More →
// // //             </Link>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };


// // // export default Home;



// // // // import React from "react";
// // // // import { Link } from "react-router-dom";
// // // // import Card from "../components/Card";

// // // // const Home = () => {
// // // //   return (
// // // //     <div className="bg-gray-900 text-white pt-20 px-6 flex flex-col items-center justify-center">
      
// // // //       {/* Hero Section with Background UNDER it */}
// // // //       <div className="relative w-full text-center max-w-3xl mx-auto mt-16 pb-10 pt-5">
// // // //         <h1 className="text-4xl md:text-5xl font-bold text-neonGreen py-8">
// // // //           The Future of Research Collaboration
// // // //         </h1>
// // // //         <p className="mt-4 text-lg text-gray-300">
// // // //           Discover, discuss, and collaborate on research papers, datasets, and trending discussions.
// // // //         </p>

// // // //         <div className="mt-6 flex space-x-4 justify-center">
// // // //           <Link to="/signup" className="px-6 py-2 bg-neonPink text-white rounded-full shadow-neon hover:opacity-80">           
// // // //             Get Started
// // // //           </Link>
// // // //           <Link to="/research" className="px-6 py-2 bg-neonGreen text-black rounded-full shadow-neon hover:opacity-80">
// // // //             Browse Research
// // // //           </Link>
// // // //         </div>

// // // //         {/* Background UNDER Hero */}
// // // //         <div className="absolute bottom-[-40px] left-0 w-full h-40 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat opacity-40"></div>
// // // //       </div>

// // // //       {/* Trending Research Papers */}
// // // //       <Section title="Trending Research Papers" link="/trending" />

// // // //       {/* Datasets */}
// // // //       <Section title="Datasets" link="/datasets" />

// // // //       {/* Research Papers */}
// // // //       <Section title="Research Papers" link="/papers" />

// // // //     </div>
// // // //   );
// // // // };

// // // // // Reusable Section Component
// // // // const Section = ({ title, link }) => {
// // // //   return (
// // // //     <div className="max-w-7xl mx-auto my-12">
// // // //       <div className="flex justify-between items-center mb-6">
// // // //         <h2 className="text-3xl font-bold">{title}</h2>
// // // //         <Link to={link} className="text-green-400 hover:text-green-300 transition duration-300">
// // // //           View All →
// // // //         </Link>
// // // //       </div>

// // // //       {/* Cards */}
// // // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// // // //         {[1, 2, 3, 4].map((item) => (
// // // //           <Card key={item} />
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Home;


// // // // // import React from "react";
// // // // // import { Link } from "react-router-dom";
// // // // // import Card from "../components/Card"

// // // // // const Home = () => {
// // // // //   return (
// // // // //     <div className="bg-gray-900 text-white pt-20 px-6 flex flex-col items-center justify-center">
// // // // //        {/* Background Image */}
// // // // //   <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat opacity-40">
// // // // //       <div className="text-center max-w-3xl mx-auto mt-16 pb-10 pt-5">
// // // // //         <h1 className="text-4xl md:text-5xl font-bold text-neonGreen py-8">
// // // // //           The Future of Research Collaboration
// // // // //         </h1>
// // // // //         <p className="mt-4 text-lg text-gray-300">
// // // // //           Discover, discuss, and collaborate on research papers, datasets, and trending discussions.
// // // // //         </p>

// // // // //         <div className="mt-6 flex space-x-4">
// // // // //           <Link to="/signup" className="px-6 py-2 bg-neonPink text-white rounded-full shadow-neon hover:opacity-80">           Get Started
// // // // //           </Link>
// // // // //           <Link to="/research" className="px-6 py-2 bg-neonGreen text-black rounded-full shadow-neon hover:opacity-80">
// // // // //             Browse Research
// // // // //           </Link>
// // // // //         </div>
// // // // //         {/* </div> */}
// // // // //       </div>
// // // // //       </div>
      

// // // // //       {/* Trending Research Papers */}
// // // // //       <Section title="Trending Research Papers" link="/trending" />

// // // // //       {/* Datasets */}
// // // // //       <Section title="Datasets" link="/datasets" />

// // // // //       {/* Research Papers */}
// // // // //       <Section title="Research Papers" link="/papers" />

// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // Reusable Section Component
// // // // // const Section = ({ title, link }) => {
// // // // //   return (
// // // // //     <div className="max-w-7xl mx-auto my-12">
// // // // //       <div className="flex justify-between items-center mb-6">
// // // // //         <h2 className="text-3xl font-bold">{title}</h2>
// // // // //         <Link to={link} className="text-green-400 hover:text-green-300 transition duration-300">
// // // // //           View All →
// // // // //         </Link>
// // // // //       </div>

// // // // //       {/* Cards */}
// // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// // // // //         {[1, 2, 3, 4].map((item) => (
// // // // //           <Card key={item} />
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };



// // // // // export default Home;



// // // // // import React from "react";
// // // // // import { Link } from "react-router-dom";

// // // // // const Home = () => {
// // // // //   return (
// // // // //     <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
// // // // //       <div className="text-center max-w-3xl">
// // // // //         <h1 className="text-4xl md:text-6xl font-bold text-neonGreen">
// // // // //           The Future of Research Collaboration
// // // // //         </h1>
// // // // //         <p className="mt-4 text-lg text-gray-300">
// // // // //           Discover, discuss, and collaborate on research papers, datasets, and trending discussions.
// // // // //         </p>

// // // // //         <div className="mt-6 flex space-x-4">
// // // // //           <Link to="/signup" className="px-6 py-2 bg-neonPink text-white rounded-full shadow-neon hover:opacity-80">
// // // // //             Get Started
// // // // //           </Link>
// // // // //           <Link to="/research" className="px-6 py-2 bg-neonGreen text-black rounded-full shadow-neon hover:opacity-80">
// // // // //             Browse Research
// // // // //           </Link>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Home;
