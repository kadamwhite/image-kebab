import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';

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
    // this.onMouseUp = this.onMouseUp.bind( this );
	}

	componentDidMount() {
		window.addEventListener( 'mousemove', this.onMouseMove );
		// window.addEventListener( 'mouseup', this.onMouseUp );
	}

	componentWillUnmount() {
		window.removeEventListener( 'mousemove', this.onMouseMove );
		// window.removeEventListener( 'mouseup', this.onMouseUp );
	}

  onDrag( clientX, clientY ) {
    if ( ! this.state.dragging || typeof this.props.onDrag !== 'function' ) {
      return;
		}
		// Add in the offsets to ensure position properly tracks the cursor.
    this.props.onDrag( clientX + this.x, clientY + this.y );
  }

  onMouseDown( evt ) {
		evt.preventDefault();
		if ( ! this.state.dragging ) {
			this.setState( {
				dragging: true,
			} );
			// Get current position of handle & mouse.
			const { x, y } = this.props;
			const { clientX, clientY } = evt;
			// Figure out the offset between evt.clientX/clientY and x/y.
			// Maintain these offsets while dragging so that the corner does not
			// magically snap to the cursor position as you move the mouse.
			this.x = x - clientX;
			this.y = y - clientY;
		} else {
			this.setState( {
				dragging: false,
			} );
		}
  }

  onMouseMove( evt ) {
		if ( this.state.dragging ) {
			this.onDrag( evt.clientX, evt.clientY );
		}
  }

  // onMouseUp( evt ) {
  //   if ( this.state.dragging ) {
  //     this.onDrag( evt.clientX, evt.clientY );
  //   }
  //   this.setState( {
  //     dragging: false,
  //   } );
  // }

  render() {
		const { x, y } = this.props;
		const { dragging } = this.state;
    return (
      <div
        className={ classNames( 'draghandle', { dragging } ) }
        ref={ node => { this.el = node; } }
        style={ {
          top: y,
          left: x,
        } }
				onMouseDown={ this.onMouseDown }
			/>
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
