import { useReducer, useCallback } from "react";
import axiosInstance from "../api/axios";
import {
  initialState,
  VisitsCrudAction,
  VisitsCrudState,
  VisitsTrafficEntry,
} from "../types/visitsTraffic.types";
import { toast } from "react-toastify";

function visitsReducer(state: VisitsCrudState, action: VisitsCrudAction): VisitsCrudState {
  switch (action.type) {
    case "START":
      return { loading: true, error: null, success: false };
    case "SUCCESS":
      return { loading: false, error: null, success: true };
    case "ERROR":
      return { loading: false, error: action.error, success: false };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useVisitsCrudManager() {
  const [state, dispatch] = useReducer(visitsReducer, initialState); // loading, error and success

  const handleCrudAction = useCallback(
    async (
      requestFn: () => Promise<any>,
      successMessage: string,
      fallbackErrorMessage: string = "Something went wrong"
    ) => {
      dispatch({ type: "START" });
      try {
        await requestFn();
        dispatch({ type: "SUCCESS" });
        toast.success(successMessage);
      } catch (err: any) {
        const message = err?.response?.data?.message || fallbackErrorMessage;
        dispatch({ type: "ERROR", error: message });
        toast.error(message);
      }
    },
    []
  );

  const updateVisit = useCallback(
    (entry: VisitsTrafficEntry) =>
      handleCrudAction(
        () => axiosInstance.put(`/visits-traffic/${entry.date}`, entry),
        "Visit updated successfully",
        "Failed to update visit"
      ),
    [handleCrudAction]
  );

  const deleteVisit = useCallback(
    (date: string) =>
      handleCrudAction(
        () => axiosInstance.delete(`/visits-traffic/${date}`),
        "Visit deleted successfully",
        "Failed to delete visit"
      ),
    [handleCrudAction]
  );

  const createVisit = useCallback(
    (entry: VisitsTrafficEntry) =>
      handleCrudAction(
        () => axiosInstance.post(`/visits-traffic`, entry),
        "Visit created successfully",
        "Failed to create visit"
      ),
    [handleCrudAction]
  );

  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  return {
    ...state,
    updateVisit,
    deleteVisit,
    createVisit,
    reset,
  };
}
