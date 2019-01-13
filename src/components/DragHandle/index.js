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
    this.props.onDrag( clientX, clientY );
  }

  onMouseDown( evt ) {
		evt.preventDefault();
		if ( ! this.state.dragging ) {
			this.setState( {
				dragging: true,
			} );
			this.x = evt.clientX;
			this.y = evt.clientY;
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
