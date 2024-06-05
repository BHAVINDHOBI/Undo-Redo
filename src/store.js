import { createStore } from "redux";

const MAX_HISTORY_LENGTH = 50; // Example limit

const initialState = {
  content: "",
  past: [],
  future: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CHANGE":
      const newPast = [...state.past, state.content];
      if (newPast.length > MAX_HISTORY_LENGTH) {
        newPast.shift(); // Remove the oldest entry if exceeding limit
      }
      return {
        ...state,
        past: newPast,
        content: action.payload,
        future: [],
      };
    case "UNDO":
      if (state.past.length === 0) return state; // No undo if past is empty
      const previous = state.past[state.past.length - 1];
      return {
        ...state,
        past: state.past.slice(0, state.past.length - 1),
        future: [state.content, ...state.future],
        content: previous,
      };
    case "REDO":
      if (state.future.length === 0) return state; // No redo if future is empty
      const next = state.future[0];
      return {
        ...state,
        past: [...state.past, state.content],
        future: state.future.slice(1),
        content: next,
      };
    case "SET_CONTENT":
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
