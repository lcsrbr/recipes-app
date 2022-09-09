import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/doneRecipes.css';

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
        {done
          && done
            .filter((data) => (!filter ? data : data.type === filter))
            .map((data, index) => (
              <div
                key={ data.id }
                data-testid={ `${index}-${data.name}-horizontal-tag` }
                className="donRecipes mb-4"
              >
                <div className='bg-white'>
                  <button
                    type="button"
                    onClick={ () => redirectDetails(data.id, data.type) }
                    className="bg-white"
                  >
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ data.image }
                      alt={ data.name }
                      className="Img rounded shadow-sm shadow-slate-500"
                    />
                  </button>
                </div>
                <div className='bg-white'>
                  <div className=".donRecipesBth mt-3 bg-white">
                    <button
                      data-testid={ `${index}-horizontal-name` }
                      type="button"
                      onClick={ () => redirectDetails(data.id, data.type) }
                    >
                      <strong className="text-xl bg-white">{data.name}</strong>
                    </button>
                    <p data-testid={`${index}-horizontal-top-text`} className="bg-white">
                      {data.type === 'food'
                        ? `${data.nationality} - ${data.category}`
                        : data.alcoholicOrNot}
                    </p>
                  </div>
                  <div className='bg-white'>
                    <p
                      className="mt-3 bg-white"
                      data-testid={ `${index}-horizontal-done-date` }
                    >
                      {data.doneDate}
                    </p>
                    {data.tags
                      && data.tags.map((value) => (
                        <p
                          data-testid={ `${index}-${value}-horizontal-tag` }
                          key={ value }
                          className="mt-5"
                        >
                          {value}
                        </p>
                      ))}
                    <input
                      type="image"
                      src={ shareIcon }
                      alt={ data.name }
                      data-testid={ `${index}-horizontal-share-btn` }
                      onClick={ () => handleShare(data.id, data.type) }
                    />
                    {copied && (
                      <p
                        className="mt-3 text-xs
                        mb-3"
                        data-testid="Link-copied"
                      >
                        Link copied!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </section>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
