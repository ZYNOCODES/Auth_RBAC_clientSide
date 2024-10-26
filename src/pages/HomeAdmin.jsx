import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import ButtonAdd from "../components/ButtonAdd";
import UserTable from "../components/UserTable";
import Modal from "react-modal";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../hooks/useAuthContext";
import { TokenDecoder } from "../util/DecodeToken";
import { useLocation } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import AdminTable from "../components/AdminTable";
import ButtonDark from "../components/ButtonDark";
import { useLogout } from "../hooks/useLogout";

// Ensure you set the root element for accessibility
Modal.setAppElement("#root");

export default function HomeAdmin() {
  const { user } = useAuthContext();
  const decodedToken = TokenDecoder();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const { logout } = useLogout();

  const submitLogout = () => {
    logout();
  };

  //---------------------------------API calls---------------------------------\\

  const [submitionLoading, setSubmitionLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertType, setAlertType] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchAdminData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_BASE}/users/admins`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error.statusCode === 404) {
        return [];
      } else {
        throw new Error("Error receiving admins data");
      }
    }

    return await response.json();
  };
  const {
    data: AdminData,
    error: AdminDataError,
    isLoading: AdminDataLoading,
    refetch: refetchAdminData,
  } = useQuery({
    queryKey: ["AdminData", user?.token, location.key],
    queryFn: fetchAdminData,
    enabled: !!user?.token,
    refetchOnWindowFocus: true,
  });

  const fetchClientsData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_BASE}/users/clients`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error.statusCode === 404) {
        return [];
      } else {
        throw new Error("Error receiving clients statistics");
      }
    }

    return await response.json();
  };
  const {
    data: ClientsData,
    error: ClientsDataError,
    isLoading: ClientsDataLoading,
    refetch: refetchClientsData,
  } = useQuery({
    queryKey: ["ClientsData", user?.token, location.key],
    queryFn: fetchClientsData,
    enabled: !!user?.token,
    refetchOnWindowFocus: true,
  });

  const refetchData = () => {
    refetchAdminData();
    refetchClientsData();
  };

  return (
    <div className="pagesContainer">
      <div className="flex justify-end">
        <ButtonDark
          showIcon={true}
          buttonSpan="Log out of Admin Side"
          setOnClick={submitLogout}
          loading={false}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <h2 className="pagesTitle">Admin</h2>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="pageTable ordersTable">
          <div className="w-full flex-col space-y-4 items-center justify-between">
            <h2>Admin Table</h2>
          </div>
          <div className="pageTableContainer">
            <AdminTable
              searchQuery={searchQuery}
              setFilteredData={setFilteredData}
              data={AdminData}
              loading={AdminDataLoading}
              refetchLossesData={refetchData}
            />
          </div>
        </div>
        <div className="pageTable ordersTable">
          <div className="w-full flex-col space-y-4 items-center justify-between">
            <h2>Client Table</h2>
          </div>
          <div className="pageTableContainer">
            <UserTable
              searchQuery={searchQuery}
              setFilteredData={setFilteredData}
              data={ClientsData}
              loading={ClientsDataLoading}
              refetchLossesData={refetchData}
            />
          </div>
        </div>
      </div>
      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={alertType ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
