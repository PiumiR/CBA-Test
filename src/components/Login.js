import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const paperStyle = {
    padding: 40,
    height: "80vh",
    width: 500,
    margin: "60px auto",
  };

  const avatarStyle = { backgroundColor: "#1a237e" };

  const btnstyle = {
    margin: "40px 0",
    backgroundColor: "#1a237e",
    width: "70%",
  };

  const textfieldStyle = { width: "100%" };

  const login = (e) => {
    e.preventDefault();

    const loginDetails = { username, password };

    axios
      .post(`http://148.251.225.118:3200/api/login`, loginDetails)
      .then((res) => {
        const data = res.data.user_data;
        dispatch({ type: "SAVE_USER", payload: data });
        alert("Login Successful!!!");
        navigate("/report");
      })
      .catch((err) => {
        console.log(err);
        alert("Login Failed!!!");
      });
  };

  return (
    <Grid container backgroundColor="#9fa8da" sx={{ height: "100vh" }}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center" margin={5}>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>

        <Grid container direction="column" spacing={1}>
          <Grid item margin={2}>
            <TextField
              style={textfieldStyle}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Grid>
          <Grid item margin={2}>
            <TextField
              style={textfieldStyle}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <Button variant="contained" style={btnstyle} onClick={login}>
          Login
        </Button>
      </Paper>
    </Grid>
  );
}

export default Login;
