import React from 'react'

const Comment = props =>  {
    console.log(props)
    return(
        <div className="comment-card">
            <h6 className="comment-username">{props.data.user}:</h6>
            <p className="comment-content">{props.data.content}</p>
        </div>
    )
}

export default Comment