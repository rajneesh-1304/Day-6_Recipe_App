import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { lighten } from '@mui/material/styles';

const Product = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);

  const recipes = async () => {
    const response = await axios.get(`https://dummyjson.com/recipes/${id}`)
    console.log('aaa', response.data)
    setRecipe(response.data);
  }

  useEffect(() => {
    recipes();
  }, [id])

  return (
    <div>
      <div className='detail'>
        <div className='detail_left'>
          <img className='detail_img' src={recipe?.image} alt="" /></div>
        <div className='detail_right'>
          <p className='detail_title'>{recipe?.name}</p>
          <p className='detail_description'>{recipe?.description}</p>
          <p className='detail_price'>Rating : {recipe?.rating}</p>
          <p className='detail_price'>
            Ingredients :
          </p>
          <ul>
            {recipe?.ingredients.map((ingre, index) => (
              <li key={index}>{ingre}</li>
            ))}
          </ul>
          <p className='detail_price'>
            Instructions :
          </p>
          <ul>
            {recipe?.instructions.map((instr, index) => (
              <li key={index}>{instr}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;
