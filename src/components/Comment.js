import React from 'react'

const Comment = props =>  {
	console.log(props)
	return(
		<div className="comment-card">
			<h6 className="comment-username">{props.comment.user.first_name}:</h6>
			<p className="comment-content">{props.comment.content}</p>
		</div>
	)
}

export default Comment