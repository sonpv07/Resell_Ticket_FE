import axios from "axios";

const createTicket = (data) => {
    return axios.post(`/?customerID=$(customerID)`, data);

}

export {createTicket}