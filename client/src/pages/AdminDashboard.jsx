import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setUploadStatus('');
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Upload the file to the backend
  const uploadFile = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/api/admin/csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus(`Upload successful: ${response.data.message}`);
    } catch (error) {
      setUploadStatus('Error uploading file. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Welcome to the Admin Dashboard!</h1>
      <button className="open-modal-btn" onClick={openModal}>
        Upload Patient CSV
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Upload Patient CSV</h2>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="file-input"
            />
            <button className="upload-btn" onClick={uploadFile}>
              Upload
            </button>
            <button className="close-modal-btn" onClick={closeModal}>
              Close
            </button>
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
