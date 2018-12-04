import { SET_IMAGE } from '../actions';
import { makeCornersXYObjects } from '../../helpers';
import { tl, tr, bl, br } from '../../constants';

const initialState = {
	src: '',
	width: 0,
	height: 0,
	corners: makeCornersXYObjects(),
};

const computeCorners = ( width, height ) => {
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;

	// Cap image long edge to 90% of available space
	const scaleX = Math.min( width, screenWidth * 0.9 ) / width;
	const scaleY = Math.min( height, screenHeight * 0.9 ) / height;
	const scale = Math.min( scaleX, scaleY );

	const scaledWidth = scale * width;
	const scaledHeight = scale * height;
	const top = ( screenHeight - scaledHeight ) / 2;
	const left = ( screenWidth - scaledWidth ) / 2;
	return {
		[ tl ]: {
			x: left,
			y: top,
		},
		[ tr ]: {
			x: left + scaledWidth,
			y: top,
		},
		[ bl ]: {
			x: left,
			y: top + scaledHeight,
		},
		[ br ]: {
			x: left + scaledWidth,
			y: top + scaledHeight,
		},
	};
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
