import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../css/Cinema.module.css";

const Search = () => {
  const cinema = useSelector((state) => state.cinema.cinema);

  // !! ФИЛЬТР ПО ВСЕМ КЛЮЧАМ
  const [value, setValue] = useState("");
  const cinemaFilt = cinema.filter((item) => {
    let filteredYearsAndNames =
      item.name.toLowerCase().includes(value.toLowerCase().toString()) ||
      item.year.toLowerCase().includes(value.toLowerCase().toString());
    let filteredGenres = item.genres.filter((i) =>
      i.genres.toLowerCase().includes(value.toLowerCase().toString())
    );
    let filteredTags = item.tags.filter((i) =>
      i.tags.toLowerCase().includes(value.toLowerCase().toString())
    );
    let filteredActors = item.actors.filter((i) =>
      i.fullname.toLowerCase().includes(value.toLowerCase().toString())
    );
    let allFilters =
      filteredYearsAndNames ||
      filteredGenres.length ||
      filteredActors.length ||
      filteredTags.length;

    return allFilters;
  });
  return (
    <div className={styles.search}>
      <ion-icon name="search-outline"></ion-icon>
      <input
        type="text"
        placeholder="Поиск фильма, по названию, по жанрам, по актерам, по тегам, по годам..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value ? (
        <ion-icon onClick={() => setValue("")} name="close-outline"></ion-icon>
      ) : null}
    </div>
  );
};

export default Search;
