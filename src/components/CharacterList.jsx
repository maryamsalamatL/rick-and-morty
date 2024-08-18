import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function CharacterList({ characters, onSelect, selectedId }) {
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character key={item.id} {...item}>
          <button
            className="icon red"
            onClick={() =>
              onSelect((prevState) => (prevState === item.id ? null : item.id))
            }
          >
            {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </Character>
      ))}
    </div>
  );
}

export function Character({ name, image, gender, status, species, children }) {
  return (
    <div className="list__item">
      <img src={image} alt={name} />
      <h3 className="name">
        <span>{gender === "Male" ? "👨" : "👧"}</span>
        <span>{name}</span>
      </h3>
      <div className="list-item__info info">
        <span className={`status ${status === "Dead" && "red"}`}></span>
        <span> {status} - </span>
        <span> {species}</span>
      </div>
      {children}
    </div>
  );
}
