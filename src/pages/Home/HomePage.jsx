import React from "react";
import "./HomePage.scss";
import Header from "../../components/header/Header";
import SearchBar from "../../components/search-bar/SearchBar";
import Footer from "../../components/footer/Footer";

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
