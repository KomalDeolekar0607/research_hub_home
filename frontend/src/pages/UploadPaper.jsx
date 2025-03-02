import React, { useState } from "react";

const UploadResearchPaper = ({ onUpload }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [abstract, setAbstract] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !abstract || !file) {
      alert("All fields are required!");
      return;
    }
    const newPaper = { id: Date.now(), title, author, abstract, file };
    onUpload(newPaper);
    setTitle("");
    setAuthor("");
    setAbstract("");
    setFile(null);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Upload Research Paper</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 rounded bg-gray-700 text-white" />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} className="p-2 rounded bg-gray-700 text-white" />
        <textarea placeholder="Abstract" value={abstract} onChange={(e) => setAbstract(e.target.value)} className="p-2 rounded bg-gray-700 text-white"></textarea>
        <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} className="p-2 rounded bg-gray-700 text-white" />
        <button type="submit" className="p-3 bg-green-500 rounded-lg hover:bg-green-400 transition">Upload</button>
      </form>
    </div>
  );
};

export default UploadResearchPaper;
