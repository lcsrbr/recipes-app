import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const local = JSON.parse(localStorage.getItem('user'));
  const email = local === null ? '' : local.email;
  const history = useHistory();

  return (
    <section
      className="flex-col w-360 h-screen bg-229, 229, 229"
    >
      <Header />
      <h3
        data-testid="profile-email"
        className="flex justify-center container w-225 h-35 mx-auto mt-10"
      >
        <span
          className=" text-2xl"
        >
          {email}
        </span>
      </h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
        className="flex justify-center container w-329 h-53 mx-auto mt-10 bg-white"
      >
        <span
          className=""
        >
          Done Recipes
        </span>
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
        className="flex justify-center container w-329 h-53 mx-auto   mt-10"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        className="flex justify-center container w-329 h-53 mx-auto  mt-10"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>
      <Footer />
    </section>
  );
}

export default Profile;
