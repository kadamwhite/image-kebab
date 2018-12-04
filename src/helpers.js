import { corners } from './constants';

export const clone = obj => JSON.parse( JSON.stringify( obj ) );

export const makeCornersXYObjects = () => corners.reduce( ( state, corner ) => ( {
  ...state,
  [ corner ]: {
    x: 0,
    y: 0,
  },
} ), {} );
