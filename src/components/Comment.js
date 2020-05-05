import React from 'react'

const Comment = props =>  {
	console.log(props)
	return(
		<div className="comment-card">
			<h6 className="comment-username">{props.comment.user.first_name.charAt(0).toUpperCase()+props.comment.user.first_name.substr(1).toLowerCase()}:</h6>
			<p className="comment-content">{props.comment.content}</p>
		</div>
	)
}

export default Comment