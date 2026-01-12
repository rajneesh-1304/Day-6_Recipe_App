// import axios from 'axios';
// import { fetchData } from './slice';

// export const fetchWeatherThunk = (location) => {
//     return async (dispatch) => {
//         if (!location) return;

//         const response = await axios.get(
//             `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b59f570a0d07270949c8dc6fe81e0a8d`
//         );

//         dispatch(fetchData(response.data));
//     };
// };