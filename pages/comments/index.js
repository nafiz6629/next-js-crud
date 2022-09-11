import { useState } from "react";

function CommentsPage({allcomments}){
    const [comments,setComments] = useState(allcomments)
    const [comment,setComment] = useState('')
    const fetchComments = async () => {
        const response  = await fetch('http://127.0.0.1:8000/api/all_comments/post/1')
        const data = await response.json()
        setComments(data)
    }
    const postData = {
                comments_text: comment,
                comments_type: 'post',
                comments_reference: 1,
                users_id: 2
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
        console.log(data);
        fetchComments()
        
    }
    

    return (
        <>
        <h3 >Comments:</h3>
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
export default CommentsPage;

export async function getServerSideProps(){
    const response = await fetch('http://127.0.0.1:8000/api/all_comments/post/1')
    const data = await response.json();
    
    return {
        props:{
            allcomments:data
        }
    }
}