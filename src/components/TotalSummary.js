import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import QrCodeIcon from "@mui/icons-material/QrCode";
import image from "../images/graph.svg";

function TotalSummary() {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    async function getSummary() {
      const res = await axios.get(
        `http://148.251.225.118:3200/api/transaction-summary`
      );

      setSummary(res.data.summery);
    }

    getSummary();
  }, []);

  return (
    <div>
      <Grid spacing={5}>
        <Grid item padding={3}>
          <Typography
            variant="h5"
            sx={{
              color: "#37474f",
            }}
          >
            TOTAL SUMMARY
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} padding={4}>
          <img src={image} alt="graph" height="250px" />
        </Grid>

        <Grid item xs={2}>
          <Paper
            sx={{
              backgroundColor: "#bbdefb",
              height: 150,
            }}
            elevation={3}
          >
            <Grid container direction="column" rowSpacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  component="h6"
                  sx={{
                    color: "#ffffff",
                  }}
                >
                  TOTAL TRANSACTION COUNT
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{
                        color: "#ffffff",
                      }}
                    >
                      {summary.totalTransactionCount}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <CreditScoreIcon
                      fontSize="large"
                      sx={{
                        color: "#ffffff",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper
            sx={{
              backgroundColor: "#3d5afe",
              height: 150,
            }}
            elevation={3}
          >
            <Grid container direction="column" rowSpacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  component="h6"
                  sx={{
                    color: "#ffffff",
                  }}
                >
                  TOTAL REVENUE
                </Typography>
              </Grid>
              <Grid item marginTop={4}>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{
                        color: "#ffffff",
                      }}
                    >
                      {summary.totalRevenue}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TrendingUpIcon
                      fontSize="large"
                      sx={{
                        color: "#ffffff",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper
            sx={{
              backgroundColor: "#f48fb1",
              height: 150,
            }}
            elevation={3}
          >
            <Grid container direction="column" rowSpacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  component="h6"
                  sx={{
                    color: "#ffffff",
                  }}
                >
                  TOTAL CASH TRANSACTION
                </Typography>
              </Grid>
              <Grid item>
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{
                        color: "#ffffff",
                      }}
                    >
                      {summary.totalCashTransaction}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <MonetizationOnIcon
                      fontSize="large"
                      sx={{
                        color: "#ffffff",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper
            sx={{
              backgroundColor: "#ffd54f",
              height: 150,
            }}
            elevation={3}
          >
            <Grid container direction="column" rowSpacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  component="h6"
                  sx={{
                    color: "#ffffff",
                  }}
                >
                  TOTAL CARD TRANSACTION
                </Typography>
              </Grid>
              <Grid item>
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{
                        color: "#ffffff",
                      }}
                    >
                      {summary.totalCardTransaction}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <CreditCardIcon
                      fontSize="large"
                      sx={{
                        color: "#ffffff",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper
            sx={{
              backgroundColor: "#ce93d8",
              height: 150,
            }}
            elevation={3}
          >
            <Grid container direction="column" rowSpacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  component="h6"
                  sx={{
                    color: "#ffffff",
                  }}
                >
                  TOTAL QR TRANSACTION
                </Typography>
              </Grid>
              <Grid item marginTop={4}>
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{
                        color: "#ffffff",
                      }}
                    >
                      {summary.totalQrTransaction}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <QrCodeIcon
                      fontSize="large"
                      sx={{
                        color: "#ffffff",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default TotalSummary;
