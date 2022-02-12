export const getRecords = (payload) => ({
  type: "GET_RECORDS",
  payload: payload
});

export const setLoading = (payload) => ({
  type: "SET_LOADING",
  payload: payload
});