const getApi = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function recommendationsApi(rote) {
  const urlFood = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const urlCocktail = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  return rote.includes('foods')
    ? getApi(urlFood).then((item) => item.drinks)
    : getApi(urlCocktail).then((item) => item.meals);
}
