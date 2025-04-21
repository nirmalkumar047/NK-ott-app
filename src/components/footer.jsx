import React, { useState } from "react";

function Footer() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted URL: ${url}`);
    setUrl(""); // Clear input after submission
  };

  return (
    <footer className="flex flex-col md:flex-row p-10 justify-between mt-20 bg-gray-900 text-white">
      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold">Contact Info</h3>
        <p>Email: <a href="mailto:nk4015@srmist.edu.in" className="text-blue-400 hover:underline">nk4015@srmist.edu.in</a></p>
        <p>Phone: (123) 456-7890</p>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-lg font-semibold">Follow Us</h3>
        <ul className="mt-2 space-y-1">
          <li><a href="https://github.com/nirmalkumar047" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">GitHub</a></li>
          <li><a href="https://bento.me/nirmal-kumar-02" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Bento</a></li>
          <li><a href="https://www.instagram.com/nirmal_kumar__002/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Instagram</a></li>
        </ul>
      </div>

      {/* URL Input Form */}
      <div>
        <h3 className="text-lg font-semibold">Submit a URL</h3>
        <form onSubmit={handleSubmit} className="mt-2 flex flex-col space-y-2">
          <input
            type="url"
            placeholder="Enter URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="p-2 rounded-md text-black border border-gray-300"
            required
          />
          <button type="submit" className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Submit
          </button>
        </form>
      </div>

      {/* Copyright */}
      <div className="mt-4 md:mt-0 text-center md:text-left">
        <p>&copy; 2025 NK Ott app. All rights reserved.</p>
        <p>Nirmal Kumar</p>
      </div>
    </footer>
  );
}

export default Footer;
