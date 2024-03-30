import React from "react";
import axios from "axios";
import { toast, Toast } from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const MyJobs = async () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState();
  const [isAuthorized, user] = useState();

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "https://localhost:4000/api/v1/job/getmyjobs",
          {
            withCredentials: true,
          }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  });

  if (!isAuthorized || (user && user.role != Employer)) {
    navigateTo("/");
  }

  // function for enabling editing mode

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };
  // function for desabling  editing mode
  const handleDesableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // function for editing job

  const hadleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost4000/api/v1/job/update${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // condition for deleting job
  const handleJobDelete = async (jobId) => {
    await axios
      .delete(`http://localhost4000/api/v1/job/delete${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) => {
      prevJobs.map((job) => {
        job._id === jobId ? { ...job, [field]: value } : job;
      });
    });
  };
  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h3>Your Posted Jobs</h3>
          {myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((element) => {
                  return (
                    <div className="card" key={element._id}>
                      <div className="content">
                        <div className="short_fields">
                          



                          <div>
                            <span>Title:</span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.title}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>



                             



                          <div>
                            <span>Country:</span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.title}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "country",
                                  e.target.value
                                )
                              }
                            />
                          </div>


                                 



                          <div>
                            <span>City:</span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.city}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "city",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                                 



                          <div>
                            <span>Category:</span>
                           <select ></select>
                          </div>



 

 


 
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p>You have not posted any job </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
