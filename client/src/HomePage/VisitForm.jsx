import React, { useState } from "react";

export default function ScheduleVisit() {
  const [formData, setFormData] = useState({
    date: "",
    timeSlot: "",
    name: "",
    contact: "",
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Schedule a Visit</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-gray-700">Select Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

         
          <div>
            <label className="block text-gray-700">Select Time Slot</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 mt-1"
            >
              <option value="">-- Select a slot --</option>
              <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
              <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
              <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
              <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
            </select>
          </div>

         
          <div>
            <label className="block text-gray-700">Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          
          <div>
            <label className="block text-gray-700">Contact Number</label>
            <input
              type="tel"
              name="contact"
              placeholder="Enter your contact number"
              value={formData.contact}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="w-full border rounded px-3 py-2 mt-1"
            />
            <small className="text-gray-500">Enter a 10-digit number</small>
          </div>

          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Schedule Visit
          </button>
        </form>
      </div>
    </div>
  );
}
