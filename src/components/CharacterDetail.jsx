import { useEffect, useState } from "react";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "./Loader";

export default function CharacterDetail({
  selectedId,
  onAddFavorite,
  isAddToFavorite,
}) {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodesData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );

        setEpisodes([episodesData].flat());
      } catch (error) {
        setCharacter(null);
        toast.error(error.response?.data.error || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading)
    return (
      <div style={{ flex: "1" }}>
        <Loader />
      </div>
    );

  if (!character || !selectedId)
    return (
      <div style={{ flex: "1", color: "var(--slate-300" }}>
        Please select a character.
      </div>
    );

  return (
    <div style={{ flex: "1" }}>
      <CharacterSubInfo
        character={character}
        isAddToFavorite={isAddToFavorite}
        onAddFavorite={onAddFavorite}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

function CharacterSubInfo({ character, isAddToFavorite, onAddFavorite }) {
  const { name, image, gender, status, species } = character;

  return (
    <div className="character-detail">
      <img src={image} alt={name} className="character-detail__img" />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{gender === "Male" ? "👨" : "👧"}</span>
          <span>{name}</span>
        </h3>
        <div className="info">
          <span className={`status ${status === "Dead" && "red"}`}></span>
          <span>&nbsp;{status}</span>
          <span>&nbsp;{species}</span>
        </div>
        <div className="location">
          <p>Last known location:</p>
          <p>{location.name}</p>
        </div>
        <div className="actions">
          {isAddToFavorite ? (
            <p>Already added to favorites ✔</p>
          ) : (
            <button
              className="btn btn--primary"
              onClick={() => onAddFavorite(character)}
            >
              Add to Favorite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  const [sortBy, setSortBy] = useState("earliest");

  const sortedEpisodes = [...episodes].sort((a, b) => {
    if (sortBy === "earliest") {
      return new Date(a.created) - new Date(b.created);
    } else {
      return new Date(b.created) - new Date(a.created);
    }
  });

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button
          onClick={() =>
            setSortBy((prevState) =>
              prevState === "earliest" ? "latest" : "earliest"
            )
          }
        >
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: sortBy === "earliest" ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, i) => (
          <li key={item.id}>
            <div>
              {String(i + 1).padStart(2, "0")} {item.episode} :{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
