import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeAdmin from "./pages/HomeAdmin";
import HomeUser from "./pages/HomeUser";
import SignIn from "./pages/SignIn";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <main>
        <Routes>
          {user?.profile?.role == "admin" ? (
            <Route path="/" element={user ? <HomeAdmin /> : <SignIn />} />
          ) : (
            <Route path="/" element={user ? <HomeUser /> : <SignIn />} />
          )}
          <Route path="/" element={!user ? <SignIn /> : <Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
