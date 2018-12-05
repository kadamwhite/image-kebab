import { MOVE_HANDLE, SET_IMAGE } from '../actions';
import { computeCorners } from '../../helpers';


export default ( state = null, action = {} ) => {
	if ( action.type === SET_IMAGE ) {
		if ( state ) {
			// Once initialized, do not reset handle positions when image changes.
			return state;
		}
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
