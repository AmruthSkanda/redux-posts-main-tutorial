import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import PostsIndex from './components/PostsIndex';
import PostsNew from './components/PostsNew';
import PostsShow from './components/PostsShow';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(//switch is used to make router not make loose match thereby rendering all matching components TOGETHER.
	//***for Switch: pass most specific route url on top so that only that is rendered
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<Switch>
	    	<Route path="/posts/new" component={PostsNew} />
	    	<Route path="/posts/:id" component={PostsShow} //if placed abv PostsNew route, router would assume /posts/[new] as wild card(:id) and match to render comp PostsShow. Hence ordering route is imp
	    	/>
	    	<Route path="/" component={PostsIndex} />
    	</Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
