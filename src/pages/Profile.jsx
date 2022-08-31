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
      className="flex-col w-screen h-screen mt-0"
    >
      <Header />

      <div>
        <p className="mt-24 mb-2">You are logged in as: </p>
        <h3
          data-testid="profile-email"
          className="flex justify-center container w-225 h-35
         mx-auto text-2xl hover:scale-110 transition
         duration-300"
        >
          {email}
        </h3>
      </div>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
        className="flex justify-center container w-329
        h-53 mx-auto mt-20 bg-orange-500 hover:bg-orange-600
        rounded p-2 text-xl text-slate-50 max-w-xs transition
        duration-300"
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
        className="flex justify-center container w-329
        h-53 mx-auto mt-10 mb-32 bg-orange-500 hover:bg-orange-600
        rounded p-2 text-xl text-slate-50 max-w-xs transition
        duration-300"
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        className="content-end container w-329
        h-53 mx-auto mt-20 bg-red-500
        rounded p-2 text-xl text-slate-50 max-w-fit
        hover:animate-pulse transition
        duration-300 hover:bg-red-700 "
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
