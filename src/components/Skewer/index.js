import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Skewer = ( {
	children,
	height,
	src,
	width,
	matrixTransform,
} ) => ( ! src ? null : (
	<div className="skewer">
		{ children }
		<img
			alt="skewable"
			style={ {
				transform: matrixTransform,
			} }
			src={ src }
			width={ width }
			height={ height }
		/>
	</div>
) );

Skewer.propTypes = {
	src: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	matrixTransform: PropTypes.string.isRequired,
	children: PropTypes.node,
};

Skewer.defaultProps = {
	children: null,
};

export default Skewer;
