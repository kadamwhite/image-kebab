import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SkewerContainer from '../Skewer';
import DropZoneContainer from '../DropZone';

import './style.css';

const mapStateToProps = ( state ) => ( {
	imageLoaded: ! ! state.image.src,
} );

const App = ( { imageLoaded } ) => (
	<div className="App">
		{ imageLoaded ? (
			<SkewerContainer />
		) : (
			<header className="App-header">
				<h1>Image Kebab<em>!</em></h1>
				<DropZoneContainer />
				<p>Drag-and-drop the image to skewer into the box above.</p>

				<small className="attribution">
					<a href="https://www.vexels.com/vectors/preview/132102/shish-kebab-icon">Shish kebab icon</a> designed by Vexels
				</small>
			</header>
		) }
	</div>
);

App.propTypes = {
	imageLoaded: PropTypes.bool.isRequired,
};

export default connect( mapStateToProps )( App );
