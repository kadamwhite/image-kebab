import {
	setImagePosition,
	SET_IMAGE_POSITION,
} from './actions';
import { corners } from '../constants';

describe( 'setImagePosition', () => {
	let boundingBox;

	beforeEach( () => {
		boundingBox = {
			x: 5,
			y: 10,
			width: 15,
			height: 20,
		};
	} );

	it( `dispatches a ${ SET_IMAGE_POSITION } event`, () => {
		const action = setImagePosition( boundingBox );
		expect( action.type ).toBeDefined();
		expect( action.type ).toBe( SET_IMAGE_POSITION );
	} );

	it( 'provides x-y point objects for each corner', () => {
		const action = setImagePosition( boundingBox );
		corners.forEach( corner => {
			expect( action.payload[ corner ] ).toBeDefined();
			expect( Object.keys( action.payload[ corner ] ).sort().join() ).toBe( 'x,y' );
		} );
	} );

	it( 'correctly computes the position of each corner', () => {
		const action = setImagePosition( boundingBox );
		expect( action.payload ).toEqual( {
			tl: { x: 5, y: 10 },
			tr: { x: 20, y: 10 },
			bl: { x: 5, y: 30 },
			br: { x: 20, y: 30 },
		} );
	} );
})
