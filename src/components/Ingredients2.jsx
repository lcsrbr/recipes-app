/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveIngredietns } from '../redux/reducer/ingredients';

const second = 2000;
const inProgress = 'in-progress';
function Ingredients2({ ing, index, details }) {
  const [check, setCheck] = useState(false);

  const checkbox = useRef('checked');
  const dispatch = useDispatch();
  const history = useHistory();

  const setTime = () => {
    setTimeout(() => { checkbox.current.checked = check; }, second);
  };

  const checkedVerify = () => {
    const getLocal = JSON.parse(localStorage.getItem(inProgress));
    if (getLocal) {
      getLocal.forEach((item) => {
        if (item.id === history.location.pathname) {
          setCheck(item.ings.includes(details[ing]));
        }
      });
    }
    setTime();
  };

  useEffect(() => {
    checkedVerify();
  }, []);

  const isChecked = (target) => {
    dispatch(saveIngredietns(1));
    setCheck(target.checked);
    const getLocal = JSON.parse(localStorage.getItem(inProgress));
    const checkCollection = Array.from(target.parentNode.parentNode.children);
    checkCollection.shift();
    const arrayOfCheck = checkCollection.map((element) => (
      element.dataset.check
    ));
    if (target.checked && !getLocal) {
      const arr = [{ id: history.location.pathname, ings: [details[ing]], arrayOfCheck }];
      return localStorage.setItem(inProgress, JSON.stringify(arr));
    }
    if (target.checked) {
      const verify = getLocal.some(({ id }) => id === history.location.pathname);
      if (!verify) {
        const arr = [...getLocal,
          { id: history.location.pathname, ings: [details[ing]], arrayOfCheck }];
        return localStorage.setItem(inProgress, JSON.stringify(arr));
      }

      const addIng = getLocal.map((item) => {
        if (item.id === history.location.pathname) {
          return { ...item, ings: [...item.ings, details[ing]] };
        }
        return item;
      });
      return localStorage.setItem(inProgress, JSON.stringify(addIng));
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
      >
        <input
          type="checkbox"
          id={ index }
          onChange={ ({ target }) => isChecked(target) }
          ref={ checkbox }
          defaultChecked={ check }
          // disabled={ check }
        />
        {`${details[ing]} ${details[strMeasure[index]]}`}
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
