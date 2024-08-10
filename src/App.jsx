import "./App.css";
import Navbar, { Search } from "./components/Navbar";
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

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`https://rickandmortyapi.com/api/character/?name=${query}`)
      .then(({ data }) => setCharacters(data.results))
      .catch((error) => {
        setCharacters([]);
        toast.error(error.response.data.error);
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  return (
    <div className="app">
      <Toaster />
      <Navbar numOfResult={characters?.length}>
        <Search query={query} setQuery={setQuery} />
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
        <CharacterDetail selectedId={selectedId} />
      </div>
    </div>
  );
}
