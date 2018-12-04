import React from 'react';
import PropTypes from 'prop-types';
import DropToUpload from 'react-drop-to-upload';
import { connect } from 'react-redux';

import SkewerContainer from '../Skewer';
import DropTarget from '../../components/DropTarget';
import { setImage } from '../../store/actions';
import { readAsImage } from '../../helpers';
import DropZone from '../DropZone';

import './style.css';

const mapStateToProps = ( state ) => ( {
	imageLoaded: ! ! state.image.src,
} );

const mapDispatchToProps = ( dispatch ) => ( {
	onDrop( acceptedFiles ) {
		readAsImage( acceptedFiles[ 0 ] ).then( image => dispatch( setImage( image ) ) );
	},
	onFileChange( evt ) {
		readAsImage( evt.target.files[0] ).then( image => dispatch( setImage( image ) ) );
	},
} );

const App = ( {
	imageLoaded,
	onFileChange,
} ) => (
	<DropZone>
		<div className="App">
			{ imageLoaded ? (
				<SkewerContainer />
			) : (
				<header className="App-header">
					<h1>Image Kebab<em>!</em></h1>

						<DropTarget />
						<input
							className="image-upload-button"
							type="file"
							onChange={ onFileChange }
						/>

					<p>Drag-and-drop the image to skewer into this browser window.</p>

					<small className="attribution">
						<a href="https://www.vexels.com/vectors/preview/132102/shish-kebab-icon">Shish kebab icon</a> designed by Vexels
					</small>
				</header>
			) }
		</div>
	</DropZone>
);

App.propTypes = {
	imageLoaded: PropTypes.bool.isRequired,
};

export default connect( mapStateToProps, mapDispatchToProps )( App );
