import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const time = 2000;

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState(null);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState('');

  const history = useHistory();

  const local = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    setFavorites(local);
  }, []);

  const handleShare = (id, type) => {
    const url = type === 'food' ? `foods/${id}` : `drinks/${id}`;
    copy(`http://localhost:3000/${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), time);
  };

  const removeFavorite = (recipeId) => {
    const remove = local.filter(({ id }) => id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(remove));
    setFavorites(remove);
  };

  const redirectDetails = (id, type) => {
    const url = type === 'food' ? `/foods/${id}` : `/drinks/${id}`;
    history.push(url);
  };

  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setFilter('') }
      >
        All
      </button>

      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => setFilter('food') }
      >
        Food
      </button>

      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>
      <section>
        {copied && <p>Link copied!</p>}
        {favorites && favorites
          .filter((data) => (!filter ? data : data.type === filter))
          .map((data, index) => (
            <div key={ data.id } data-testid={ `${index}-${data.name}-horizontal-tag` }>

              <button
                type="button"
                onClick={ () => redirectDetails(data.id, data.type) }
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ data.image }
                  alt={ data.name }
                  width="150px"
                />
              </button>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {data.type === 'food'
                  ? `${data.nationality} - ${data.category}` : data.alcoholicOrNot}
              </p>
              <button
                data-testid={ `${index}-horizontal-name` }
                type="button"
                onClick={ () => redirectDetails(data.id, data.type) }
              >
                {data.name}

              </button>
              <p data-testid={ `${index}-horizontal-done-date` }>{ }</p>

              <input
                type="image"
                src={ shareIcon }
                alt={ data.name }
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => handleShare(data.id, data.type) }
              />
              <input
                type="image"
                src={ blackHeartIcon }
                alt={ data.name }
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => removeFavorite(data.id) }
              />
            </div>
          ))}
      </section>
    </div>
  );
}

export default FavoriteRecipes;
