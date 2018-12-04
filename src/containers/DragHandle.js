import { connect } from 'react-redux';

import { cornerX, cornerY } from '../store/selectors';
import DragHandle from '../components/DragHandle';

const mapStateToProps = ( state, ownProps ) => {
	return {
		x: cornerX( state, ownProps.corner ),
		y: cornerY( state, ownProps.corner ),
	};
};

export default connect( mapStateToProps )( DragHandle );
