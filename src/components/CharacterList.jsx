import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function CharacterList({ characters, onSelect, selectedId }) {
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character
          key={item.id}
          onSelect={onSelect}
          selectedId={selectedId}
          {...item}
        />
      ))}
    </div>
  );
}

function Character({
  id,
  name,
  image,
  gender,
  status,
  species,
  onSelect,
  selectedId,
}) {
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
      <button
        className="icon red"
        onClick={() => onSelect((prevState) => (prevState === id ? null : id))}
      >
        {selectedId === id ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
