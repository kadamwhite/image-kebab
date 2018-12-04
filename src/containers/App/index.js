import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SkewerContainer from '../Skewer';
import DropTargetContainer from '../DropTarget';
import DropZone from '../DropZone';

import './style.css';

const mapStateToProps = ( state ) => ( {
	imageLoaded: ! ! state.image.src,
} );

export const App = ( { imageLoaded } ) => (
	<DropZone>
		<div className="App">
			{ imageLoaded ? (
				<SkewerContainer />
			) : (
				<header className="App-header">
					<h1>Image Kebab<em>!</em></h1>

					<DropTargetContainer />

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

export default connect( mapStateToProps )( App );
