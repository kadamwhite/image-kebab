import { connect } from 'react-redux';
import { handle } from '../store/selectors';

const mapStateToProps = ( state, ownProps ) => {
	const { x, y } = handle( state, ownProps.corner );
	return {
		x,
		y,
	};
};

export default connect( mapStateToProps )
