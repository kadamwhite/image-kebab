import { SET_IMAGE } from '../actions';
import { computeCorners, makeCornersXYObjects } from '../../helpers';

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
			corners: computeCorners( width, height ),
		};
	}

	return state;
};
