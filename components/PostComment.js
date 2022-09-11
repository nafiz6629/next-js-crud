import { useState,useEffect } from "react";
function PostComment({refId}){
    const [comments,setComments] = useState([])
    const [commentCount,setCommentCount] = useState(null)
    const [comment,setComment] = useState('')
    const postData = {
        comments_text: comment,
        comments_type: 'post',
        comments_reference: refId,
        users_id: 2
}
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/all_comments/post/${refId}`)
        .then((res) => res.json())
        .then((data) => {
            setComments(data)
            setCommentCount(data.length)
        })
    }, [])
    const fetchComments = async () => {
        const response  = await fetch(`http://127.0.0.1:8000/api/all_comments/post/${refId}`)
        const data = await response.json()
        setCommentCount(data.length)
        setComments(data)
    }
    const submitComment = async ()=>{
        
        const response = await fetch('http://127.0.0.1:8000/api/create_comment',{
            method:'POST',
            body: JSON.stringify(postData),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await response.json()
        fetchComments()
        
    }
    return (
        <>
        <h5>Comments ({commentCount})</h5>
        <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)}/>
        <button onClick={submitComment}>Submit</button>
        {
            comments.map(comment=>{
                return (
                    <div key={comment.comments_id}>
                        <p>{comment.comments_text}</p>
                    </div>
                )
            })
        }
        </>
    )

}
export default PostComment;