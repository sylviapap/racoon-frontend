import React from 'react'

const Comment = props =>  {
	console.log(props)
	return(
		<div className="comment-card">
			<h6 className="comment-username">{props.comment.user_first_name.charAt(0).toUpperCase()+props.comment.user_first_name.substr(1).toLowerCase()}:</h6>
			<p className="comment-content">{props.comment.content}</p>
			{props.comment.created_at ? (<span className="comment-time">{new Date(props.comment.created_at).toLocaleString()}</span>) : (<span className="info">{new Date().toLocaleString()}</span>)}
	
		</div>
	)
}

export default Comment