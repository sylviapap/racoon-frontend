import React from 'react'

const Comment = props =>  {
    return(
        <div className="comment-card">
            <h6 className="comment-username">{props.comment.user.username}:</h6>
            <p className="comment-content">{props.comment.content}</p>
        </div>
    )
}

export default Comment