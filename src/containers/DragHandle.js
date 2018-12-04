import { connect } from 'react-redux';

import { handle } from '../store/selectors';
import DragHandle from '../components/DragHandle';

const mapStateToProps = ( state, ownProps ) => {
	const { x, y } = handle( state, ownProps.corner );
	return {
		x,
		y,
	};
};

export default connect( mapStateToProps )( DragHandle );
