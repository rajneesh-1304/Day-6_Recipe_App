import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card.js';
import Navbar from '../components/Navbar.jsx';
import { useSelector } from 'react-redux';

const Home = ({ searchValue, setSearchValue, searchCuisine, setSearchCuisine }) => {
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const indexofLastElement = currentPage * itemsPerPage;
  const indexOfFirstElement = indexofLastElement - itemsPerPage;
  const pageno = indexofLastElement / itemsPerPage;
  const [page, setPage] = useState(1);
  let totalPages = 0;

  const filProducts = async (page = 1, query = '') => {
    try {
      const skip = (page - 1) * itemsPerPage;
      let url = query
        ? `https://dummyjson.com/recipes/search?q=${query}`
        : `https://api.spoonacular.com/recipes/716429/information?apikey=32452808b9cc40c495a52ab155e44f91&includeNutrition=true`;

      const response = await axios.get(url);
      console.log('ccc',response.data.recipes);
      setProducts(response.data.recipes);
      totalPages = Math.ceil(
        response.data.recipes?.length / itemsPerPage
      );
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const filteredProducts = async () => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${searchCuisine}`);
      setProducts(response.data.recipes);
      console.log(response.data.recipes)

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  console.log(totalPages)
  useEffect(() => {
    filProducts(currentPage, searchValue);
  }, [])

  // const filteredProducts = filProducts?.slice(indexOfFirstElement, indexofLastElement);
  useEffect(() => {
    setCurrentPage(1);
    filProducts(currentPage, searchValue);
  }, [searchValue]);

  useEffect(() => {
    filteredProducts();
  }, [searchCuisine])

  useEffect(() => {
    filProducts();
  }, [page])

  useEffect(() => {
    filProducts(currentPage, searchValue);
  }, [currentPage]);
  console.log('filter', filteredProducts)

  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setLoading(true);
    }
  };

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  window.addEventListener("scroll", debounce(handleScroll, 2000));

  useEffect(() => {
    if (loading == true) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  return (
    <>
      <Navbar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchCuisine={searchCuisine}
        setSearchCuisine={setSearchCuisine}
      />

      <div style={{ marginTop: "100px" }}>
        <div className="home">

          {products? searchCuisine ?
            (products?.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                thumbnail={card.image}
                title={card.name}
                rate={card.rating}
              />

            )))
            :

            (products?.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                thumbnail={card.image}
                title={card.name}
                rate={card.rating}
              />

            ))) :
            <div></div>
          }
        </div>
      </div>
    </>
  );
};

export default Home;
