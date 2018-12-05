import { tl, tr, bl } from '../constants';

export const imageSource = ( state ) => state.image.src;
export const imageWidth = ( state ) =>
	state.image.corners[ tr ].x - state.image.corners[ tl ].x;
export const imageHeight = ( state ) =>
	state.image.corners[ bl ].y - state.image.corners[ tl ].y;
export const imageCorner = ( state, corner ) => state.image.corners[ corner ];

export const handle = ( state, corner ) => state.handles[ corner ];

const cornerDelta = ( state, corner, dimension ) => {
	const start = imageCorner( state, corner );
	const end = handle( state, corner );
	return end[ dimension ] - start[ dimension ];
};
export const cornerDeltaX = ( state, corner ) => cornerDelta( state, corner, 'x' );
export const cornerDeltaY = ( state, corner ) => cornerDelta( state, corner, 'y' );

export const cornerX = ( state, corner ) => handle( state, corner ).x;
export const cornerY = ( state, corner ) => handle( state, corner ).y;
