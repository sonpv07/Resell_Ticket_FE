import React from "react";
import Header from "../../components/Header"; // Thay đổi đường dẫn
import SearchBar from "../../components/SearchBar"; // Thay đổi đường dẫn
import Footer from "../../components/Footer"; // Thay đổi đường dẫn
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <h1 className="text">Welcome to Ticket Reselling Platform</h1>

      <SearchBar />

      <Footer />
    </div>
  );
};

export default HomePage;
