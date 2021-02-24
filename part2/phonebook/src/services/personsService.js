import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const readPersonData = () => {
    return axios.get(baseUrl).then(response => response.data);
};

const createPersonData = (newObject) => {
    return axios.post(baseUrl, newObject).then(response => response.data)
};

const updatePersonData = (newPropertyUpdate, id) => {
    return axios.put(`${baseUrl}/${id}`, newPropertyUpdate).then(response => response.data)
};

const deletePersonData = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

export default {
    readPersonData,
    createPersonData,
    deletePersonData,
    updatePersonData
}