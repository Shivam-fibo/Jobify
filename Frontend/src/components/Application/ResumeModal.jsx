import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-lg w-full">
      <span
        className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-900 transition duration-200"
        onClick={onClose}
      >
        &times;
      </span>
      <img src={imageUrl} alt="resume" className="w-full h-auto rounded" />
    </div>
  </div>
  
  );
};

export default ResumeModal;
