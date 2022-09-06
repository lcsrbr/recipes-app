const getApi = async (query) => {
  const url = `https://www.themealdb.com/api/json/v1/1/${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.meals;
};

const foodApi = (radio, search) => {
  if (radio === 'Ingredient') {
    return getApi(`filter.php?i=${search}`);
  }
  if (radio === 'Name') {
    return getApi(`search.php?s=${search}`);
  }
  if (radio === 'First-letter') {
    return getApi(`search.php?f=${search}`);
  }
  if (radio === 'Categories') {
    return getApi(`filter.php?c=${search}`);
  }
};
// const foodApi = (radio, search) => ({
//   Ingredient: getApi(`filter.php?i=${search}`),
//   Name: getApi(`search.php?s=${search}`),
//   'First-letter': getApi(`search.php?f=${search}`),
//   Categories: getApi(`filter.php?c=${search}`),
// })[radio];

export default foodApi;
