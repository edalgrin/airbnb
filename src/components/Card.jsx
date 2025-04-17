import { useState, useEffect } from "react";
import classNames from "classnames";
import {
  IoStar,
  IoHeart,
  IoHeartOutline,
  IoArrowForward,
  IoArrowBack,
} from "react-icons/io5";

const handleSlideClick = () => {
  alert("Slide the carousel to show more images");
};

const Card = ({
  id,
  title,
  rating,
  host,
  price,
  date,
  images,
  favorite,
  bookmark,
}) => {
  const [bookmarked, setBookmarked] = useState(bookmark);
  const [card, setCard] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCard(false);
    }, 1000);
  }, []);

  return (
    <div
      className={classNames("relative text-sm", { card: card })}
      style={{ "--delay": `${id}00ms` }}
    >
      <div className="flex flex-row-reverse justify-between items-center absolute top-3 left-3 right-3">
        <button
          aria-label="Favorite"
          className="btn-2 rounded-full p-3 text-xl z-1"
          onClick={() => {
            setBookmarked(!bookmarked);
          }}
        >
          <div aria-hidden="true" className="relative">
            <IoHeartOutline
              className={classNames("duration-300 ease-in-out", {
                "scale-0": bookmarked,
              })}
            />
            <IoHeart
              className={classNames(
                "absolute inset-0 text-rose-500 duration-300 ease-in-out",
                {
                  "scale-0": !bookmarked,
                }
              )}
            />
          </div>
        </button>

        {favorite && (
          <span className="favorite font-semibold bg-white dark:bg-gray-800 px-6 py-1 shadow-md -rotate-z-45 -translate-x-11 translate-y-1">
            Guest favorite
          </span>
        )}
      </div>
      <div className="aspect-square overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            alt=""
            src={`${image}/300.jpg`}
            loading="lazy"
            className={classNames("rounded-xl w-full", { hidden: index != 0 })}
          />
        ))}
      </div>
      <div className="flex justify-between items-center gap-3 mt-2">
        <div className="font-semibold">{title}</div>
        <div className="flex gap-1 items-center">
          <IoStar />
          <span>{rating}</span>
        </div>
      </div>
      <p>{host}</p>
      <p>{date}</p>
      <p className="flex items-center gap-1">
        <span className="font-semibold">€ {price}</span>
        <span>night</span>
      </p>
      <a
        href={`#more${id}`}
        aria-label="View more"
        className="group rounded-lg before:absolute before:inset-0 before:rounded-xl before:content-['']"
      >
        <span
          aria-hidden="true"
          className="hidden group-focus-visible:block mt-2 btn-1 py-2 px-4 rounded-lg text-center"
        >
          View more
        </span>

        {images.length > 1 && (
          <>
            <button
              aria-label="Previous Image"
              onClick={() => {
                handleSlideClick();
              }}
              className="btn-2 rounded-full p-3 text-xl absolute top-[33%] left-3 opacity-0"
            >
              <IoArrowBack aria-hidden="true" />
            </button>

            <button
              aria-label="Next Image"
              onClick={() => {
                handleSlideClick();
              }}
              className="btn-2 rounded-full p-3 text-xl absolute top-[33%] right-3 opacity-0 group-hover:opacity-100 focus:opacity-100 duration-300 ease-in-out"
            >
              <IoArrowForward aria-hidden="true" />
            </button>
          </>
        )}
      </a>
    </div>
  );
};

export default Card;
