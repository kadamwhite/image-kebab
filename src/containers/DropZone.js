import { connect } from 'react-redux';

import { setImage } from '../store/actions';
import DropZone from '../components/DropZone';

const mapDispatchToProps = ( dispatch ) => ( {
	onDrop: image => dispatch( setImage( image ) ),
} );

export default connect( null, mapDispatchToProps )( DropZone );
