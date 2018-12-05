const numeric = window.numeric;

export const pairToPoint = ( [ x, y ] ) => ( { x, y } );

/**
 * Generate the transformation array.
 *
 * Adapted from https://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
 * Both fromPoint and toPoint must be ordered the same
 * (top left, bottom left, top right, bottom right)
 *
 * @param {Object[]} fromPoint Array of { x, y } objects representing the original corners.
 * @param {Object[]} toPoint   Array of { x, y } objects representing the transformed corners.
 */
export const calculateMatrix = ( fromPoint, toPoint ) => {
  // console.assert( fromPoint.length === 4 & toPoint.length === 4 );

  // Creates 8x8 array.
  const A = fromPoint.reduce( ( memo, { x, y }, idx ) => {
    const to = toPoint[ idx ];
    return [
      ...memo,
      [x, y, 1, 0, 0, 0, -x * to.x, -y * to.x ],
      [0, 0, 0, x, y, 1, -x * to.y, -y * to.y ],
    ];
  }, [] );

  const B = toPoint.reduce(
    ( memo, { x, y } ) => [ ...memo, x, y ],
    []
  );

  // Solve A * h = B for h
  const h = numeric.solve( A, B );

  const H = [
    [ h[0], h[1], 0, h[2] ],
    [ h[3], h[4], 0, h[5] ],
    [    0,    0, 1,    0 ],
    [ h[6], h[7], 0,    1 ],
  ];

  // // Sanity check that H actually maps `fromPoint` to `toPoint`
  // // TODO: Try disabling for performance?
  // for ( let i = 0; i < 4; i++ ) {
  //   const { x: fromX, y: fromY } = fromPoint[ i ];
  //   const { x: toX, y: toY } = toPoint[ i ];
  //   const lhs = numeric.dot( H, [ fromX, fromY, 0, 1 ] );
  //   const k_i = lhs[ 3 ];
  //   const rhs = numeric.dot( k_i, [ toX, toY, 0, 1 ] );
  //   console.assert( numeric.norm2( numeric.sub( lhs, rhs ) ) < 1e-9, "Not equal:", lhs, rhs );
  // }

  return H;
};

/**
 * Render a matrix3d transform string.
 *
 * Both fromPoint and toPoint must be ordered the same
 * (top left, bottom left, top right, bottom right)
 *
 * @param {Object[]} fromPoint Array of { x, y } objects representing the original corners.
 * @param {Object[]} toPoint   Array of { x, y } objects representing the transformed corners.
 * @return {String} matrix3d transform string.
 */
export const getTransform = ( width, height, deltas ) => {
  // Both fromPoint and toPoint must be ordered the same
  // (top left, bottom left, top right, bottom right)
  const fromPoint = [
    { x: 0, y: 0 },
    { x: 0, y: height },
    { x: width, y: 0 },
    { x: width, y: height },
  ];
  const toPoint = deltas.map( ( delta, idx ) => {
    const original = fromPoint[ idx ];
    return {
      x: original.x + delta.x,
      y: original.y + delta.y,
    };
	} );
	console.log( fromPoint, toPoint );

  // Calculate transformation matrix and reduce to matrix3d transform syntax.
  const H = calculateMatrix( fromPoint, toPoint );

  let matrix3d = [];
  for ( let col = 0; col < 4; col++ ) {
    for ( let row = 0; row < 4; row++ ) {
      matrix3d.push( H[row][col] );
    }
  }
  return `matrix3d(${ matrix3d.join( ',' ) })`;
};
