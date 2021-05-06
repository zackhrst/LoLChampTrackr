import http from "../http-common";

class ChampionDataService {
    getAll() {
        return http.get("/champions");
    }

    get(id) {
        return http.get(`/champions/${id}`);
    }

    create(data) {
        return http.post("/champions", data);
    }

    update(id, data) {
        return http.put(`/champions/${id}`, data);
    }

    delete(id) {
        return http.delete(`/champions/${id}`);
    }

    deleteAll() {
        return http.delete(`/champions`);
    }

    findByTitle(title) {
        return http.get(`/champions?name=${name}`);
    }
}

export default new ChampionDataService();