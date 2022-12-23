// ФИЛЬТР ПО ВСЕМ КЛЮЧАМ ФИЛЬМА:
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