import React from 'react';
import HOC from '../HOC/HOC';

const Modal = (props) => (
    <button onClick={() => props.userLogin(
        {
            "email": "emil@bisak",
            "password": "emilbisak"
        })}>Click to get authToken</button>
);


export default HOC(Modal);