import CommentList from '../../components/CommentList'
import PostComment from '../../components/PostComment'
function Post({post,comment}){
    console.log(comment);
    
    return (
        <>
        <h3>{post.posts_title}</h3>
        <p>{post.posts_text}</p>
        <PostComment refId={post.posts_id} />
        {/* <CommentList allComments={comment} count={post.comment_count} refId={post.posts_id} type='post' /> */}
        </>
    )
}
export default Post;

export async function getServerSideProps(context){
    const {params} = context;
    const response = await fetch(`http://127.0.0.1:8000/api/single_post/${params.posturl}`)
    const data = await response.json()
    const response2 = await fetch(`http://127.0.0.1:8000/api/all_comments/post/${data[0].posts_id}`)
    const data2 = await response2.json()
    console.log(data);
    
    return {
        props:{
            post:data[0],
            comment:data2
        }
    }
}