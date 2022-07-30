import React from "react";

function SubmitButton(props) {
    const {name} = props;

    return (
        <input type="submit" value={name}
               className="px-6 py-3 text-blue-100 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200"/>
    );
}

export default SubmitButton;
