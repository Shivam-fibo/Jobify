import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        "http://localhost:4000/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
     <div className="job_post job_post_page bg-gray-100 mt-4 p-6 rounded-lg shadow-md">
  <div className="post_container">
    <h3 className="text-xl font-semibold mb-4">POST NEW JOB</h3>
    <form onSubmit={handleJobPost}>
      <div className="post_wrapper mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
          className="border border-gray-300 p-2 rounded w-full"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mt-2"
        >
          <option value="">Select Category</option>
          <option value="Graphics & Design">Graphics & Design</option>
          <option value="Mobile App Development">Mobile App Development</option>
          <option value="Frontend Web Development">Frontend Web Development</option>
          <option value="MERN Stack Development">MERN STACK Development</option>
          <option value="Account & Finance">Account & Finance</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Video Animation">Video Animation</option>
          <option value="MEAN Stack Development">MEAN STACK Development</option>
          <option value="MEVN Stack Development">MEVN STACK Development</option>
          <option value="Data Entry Operator">Data Entry Operator</option>
        </select>
      </div>
      <div className="post_wrapper mb-4">
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          className="border border-gray-300 p-2 rounded w-full"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="border border-gray-300 p-2 rounded w-full mt-2"
        />
      </div>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        className="border border-gray-300 p-2 rounded w-full mb-4"
      />
      <div className="salary_wrapper mb-4 flex flex-col">
        <select
          value={salaryType}
          onChange={(e) => setSalaryType(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option value="default">Select Salary Type</option>
          <option value="Fixed Salary">Fixed Salary</option>
          <option value="Ranged Salary">Ranged Salary</option>
        </select>
        <div className="mt-2">
          {salaryType === "default" ? (
            <p className="text-red-500">Please provide Salary Type *</p>
          ) : salaryType === "Fixed Salary" ? (
            <input
              type="number"
              placeholder="Enter Fixed Salary"
              value={fixedSalary}
              onChange={(e) => setFixedSalary(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          ) : (
            <div className="ranged_salary flex space-x-2">
              <input
                type="number"
                placeholder="Salary From"
                value={salaryFrom}
                onChange={(e) => setSalaryFrom(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              />
              <input
                type="number"
                placeholder="Salary To"
                value={salaryTo}
                onChange={(e) => setSalaryTo(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
          )}
        </div>
      </div>
      <textarea
        rows="10"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Job Description"
        className="border border-gray-300 p-2 rounded w-full mb-4"
      />
      <button className="btn bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200" type="submit">Create Job</button>
    </form>
  </div>
</div>

    </>
  );
};

export default PostJob;
