import axios from "axios";


const access_token = localStorage.getItem('access_token')

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`
    }
})


api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const origReq = err.config;
        console.log("it work")
        // Check if access token expired
        if (err.response?.status === 401 && !origReq._retry) {
            origReq._retry = true;

            const refresh_token = localStorage.getItem("refresh_token");
            try {
                // Get new access token
                const res = await api.post("/token/refresh/", {
                    refresh: refresh_token,
                });

                const newAccess = res.data.access;

                // Save new access token
                localStorage.setItem("access_token", newAccess);

                // Update the request header and retry
                origReq.headers.Authorization = `Bearer ${newAccess}`;

                return api(origReq);
            } catch (refreshErr) {
                // refresh token also expired → logout
                console.log(refreshErr)
                localStorage.clear();
                window.location.href = "/";
            }
        }
        return Promise.reject(err);
    }
);


export default api;