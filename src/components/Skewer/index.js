import React, { PureComponent } from 'react';

import DragZone from '../DragZone';

import './style.css';

const numeric = window.numeric;

const pairToPoint = ( [ x, y ] ) => ( { x, y } );

/**
 * Generate the transformation array.
 *
 * @param {Object[]} fromPoint Array of { x, y } objects representing the original corners.
 * @param {Object[]} toPoint   Array of { x, y } objects representing the transformed corners.
 */
const calculateMatrix = ( fromPoint, toPoint ) => {
  // Adapted from https://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
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
 * @param {Object} transforms Transforms object.
 * @param {Number} width      The image width.
 * @param {Height} height     The image height.
 * @return {String} matrix3d transform string.
 */
const getTransform = ( transforms, width, height ) => {
  // Both fromPoint and toPoint must be ordered the same
  // (top left, bottom left, top right, bottom right)
  const fromPoint = [
    { x: 0, y: 0 },
    { x: 0, y: height },
    { x: width, y: 0 },
    { x: width, y: height },
  ];
  const toPoint = [
    transforms.tl,
    transforms.bl,
    transforms.tr,
    transforms.br,
  ].map( ( delta, idx ) => {
    const original = fromPoint[ idx ];
    return {
      x: original.x + delta.x,
      y: original.y + delta.y,
    };
  } );

  // Calculate transformation matrix and reduce to matrix3d transform syntax.
  const H = calculateMatrix( fromPoint, toPoint );

  let matrix3d = [];
  for ( let col = 0; col < 4; col++ ) {
    for ( let row = 0; row < 4; row++ ) {
      matrix3d.push( H[row][col] );
    }
  }
  return `matrix3d(${ matrix3d.join( ',' ) })`;
}

class Skewer extends PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      transforms: {
        tl: pairToPoint( [ 0, 0 ] ),
        tr: pairToPoint( [ 0, 0 ] ),
        br: pairToPoint( [ 0, 0 ] ),
        bl: pairToPoint( [ 0, 0 ] ),
      },
    };

    this.move = this.move.bind( this );
  }

  setComputedImageSize( node ) {
    if ( this.computedImageWidth && this.computedImageHeight ) {
      return;
    }
    const { width, height } = node.getBoundingClientRect();
    this.computedImageWidth = width;
    this.computedImageHeight = height;
  }

  move( corner, [ dx, dy ] ) {
    if ( ! [ 'tr', 'tl', 'br', 'bl' ].includes( corner ) ) {
      // Don't throw because it paradoxically makes it harder for me to debug.
      console.error( `Invalid corner "${ corner }"! Specify one of "tl", "tr", "br", or "bl"` );
      return;
    }
    const { transforms } = this.state;
    const { x, y } = transforms[ corner ];

    this.setState( {
      transforms: {
        ...transforms,
        [ corner ]: {
          x: x + dx,
          y: y + dy,
        },
      },
    } );
  }

  getTransform() {
    const { transforms } = this.state;
    const width = this.computedImageWidth;
    const height = this.computedImageHeight;

    if ( ! ( width && height ) ) {
      return 'initial';
    }

    // Call out to the pure function defined above.
    return getTransform( transforms, width, height );
  }

  render() {
    if ( ! this.props.image ) {
      return null;
    }
    const { src, width, height } = this.props.image;
    return (
      <div className="skewer">
        <DragZone
          className="dragzone dragzone--tr"
          zones={ [
            [ 'tl', 'tr' ],
            [ 'bl', 'br' ],
          ] }
          onDrag={ this.move }
        />
        <img
          alt="skewable"
          ref={ node => this.setComputedImageSize( node ) }
          style={ {
            transform: this.getTransform(),
          } }
          src={ src }
          width={ width }
          height={ height }
        />
      </div>
    );
  }
}

export default Skewer;