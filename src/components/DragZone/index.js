import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import './style.css';

class DragZone extends PureComponent {
  constructor( props ) {
    super( props );

    this.state = {
      dragging: false,
    };

    this.dragging = false;

    this.onMouseDown = this.onMouseDown.bind( this );
    this.onMouseMove = this.onMouseMove.bind( this );
    this.onMouseUp = this.onMouseUp.bind( this );
  }
 
  /**
   * Get the pixel dimensions (width & height) of one zone section.
   * 
   * @return {Object} An object with .height and .width pixel dimension properties.
   */
  getZoneDimensions() {
    const { zones } = this.props;
    const { width, height } = this.el.getBoundingClientRect();

    return {
      height: height / zones.length,
      width: width / zones[ 0 ].length,
    };
  }

  /**
   * Get the row and column number of a zone based on input coordinates.
   *
   * @param {Number} x The clientX position value.
   * @param {Number} y The clientY position value.
   * @return {Object} An object with .row and .column integer properties.
   */
  getZoneCoordinates( x, y ) {
    const { top, left } = this.el.getBoundingClientRect();
    const { height, width } = this.getZoneDimensions();

    return {
      col: Math.floor( ( x - left ) / width ),
      row: Math.floor( ( y - top ) / height ),
    };
  }

  /**
   * Get the zone string corresponding to a pair of x & y input coordinates.
   *
   * @param {Number} x The clientX position value.
   * @param {Number} y The clientY position value.
   * @return {String}
   */
  getZone( x, y ) {
    const { zones } = this.props;
    const { row, col } = this.getZoneCoordinates( x, y );

    return zones[ row ][ col ];
  }

  onDrag( clientX, clientY ) {
    if ( ! this.state.dragging || typeof this.props.onDrag !== 'function' ) {
      return;
    }
    this.props.onDrag( this.state.dragging, [
      clientX - this.x,
      clientY - this.y,
    ] );
  }

  onMouseDown( evt ) {
    this.setState( {
      dragging: this.getZone( evt.clientX, evt.clientY ),
      preview: null,
    } );
    this.x = evt.clientX;
    this.y = evt.clientY;
  }

  onMouseMove( evt ) {
    if ( ! this.state.dragging ) {
      const { width, height } = this.getZoneDimensions();
      const { col, row } = this.getZoneCoordinates( evt.clientX, evt.clientY );
      // Get the x & y of the top-left corner of the active zone.
      const x = width * col;
      const y = height * row;
      this.setState( {
        preview: {
          x,
          y,
        },
      } );
    } else {
      this.onDrag( evt.clientX, evt.clientY );
      // What is new becomes old
      this.x = evt.clientX;
      this.y = evt.clientY;
    }
  }

  onMouseUp( evt ) {
    if ( this.state.dragging ) {
      this.onDrag( evt.clientX, evt.clientY );
    }
    this.setState( {
      dragging: false,
    } );
  }

  renderPreview() {
    const { preview, dragging } = this.state;
    if ( dragging || ! preview ) {
      return null;
    }
    const { width, height } = this.getZoneDimensions();
    return (
      <div
        className="dragzone__preview"
        style={ {
          top: preview.y,
          left: preview.x,
          width,
          height,
        } }
      />
    )
  }

  render() {
    const { className } = this.props;
    const { dragging } = this.state;
    return (
      <div
        ref={ node => { this.el = node; } }
        className={ classNames( className, { dragging } ) }
        onMouseDown={ this.onMouseDown }
        onMouseMove={ this.onMouseMove }
        onMouseUp={ this.onMouseUp }
      >
        { this.renderPreview() }
      </div>
    );
  }
}

DragZone.propTypes = {
  className: PropTypes.string.isRequired,
  zones: PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.string ) ).isRequired,
  onDrag: PropTypes.func.isRequired,
};

export default DragZone;