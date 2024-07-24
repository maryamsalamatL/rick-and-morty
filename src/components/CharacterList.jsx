
import { EyeIcon } from "@heroicons/react/24/solid";

export default function CharacterList({ characters }) {
  return (
    <div className="character-list">
      {characters.map((item) => (
        <Character key={item.id} {...item} />
      ))}
    </div>
  );
}

function Character({ name, image, gender, status, species }) {
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
      <button className="icon red">
        <EyeIcon />
      </button>
    </div>
  );
}
