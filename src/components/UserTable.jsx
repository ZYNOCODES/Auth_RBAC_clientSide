import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "react-modal";
import ConfirmDialog from "./ConfirmDialog";
import axios from "axios";
import { TokenDecoder } from "../util/DecodeToken";
import { useAuthContext } from "../hooks/useAuthContext";

// Set the app element for accessibility
Modal.setAppElement("#root");

function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className="tableRow"
      >
        <TableCell className="tableCell">
          <span className="trTableSpan">{row.username}</span>
        </TableCell>
        <TableCell className="tableCell">
          <span className="trTableSpan">{row.startTime}</span>
        </TableCell>
        <TableCell className="tableCell">
          <span className="trTableSpan">{row.endTime}</span>
        </TableCell>
        <TableCell className="tableCell">
          <span className="trTableSpan">{row.ipAddress}</span>
        </TableCell>
        <TableCell className="tableCell">
          <span className="trTableSpan">{row.role}</span>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function UserTable({
  data,
  loading
}) {

  return (
    <>
      <TableContainer
        className="tablePages"
        component={Paper}
        style={{ boxShadow: "none" }}
      >
        <Table aria-label="collapsible table" className="table">
          <TableHead className="tableHead">
            <TableRow>
              <TableCell className="tableCell">
                <span className="thTableSpan">Username</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Start time</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">End time</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">IP</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className="thTableSpan">Role</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress color="inherit" />
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((row) => <Row key={row.id} row={row} />)
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <span className="thTableSpan">No client found</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
