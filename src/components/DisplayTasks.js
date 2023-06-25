import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { connect, useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2196f3",
    color: theme.palette.common.white,
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function DisplayTasks(props) {
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tasks = useSelector((state) => state.taskReducer);

  const dispatch = useDispatch();

  const updateStatus = (id, value) => {
    const updateTaskStatus = tasks.find((task) => task.id === parseInt(id));

    const updatedData = {
      id: id,
      title: updateTaskStatus.title,
      description: updateTaskStatus.description,
      date: updateTaskStatus.date,
      status: value,
    };

    dispatch({ type: "UPDATE_TASK", payload: updatedData });
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
    alert("Task Deleted!!!");
  };

  const openUpdateTaskModal = (id) => {
    const currentTask = tasks.find((task) => task.id === parseInt(id));

    handleOpen();

    setID(currentTask.id);
    setTitle(currentTask.title);
    setDescription(currentTask.description);
    setDate(currentTask.date);
  };

  const updateTask = () => {
    const data = {
      id: id,
      title,
      description,
      date,
    };

    dispatch({ type: "UPDATE_TASK", payload: data });
    alert("Task Updated!!!");
    handleClose();
  };

  return (
    <div>
      {tasks ? (
        <div>
          <Container>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks
                    .filter((task) => {
                      return props.handleSearch === 0
                        ? task
                        : task.status === props.handleSearch;
                    })
                    .map((task) => (
                      <StyledTableRow key={task.id}>
                        <StyledTableCell component="th" scope="row">
                          {task.id + 1}
                        </StyledTableCell>
                        <StyledTableCell>{task.title}</StyledTableCell>
                        <StyledTableCell>{task.description}</StyledTableCell>
                        <StyledTableCell>{task.date}</StyledTableCell>
                        <StyledTableCell>
                          <Select
                            labelId="demo-simple-select-label"
                            id={task.id}
                            value={status[task.id]}
                            label="Status"
                            onChange={(e) => {
                              setStatus(e.target.value);
                              updateStatus(task.id, e.target.value);
                            }}
                          >
                            <MenuItem value={1}>Complete</MenuItem>
                            <MenuItem value={2}>Incomplete</MenuItem>
                          </Select>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Stack direction="row" spacing={2}>
                            <Button
                              variant="contained"
                              startIcon={<EditIcon />}
                              onClick={() => openUpdateTaskModal(task.id)}
                            >
                              Edit
                            </Button>

                            <Button
                              variant="contained"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => deleteTask(task.id)}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Typography>EDIT TASK</Typography>
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
                      <Button variant="contained" onClick={updateTask}>
                        UPDATE TASK
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </div>
      ) : (
        <h1 className="text-center">No Tasks</h1>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  tasks: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateTask: (data) => {
    dispatch({ type: "UPDATE_TASK", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTasks);
