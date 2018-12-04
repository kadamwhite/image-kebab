import { clone } from '../../helpers';
import { setImage, SET_IMAGE } from '../actions';
import image from './image';

describe( 'image reducer', () => {
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
        bl: { x: 0, y: 0 },
        br: { x: 0, y: 0 },
        tl: { x: 0, y: 0 },
        tr: { x: 0, y: 0 },
      },
    } );
  } );

  it( `replaces existing state on subsequent ${ SET_IMAGE } action`, () => {
    const state = {
      src: 'https://the-internet.com/cat-meme.jpg',
      width: 500,
      height: 300,
      corners: {
        bl: { x: 5, y: 8 },
        br: { x: 9, y: 8 },
        tl: { x: 5, y: 2 },
        tr: { x: 0, y: 2 },
      },
    };
    const nextState = image( state, setImage( {
      src: 'https://the-internet.com/better-cat-meme.jpg',
      width: 400,
      height: 350,
    } ) );

    expect( nextState ).not.toBe( state );
    expect( nextState ).toEqual( {
      src: 'https://the-internet.com/better-cat-meme.jpg',
      width: 400,
      height: 350,
      corners: {
        bl: { x: 0, y: 0 },
        br: { x: 0, y: 0 },
        tl: { x: 0, y: 0 },
        tr: { x: 0, y: 0 },
      },
    } );
  } );
} );
