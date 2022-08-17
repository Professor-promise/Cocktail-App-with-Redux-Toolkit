import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCocktail } from '../redux/slice/cocktail-slice';
import { Link } from 'react-router-dom';

const CocktailList = () => {
  const { cocktails, loading } = useSelector(state => ({ ...state.app }));
  const [modifiedCocktail, setModifiedCocktail] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCocktail());
  }, [dispatch]);

  useEffect(() => {
    if (cocktails) {
      const newCocktail = cocktails?.map(cocktail => {
        const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
          cocktail;
        return {
          id: idDrink,
          name: strDrink,
          img: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass,
        };
      });
      setModifiedCocktail(newCocktail);
    } else {
      setModifiedCocktail([]);
    }
  }, [cocktails]);

  if (loading) {
    return (
      <div className='spinner-grow' role='status'>
        <span className='virtually-hidden'>Loading...</span>
      </div>
    );
  }

  if (!cocktails) {
    return <h2>No cocktail match your search criteria</h2>;
  }

  return (
    <div className='container'>
      <div className='row row-cols-1 row-cols-md-3 g-4'>
        {modifiedCocktail.map(({ id, name, img, info, glass }) => (
          <div className='col' key={id}>
            <div className='card h-2'>
              <img src={img} alt={name} className='img-card-top' />
              <div className='card-body' style={{ textAlign: 'Left' }}>
                <h5 className='card-title'>{name}</h5>
                <h4 className='card-title'>{glass}</h4>
                <p className='card-text'>{info}</p>
                <Link to={`/cocktail/${id}`}>
                  <button className='btn btn-info'>Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CocktailList;
