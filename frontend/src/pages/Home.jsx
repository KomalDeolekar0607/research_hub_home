import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const Home = () => {
  const [trendingPapers, setTrendingPapers] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [researchPapers, setResearchPapers] = useState([]);
  const [trendingError, setTrendingError] = useState(false);
  const [datasetsError, setDatasetsError] = useState(false);
  const [researchError, setResearchError] = useState(false);

  const API_KEY = "your_actual_api_key_here"; // Replace with your valid API Key

  const API_URLS = {
    trending: "https://api.core.ac.uk/v3/search/works/?q=trending",
    datasets: "https://api.example.com/datasets", // Replace with actual dataset API
    research: "https://api.example.com/research-papers", // Replace with actual research paper API
  };

  
  const fetchData = async (type, setData, setError) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URLS[type]);
      console.log(`${type} API Response:`, response.data);

      if (response.data.results && response.data.results.length > 0) {
        setData(response.data.results.slice(0, 4)); // Show top 4 items
      } else {
        throw new Error("No data found");
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData("trending", setTrendingPapers, setTrendingError);
    fetchData("datasets", setDatasets, setDatasetsError);
    fetchData("research", setResearchPapers, setResearchError);
  }, []);

  // 🔹 Fallback Static Data (Used if API fails)
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

      {/* Trending Research Papers Section */}
      <Section
        title="Trending Research Papers"
        link="/trending"
        papers={trendingError ? fallbackTrending : trendingPapers}
      />

      {/* Datasets Section */}
      <Section
        title="Datasets"
        link="/datasets"
        papers={datasetsError ? fallbackDatasets : datasets}
      />

      {/* Research Papers Section */}
      <Section
        title="Research Papers"
        link="/research-papers"
        papers={researchError ? fallbackResearchPapers : researchPapers}
      />

    </div>
  );
};

// ✅ Modified Section Component to Accept Data
const Section = ({ title, link, papers = [] }) => {
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
        {papers.map((paper, index) => (
          <Card key={index} title={paper.title} author={paper.author} link={paper.link} />
        ))}
      </div>
    </div>
  );
};

export default Home;


