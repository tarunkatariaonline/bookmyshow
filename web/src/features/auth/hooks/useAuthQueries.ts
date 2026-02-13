import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfileRequest } from "../api/auth.api";
import { setUser, setStatus } from "../state/auth.slice";
import type { GetProfileResponse } from "../types/auth.types";

export const USE_PROFILE_QUERY_KEY = ["auth", "profile"];

export const useGetProfile = () => {
  const dispatch = useDispatch();
  const query = useQuery<GetProfileResponse>({
    queryKey: USE_PROFILE_QUERY_KEY,
    queryFn: getProfileRequest,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data?.user) {
      dispatch(setUser(query.data.user));
    }
    if (query.isError) {
      dispatch(setStatus("idle"));
    }
  }, [query.data, query.isSuccess, query.isError, dispatch]);

  return query;
};
