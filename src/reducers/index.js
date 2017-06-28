import { combineReducers } from 'redux';
import PostsReducer from './postsReducer';
import { reducer as formReducer}  from 'redux-form';

const rootReducer = combineReducers({
	posts: PostsReducer,
	form: formReducer//*** have to have "form" as key
});

export default rootReducer;
