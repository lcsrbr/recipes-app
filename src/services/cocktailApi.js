const getApi = async (query) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.drinks;
};

const cocktailApi = (radio, search) => ({
  Ingredient: getApi(`filter.php?i=${search}`),
  Name: getApi(`search.php?s=${search}`),
  'First-letter': getApi(`search.php?f=${search}`),
})[radio];

export default cocktailApi;
