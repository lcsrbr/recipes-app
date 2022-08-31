const getApi = async (url, abortController) => {
  try {
    const response = await fetch(url, abortController);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function recipeDetailsApi(id, rote, abortController) {
  const urlFood = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const urlCocktail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  return rote.includes('foods')
    ? getApi(urlFood, abortController).then((item) => item.meals[0])
    : getApi(urlCocktail, abortController).then((item) => item.drinks[0]);
}
