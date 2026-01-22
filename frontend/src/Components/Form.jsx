import React, { useState } from "react";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import { api } from "../Services/api";
import { formatDOB } from "../Helpers/helpers";
import { FloatingInput } from "./FloatingInput";

// Initial form
const INITIAL_FORM = {
  name: "",
  email: "",
  phoneNumber: "",
  link: "",
  dob: "",
};

export const Form = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Update form fields and clear error
  const updateField = (field, value) => {
    setForm((prev) => {
      if (prev[field] === value) return prev;
      return { ...prev, [field]: value };
    });

    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // Form validation
  const validate = () => {
    const err = {};

    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";

    if (!form.phoneNumber) err.phoneNumber = "Phone number is required";
    else if (!isPossiblePhoneNumber(form.phoneNumber))
      err.phoneNumber = "Invalid phone number";

    if (form.link) {
      try {
        new URL(form.link);
      } catch {
        err.link = "Enter a valid URL";
      }
    }

    if (form.dob && Number.isNaN(Date.parse(form.dob))) {
      err.dob = "Invalid date";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post("/", {
        ...form,
        ...(form.dob && { dob: formatDOB(form.dob) }),
      });

      toast.success("Submitted successfully");
      setForm(INITIAL_FORM);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        (err?.request ? "Server not responding" : err?.message) ||
        "Something went wrong";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Disable submit logic
  const isSubmitDisabled =
    loading ||
    !form.name.trim() ||
    !form.email.trim() ||
    !form.phoneNumber ||
    !isPossiblePhoneNumber(form.phoneNumber);
    

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Registration</h1>
        <p className="text-md text-slate-500">Please provide your details</p>
      </div>

      {/* Name */}
      <FloatingInput
        label={
          <>
            Full Name <span className="text-red-500">*</span>
          </>
        }
        value={form.name}
        error={errors.name}
        onChange={(e) => updateField("name", e.target.value)}
      />

      {/* Email */}
      <FloatingInput
        label={
          <>
            Email Address <span className="text-red-500">*</span>
          </>
        }
        type="email"
        value={form.email}
        error={errors.email}
        onChange={(e) => updateField("email", e.target.value)}
      />

      {/* Phone */}
      <div className="mb-6">
        <label className="block text-xs text-gray-600 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <PhoneInput
          international
          defaultCountry="IN"
          value={form.phoneNumber}
          onChange={(val) => updateField("phoneNumber", val)}
        />
        {errors.phoneNumber && (
          <p className="text-[10px] text-red-500 mt-1 font-semibold uppercase">
            {errors.phoneNumber}
          </p>
        )}
      </div>

      {/* Portfolio Link */}
      <FloatingInput
        label="Portfolio Link"
        value={form.link}
        error={errors.link}
        onChange={(e) => updateField("link", e.target.value)}
      />

      {/* DOB */}
      <div className="mb-6">
        <label className="block text-xs text-gray-600 mb-1">
          Date of Birth
        </label>
        <input
          type="date"
          value={form.dob}
          onChange={(e) => updateField("dob", e.target.value)}
          className="w-full text-sm py-2 bg-transparent border-b-2 border-gray-100 outline-none focus:border-blue-600 transition uppercase"
        />
        {errors.dob && (
          <p className="text-[10px] text-red-500 mt-1 font-semibold uppercase">
            {errors.dob}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        disabled={isSubmitDisabled}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Submit"}
      </button>

      <p className="text-xs text-gray-600 text-center mt-3">
        Fields marked with <span className="text-red-500 font-semibold">*</span> are required
      </p>
    </form>
  );
};
