export const hasJWT = () => {
    return localStorage.getItem("token") ? true : false;
};

export const getJWT = () => {
    return localStorage.getItem("token");
};

