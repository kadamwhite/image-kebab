import { tl, tr, bl, br } from '../constants';

export const MOVE_HANDLE = 'MOVE_HANDLE';
export const moveHandle = ( corner, x, y ) => ( {
  type: MOVE_HANDLE,
  payload: {
    corner,
    x,
    y,
  },
} );

export const SET_IMAGE = 'SET_IMAGE';
export const setImage = ( image ) => ( {
  type: SET_IMAGE,
  payload: image,
} );

export const SET_IMAGE_POSITION = 'SET_IMAGE_POSITION';
export const setImagePosition = ( clientRect ) => {
  const { x, y, width, height } = clientRect;
  const payload = {
    [ tl ]: {
      x: x,
      y: y,
    },
    [ tr ]: {
      x: x + width,
      y: y,
    },
    [ br ]: {
      x: x + width,
      y: y + height,
    },
    [ bl ]: {
      x: x,
      y: y + height,
    },
  };

  return {
    type: SET_IMAGE_POSITION,
    payload,
  };
};

export const RESIZE_SCREEN = 'RESIZE_SCREEN';
export const resizeScreen = ( width, height ) => ( {
	type: RESIZE_SCREEN,
	payload: {
		width,
		height,
	},
} );
