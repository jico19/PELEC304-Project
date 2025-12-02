import api from "src/utils/Api";

export const fetchRoom = async ({ page = 1, limit = 10, query = "" }) => {
    const offset = ((page - 1) * limit)


    if (query) {
        const res = await api.post(
            `http://127.0.0.1:8000/api/room/search/?limit=${limit}&offset=${offset}`,
            { address: query }
        )
        return res.data
    }

    const res = await api.get(`room/?limit=${limit}&offset=${offset}`);
    return res.data
}