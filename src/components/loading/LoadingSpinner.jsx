import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner(props) {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <h4 style={{textAlign: 'center'}}>{props.res}</h4>
    </div>
  );
}