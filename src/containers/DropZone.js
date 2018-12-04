import { connect } from 'react-redux';
import React from 'react';
import DropToUpload from 'react-drop-to-upload';
import PropTypes from 'prop-types';

import { setImage } from '../store/actions';
import { readAsImage } from '../helpers';

const mapDispatchToProps = ( dispatch ) => ( {
	onDrop( acceptedFiles ) {
		readAsImage( acceptedFiles[ 0 ] ).then( image => dispatch( setImage( image ) ) );
	},
} );

export const DropZone = ( { children, onDrop } ) => (
	<DropToUpload
		className="dropzone"
		onDrop={ onDrop }
	>
		{ children }
	</DropToUpload>
);

DropZone.propTypes = {
	onDrop: PropTypes.func.isRequired,
	children: PropTypes.node,
};

export default connect( null, mapDispatchToProps )( DropZone );
