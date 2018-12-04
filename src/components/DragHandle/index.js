import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import './style.css';

class DragHandle extends PureComponent {
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
      preview: null,
    } );
    this.x = evt.clientX;
    this.y = evt.clientY;
  }

  onMouseMove( evt ) {
  }

  onMouseUp( evt ) {
    if ( this.state.dragging ) {
      this.onDrag( evt.clientX, evt.clientY );
    }
    this.setState( {
      dragging: false,
    } );
  }

  render() {
    const { x, y } = this.props;
    return (
      <div
        className="draghandle"
        ref={ node => { this.el = node; } }
        style={ {
          top: x,
          left: y,
        } }
      >
        { /*
          onMouseDown={ this.onMouseDown }
          onMouseMove={ this.onMouseMove }
          onMouseUp={ this.onMouseUp }
        */ }
      </div>
    );
  }
}

DragHandle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  corner: PropTypes.string.isRequired,
  onDrag: PropTypes.func.isRequired,
};

export default DragHandle;
