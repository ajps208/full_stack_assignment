import React, { useState } from "react";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";

import { api } from "../Services/api";
import { formatDOB } from "../Helpers/helpers";

// helpers

const INITIAL_FORM = {
  name: "",
  email: "",
  phoneNumber: "",
  link: "",
  dob: "",
};

const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const Form = ({ refresh }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  //   handle change
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // form validation
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";

    if (!form.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!isPossiblePhoneNumber(form.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    if (form.link && !isValidURL(form.link)) {
      newErrors.link = "Enter a valid URL";
    }

    if (form.dob && isNaN(new Date(form.dob).getTime())) {
      newErrors.dob = "Invalid date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the highlighted errors");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        dob: form.dob ? formatDOB(form.dob) : null,
      };

      await api.post("/", payload);

      toast.success("Form submitted successfully 🎉");
      setForm(INITIAL_FORM);
      setErrors({});
    } catch (err) {
      console.error("API Error:", err);

      let errorMessage = "Something went wrong";

      if (err.response) {
        errorMessage =
          err.response.data?.message ||
          err.response.data?.error ||
          "Internal Server Error";
      } else if (err.request) {
        errorMessage = "Server not responding";
      } else {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- UI -------------------- */

  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      {/* Phone */}
      <PhoneInput
        international
        defaultCountry="IN"
        placeholder="Enter phone number"
        value={form.phoneNumber}
        onChange={(value) => handleChange("phoneNumber", value)}
      />
      {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

      {/* URL */}
      <input
        placeholder="Portfolio / GitHub / LinkedIn URL"
        value={form.link}
        onChange={(e) => handleChange("link", e.target.value)}
      />
      {errors.link && <p className="error">{errors.link}</p>}

      {/* DOB */}
      <input
        type="date"
        value={form.dob}
        onChange={(e) => handleChange("dob", e.target.value)}
      />
      {errors.dob && <p className="error">{errors.dob}</p>}

      <button disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
    </form>
  );
};
