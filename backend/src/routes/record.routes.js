import express from "express";
import Record from "../models/Record.js";
import { generateNumericId } from "../helpers/helpers.js";

const router = express.Router();

// Regular expressions
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+[1-9]\d{6,14}$/;
const urlRegex = /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

// Create record endpoint(POST http://localhost:5000/api/records)
router.post("/", async (req, res) => {
  try {
    const { name, email, phoneNumber, link, dob } = req?.body;

    // Required fields
    if (!name || !email || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "Name, Email and Phone are required" });
    }

    // Email
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Phone (supports multiple country codes)
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        message: "Invalid phone number. Use country code (e.g. +919876543210)",
      });
    }

    // Optional URL
    if (link && !urlRegex.test(link)) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    // Optional DOB
    let dobDate;
    if (dob) {
      if (!dobRegex.test(dob)) {
        return res.status(400).json({ message: "DOB must be DD/MM/YYYY" });
      }

      const [day, month, year] = dob.split("/");
      dobDate = new Date(Date.UTC(year, month - 1, day));

      if (isNaN(dobDate)) {
        return res.status(400).json({ message: "Invalid DOB date" });
      }
    }

    const record = await Record.create({
      uid: generateNumericId(),
      name: name.trim(),
      email: email.toLowerCase(),
      phoneNumber,
      ...(link && { link }),
      ...(dobDate && { dob: dobDate }),
      status: "PENDING",
    });

    res.status(201).json(record);
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: "Server error" });
  }
});


// Get all records endpoint(GET http://localhost:5000/api/records/success)
router.get("/success", async (req, res) => {
  const data = await Record.find({ status: "SUCCESS" });
  res.json(data);
});

export default router;
