import axiosClient from "./axiosClient";

const commentApi = {
  getAll(params) {
    const url = "/categories";
    return axiosClient.get(url, { params });
  },

  getSubComment(id, parent) {
    const url = `/comments/sub/${id}/${parent}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = "/comments/new";
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/categories/${id}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};

export default commentApi;
