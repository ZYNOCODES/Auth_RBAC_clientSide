import React from "react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid";

export default function ButtonDark({
  buttonSpan,
  showIcon = true,
  setOnClick,
}) {
  return (
    <button className="buttonDark" onClick={setOnClick}>
      {showIcon && <ArrowLeftStartOnRectangleIcon className="iconAsideBar" />}
      <span className="buttonTextLight">{buttonSpan}</span>
    </button>
  );
}
