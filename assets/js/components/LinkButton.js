import React from "react";
import {Link} from "react-router-dom";

function LinkButton(props) {
    const {to, name} = props;

    return (
        <Link to={to}
              className="px-6 py-3 text-blue-100 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200">
            {name}
        </Link>
    );
}

export default LinkButton;
