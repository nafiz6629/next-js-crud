import { useState, useEffect } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function PostComment({ refId }) {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(null);
  const [comment, setComment] = useState("");
  const postData = {
    comments_text: comment,
    comments_type: "post",
    comments_reference: refId,
    users_id: 2,
  };
  const [CommentBtn,setCommentBtn] = useState(false)
  const [LoginBtn,setLoginBtn] = useState(false)
  
  useEffect(() => {
    if(localStorage.getItem('next-auth')){
        setCommentBtn(true)
      }
      else{
        setLoginBtn(true)
      }
    fetch(`http://127.0.0.1:8000/api/all_comments/post/${refId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        console.log(data);

        setCommentCount(data.length);
      });
  }, []);
  const fetchComments = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/all_comments/post/${refId}`
    );
    const data = await response.json();
    setCommentCount(data.length);
    setComments(data);
  };
  const submitComment = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/create_comment", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setComment("")
    fetchComments();
  };
  return (
    <>
    <Grid container spacing={2}>
        <Grid>
            
        </Grid>
    </Grid>
    
      <Grid container spacing={2}>
      <Grid xs={2}></Grid>

        <Grid xs={8}>
          <Item>
            <TextField
              fullWidth={true}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              id="outlined-basic"
              label="Comment"
              variant="standard"
            />
          </Item>
        </Grid>
        <Grid xs={2}>
          {
            CommentBtn 
            ?  <Button  size="small" onClick={submitComment} variant="contained">Comment</Button> 
            : ""
          } 
          {
            LoginBtn 
            ? <Link href={`/login`} passHref><Button  size="small" onClick={submitComment} variant="contained">Login</Button>  </Link>
            : ""
          } 
          
          {/* <Item>
          </Item> */}
        </Grid>
      </Grid>
      {/* comment list */}
      <Grid container spacing={2}>
        <Grid xs={1}><h5>Comments ({commentCount})</h5></Grid>
        <Grid xs={10}>
          <Item>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {comments.map((comment) => {
                return (
                  <ListItem key={comment.comments_id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          ></Typography>
                          {comment.comments_text}
                          <br></br>
                          {comment.created_at}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Item>
        </Grid>
        <Grid xs={1}></Grid>

      </Grid>

      {/* {comments.map((comment) => {
        return (
          <div key={comment.comments_id}>
            <p>{comment.comments_text}</p>
          </div>
        );
      })} */}
    </>
  );
}
export default PostComment;
