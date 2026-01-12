import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card.js";
import Navbar from "../components/Navbar.jsx";

const Home = ({ searchValue, setSearchValue, searchCuisine, setSearchCuisine }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 10;

  const fetchRecipes = async (reset = false) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const response = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=32452808b9cc40c495a52ab155e44f91",
        {
          params: {
            query: searchValue,
            cuisine: searchCuisine,
            number: ITEMS_PER_PAGE,
            offset: (page - 1) * ITEMS_PER_PAGE,
          },
        }
      );

      const newResults = response.data.results;

      setProducts((prev) =>
        reset ? newResults : [...prev, ...newResults]
      );

      if (newResults.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchRecipes(true);
  }, [searchValue, searchCuisine]);

  useEffect(() => {
    if (page > 1) fetchRecipes();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        if (!loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <>
      <Navbar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchCuisine={searchCuisine}
        setSearchCuisine={setSearchCuisine}
      />

      <div style={{ marginTop: "100px" }} className="home">
        {products.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            thumbnail={card.image}
            title={card.title}
            rate={card.spoonacularScore}
          />
        ))}

        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
        {!hasMore && <p style={{ textAlign: "center" }}>No more recipes</p>}
      </div>
    </>
  );
};

export default Home;
