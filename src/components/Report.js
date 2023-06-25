import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PaidIcon from "@mui/icons-material/Paid";
import TaskIcon from "@mui/icons-material/Task";
import TotalSummary from "./TotalSummary";

const drawerWidth = 240;

function Report() {
  const navigate = useNavigate();

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
      <Box sx={{ display: "flex" }}>
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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <TotalSummary />
        </Box>
      </Box>
    </div>
  );
}

export default Report;
