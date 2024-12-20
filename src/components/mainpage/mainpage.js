import React, { Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
// import Papa from "papaparse";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CsvDownloader from "react-csv-downloader";
import "./mainpage.css";
import * as XLSX from "xlsx";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const mainpage = () => {
  // let InitialState = null;

  const columns = [
    {
      id: "first",
      displayName: "First column",
    },
    {
      id: "second",
      displayName: "Second column",
    },
  ];

  const datas = [
    {
      first: "already-paid",
      second:
        "buyer-company-name, buyer-requested-cancel-reason, INR, Easy Ship",
    },
    {
      first: "foobar",
      second: "foobar",
    },
  ];

  const uploadHandler = (event) => {
    console.log(event.target.files[0]);
    // Papa.parse(event.target.files[0], {
    //   header: true,
    //   skipEmptyLines: true,
    //   complete: function (results) {
    //     console.log(results.data);
    //     InitialState = results.data;
    //   },
    // });
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      // const csvData = XLSX.utils.sheet_to_csv(worksheet);
      const csvData = XLSX.utils.sheet_to_json(worksheet);
      console.log(csvData);
    };
    fileReader.readAsArrayBuffer(event.target.files[0]);
  };

  const uploadMasterData = (event) => {
    console.log(event.target.files[0]);
    // Papa.parse(event.target.files[0], {
    //   header: true,
    //   skipEmptyLines: true,
    //   complete: function (results) {
    //     console.log(results.data);
    //     InitialState = results.data;
    //   },
    // });
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      // const csvData = XLSX.utils.sheet_to_csv(worksheet);
      const csvData = XLSX.utils.sheet_to_json(worksheet);
      console.log(csvData);
    };
    fileReader.readAsArrayBuffer(event.target.files[0]);
  };

  const downloadHandler = () => {
    // const CSVString = Papa.unparse(InitialState, { newline: "\n" });
    console.log("hello");
  };
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ background: "#643B9F" }}>
            <Typography
              style={{ textAlign: "center", background: "#643B9F" }}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Venus Online
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "40vh" }}
        >
          <Grid container item spacing={2}>
            <TextField
              id="outlined-basic"
              label="Invoice number"
              variant="outlined"
              size="small"
            />
            <TextField
              id="outlined-basic"
              label="Invoice number"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid container item spacing={2} style={{ "padding-left": "50px" }}>
            <Stack direction="row" spacing={4}>

            <input
                accept=".xls,xlsx,.csv"
                style={{ display: "none" }}
                id="master-button-file"
                multiple
                type="file"
                onChange={uploadMasterData}
              />
              <label htmlFor="master-button-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Master Data
                </Button>
              </label>

              <input
                accept=".xls,xlsx,.csv"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={uploadHandler}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                </Button>
              </label>
            </Stack>
            <div onClick={() => downloadHandler()}>
              <CsvDownloader
                filename="myfile"
                extension=".csv"
                separator=";"
                wrapColumnChar=""
                columns={columns}
                datas={datas}
                text="DOWNLOAD"
                className="MuiButton"
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default mainpage;
