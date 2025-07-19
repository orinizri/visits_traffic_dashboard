import { useReducer, useCallback } from "react";
import axiosInstance from "../api/axios";
import {
  VisitsCrudAction,
  VisitsCrudState,
  initialState,
  VisitsTrafficEntry,
} from "../types/visitsTraffic.types";
import { toast } from "react-toastify";
import { inMemoryManagerInterface } from "./useVisitsTableManager";

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

export function useVisitsCrudManager(inMemoryManager: inMemoryManagerInterface) {
  const [state, dispatch] = useReducer(visitsReducer, initialState);

  const handleCrudAction = useCallback(
    async (
      requestFn: () => Promise<any>,
      successMessage: string,
      fallbackErrorMessage: string = "Something went wrong"
    ): Promise<boolean> => {
      dispatch({ type: "START" });
      try {
        const response = await requestFn();
        if (!response?.data?.success) return false;
        dispatch({ type: "SUCCESS" });
        toast.success(successMessage);
        return true;
      } catch (err: any) {
        const message = err?.response?.data?.error || fallbackErrorMessage;
        dispatch({ type: "ERROR", error: message });
        toast.error(message);
        return false;
      }
    },
    []
  );

  const updateVisit = useCallback(
    async (entry: VisitsTrafficEntry): Promise<boolean> => {
      const success = await handleCrudAction(
        () => axiosInstance.put(`/visits-traffic`, entry),
        "Visit updated successfully",
        "Failed to update visit"
      );
      if (success) {
        inMemoryManager.updateVisit(entry);
      }
      return success;
    },
    [handleCrudAction, inMemoryManager]
  );

  const deleteVisit = useCallback(
    async (date: string): Promise<boolean> => {
      const success = await handleCrudAction(
        () => axiosInstance.post(`/visits-traffic/delete`, { date }),
        "Visit deleted successfully",
        "Failed to delete visit"
      );
      if (success) {
        inMemoryManager.deleteVisit(date);
      }
      return success;
    },
    [handleCrudAction, inMemoryManager]
  );

  const createVisit = useCallback(
    async (entry: VisitsTrafficEntry): Promise<boolean> => {
      const success = await handleCrudAction(
        () => axiosInstance.post(`/visits-traffic`, entry),
        "Visit created successfully",
        "Failed to create visit"
      );
      if (success) {
        inMemoryManager.createVisit(entry);
      }
      return success;
    },
    [handleCrudAction, inMemoryManager]
  );

  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  return {
    ...state, // loading, success, error
    updateVisit,
    deleteVisit,
    createVisit,
    reset,
  };
}
