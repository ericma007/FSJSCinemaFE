export const INIT_USERS = "INIT_USERS";
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
export const INIT_MOVIES = "INIT_MOVIES";
export const ADD_MOVIE = "ADD_MOVIE";
export const EDIT_MOVIE = "EDIT_MOVIE";
export const DELETE_MOVIE = "DELETE_MOVIE";
export const SEARCH_MOVIE="SEARCH_MOVIE"
export const INIT_SUBSCRIBERS="INIT_SUBSCRIBERS"
export const ADD_SUBSCRIBER = "ADD_SUBSCRIBER";
export const EDIT_SUBSCRIBER = "EDIT_SUBSCRIBER";
export const DELETE_SUBSCRIBER = "DELETE_SUBSCRIBER";
export const ADD_SUBSCRIPTION = "ADD_SUBSCRIPTION";
export const RESET_SEARCH_STR="RESET_SEARCH_STR"


const initialState = {
  users: [],
  userListToload: true,
  movies: [],
  movieList: [],
  searchString:"",
  movieListToload: true,
  subscribers:[],
  subscriberListToload:true
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_USERS:
      console.log("users", action.payload);
      return { ...state, users: action.payload, userListToload: false };

    case ADD_USER:
    case EDIT_USER:
    case DELETE_USER:
      
      return { ...state, userListToload: true };

    case INIT_SUBSCRIBERS:
      return { ...state, subscribers: action.payload,  subscriberListToload: false };
    
      case ADD_SUBSCRIBER:
      case EDIT_SUBSCRIBER:     
      case DELETE_SUBSCRIBER:
      case ADD_SUBSCRIPTION:
          return { ...state,subscriberListToload: true };
    
      
    case INIT_MOVIES:
      console.log("INIT movies", action.payload);
      return { ...state, movies: action.payload, movieList:action.payload,movieListToload: false };
    
    case SEARCH_MOVIE:
        console.log("Search movies", action.payload);
        return { ...state, movieList:action.payload.filteredList,searchString:action.payload.searchString};

    case RESET_SEARCH_STR:
        console.log("Reset search str");
        return { ...state, movieList:action.payload.filteredList,searchString:""};

    case ADD_MOVIE:
    case EDIT_MOVIE:     
    case DELETE_MOVIE:
      return { ...state, movieListToload: true };

    default:
      console.log("default app reducer")
      return state;
  }
};

export default appReducer;
