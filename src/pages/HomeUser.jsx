import React from "react";
import ButtonDark from "../components/ButtonDark";
import { useLogout } from "../hooks/useLogout";

function HomeUser() {
  const { logout } = useLogout();

  const submitLogout = () => {
    logout();
  };
  return (
    <div className="pagesContainer justify-center items-center">
      <h2 className="titleText text-center">Welcome to TP</h2>
      <ButtonDark
        buttonSpan="Log out of TP"
        setOnClick={submitLogout}
        loading={false}
      />
    </div>
  );
}

export default HomeUser;
