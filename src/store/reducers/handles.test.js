import { clone } from '../../helpers';
import { moveHandle, MOVE_HANDLE } from '../actions';
import { tr, bl } from '../../constants';
import handles from './handles';

describe( 'handles reducer', () => {
  it( 'initializes a null default state', () => {
    const state = handles();

    expect( state ).toEqual( null );
  } );

  it( 'does not mutate state on unrelated change', () => {
    const initialState = handles();
    const stateValues = clone( initialState );
    const nextState = handles( initialState, {
      type: 'UNRELATED',
    } );

    expect( nextState ).toBe( initialState );
    expect( clone( nextState ) ).toEqual( stateValues );
  } );

	// TODO: account for change of initial state to NULL
  it.skip( `updates state on ${ MOVE_HANDLE } action`, () => {
    let state = handles()
    let nextState = handles( state, moveHandle( tr, 9, 5 ) );

		expect( nextState ).not.toBe( state );
		expect( nextState.tl ).toBe( state.tl );
		expect( nextState.tr ).not.toBe( state.tr );
		expect( nextState.bl ).toBe( state.bl );
		expect( nextState.br ).toBe( state.br );
    expect( nextState ).toEqual( {
      tl: { x: 0, y: 0 },
      bl: { x: 0, y: 0 },
      tr: { x: 9, y: 5 },
      br: { x: 0, y: 0 },
    } );

    state = nextState;
    nextState = handles( nextState, moveHandle( bl, 42, -10 ) );

    expect( nextState ).not.toBe( state );
		expect( nextState.tl ).toBe( state.tl );
		expect( nextState.tr ).toBe( state.tr );
		expect( nextState.bl ).not.toBe( state.bl );
		expect( nextState.br ).toBe( state.br );
    expect( nextState ).toEqual( {
      tl: { x: 0, y: 0 },
      bl: { x: 42, y: -10 },
      tr: { x: 9, y: 5 },
      br: { x: 0, y: 0 },
    } );
  } );
} );
