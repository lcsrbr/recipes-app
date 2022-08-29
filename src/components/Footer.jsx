import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIconfrom from '../images/mealIcon.svg';
import '../Css/footer.css';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer" className="footer">
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img
          src={ drinkIcon }
          alt="drink"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/foods') }
      >
        <img
          src={ mealIconfrom }
          alt="foods"
          data-testid="food-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
