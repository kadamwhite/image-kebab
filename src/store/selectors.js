export const imageHeight = ( state ) => state.image.height;
export const imageSource = ( state ) => state.image.src;
export const imageWidth = ( state ) => state.image.width;
export const imageCorner = ( state, corner ) => state.image.corners[ corner ];
export const handle = ( state, corner ) => state.handles[ corner ];

const cornerDelta = ( state, corner, dimension ) => {
	const start = imageCorner( state, corner );
	const end = handle( state, corner );
	return end[ dimension ] - start[ dimension ];
};
export const cornerDeltaX = ( state, corner ) => cornerDelta( state, corner, 'x' );
export const cornerDeltaY = ( state, corner ) => cornerDelta( state, corner, 'y' );

export const windowWidth = ( state ) => state.window.width;
export const windowHeight = ( state ) => state.window.height;
