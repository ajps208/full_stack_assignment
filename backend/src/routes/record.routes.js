import express from "express";
import Record from "../models/Record.js";
// UUID for generating unique IDs
import { v4 as uuid } from "uuid";

const router = express.Router();

// Regular expressions
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+[1-9]\d{6,14}$/; 
const urlRegex = /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

// Create record endpoint(POST http://localhost:5000/api/records)
router.post("/", async (req, res) => {
  try {

    const { name, email, phoneNumber, link, dob } = req.body;

    // Required fields
    if (!name || !email || !phoneNumber) {
      return res.status(400).json({ message: "Name, Email and Phone are required" });
    }

    // Email
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Phone (supports multiple country codes)
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        message: "Invalid phone number. Use country code (e.g. +919876543210)"
      });
    }

    // Optional URL
    if (link && !urlRegex.test(link)) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    // Optional DOB
    if (dob && isNaN(new Date(dob))) {
      return res.status(400).json({ message: "Invalid DOB" });
    }

    const record = await Record.create({
      uid: uuid(),
      name: name.trim(),
      email: email.toLowerCase(),
      phoneNumber,
      link,
      dob,
      status: "PENDING"
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all records endpoint(GET http://localhost:5000/api/records/success)
router.get("/success", async (req, res) => {
  const data = await Record.find({ status: "SUCCESS" });
  res.json(data);
});

export default router;
