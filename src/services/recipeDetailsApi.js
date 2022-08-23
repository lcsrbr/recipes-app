const getApi = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function recipeDetailsApi(id, rote) {
  const urlFood = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const urlCocktail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  return rote.includes('foods')
    ? getApi(urlFood).then((item) => item.meals[0])
    : getApi(urlCocktail).then((item) => item.drinks[0]);
}
