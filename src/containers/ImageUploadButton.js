import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { readAsImage } from '../helpers';
import { setImage } from '../store/actions';

const mapDispatchToProps = ( dispatch ) => ( {
	onChange( evt ) {
		readAsImage( evt.target.files[0] ).then( image => dispatch( setImage( image ) ) );
	},
} );

export const ImageUploadButton = ( { onChange } ) => (
	<input
		className="image-upload-button"
		type="file"
		onChange={ onChange }
	/>
);

ImageUploadButton.propTypes = {
	onChange: PropTypes.func.isRequired,
};

export default connect( null, mapDispatchToProps )( ImageUploadButton );
