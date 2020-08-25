import React from "react";

const ValidationErrors = ({ errors }) => {
  if (errors.length > 0) {
    return (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
};


export default ValidationErrors;