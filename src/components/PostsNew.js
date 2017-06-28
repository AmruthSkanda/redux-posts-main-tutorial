import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostsNew extends Component {

	renderField(field){//field.meta.error:: redux form will use validate func and based on Field name and error propname the error value is initialised from validate method to this meta.error prop
		const { meta: { touched, error } } = field; // this puuls meta prop from field, also nested props of meta which are touched and error from meta. (ES6 new syntax)
		//const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger'}`; 
		// use below short exp over the aobv one for simplified props acces using es6 syntax
		const className = `form-group ${touched && error ? 'has-danger' : ''}`
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input 
					className="form-control"
					//onChange={field.input.onChange}
					//onBlur={field.input.onBlur}
					//instead of above way below syntax to pass all events and stuff from field to input
					{...field.input}
				/>
				<div className="text-help" //works with has-danger class to show red text for errors (has-danger changes border of input to red)
				>
					{touched ? error : ""}
				</div>
			</div>
		);// field.meta.touched:: its a form state when user has touched or focused on a field and then blurred away, then it is touched. 
		//other wise if user hasn't entered anything or just on page load form is in "pristine" state. 
		//If error occurs then it will be in "invalid" state.
	}

	//abv is better approach for inputs that are similar than duplicating code with new functions for each field	
	/*renderTitleField(field){
		return (
			<div className="form-group">
				<label>Title</label>
				<input 
					className="form-control"
					//onChange={field.input.onChange}
					//onBlur={field.input.onBlur}
					//instead of above way below syntax to pass all events and stuff from field to input
					{...field.input}
				/>
			</div>
		);
	}*/

	onSubmit(values){
		//since we want form validation and other redux form stuffs to happen before we submit the form "handleSubmit" of redux form is used. it is called by redux-form after all processing is done
		this.props.createPost(values, ()=>{// callback coz, we cant to navigate to list page only after post is created succesfully in server(check  action creator code)
			this.props.history.push("/"); //history prop is provided by react-router to naigate to any new path programatically. 
		});//action creator to make post request for posts.

	}
	
	render(){
		const { handleSubmit } = this.props; //the bottom most code for reduxForm(like connect) in the end of the page adds lots of additional props to this comp', eg: handleSubmit
		return(
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field 
					name="title"
					label="Title"
					//component={this.renderTitleField}
					component={this.renderField}
				/>
				<Field 
					name="categories"
					label="Categories"
					component={this.renderField}
				/>
				<Field 
					name="content"
					label="Content"
					component={this.renderField}
				/>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values){
	const errors = {};

	//validations done in form if()'s as shown below
	//errors.[PROPNAME] shd be name same as in <Field /> component. eg: <Field name ="title" /> will have error prop as errors.title ***
	if(!values.title) {
		errors.title = "Enter a title!";
	}
	if(!values.categories) {
		errors.categories = "Enter some categories";
	}
	if(!values.content) {
		errors.content = "Enter some content";
	}
	//If errors is empty obj, redux-form assume no errors in form 
	//If it has any props, redux-form assumes form is invalid
	return errors; 
}

export default reduxForm({//reduxForm is a helper(like connect helper) that allows redux form to communicate directly from component to reducer(formReducer)
	validate, //function that is called automatically when user submits a helper from reducform
	form: 'PostsNewForm',//name of the form and should be unique
})(
	connect(null,{ createPost })(PostsNew)
);