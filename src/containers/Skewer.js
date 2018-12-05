import React from 'react';
import { connect } from 'react-redux';
import Skewer from '../components/Skewer';
import DragHandleContainer from './DragHandle';
import { corners } from '../constants';

import {
	imageWidth,
	imageSource,
	imageHeight,
	matrixTransform,
} from '../store/selectors';

const mapStateToProps = ( state ) => ( {
	src: imageSource( state ),
	width: imageWidth( state ),
	height: imageHeight( state ),
	matrixTransform: matrixTransform( state ),
} );

const SkewerContainer = ( props ) => (
	<Skewer { ...props }>
		{ corners.map( ( corner ) => (
			<DragHandleContainer
				key={ `handle-${ corner }` }
				corner={ corner }
			/>
		) ) }
	</Skewer>
);

export default connect( mapStateToProps )( SkewerContainer );
