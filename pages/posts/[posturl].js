import PostComment from "../../components/PostComment";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function Post({ post, comment }) {
  console.log(comment);

  return (
    <>
      <Grid container>
        <Grid item xs={1}>
            
        </Grid>

        <Grid item xs={10}>
          <Card >
            <CardActionArea>
              <CardMedia
                component="img"
                height="340"
                image="http://localhost/laracmslayer/storage/app/images/posts/1662030219.webp"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {post.posts_title}
                </Typography>
                <Typography dangerouslySetInnerHTML={{ __html: post.posts_text }} variant="body2" color="text.secondary">
                {/* {post.posts_text} */}
                
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>

      {/* <h3>{post.posts_title}</h3>
      <p>{post.posts_text}</p> */}
      <PostComment refId={post.posts_id} />
    </>
  );
}
export default Post;

export async function getServerSideProps(context) {
  const { params } = context;
  const response = await fetch(
    `http://127.0.0.1:8000/api/single_post/${params.posturl}`
  );
  const data = await response.json();
  const response2 = await fetch(
    `http://127.0.0.1:8000/api/all_comments/post/${data[0].posts_id}`
  );
  const data2 = await response2.json();
  console.log(data);

  return {
    props: {
      post: data[0],
      comment: data2,
    },
  };
}
