import React from 'react';
import { connect } from 'react-redux';
import Skewer from '../components/Skewer';
import { setImagePosition } from '../store/actions';
import DragHandleContainer from './DragHandleContainer';
import { corners } from '../constants';

const mapStateToProps = ( state ) => ( {
	src: state.image.src,
	width: state.image.width,
	height: state.image.height,
} );

const mapDispatchToProps = ( dispatch ) => ( {
	setImagePosition: ( boundingRect ) => dispatch( setImagePosition( boundingRect ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( (
	<Skewer>
		{ corners.map( ( corner ) => (
			<DragHandleContainer
				key={ `handle-${ corner }` }
				corner={ corner }
			/>
		) ) }
	</Skewer>
) );
