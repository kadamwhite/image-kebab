import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { readAsImage } from '../helpers';
import { setImage } from '../store/actions';
import DropTarget from '../components/DropTarget';

const mapDispatchToProps = ( dispatch ) => ( {
	onChange( evt ) {
		readAsImage( evt.target.files[0] ).then( image => dispatch( setImage( image ) ) );
	},
} );

export const DropTargetContainer = ( { onChange } ) => (
	<Fragment>
		<DropTarget />
		<input
			className="image-upload-button"
			type="file"
			onChange={ onChange }
		/>
	</Fragment>
);

DropTargetContainer.propTypes = {
	onChange: PropTypes.func.isRequired,
};

export default connect( null, mapDispatchToProps )( DropTargetContainer );
