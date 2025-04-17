import { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import {
  IoStar,
  IoHeart,
  IoHeartOutline,
  IoArrowForward,
  IoArrowBack,
} from "react-icons/io5";

import useEmblaCarousel from "embla-carousel-react";

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
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

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
      <div className="flex flex-row-reverse justify-between items-center absolute z-1 top-3 left-3 right-3">
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
      <div
        className="embla aspect-square overflow-hidden relative"
        ref={emblaRef}
      >
        <div className="embla__container flex">
          {images.map((image, index) => (
            <img
              key={index}
              alt=""
              src={`${image}/300.jpg`}
              loading="lazy"
              className={classNames("embla__slide rounded-xl w-full", {})}
            />
          ))}
        </div>

        <div className="embla__dots flex gap-1 justify-center mt-2 absolute bottom-2 left-0 right-0 z-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={classNames("p-1 rounded-full btn-2", {
                "bg-gray-800": emblaApi?.selectedScrollSnap() === index,
              })}
            ></button>
          ))}
        </div>
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
        className="group peer rounded-lg before:absolute before:inset-0 before:rounded-xl before:content-['']"
      >
        <span
          aria-hidden="true"
          className="hidden group-focus-visible:block mt-2 btn-1 py-2 px-4 rounded-lg text-center"
        >
          View more
        </span>
      </a>

      {canScrollPrev && (
        <button
          aria-label="Previous Image"
          onClick={scrollPrev}
          className="embla__prev btn-2"
        >
          <IoArrowBack aria-hidden="true" />
        </button>
      )}

      {canScrollNext && (
        <button
          aria-label="Next Image"
          onClick={scrollNext}
          className="embla__next btn-2"
        >
          <IoArrowForward aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default Card;
