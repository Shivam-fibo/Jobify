import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="application bg-gray-100 p-6 rounded-lg shadow-md">
    <div className="container">
      <h3 className="text-xl font-semibold mb-4">Application Form</h3>
      <form onSubmit={handleApplication} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Your Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <textarea
          placeholder="Cover Letter..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          rows="5"
        />
        <div>
          <label className="block text-lg font-medium mb-1">Select Resume</label>
          <input
            type="file"
            accept=".pdf, .jpg, .png"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <button type="submit" className="btn bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">
          Send Application
        </button>
      </form>
    </div>
  </section>
  
  );
};

export default Application;
