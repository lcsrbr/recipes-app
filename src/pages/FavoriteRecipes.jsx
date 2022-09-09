import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/FoodsFavorite.css';

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
    const url = type === 'food' ? `${id}` : `${id}`;
    history.push(url);
  };

  return (
    <div className="total bg-white">
      <Header />
      <div className="favorit-Btns mt-20 bg-white">
        <div className='bg-white'>
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ () => setFilter('') }
            className="bg-orange-500 hover:bg-orange-700
            transition duration-300 favorit-All h-10"
          >
            All
          </button>
        </div>
        <div className='bg-white'>
          <button
            data-testid="filter-by-food-btn"
            type="button"
            onClick={ () => setFilter('food') }
            className="bg-orange-500 hover:bg-orange-700
            transition duration-300 favorit-All h-10"
          >
            Food
          </button>
        </div>
        <div className='bg-white'>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ () => setFilter('drink') }
            className="bg-orange-500 hover:bg-orange-700
            transition duration-300 favorit-All h-10"
          >
            Drinks
          </button>
        </div>
      </div>
      <section className='bg-white'>
        {copied && <p data-testid="Link-copied">Link copied!</p>}
        {favorites
          && favorites
            .filter((data) => (!filter ? data : data.type === filter))
            .map((data, index) => (
              <div
                key={ data.id }
                data-testid={ `${index}-${data.name}-horizontal-tag` }
                className="favoritImg bg-white"
              >
                <div className='bg-white'>
                  <button
                    type="button"
                    onClick={ () => redirectDetails(data.id, data.type) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-image` } // image favorit
                      src={ data.image }
                      alt={ data.name }
                      width="150px"
                      className="Img"
                    />
                  </button>
                </div>
                <div className='bg-white'>
                  <p data-testid={`${index}-horizontal-top-text`} className="bg-white">
                    {data.type === 'food'
                      ? `${data.nationality} - ${data.category}`
                      : data.alcoholicOrNot}
                  </p>
                  <button
                    data-testid={ `${index}-horizontal-name` }
                    type="button"
                    onClick={ () => redirectDetails(data.id, data.type) }
                  >
                    {data.name}
                  </button>
                  <p data-testid={ `${index}-horizontal-done-date` }>{}</p>
                  <div className="favorit-Bts bg-white">
                    <input
                      type="image" // compartilhar
                      src={ shareIcon }
                      alt={ data.name }
                      data-testid={ `${index}-horizontal-share-btn` }
                      onClick={ () => handleShare(data.id, data.type) }
                      className="bg-white"
                    />
                    <input
                      type="image" // coração
                      src={ blackHeartIcon }
                      alt={ data.name }
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      onClick={ () => removeFavorite(data.id) }
                      className="bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
      </section>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
