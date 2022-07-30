import Routing from '../routes'
import {setAuthToken} from '../helpers/setAuthToken'
import {getJWT, hasJWT} from '../helpers/jwtToken';
import React from "react";

function App() {
    if (hasJWT) {
        setAuthToken(getJWT);
    }

    return (
        <div className="App">
            <Routing/>
        </div>
    );
}

export default App;
