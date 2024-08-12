import { HeartIcon } from "@heroicons/react/24/outline";

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

export function FavoritesIcon({ numOfFavorites }) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">{numOfFavorites}</span>
    </button>
  );
}
