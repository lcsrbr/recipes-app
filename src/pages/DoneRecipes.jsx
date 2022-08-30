import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../Css/doneRecipes.css';

const time = 1000;

function DoneRecipes() {
  const [done, setDone] = useState(null);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState('');

  const history = useHistory();

  const local = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    setDone(local);
  }, []);

  const handleShare = (id, type) => {
    const url = type === 'food' ? `foods/${id}` : `drinks/${id}`;
    copy(`http://localhost:3000/${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), time);
  };

  const redirectDetails = (id, type) => {
    const url = type === 'food' ? `/foods/${id}` : `/drinks/${id}`;
    history.push(url);
  };

  return (
    <div className="total">
      <Header />
      <div className="favorit-Btns">
        <div>
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ () => setFilter('') }
            className="bg-orange-500 hover:bg-orange-700 favorit-All"
          >
            All
          </button>
        </div>
        <div>

          <button
            data-testid="filter-by-food-btn"
            type="button"
            onClick={ () => setFilter('food') }
            className="bg-orange-500 hover:bg-orange-700 favorit-All"
          >
            Food
          </button>
        </div>
        <div>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ () => setFilter('drink') }
            className="bg-orange-500 hover:bg-orange-700 favorit-All"
          >
            Drinks
          </button>
        </div>
      </div>
      <section>
        {done && done
          .filter((data) => (!filter ? data : data.type === filter))
          .map((data, index) => (
            <div
              key={ data.id }
              data-testid={ `${index}-${data.name}-horizontal-tag` }
              className="donRecipes"
            >
              <div>
                <button
                  type="button"
                  onClick={ () => redirectDetails(data.id, data.type) }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ data.image }
                    alt={ data.name }
                    className="Img"
                  />
                </button>
              </div>
              <div>
                <div className=".donRecipesBth">
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
                </div>
                <div>
                  <p data-testid={ `${index}-horizontal-done-date` }>{data.doneDate}</p>
                  {data.tags && data.tags.map((value) => (
                    <p
                      data-testid={ `${index}-${value}-horizontal-tag` }
                      key={ value }
                    >
                      {value}
                    </p>
                  ))}
                  {copied && <p data-testid="Link-copied">Link copied!</p>}
                  <input
                    type="image"
                    src={ shareIcon }
                    alt={ data.name }
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ () => handleShare(data.id, data.type) }
                  />
                </div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default DoneRecipes;
