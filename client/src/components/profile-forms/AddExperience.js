import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { title, company, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addExperience(formData, navigate);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-3">Add Experience</h2>
      <p className="lead">
        <i className="fas fa-briefcase"></i> Add any job experience you've had
      </p>
      <form onSubmit={onSubmit} className="form">
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Enter job title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            type="text"
            className="form-control"
            name="company"
            value={company}
            onChange={onChange}
            placeholder="Enter company name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={location}
            onChange={onChange}
            placeholder="Enter location"
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
          <label className="form-check-label">Current Job</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={description}
            onChange={onChange}
            placeholder="Describe your role"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Add Experience</button>
      </form>
    </div>
  );
};

export default connect(null, { addExperience })(AddExperience);
