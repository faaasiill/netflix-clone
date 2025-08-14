import { Link, Links } from "react-router-dom";
import "./TitleCards.css";
// import cards_data from "../../assets/cards/Cards_data";
import { useEffect, useRef, useState } from "react";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjYzMjc1ZmJjODlmN2RkZTQ3Njc4YzBjZjkxMWRiOSIsIm5iZiI6MTc1NTE4ODAwOC4yMjUsInN1YiI6IjY4OWUwYjI4MWMzZTdlMjZiZGI3MTRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ip3I0F7Wou91yrDkk-ar6nihZVXCaWQIbza28CDbw2I",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handileWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handileWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
              alt=""
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
