import React from 'react'

const ErrorToast = ({ type }) => {
    let error;
    if (type === 1) {
        error = "Invalid Input."
    } else if (type === 2) {
        error = "Please Pick date."
    } else if (type === 3) {
        error = "Failed to fetch data."
    } else if (type === 4) {
        error = "No data found."
    }
    else error = "Something went wrong"

    return <div>{error}</div>
}

export default ErrorToast