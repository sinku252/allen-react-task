import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div class="d-flex justify-content-center">
    <div class="clearfix">
      <div class="spinner-border float-right" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    </div>
  )
  /* return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  ); */
  
}