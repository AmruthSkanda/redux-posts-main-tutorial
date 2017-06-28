import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { Link } from 'react-router-dom';
import { deletePost } from '../actions';
class PostsShow extends Component{
	componentDidMount(){
		const { id } = this.props.match.params;// id is the wild card from url. match.params constains all wildcards in curretn url. This is provided by react-router obvi :/
		this.props.fetchPost(id); 
	}
	onDeleteClick() {
		const { id } = this.props.match.params;
		this.props.deletePost(id, ()=>{
			this.props.history.push("/");
		});
	}
	render(){//gets only one post basd on id
		const { post } = this.props;
		
		if(!post) {
			return <div>Loading...</div>
		}

		return(
			<div>
				<Link to="/">Back to index</Link>
				<button 
					className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)}
				>Delete Post</button>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	}
}

function mapStateToProps({ posts }, ownProps){ //ownProps is same as this.props in abv comp'. This allows us to send only neccesary info from application state to abv comp'. here only post with particular id
	//mapStateToProps can be used to do such filtering ops on state and not jus sending state as prosp to comp
	return { post : posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);