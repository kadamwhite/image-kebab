import { MOVE_HANDLE, SET_IMAGE } from '../actions';
import { computeCorners, makeCornersXYObjects } from '../../helpers';

const initialState = makeCornersXYObjects();

export default ( state = initialState, action = {} ) => {
	if ( action.type === SET_IMAGE ) {
		const { width, height } = action.payload;
		return computeCorners( width, height );
	}

	if ( action.type === MOVE_HANDLE ) {
		const { corner, x, y } = action.payload;
		if ( state[ corner ].x === x && state[ corner ].y === y ) {
			// May fire more often than an actual update is needed.
			return state;
		}
		return {
			...state,
			[ corner ]: {
				x: x,
				y: y,
			},
		};
	}
	return state;
}
