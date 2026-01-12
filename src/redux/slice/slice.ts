import { createSlice, nanoid, type PayloadAction} from '@reduxjs/toolkit';

interface User {
  id: string;
  email:string;
  password:string;
}

interface UserState {
  users: User[];
  currUser: User | null;
  isAuthenticated : boolean;
}

const initialState: UserState = {
  users: [
    { email: 'admin@gmail.com', password: '12345678', id: 'fsdfas' },
    { email: 'kumar@gmail.com', password: '12345678', id: 'fsdfass' },
    { email: 'abc@gmail.com', password: '12345678', id: 'fsdfasss' },
  ],
  currUser: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      const currentUser = action.payload;
      const found = state.users.find(user => user.email === currentUser.email);
      if (!found) {
        state.users.push(currentUser);
      } else {
        console.log("User already exists");
      }
    },
    login: (state, action: PayloadAction<User>) => {
      const currentUser = action.payload;
      const found = state.users.find(user => user.email === currentUser.email && user.password === currentUser.password)
      if (found) {
        state.isAuthenticated = true;
        state.currUser = found;
        console.log('User Logged In successfully');
      } else {
        state.isAuthenticated = false;
        console.log('Invalid Credentials')
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currUser = null;
    },
    

  }
})

export const {
  register, login, logout
} = userSlice.actions;

export default userSlice.reducer