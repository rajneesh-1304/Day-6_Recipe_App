import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Card = ({ id, title, thumbnail, rate}) => {
    const navigate = useNavigate();
    // const added = cartItems.some(item => item.id === id);

    const handleClick = () => {
        navigate(`/recipe/${id}`)
    }

//     const handleUpdateProduct = () => {
//   navigate(`/update-product/${id}`); 
// };


    return (
        <div className='card'>
            <div className='card_image'><img className='card_img' src={thumbnail} alt="" /></div>
            <div className='property'>{title}</div>
            <div>
                <button className='product_detail' onClick={handleClick}>Product Detail</button>
            </div>
            <div className='price'>
                <p className='amount'>Rating: {rate}</p> 
                
                 {/* {isSeller ? 
          <button className='cart_button' onClick={handleUpdateProduct}>
            ✏️ Update
          </button>:
          <button className='cart_button' onClick={handleAddToCart}>
            {added ? '✅ Added' : '🛒 Add'}
          </button>
        } */}
            </div>
        </div>
    )
}

export default Card;
