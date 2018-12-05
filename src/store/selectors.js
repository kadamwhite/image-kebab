import { tl, tr, bl, corners } from '../constants';
import { getTransform } from '../matrix';

export const imageSource = ( state ) => state.image.src;
export const imageWidth = ( state ) =>
	state.image.corners[ tr ].x - state.image.corners[ tl ].x;
export const imageHeight = ( state ) =>
	state.image.corners[ bl ].y - state.image.corners[ tl ].y;
export const imageCorner = ( state, corner ) => state.image.corners[ corner ];

export const handle = ( state, corner ) => state.handles[ corner ];

const cornerDelta = ( state, corner ) => {
	const start = imageCorner( state, corner );
	const end = handle( state, corner );
	return {
		x: end.x - start.x,
		y: end.y - start.y,
	};
};

export const cornerX = ( state, corner ) => handle( state, corner ).x;
export const cornerY = ( state, corner ) => handle( state, corner ).y;

export const matrixTransform = ( state ) => {
	const fromPoints = corners.map( corner => imageCorner( state, corner ) );
	const toPoints = corners.map( corner => handle( state, corner ) );
	return getTransform( fromPoints, toPoints );
};
