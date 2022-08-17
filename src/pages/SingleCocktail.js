import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchSingleCocktail } from '../redux/slice/cocktail-slice';
import { useSelector, useDispatch } from 'react-redux/es/exports';

const SingleCocktail = () => {
  const { loading, cocktail } = useSelector(state => ({ ...state.app }));
  const [modifiedCocktail, setModifiedCocktail] = useState([]);
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSingleCocktail({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (cocktail.length > 0) {
      const {
        strDrink: name,
        strDrinkThumb: img,
        strAlcoholic: info,
        strCategory: category,
        strGlass: glass,
        strInstructions: instructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      } = cocktail[0];
      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      ];
      const newCoktail = {
        name,
        img,
        info,
        category,
        glass,
        instructions,
        ingredients,
      };
      setModifiedCocktail(newCoktail);
    } else {
      setModifiedCocktail([]);
    }
  }, [cocktail]);

  const { name, img, info, category, glass, instructions, ingredients } =
    modifiedCocktail;

  return !modifiedCocktail ? (
    <h2 className='section-title'>No Cocktail to display</h2>
  ) : loading ? (
    <div className='spinner-grow' role='status'>
      <span className='virtually-hidden'>Loading...</span>
    </div>
  ) : (
    <section className='section cocktail-section'>
      <Link to='/'>
        <button className='btn btn-danger' style={{ marginTop: '2rem' }}>
          Go back
        </button>
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={img} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>Name: </span> {name}
          </p>
          <p>
            <span className='drink-data'>Category: </span> {category}
          </p>
          <p>
            <span className='drink-data'>Info: </span> {info}
          </p>
          <p>
            <span className='drink-data'>Glass: </span> {glass}
          </p>
          <p>
            <span className='drink-data'>Instructions: </span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>Ingredients: </span>
            {ingredients &&
              ingredients.map((item, index) =>
                item ? <span key={index}>{item}</span> : null
              )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
