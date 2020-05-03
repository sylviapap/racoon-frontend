import React from 'react'

const Comment = props =>  {
	console.log(props)
	return(
		<div className="comment-card">
			<h6 className="comment-username">{props.comment.user.username}:</h6>
	{props.comment.user.first_name ? <p>{props.comment.user.first_name}</p> : null}
			<p className="comment-content">{props.comment.content}</p>
		</div>
	)
}

export default Comment