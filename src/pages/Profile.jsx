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
      className="flex-col w-360 h-screen"
    >
      <Header />
      <h3
        data-testid="profile-email"
        className="flex justify-center container w-225 h-35
         mx-auto mt-10 text-2xl"
      >
        {email}
      </h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
        className="flex justify-center container w-329
        h-53 mx-auto mt-10 bg-orange-500 hover:bg-orange-600
        rounded-2xl p-2 text-xl text-slate-50"
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
        className="flex justify-center container w-329
        h-53 mx-auto mt-10 bg-orange-500 hover:bg-orange-600
        rounded-2xl p-2 text-xl text-slate-50"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        className="flex justify-center container w-329
        h-53 mx-auto mt-10 bg-orange-500 hover:bg-orange-600
        rounded-2xl p-2 text-xl text-slate-50"
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
