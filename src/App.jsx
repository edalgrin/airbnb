import { useState, useEffect } from "react";
import classNames from "classnames";
import { IoArrowForward, IoArrowBack, IoSyncCircle } from "react-icons/io5";
import Card from "./components/Card";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

import navDestinations from "./navDestinations.json";

const getRandomHouse = (houses, n) => {
  /*
    Normally I would fetch data from a server

    fetch("serverUrl")
        .then((response) => response.json())
        .then((items) =>  setHouses(items))
        .catch((error) => console.error("Error fetching:", error));
    }, []);
    
    Since this is a PoC, I'm generating the data locally
  */

  const titleOne = [
    "Cute",
    "Little",
    "Big",
    "Fluffy",
    "Authentic",
    "Beautiful",
    "Friendly",
  ];
  const titleTwo = [
    "Blue",
    "Pink",
    "Yellow",
    "Orange",
    "Green",
    "Red",
    "Purple",
  ];

  const titleThree = [
    "House",
    "Apartment",
    "Space",
    "Cube",
    "Home",
    "Hill",
    "Residence",
  ];
  const nameOne = [
    "Magdalena",
    "Trevor",
    "Wrenley",
    "Aron",
    "Marianna",
    "Jason",
    "Maliyah",
  ];

  const nameTwo = [
    "Bowen",
    "Farley",
    "Prince",
    "Corona",
    "Hamilton",
    "Mullins",
    "Kennedy",
  ];

  const dateOne = ["Apr", "May", "Jun"];

  const newHouses = [...houses];

  for (let i = 0; i < n; i++) {
    const dateTwo = Math.ceil(Math.random() * 21);

    const dateThree = dateTwo + Math.ceil(Math.random() * 11);

    const images = [];

    for (let j = 0; j < Math.ceil(Math.random() * 3); j++) {
      images.push(`https://picsum.photos/id/${Math.ceil(Math.random() * 201)}`);
    }

    newHouses.push({
      id: i,
      title: `${titleOne[Math.ceil(Math.random() * titleOne.length - 1)]} ${
        titleTwo[Math.ceil(Math.random() * titleTwo.length - 1)]
      } ${titleThree[Math.ceil(Math.random() * titleThree.length - 1)]}`,
      rating: (Math.random() * 1 + 4).toFixed(1),
      host: `Hosted by ${
        nameOne[Math.ceil(Math.random() * nameOne.length - 1)]
      } ${nameTwo[Math.ceil(Math.random() * nameTwo.length - 1)]}`,
      price: Math.ceil(Math.random() * 100 + 200),
      date: `${
        dateOne[Math.ceil(Math.random() * dateOne.length - 1)]
      } ${dateTwo} - ${dateThree}`,
      images: images,
      favorite: Math.random() > 0.5,
      bookmark: Math.random() > 0.5,
    });
  }

  return newHouses;
};

const handleCarouselClick = () => {
  alert("Slide the carousel to show more options");
};

const handleMoreClick = (houses, setHouses, setLoading) => {
  setLoading(true);
  setTimeout(() => {
    setHouses(getRandomHouse(houses, 8));
  }, 100);
  setTimeout(() => {
    setLoading(false);
  }, 200);
};

const handleTabClick = (e) => {
  if (!e.target.classList.contains("border-b-2")) {
    alert(`Change to ${e.target.innerText}`);
  }
};

function App() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCategoryChange = () => {
    setLoading(true);
    setHouses([]);
    setTimeout(() => {
      setHouses(getRandomHouse([], 8));
    }, 100);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  useEffect(() => {
    setHouses(getRandomHouse(houses, 8));

    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 z-3">
        <a href="#content" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
      </div>
      <Header handleCategoryChange={handleCategoryChange} />

      <main id="content" className={classNames({ loading: loading })}>
        <section className="container-7xl mt-40 lg:mt-70 mb-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {houses.map((house, index) => (
              <Card key={index} {...house} />
            ))}
          </div>

          {loading ? (
            <div
              className={classNames(
                "pt-10 mb-[58vw] flex items-center justify-center gap-3 animate-pulse"
              )}
            >
              <span className="font-bold">LOADING</span>
              <IoSyncCircle
                aria-hidden="true"
                className="text-2xl animate-spin"
              />
            </div>
          ) : (
            <div className="pt-10 text-center">
              <h2 className="font-bold">Continue exploring amazing views</h2>
              <button
                className="btn-1 px-3 py-2 mt-3 rounded-md font-semibold"
                onClick={() => {
                  handleMoreClick(houses, setHouses, setLoading);
                }}
              >
                Show More
              </button>
            </div>
          )}
        </section>

        <section className="py-10 bg-gray-100 dark:bg-gray-700">
          <div className="container-7xl text-sm">
            <h2 className="font-bold text-xl">
              Inspiration for future getaways
            </h2>

            <nav className="mt-4 flex items-center gap-3">
              <button
                aria-label=""
                onClick={() => {
                  handleCarouselClick();
                }}
                className="btn-2 rounded-full p-2 text-xl hidden"
              >
                <IoArrowBack aria-hidden="true" />
              </button>

              <ul
                role="tablist"
                aria-label="Destinations"
                className="flex border-b border-gray-300 overflow-x-hidden"
              >
                {navDestinations.map((tab, index) => (
                  <li key={index} role="none" className="shrink-0">
                    <button
                      role="tab"
                      aria-selected={index == 0}
                      aria-controls={`link-panel-${index}`}
                      id={`link-tab-${index}`}
                      tabIndex={index == 0 ? "0" : "-1"}
                      className={classNames(
                        "py-3 border-b-2",
                        { "pl-0 pr-2": index == 0 },
                        {
                          "px-2 border-transparent hover:border-gray-400":
                            index != 0,
                        }
                      )}
                      onClick={(e) => {
                        handleTabClick(e);
                      }}
                    >
                      {tab.tabTitle}
                    </button>
                  </li>
                ))}
              </ul>

              <button
                aria-label="Next Destinations"
                onClick={() => {
                  handleCarouselClick();
                }}
                className="btn-2 rounded-full p-2 text-xl lg:hidden"
              >
                <IoArrowForward aria-hidden="true" />
              </button>
            </nav>

            <div className="mt-4">
              {navDestinations.map((tab, index) => (
                <div
                  key={index}
                  id={`link-panel-${index}`}
                  role="tabpanel"
                  tabIndex="0"
                  aria-labelledby={`link-tab-${index}`}
                  className={classNames(
                    "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4",
                    { hidden: index != 0 }
                  )}
                >
                  {tab.tabContent.map((subtab, index) => (
                    <a href={subtab.subtabUrl} key={index}>
                      <span className="font-semibold block">
                        {subtab.subtabTitle}
                      </span>
                      <span>{subtab.subtabContent}</span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
