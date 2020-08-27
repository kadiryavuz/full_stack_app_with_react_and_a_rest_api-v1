import React from 'react';
import { Redirect } from 'react-router-dom';

const NotFoundRedirect = () => {
    return(
        <Redirect to="/notfound" />
    );
}

export default NotFoundRedirect;