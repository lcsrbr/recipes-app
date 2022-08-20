import React from "react";
// import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from "./helpers/renderWithRouter";
import Header from "../components/Header";

describe('teste do header', () => {
 it('teste', () => {
const {history, getByTestId } = renderWithRouter(<Header />)

console.log(history.location.pathname);

   const foods = getByTestId('page-title');
   const searchIcon = getByTestId('search-top-btn');
   const profileIco = getByTestId('profile-top-btn');

   expect(foods).toBeDefined();
   expect(searchIcon).toBeDefined();
   expect(profileIco).toBeDefined();

   userEvent.click(searchIcon);

   const ingerdient = getByTestId('ingredient-search-radio');
   const name = getByTestId('name-search-radio');
   const firstLetter = getByTestId('first-letter-search-radio');
   const inpuText = getByTestId('search-input');
   const search = getByTestId('exec-search-btn');

   expect(ingerdient).toBeDefined();
   expect(name).toBeDefined();
   expect(firstLetter).toBeDefined();
   expect(inpuText).toBeDefined();
   expect(search).toBeDefined();

   userEvent.click(firstLetter);
   expect(firstLetter).toBeChecked()
   userEvent.click(ingerdient);
   expect(ingerdient).toBeChecked()
   userEvent.click(name);
   expect(name).toBeChecked()

   userEvent.type(inpuText, 'cake')
   expect(inpuText).toHaveValue('cake')
   userEvent.click(search);

   
  })
})