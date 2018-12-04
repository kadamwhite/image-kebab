import {
  SET_IMAGE,
  SET_IMAGE_POSITION,
} from '../actions';
import { makeCornersXYObjects } from '../../helpers';

const initialState = {
  src: '',
  width: 0,
  height: 0,
  corners: makeCornersXYObjects(),
};

export default ( state = initialState, action = {} ) => {
  if ( action.type === SET_IMAGE ) {
    const { src, width, height } = action.payload;
    return {
      src,
      width,
      height,
      corners: makeCornersXYObjects(),
    };
  }

  if ( action.type === SET_IMAGE_POSITION ) {
    return {
      ...state,
      corners: action.payload,
    };
  }

  return state;
};
