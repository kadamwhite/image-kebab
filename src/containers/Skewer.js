import { connect } from 'react-redux';
import Skewer from '../components/Skewer';

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

export default connect( mapStateToProps )( Skewer );
