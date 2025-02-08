import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    degree: "",
    school: "",
    feildofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { degree, school, feildofstudy, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addEducation(formData, navigate);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-3">Add Education</h2>
      <p className="lead">
        <i className="fas fa-briefcase"></i> Add your education
      </p>
      <form onSubmit={onSubmit} className="form">
        <div className="mb-3">
          <label className="form-label">Degree</label>
          <input
            type="text"
            className="form-control"
            name="degree"
            value={degree}
            onChange={onChange}
            placeholder="Enter your Degree"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">School</label>
          <input
            type="text"
            className="form-control"
            name="school"
            value={school}
            onChange={onChange}
            placeholder="Enter school name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Feild of Study</label>
          <input
            type="text"
            className="form-control"
            name="feildofstudy"
            value={feildofstudy}
            onChange={onChange}
            placeholder="Feild of Study"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">From Date</label>
          <input
            type="date"
            className="form-control"
            name="from"
            value={from}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">To Date</label>
          <input
            type="date"
            className="form-control"
            name="to"
            value={to}
            onChange={onChange}
            disabled={current}
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="current"
            checked={current}
            onChange={() => setFormData({ ...formData, current: !current })}
          />
          <label className="form-check-label">Current</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={description}
            onChange={onChange}
            placeholder="Describe your program"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Add Education</button>
      </form>
    </div>
  );
};

export default connect(null, { addEducation })(AddEducation);
