import Link from 'next/link'
function PostList({posts}){
    return (
        <>
        <h1>
            Posts:
            {
                posts.map(post=>{
                    return (
                        <div key={post.posts_id}>
                            <Link href={`posts/${post.posts_url}`} passHref>
                            <a>{post.posts_title}</a>
                            </Link>
                            <hr></hr>
                        </div>
                    )
                })
            }
        </h1>
        </>
    )
}
export default PostList;

export async function getServerSideProps(){
    const response = await fetch('http://127.0.0.1:8000/api/all_post/0/4')
    const data = await response.json()
    return {
        props:{
            posts:data.slice(0,5)
        }
    }
}