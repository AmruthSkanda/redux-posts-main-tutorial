import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {},action) {
	switch (action.type) {
		case DELETE_POST:
			return _.omit(state, action.payload);// return state other than the id in payload
		case FETCH_POST: 
			// const post = action.payload.data;
			// const newState = { ...state };
			// newState[post.id] = post;
			// return newState;
			// abv is traditional ES5 way
			return { ...state, [action.payload.data.id] : action.payload.data };
			//abv is same as es5 way... but new es6 syntax. 
			//abv line break down: create a new obj, spread old state with "...state" then add new key-value pair; [] means not create array but means its a key with value contained and then assign the value to it
		case FETCH_POSTS:
			return _.mapKeys(action.payload.data, "id");
		default :
			return state;
	}
}