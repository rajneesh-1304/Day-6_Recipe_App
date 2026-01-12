import '../index.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slice/slice';

const Navbar = ({ searchValue, setSearchValue, searchCuisine, setSearchCuisine}) => {
const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated
  );
  const addRecipe = ()=>{
    navigate('/add-recipe')
  }
console.log(searchCuisine)
  const handleLogin= ()=>{
    navigate('/login')
  }
  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login');
  };

  const handleCuisineChange = (e) => {
    setSearchCuisine(e.target.value)
    console.log("Selected cuisine:", e.target.value);
  };

  return (
    <div className='navbar'>
      <h1 className='heading'>Recipe-App</h1>
      <input
        className='search_bar'
        placeholder='Search...'
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
        <select style={{padding:"5px",  borderRadius:"10px"}} name="Cuisine" id="" onChange={handleCuisineChange} value={searchCuisine}>
          <option value="">Select Cuisine</option>
          <option value="Italian">Italian</option>
          <option value="Asian">Asian</option>
          <option value="Pakistani">Pakistani</option>
          <option value="Mexican">Mexican</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Indian">Indian</option>
        </select>
      
      <div className='login_space_on_front'>
        <button className='cart_button' onClick={addRecipe}>Add Recipe</button>
      {isAuthenticated ? (
          <button className='cart_button' onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className='cart_button' onClick={handleLogin}>
            Login
          </button>
        )}
        </div>
    </div>
  );
};

export default Navbar;
