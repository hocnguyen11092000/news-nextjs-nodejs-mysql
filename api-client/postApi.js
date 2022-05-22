import axiosClient from "./axiosClient";

const postApi = {
  getAll(params) {
    const url = "/posts";
    return axiosClient.get(url, { params });
  },

  getByCategory(id) {
    const url = `/posts/category/${id}`;
    return axiosClient.get(url);
  },

  get(id) {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = "/posts";
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/posts/${id}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/posts/${id}`;
    return axiosClient.delete(url);
  },
};

export default postApi;
