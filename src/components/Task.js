import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PaidIcon from "@mui/icons-material/Paid";
import TaskIcon from "@mui/icons-material/Task";
import DisplayTasks from "./DisplayTasks";

const drawerWidth = 240;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Task() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();

  const addTask = (e) => {
    e.preventDefault();
    const data = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0,
      title,
      description,
      date,
    };
    dispatch({ type: "ADD_TASK", payload: data });
    alert("Task Added!!!");
    setOpen(false);
  };

  const loadTransactionComponent = () => {
    navigate("/report");
  };
  const loadSummaryComponent = () => {
    navigate("/transactiondetails");
  };

  const loadTaskComponent = () => {
    navigate("/task");
  };

  return (
    <div>
      <Container>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <AssignmentIcon fontSize="large" paddingLeft={2} />
            <Typography variant="h6" noWrap component="div" paddingLeft={2}>
              Task Management
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Grid container direction="row">
          <Grid item xs={2}>
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: "auto" }}>
                <List>
                  <ListItem>
                    <ListItemButton onClick={() => loadTransactionComponent()}>
                      <ListItemIcon>
                        <PaidIcon fontSize="large" />
                      </ListItemIcon>
                      <ListItemText>TRANSACTIONS</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton onClick={() => loadSummaryComponent()}>
                      <ListItemIcon>
                        <ListAltIcon fontSize="large" />
                      </ListItemIcon>
                      <ListItemText>SUMMARY</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton onClick={() => loadTaskComponent()}>
                      <ListItemIcon>
                        <TaskIcon fontSize="large" />
                      </ListItemIcon>
                      <ListItemText>TASKS</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </Grid>

          <Grid item xs={10} padding={2}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleOpen}
                >
                  ADD TASK
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <InputLabel id="demo-simple-select-label">
                      Search
                    </InputLabel>
                  </Grid>
                  <Grid item>
                    <Select
                      defaultValue="All"
                      labelId="demo-simple-select-label"
                      value={search}
                      label="Search"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    >
                      <MenuItem value={0}>All</MenuItem>
                      <MenuItem value={1}>Complete</MenuItem>
                      <MenuItem value={2}>Incomplete</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <DisplayTasks handleSearch={search} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Typography>ADD TASK</Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item>
                    <TextField
                      id="outlined-password-input"
                      label="Title"
                      type="text"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="outlined-multiline-static"
                      label="Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="outlined-multiline-static"
                      label="Due Date"
                      type={date}
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={addTask}>
                      ADD TASK
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Container>
    </div>
  );
}

export default Task;
