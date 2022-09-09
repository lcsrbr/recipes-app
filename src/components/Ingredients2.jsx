import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveIngredietns } from '../redux/reducer/ingredients';
import addIngs from '../utils/addIngs';

const inProgress = 'in-progress';
function Ingredients2({ ing, index, details }) {
  const [check, setCheck] = useState(false);
  const [checkLocal, setCheckLocal] = useState(false);

  const checkbox = useRef('checked');
  const dispatch = useDispatch();
  const history = useHistory();

  const checkedVerify = () => {
    const getLocal = JSON.parse(localStorage.getItem(inProgress));
    if (getLocal) {
      getLocal.forEach(
        (item) => item.id === history.location.pathname
          && setCheck(item.ings.includes(details[ing])),
      );
    }
    setCheckLocal(true);
  };

  useEffect(() => {
    checkedVerify();
  }, []);

  const getLocal = JSON.parse(localStorage.getItem(inProgress));
  const isChecked = (target) => {
    if (!check) {
      setCheck(target.checked);
      dispatch(saveIngredietns(1));
      const checkCollection = Array.from(target.parentNode.parentNode.children);
      checkCollection.shift();
      const arrayOfCheck = checkCollection.map(
        (element) => element.dataset.check,
      );
      if (target.checked && !getLocal) {
        const arr = [
          {
            id: history.location.pathname,
            ings: [details[ing]],
            arrayOfCheck: [...arrayOfCheck],
          },
        ];
        return localStorage.setItem(inProgress, JSON.stringify(arr));
      }
      if (target.checked) {
        const verify = getLocal.some(
          ({ id }) => id === history.location.pathname,
        );
        if (!verify) {
          const arr = [
            ...getLocal,
            {
              id: history.location.pathname,
              ings: [details[ing]],
              arrayOfCheck: [...arrayOfCheck],
            },
          ];
          return localStorage.setItem(inProgress, JSON.stringify(arr));
        }
        addIngs(getLocal, history, details, ing);
      }
    }
  };

  const strMeasure = details
    && Object.keys(details).filter((item) => item.includes('strMeasure'));
  return (
    details[ing] && (
      <label
        htmlFor={ index }
        key={ index }
        data-testid={ `${index}-ingredient-step` }
        data-check={ check }
        style={ {
          textDecoration: check && 'line-through',
        } }
        className="mt-3 mb-3 checkbox"
      >
        {checkLocal && (
          <input
            type="checkbox"
            id={ index }
            onChange={ ({ target }) => isChecked(target) }
            ref={ checkbox }
            checked={ check }
            className="mr-3"
          />
        )}
        {`${details[ing]}: ${details[strMeasure[index]]}`}
        <br />
      </label>
    )
  );
}

Ingredients2.propTypes = {
  details: PropTypes.func,
  index: PropTypes.any,
  ing: PropTypes.any,
}.isRequired;

export default Ingredients2;
