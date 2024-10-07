import React from "react";
import "./HomePage.scss";
import SearchBar from "../../components/search-bar/SearchBar";
import {
  LOCATION_DATA,
  CATEGORY_DATA,
  DATE_FILTER_DATA,
} from "../../configs/constant";
import LocationCard from "../../components/auth/location-card/LocationCard";

const HomePage = () => {
  return (
    <>
      <h1 className="text">The safest way to buy and sell tickets</h1>

      <SearchBar />
      <div className="home-page">
        <div className="home-page__filter">
          <h2 className="home-page__title">Find Your Next Events</h2>

          <div className="home-page__filter-list">
            {DATE_FILTER_DATA.map((item) => {
              return (
                <div className="home-page__filter-list__item">
                  <p>{item.label}</p>
                  {item.icon}
                </div>
              );
            })}
          </div>
        </div>

        <div className="home-page__location">
          <h2 className="home-page__title">Categories</h2>

          <div className="home-page__location-list">
            {CATEGORY_DATA.map((location) => {
              return (
                <LocationCard
                  key={location.id}
                  imageUrl={location.url}
                  name={location.name}
                />
              );
            })}
          </div>
        </div>

        <div className="home-page__location">
          <h2 className="home-page__title">Locations</h2>

          <div className="home-page__location-list">
            {LOCATION_DATA.map((location) => {
              return (
                <LocationCard
                  key={location.id}
                  imageUrl={location.url}
                  name={location.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
