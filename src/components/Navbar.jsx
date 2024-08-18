import Modal from "./Modal";
import { useState } from "react";
import { Character } from "./CharacterList";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Navbar({ numOfResult, children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO</div>
      {children}
    </nav>
  );
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="Search ..."
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} character</div>;
}

export function FavoritesIcon({ favorites, onDeleteFavorite }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <Modal onClose={setIsOpen} title={"Favorite Characters"}>
          {favorites.map((item) => (
            <Character key={item.id} {...item}>
              <button
                className="icon red"
                onClick={() => onDeleteFavorite(item.id)}
              >
                <TrashIcon />
              </button>
            </Character>
          ))}
        </Modal>
      )}
      <button className="heart" onClick={() => setIsOpen(true)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorites.length}</span>
      </button>
    </>
  );
}
