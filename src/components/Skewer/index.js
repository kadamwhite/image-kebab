import React, { PureComponent } from 'react';

import { corners } from '../../constants';
import { makeCornersXYObjects } from '../../helpers';
import {
  getTransform,
  pairToPoint,
} from '../../matrix';

import DragHandle from '../DragHandle';

import './style.css';

class Skewer extends PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      transforms: makeCornersXYObjects(),
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
    if ( ! corners.includes( corner ) ) {
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
    const { image, children } = this.props;
    if ( ! image ) {
      return null;
    }
    const { src, width, height } = this.props.image;

    return (
      <div className="skewer">
        { children }
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