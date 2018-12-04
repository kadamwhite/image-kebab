import DropToUpload from 'react-drop-to-upload';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import './style.css';

const loadImage = src => new Promise( ( resolve, reject ) => {
	const img = new Image();
	img.onload = function() {
		resolve( {
			width: this.width,
			height: this.height,
			src,
		} );
	};
	img.onerror = ( err ) => reject( err );

	// Start loading the image
	img.src = src;
} );

const readAsImage = file => new Promise( ( resolve, reject ) => {
	const reader = new FileReader();
	reader.onload = evt => {
		loadImage( evt.target.result )
			.then( resolve )
			.catch( reject );
	};
	reader.onabort = () => reject( 'File read aborted' );
	reader.onerror = () => reject( 'File read failed' );

	// Start reading the file
	reader.readAsDataURL( file );
} );

class DropZone extends PureComponent {
	constructor( props ) {
		super( props );
		this.onDrop = this.onDrop.bind( this );
		this.onFileChange = this.onFileChange.bind( this );
	}

	onDrop( acceptedFiles ) {
		readAsImage( acceptedFiles[ 0 ] ).then( image => {
			console.log( 'Loaded!' );
			this.props.onDrop( image );
		} );
	}

	onFileChange( evt ) {
		readAsImage( evt.target.files[0] ).then( image => {
			console.log( 'Loaded!' );
			this.props.onDrop( image );
		} );
	}

	render() {
		return (
			<DropToUpload
				dropEffect="copy"
				onDrop={ this.onDrop }
			>
				<div className="dropzone-placeholder" />
				<input
					type="file"
					onChange={ this.onFileChange }
				/>
			</DropToUpload>
		);
	}
}

DropZone.propTypes = {
	onDrop: PropTypes.func.isRequired,
};

export default DropZone;
