import { of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { http } from "@/provider/_";

export const list = () => {
  return http.get("/GetVisitas").pipe(
    mergeMap((response) => response.json()),
    catchError((error) => {
      return of(error);
    })
  );
};

export const getById = (id) => {
  return http.get(`/GetVisitaById/${id}`).pipe(
    mergeMap((response) => response.json()),
    catchError((error) => {
      return of(error);
    })
  );
};

export const create = (payload) => {
  return http.post("/AddVisita", payload, null).pipe(
    mergeMap((response) => response.json()),
    catchError((error) => {
      return of(error);
    })
  );
};

export const update = (id, payload) => {
  return http.put(`/UpdateVisita/${id}`, payload).pipe(
    mergeMap((response) => response.json()),
    catchError((error) => {
      return of(error);
    })
  );
};

export const deleted = (id, payload) => {
  return http.put(`/DeleteVisita/${id}`, payload).pipe(
    mergeMap((response) => response.json()),
    catchError((error) => {
      return of(error);
    })
  );
};
