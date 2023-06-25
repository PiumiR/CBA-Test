const initialState = [{}];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_USER":
      state = [...state, action.payload];
      return state;
    default:
      return state;
  }
};

export default userReducer;
