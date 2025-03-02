import React, { useState } from "react";

const UploadModal = ({ isOpen, onClose, onUpload, type }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!title || !category || !description || !file) {
      alert("Please fill in all fields and select a file.");
      return;
    }
    onUpload({ id: Date.now(), title, category, description, fileName: file.name });
    setTitle("");
    setCategory("");
    setDescription("");
    setFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 text-white">
        <h2 className="text-xl font-bold mb-4">Upload {type}</h2>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-800" />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-800" />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-800"></textarea>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full mb-4" />
        <div className="flex justify-between">
          <button onClick={onClose} className="bg-red-500 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleUpload} className="bg-green-500 px-4 py-2 rounded">Upload</button>
        </div>
      </div>
    </div>
  );
};

const UploadPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [uploads, setUploads] = useState([]);

  const handleOpenModal = (type) => {
    setUploadType(type);
    setIsModalOpen(true);
  };

  const handleUpload = (newItem) => {
    setUploads([...uploads, newItem]);
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Upload Research Papers & Datasets</h1>
      <div className="flex gap-4 mb-6">
        <button onClick={() => handleOpenModal("Research Paper")} className="bg-blue-500 px-4 py-2 rounded">Upload Research Paper</button>
        <button onClick={() => handleOpenModal("Dataset")} className="bg-purple-500 px-4 py-2 rounded">Upload Dataset</button>
      </div>
      
      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onUpload={handleUpload} type={uploadType} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uploads.map((upload) => (
          <div key={upload.id} className="bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{upload.title}</h3>
            <p className="text-sm text-green-400">Category: {upload.category}</p>
            <p className="text-gray-300 truncate">{upload.description}</p>
            <p className="text-blue-300 mt-2">File: {upload.fileName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadPage;
