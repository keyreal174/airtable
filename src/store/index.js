let initialState = {
  records: [],
  sum: 0,
  totalCount: 0,
  totalCancelledNoise: 0,
  loading: false,
}

export const recordReducer = function (state = initialState, action) {
  switch (action.type) {
    case "GET_RECORDS":
      return {
        ...state,
        records: action.payload.records,
        sum: action.payload.sum,
        totalCount: action.payload.totalCount,
        totalCancelledNoise: action.payload.totalCancelledNoise
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
  }
};