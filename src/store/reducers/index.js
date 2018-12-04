import { combineReducers } from 'redux';

import handles from './handles';
import image from './image';

export default combineReducers( {
	handles,
	image,
} );
