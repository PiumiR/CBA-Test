import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TaskIcon from "@mui/icons-material/Task";
import VisibilityIcon from "@mui/icons-material/Visibility";

const drawerWidth = 240;

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
const style = {
  position: "absolute",
  top: "20%",
  left: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TransactionDetails() {
  const [transactions, setTransactions] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getTransactions() {
      const response = await axios.get(
        `http://148.251.225.118:3200/api/detailed-transaction`
      );

      setTransactions(response.data.transaction.transaction_list);
    }

    getTransactions();
  }, []);

  const showTransaction = (id) => {
    const currentTransaction = transactions.find(
      (transactions) => transactions.id === parseInt(id)
    );
    setCurrentTransaction(currentTransaction);
    handleOpen();
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
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Report
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
                      <PaidIcon fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText>TRANSACTIONS</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => loadSummaryComponent()}>
                    <ListItemIcon>
                      <ListAltIcon fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText>SUMMARY</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => loadTaskComponent()}>
                    <ListItemIcon>
                      <TaskIcon fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText>TASKS</ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Grid>

        <Grid item xs={10} padding={2}>
          <Typography
            variant="h5"
            sx={{
              color: "#37474f",
              padding: "2px",
            }}
          >
            TOTAL SUMMARY
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    Transaction ID
                  </StyledTableCell>
                  <StyledTableCell align="center">Payment Mode</StyledTableCell>
                  <StyledTableCell align="center">
                    Customer Mobile NO
                  </StyledTableCell>
                  <StyledTableCell align="center">Card Label</StyledTableCell>
                  <StyledTableCell align="center">Invoice NO</StyledTableCell>
                  <StyledTableCell align="center">Amount</StyledTableCell>
                  <StyledTableCell align="center">Currency</StyledTableCell>
                  <StyledTableCell align="center">Account NO</StyledTableCell>
                  <StyledTableCell align="center">Date/Time</StyledTableCell>
                  <StyledTableCell align="center">Details</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <StyledTableRow key={transaction.id}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {transaction.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {transaction.paymentMode}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {transaction.custMobile}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {transaction.cardLabel}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {transaction.invoiceNo}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {transaction.amount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {transaction.currency}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {transaction.pan}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {transaction.dateTime}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <VisibilityIcon
                        sx={{
                          color: "#ffca28",
                        }}
                        onClick={() => showTransaction(transaction.id)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container direction="column">
            <Grid
              container
              direction="column"
              justifyContent="center"
              padding={3}
              alignItems="center"
            >
              <Grid item xs={12}>
                <ReceiptIcon fontSize="large" sx={{ color: "#1b5e20" }} />
              </Grid>
              <Grid item xs={12}>
                <Typography id="modal-modal-title" variant="h6" component="h6">
                  Transaction Details
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="column">
              <Grid item xs={12}>
                <Typography
                  id="modal-modal-title"
                  variant="subtitle1"
                  component="subtitle1"
                >
                  Invoice NO: {currentTransaction.invoiceNo}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  id="modal-modal-description"
                  variant="subtitle1"
                  component="subtitle1"
                  sx={{ mt: 2 }}
                >
                  Payment Mode: {currentTransaction.paymentMode}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  id="modal-modal-description"
                  variant="subtitle1"
                  component="subtitle1"
                  sx={{ mt: 2 }}
                >
                  Currency: {currentTransaction.currency}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  id="modal-modal-description"
                  variant="subtitle1"
                  component="subtitle1"
                  sx={{ mt: 2 }}
                >
                  Amount: {currentTransaction.amount}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  id="modal-modal-description"
                  variant="subtitle1"
                  component="subtitle1"
                  sx={{ mt: 2 }}
                >
                  Account NO: {currentTransaction.pan}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  id="modal-modal-description"
                  variant="subtitle1"
                  component="subtitle1"
                  sx={{ mt: 2 }}
                >
                  Date/Time: {currentTransaction.dateTime}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default TransactionDetails;
