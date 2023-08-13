import React from "react";

function ErrorAlertBox(props: { message: string }) {
    return (
        <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-300  "
            role="alert"
        >
            <span className="font-medium">Error!</span> {props.message}
        </div>
    );
}

export default ErrorAlertBox;
