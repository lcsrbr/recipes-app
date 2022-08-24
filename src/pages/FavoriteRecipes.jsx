import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>

      <button
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>

      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
      <section>
        {favorites && favorites
          .map(({ id, name, category, image, nationality }, index) => (
            <div key={ id } data-testid={ `${index}-${name}-horizontal-tag` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
                width="150px"
              />
              <p data-testid={ `${index}-horizontal-name` }>{name}</p>
              <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
              <p data-testid={ `${index}-horizontal-top-text` }>{nationality}</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{}</p>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
              >
                Compartilhar
              </button>
              <button
                data-testid={ `${index}-horizontal-favorite-btn` }
                type="button"
              >
                Favoritar
              </button>
            </div>
          ))}
      </section>

    </div>
  );
}

export default FavoriteRecipes;
