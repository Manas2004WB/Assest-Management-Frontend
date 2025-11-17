import useApi from "./axiosInstance";

export const useNodeService = () => {
  const api = useApi(); 

  const getTree = async () => {
    const res = await api.get("/nodes/tree");
    return res.data;
  };

  const getParentNameApi = async (query) => {
    const res = await api.get(`/nodes/search?q=${query}`);
    return res.data;
  };

  const postAsset = async (parent_name, node_name) => {
    const res = await api.post("/nodes", { parent_name, node_name });
    return res.data;
  };

  const deleteNode = async (nodeId) => {
    const res = await api.delete(`/nodes/${nodeId}`);
    return res.data;
  };

  const restoreNode = async (nodeId) => {
    const res = await api.put(`/nodes/restore/${nodeId}`);
    return res.data;
  };

  const getDeletedTrees = async () => {
    const res = await api.get("/nodes/deleted-trees");
    return res.data;
  };

  return {
    getTree,
    getParentNameApi,
    postAsset,
    deleteNode,
    restoreNode,
    getDeletedTrees,
  };
};
