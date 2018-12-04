import { corners } from '../../constants';
import { MOVE_HANDLE } from '../actions';
import { makeCornersXYObjects } from '../../helpers';

const initialState = makeCornersXYObjects();

export default ( state = initialState, action = {} ) => {
  if ( action.type === MOVE_HANDLE ) {
    const { corner, x, y } = action.payload;
    return {
      ...state,
      [ corner ]: { x, y },
    };
  }
  return state;
}
