import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page bg-gray-100 p-6 rounded-lg shadow-md">
  <div className="container">
    {user && user.role === "Job Seeker" ? (
      <>
        <h1 className="text-2xl font-semibold mb-4">My Applications</h1>
        {applications.length <= 0 ? (
          <h4 className="text-lg text-gray-600">No Applications Found</h4>
        ) : (
          applications.map((element) => (
            <JobSeekerCard
              element={element}
              key={element._id}
              deleteApplication={deleteApplication}
              openModal={openModal}
            />
          ))
        )}
      </>
    ) : (
      <>
        <h1 className="text-2xl font-semibold mb-4">Applications From Job Seekers</h1>
        {applications.length <= 0 ? (
          <h4 className="text-lg text-gray-600">No Applications Found</h4>
        ) : (
          applications.map((element) => (
            <EmployerCard
              element={element}
              key={element._id}
              openModal={openModal}
            />
          ))
        )}
      </>
    )}
  </div>
  {modalOpen && (
    <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
  )}
</section>
);
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card bg-white p-4 mb-4 rounded-lg shadow">
      <div className="detail">
        <p className="font-semibold">
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>Cover Letter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume mt-2">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
          className="cursor-pointer border border-gray-300 rounded"
        />
      </div>
      <div className="btn_area mt-4">
        <button
          onClick={() => deleteApplication(element._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
        >
          Delete Application
        </button>
      </div>
    </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
       <div className="job_seeker_card bg-white p-4 mb-4 rounded-lg shadow">
      <div className="detail">
        <p className="font-semibold">
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>Cover Letter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume mt-2">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
          className="cursor-pointer border border-gray-300 rounded"
        />
      </div>
    </div>
    </>
  );
};
