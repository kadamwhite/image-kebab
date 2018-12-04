import { corners } from './constants';

export const clone = obj => JSON.parse( JSON.stringify( obj ) );

export const makeCornersXYObjects = () => corners.reduce( ( state, corner ) => ( {
	...state,
	[ corner ]: {
		x: 0,
		y: 0,
	},
} ), {} );

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
