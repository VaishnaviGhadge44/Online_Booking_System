import React from 'react'
import './ErrorMessage.scss'


// This is an error component which renders when the API call fails and returns a bad response
const ErrorMessage = (props) => {
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>Oops!</h1>
                    </div>
                    <h2>{props.errorCode} - {props.errorName}</h2>
                    <p>{props.details}</p>
                </div>
            </div>
        </>

    )
}

export default ErrorMessage