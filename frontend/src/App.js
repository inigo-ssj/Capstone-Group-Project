import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

// Import your components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import ProductPage from "./components/ProductPage";

// Set up Axios default base URL for API calls
axios.defaults.baseURL = "http://localhost:5001/api"; // Backend server URL

function App() {
  const [user, setUser] = useState(null);

  // Fetch user data if logged in
  useEffect(() => {
    // You can add a call here to get the user data from the backend if needed
    // Example: axios.get('/users/profile') to fetch the logged-in user profile
  }, []);

  return (
    <Router>
      <div className="App">
        <Header user={user} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
