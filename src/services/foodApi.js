const foodApi = async (radio, search) => {
  if (radio === 'Ingredient') {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  }
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.meals;
};

export default foodApi;
