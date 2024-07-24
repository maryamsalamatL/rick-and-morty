import "./App.css";
import Navbar from "./components/Navbar";
import { allCharacters } from "../data/data";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList characters={allCharacters}/>
        <CharacterDetail />
      </div>
    </div>
  );
}
