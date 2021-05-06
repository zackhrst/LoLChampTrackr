import axios from "axios";

export default axios.create({
    baseURL: "postgres://pwzudgct:AlUunhR3VmOZX_1PXCgiRU8j-dI0PSrX@queenie.db.elephantsql.com:5432/pwzudgct",
    headers: {
        "Content-type": "application/json"
    }
});