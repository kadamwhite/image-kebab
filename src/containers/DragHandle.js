import { connect } from 'react-redux';

import { cornerX, cornerY } from '../store/selectors';
import { moveHandle } from '../store/actions';
import DragHandle from '../components/DragHandle';

const mapStateToProps = ( state, ownProps ) => {
	return {
		x: cornerX( state, ownProps.corner ),
		y: cornerY( state, ownProps.corner ),
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onDrag( x, y ) {
		dispatch( moveHandle( ownProps.corner, x, y ) );
	}
} );

export default connect( mapStateToProps, mapDispatchToProps )( DragHandle );
