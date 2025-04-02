import { useState } from "react";
import classNames from "classnames";
import {
  IoHomeOutline,
  IoOptions,
  IoGlobeOutline,
  IoPersonCircleSharp,
  IoSearchOutline,
  IoArrowForward,
  IoArrowBack,
} from "react-icons/io5";

import navCategories from "../navCategories.json";

const handleTypeClick = (e) => {
  if (!e.target.classList.contains("font-bold")) {
    alert(`Change to ${e.target.innerText}`);
  }
};

const handleLanguageClick = () => {
  alert("Open Language Menu");
};

const handleProfileClick = () => {
  alert("Open Profile Menu");
};

const handleInputClick = () => {
  alert("Open input popup");
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  alert("Search");
};

const handleFilterClick = () => {
  alert("Open Filter Menu");
};

const handleCarouselClick = () => {
  alert("Slide the carousel to show more options");
};

const Header = ({ handleCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  const handleCategoryClick = (index) => {
    setActiveCategory(index);
    handleCategoryChange();
  };

  return (
    <header className="shadow-onscroll fixed top-0 inset-x-0 bg-inherit z-2 ">
      <section className="container-7xl flex items-center justify-between py-3 lg:py-6 gap-1 sm:gap-4">
        <a href="#home" className="flex-grow-1 md:flex-grow-0 lg:pr-30">
          <h1 className="text-2xl font-bold text-rose-500 flex p-1 gap-2">
            <span aria-hidden="true">/\</span>
            <span>airbnb</span>
          </h1>
        </a>

        <nav className="md:order-1">
          <ul className="flex gap-1 sm:gap-4 items-center">
            <li className="hidden sm:block">
              <a href="#rent" className="text-nowrap">
                Airbnb your home
              </a>
            </li>
            <li>
              <button
                aria-label="Open language menu"
                className="btn-2 rounded-full p-2 text-2xl"
                onClick={() => {
                  handleLanguageClick();
                }}
              >
                <IoGlobeOutline aria-hidden="true" />
              </button>
            </li>
            <li>
              <button
                aria-label="Open profile menu"
                className="btn-2 rounded-full p-2 text-2xl"
                onClick={() => {
                  handleProfileClick();
                }}
              >
                <IoPersonCircleSharp aria-hidden="true" />
              </button>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-4">
          <div className="hidden lg:flex lg:hidden-onscroll gap-4">
            {["Homes", "Experiences"].map((item, i) => (
              <button
                key={i}
                className={classNames("px-4 py-2 rounded-md", {
                  "font-bold": i == 0,
                  "btn-3": i != 0,
                })}
                onClick={(e) => {
                  handleTypeClick(e);
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <form
            className="airbnb-form flex rounded-full border border-gray-200 shadow-md items-center"
            onSubmit={(e) => {
              handleFormSubmit(e);
            }}
          >
            <label className="hidden md:flex flex-col py-2 px-4 relative after:absolute after:inset-y-2 after:right-0 after:content-[''] after:border-r-1 after:border-gray-300">
              <span className="font-semibold text-xs">
                <span className="hidden lg:block lg:hidden-onscroll">
                  Where
                </span>
                <span className="lg:block-onscroll">Anywhere</span>
              </span>
              <input
                className="hidden lg:block lg:hidden-onscroll text-sm field-sizing-content"
                onClick={() => {
                  handleInputClick();
                }}
                type="text"
                placeholder="Seach destination"
              />
            </label>
            <label className="hidden md:flex flex-col py-2 px-4 relative after:absolute after:inset-y-2 after:right-0 after:content-[''] after:border-r-1 after:border-gray-300">
              <span className="font-semibold text-xs">
                <span className="hidden lg:block lg:hidden-onscroll">
                  Check in
                </span>
                <span className="lg:block-onscroll">Any week</span>
              </span>
              <input
                className="hidden lg:block lg:hidden-onscroll text-sm field-sizing-content"
                onClick={() => {
                  handleInputClick();
                }}
                type="text"
                placeholder="Add dates"
              />
            </label>
            <label className="hidden lg:flex lg:hidden-onscroll flex-col py-2 px-4 relative after:absolute after:inset-y-2 after:right-0 after:content-[''] after:border-r-1 after:border-gray-300">
              <span className="font-semibold text-xs">Check out</span>
              <input
                className="text-sm field-sizing-content"
                onClick={() => {
                  handleInputClick();
                }}
                type="text"
                placeholder="Add dates"
              />
            </label>
            <label className="hidden md:flex flex-col py-2 px-4">
              <span className="hidden lg:block lg:hidden-onscroll font-semibold text-xs">
                Who
              </span>
              <input
                className="text-sm field-sizing-content"
                onClick={() => {
                  handleInputClick();
                }}
                type="text"
                placeholder="Add guests"
              />
            </label>
            <button
              aria-label="Search"
              className="btn-1 rounded-full p-3 shrink-0 text-xl md:m-1 lg:m-2"
            >
              <IoSearchOutline aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>

      <hr className="border-gray-200" />

      <section className="container-7xl flex flex-col gap-4">
        <div className="flex align-center gap-4 items-center">
          <button
            aria-label="Previous Categories"
            onClick={() => {
              handleCarouselClick();
            }}
            className="btn-2 rounded-full p-2 text-xl hidden"
          >
            <IoArrowBack aria-hidden="true" />
          </button>

          <nav className="overflow-x-hidden">
            <ul className="flex items-center">
              {navCategories.map((category, index) => (
                <li key={index} className="shrink-0">
                  <button
                    tabIndex={index == 0 ? "0" : "-1"}
                    onClick={() => {
                      handleCategoryClick(index);
                    }}
                    className={classNames(
                      "flex flex-col items-center gap-2 min-w-15 sm:min-w-30 py-3 lg:py-5 relative after:absolute after:inset-x-10 after:bottom-3 after:content-[''] after:border-b-2",
                      {
                        "text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 after:scale-x-0 hover:after:scale-x-100 after:duration-300 after:ease-in-out after:border-gray-400":
                          activeCategory != index,
                      }
                    )}
                  >
                    {/* TODO: Dynamic Icon */}
                    <IoHomeOutline aria-hidden="true" />
                    <span className="text-xs font-bold">
                      {category.category}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button
            aria-label="Next Categories"
            onClick={() => {
              handleCarouselClick();
            }}
            className="btn-2 rounded-full p-2 text-xl"
          >
            <IoArrowForward aria-hidden="true" />
          </button>

          <button
            aria-label="Filter"
            className="flex items-center justify-center gap-2 p-3 sm:px-4 sm:py-2 btn-2 rounded-full sm:rounded-md"
            onClick={() => {
              handleFilterClick();
            }}
          >
            <IoOptions aria-hidden="true" />
            <span aria-hidden="true" className="hidden sm:block">
              Filter
            </span>
          </button>
        </div>
      </section>
    </header>
  );
};

export default Header;
