import { clone } from '../../helpers';
import { setImage, SET_IMAGE } from '../actions';
import image from './image';

describe( 'image reducer', () => {
	beforeEach( () => {
		global.innerWidth = 1000;
		global.innerHeight = 1000;
	} );

	it( 'initializes a default state', () => {
		const state = image();

		expect( state ).toEqual( {
			src: '',
			width: 0,
			height: 0,
			corners: {
				bl: { x: 0, y: 0 },
				br: { x: 0, y: 0 },
				tl: { x: 0, y: 0 },
				tr: { x: 0, y: 0 },
			},
		} );
	} );

	it( 'does not mutate state on unrelated change', () => {
		const initialState = image();
		const stateValues = clone( initialState );
		const nextState = image( initialState, {
			type: 'UNRELATED',
		} );

		expect( nextState ).toBe( initialState );
		expect( clone( nextState ) ).toEqual( stateValues );
	} );

	it( `updates state on initial ${ SET_IMAGE } action`, () => {
		let state = image()
		let nextState = image( state, setImage( {
			src: 'https://the-internet.com/cat-meme.jpg',
			width: 500,
			height: 300,
		} ) );

		expect( nextState ).not.toBe( state );
		expect( nextState ).toEqual( {
			src: 'https://the-internet.com/cat-meme.jpg',
			width: 500,
			height: 300,
			corners: {
				bl: { x: 250, y: 650 },
				br: { x: 750, y: 650 },
				tl: { x: 250, y: 350 },
				tr: { x: 750, y: 350 },
			},
		} );
	} );

	it( `replaces existing state on subsequent ${ SET_IMAGE } action`, () => {
		const state = {
			src: 'https://the-internet.com/cat-meme.jpg',
			width: 500,
			height: 300,
			corners: {
				bl: { x: 250, y: 650 },
				br: { x: 750, y: 650 },
				tl: { x: 250, y: 350 },
				tr: { x: 750, y: 350 },
			},
		};
		const nextState = image( state, setImage( {
			src: 'https://the-internet.com/better-cat-meme.jpg',
			width: 400,
			height: 400,
		} ) );

		expect( nextState ).not.toBe( state );
		expect( nextState ).toEqual( {
			src: 'https://the-internet.com/better-cat-meme.jpg',
			width: 400,
			height: 400,
			corners: {
				bl: { x: 300, y: 700 },
				br: { x: 700, y: 700 },
				tl: { x: 300, y: 300 },
				tr: { x: 700, y: 300 },
			},
		} );
	} );

	it( `correctly scales large images`, () => {
		let state = image()
		let nextState = image( state, setImage( {
			src: 'https://the-internet.com/cat-meme.jpg',
			width: 1800,
			height: 1200,
		} ) );

		expect( nextState ).not.toBe( state );
		expect( nextState ).toEqual( {
			src: 'https://the-internet.com/cat-meme.jpg',
			width: 1800,
			height: 1200,
			corners: {
				bl: { x: 50, y: 800 },
				br: { x: 950, y: 800 },
				tl: { x: 50, y: 200 },
				tr: { x: 950, y: 200 },
			},
		} );
	} );
} );
