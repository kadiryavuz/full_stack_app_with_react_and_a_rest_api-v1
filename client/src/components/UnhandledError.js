import React from "react";

const UnhandledError = (props) => {

  let customError = null;
  if(props.location.state && props.location.state.error) {
    customError = {...props.location.state.error};

  }
  return (
    <div className="bounds">
      <h1>Error</h1>
      <p>Sorry! We just encountered an unexpected error.</p>
      {(customError && customError.code.indexOf('APP') > -1) ? <pre>{customError.message}</pre> : null}
    </div>
  );
};

export default UnhandledError;
