import "./App.css";
import Navbar, {
  Search,
  SearchResult,
  FavoritesIcon,
} from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { useEffect, useState } from "react";
import { Loader } from "./components/Loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    setIsLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;
    axios
      .get(`https://rickandmortyapi.com/api/character/?name=${query}`, {
        signal,
      })
      .then(({ data }) => setCharacters(data.results))
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("successfully aborted");
        } else {
          setCharacters([]);
          toast.error(error.response?.data.error || error.message);
        }
      })
      .finally(() => setIsLoading(false));

    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleAddFavorite = (newCharacter) => {
    setFavorites((prevState) => [...prevState, newCharacter]);
  };

  const handleDeleteFavorite = (id) => {
    setFavorites((prevState) => prevState.filter((item) => item.id !== id));
  };

  const isAddToFavorite = favorites.some((c) => c.id === selectedId);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters?.length} />
        <FavoritesIcon
          favorites={favorites}
          onDeleteFavorite={handleDeleteFavorite}
        />
      </Navbar>
      <div className="main">
        {isLoading ? (
          <Loader />
        ) : (
          <CharacterList
            characters={characters}
            onSelect={setSelectedId}
            selectedId={selectedId}
          />
        )}
        <CharacterDetail
          selectedId={selectedId}
          onAddFavorite={handleAddFavorite}
          isAddToFavorite={isAddToFavorite}
        />
      </div>
    </div>
  );
}
