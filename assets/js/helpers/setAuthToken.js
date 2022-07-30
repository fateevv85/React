import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        return;
    }

    delete axios.defaults.headers.common["Authorization"];
}
