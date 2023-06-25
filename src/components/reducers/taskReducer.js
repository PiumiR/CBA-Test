const initialState = [
  {
    id: 0,
    title: "task1",
    description: "homework",
    date: "2023/08/09",
    status: 1,
  },
  {
    id: 1,
    title: "task2",
    description: "laundry",
    date: "2023/02/17",
    status: 2,
  },
];

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      state = [...state, action.payload];
      return state;
    case "UPDATE_TASK":
      const updateState = state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      state = updateState;
      return state;
    case "DELETE_CONTACT":
      const filterTasks = state.filter(
        (task) => task.id !== action.payload && task
      );
      state = filterTasks;
      return state;

    default:
      return state;
  }
};

export default taskReducer;
