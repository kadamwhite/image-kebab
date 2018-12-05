import { corners, tl, tr, bl, br } from './constants';

export const clone = obj => JSON.parse( JSON.stringify( obj ) );

export const makeCornersXYObjects = () => corners.reduce( ( state, corner ) => ( {
	...state,
	[ corner ]: {
		x: 0,
		y: 0,
	},
} ), {} );

export const computeCorners = ( width, height ) => {
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

export const loadImage = src => new Promise( ( resolve, reject ) => {
	const img = new Image();
	img.onload = function() {
		resolve( {
			width: this.width,
			height: this.height,
			src,
		} );
	};
	img.onerror = ( err ) => reject( err );

	// Start loading the image
	img.src = src;
} );

export const readAsImage = file => new Promise( ( resolve, reject ) => {
	const reader = new FileReader();
	reader.onload = evt => {
		loadImage( evt.target.result )
			.then( resolve )
			.catch( reject );
	};
	reader.onabort = () => reject( 'File read aborted' );
	reader.onerror = () => reject( 'File read failed' );

	// Start reading the file
	reader.readAsDataURL( file );
} );
