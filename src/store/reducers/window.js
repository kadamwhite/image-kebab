import {
  RESIZE_WINDOW,
} from '../actions';

const initialState = {
  width: 0,
  height: 0,
};

export default ( state = initialState, action = {} ) => {
  if ( action.type === RESIZE_WINDOW ) {
    const { width, height } = action.payload;
    return {
      width,
      height,
    };
  }

  return state;
};
