import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if(data.status=="200"){

        localStorage.setItem('next-auth',JSON.stringify(data.data[0]))
        router.push('/posts')
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid>
            <Item>
              <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Email"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                defaultValue=""
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </Item>
          </Grid>
          <Grid>
            <Button variant="contained" size="small" type="submit">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
export default Login;
