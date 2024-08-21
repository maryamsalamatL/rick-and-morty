import "./App.css";
import Navbar, {
  Search,
  SearchResult,
  FavoritesIcon,
} from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { useState } from "react";
import { Loader } from "./components/Loader";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(
    "https://rickandmortyapi.com/api/character/?name",
    query
  );
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

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
