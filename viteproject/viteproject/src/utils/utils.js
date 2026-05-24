
// export const checkIsUserLoggedIn = () => {

//     const userInfo = localStorage.getItem('userData');
//     if (userInfo) {
//         return true;
//     } else {
//         return false
//     };
// };

export const checkIsUserLoggedIn = () => {

    const token = localStorage.getItem("token");

    return !!token;
};

