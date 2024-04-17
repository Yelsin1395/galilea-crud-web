import { of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { http } from "@/provider/_";

export const list = () => {
  return http.get("/GetMoradores").pipe(
    mergeMap((response) => response.json()),
    catchError((error) => {
      return of(error);
    })
  );
};

export const getById = (id) => {
  return http.get(`/GetMoradorById/${id}`).pipe(
    mergeMap((response) => response.json()),
    catchError((error) => {
      return of(error);
    })
  );
};

export const create = (payload) => {
  return http.post("/AddMorador", payload, null).pipe(
    mergeMap((response) => response.json()),
    catchError((error) => {
      return of(error);
    })
  );
};

export const update = (id, payload) => {
  return http.put(`/UpdateMorador/${id}`, payload).pipe(
    mergeMap((response) => response.json()),
    catchError((error) => {
      return of(error);
    })
  );
};
