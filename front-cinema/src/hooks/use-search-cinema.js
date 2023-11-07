const useSearchCinema = (films, query) => {
  return films.filter((item) => {
    let filteredYearsAndNames =
      item.name.toLowerCase().includes(query.toLowerCase().toString()) ||
      item.year.toLowerCase().includes(query.toLowerCase().toString());
    let filteredGenres = item.genres.filter((i) =>
      i.genres.toLowerCase().includes(query.toLowerCase().toString())
    );
    let filteredTags = item.tags.filter((i) =>
      i.tags.toLowerCase().includes(query.toLowerCase().toString())
    );
    let filteredActors = item.actors.filter((i) =>
      i.fullname.toLowerCase().includes(query.toLowerCase().toString())
    );
    let allFilters =
      filteredYearsAndNames ||
      filteredGenres.length ||
      filteredActors.length ||
      filteredTags.length;

    return allFilters;
  });
};
export default useSearchCinema;
