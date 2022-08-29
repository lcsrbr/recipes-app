import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

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
        {done && done
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
          ))}
      </section>
    </div>
  );
}

export default DoneRecipes;
