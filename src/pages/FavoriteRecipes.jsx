import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import clipboardCopy from 'clipboard-copy';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  // 

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
          .map((data, index) => (
            <div key={ data.id } data-testid={ `${index}-${data.name}-horizontal-tag` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ data.image }
                alt={ data.name }
                width="150px"
              />
              <p data-testid={ `${index}-horizontal-name` }>{data.name}</p>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {data.type === 'food'
                  ? `${data.nationality} - ${data.category}` : data.alcoholicOrNot}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{}</p>

              <input
                type="image"
                src={ shareIcon }
                alt={ data.name }
                data-testid={ `${index}-horizontal-share-btn` }
                // onClick={() => handleShare()}
              />
              <input
                type="image"
                src={ blackHeartIcon }
                alt={ data.name }
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </div>
          ))}
      </section>

    </div>
  );
}

export default FavoriteRecipes;
