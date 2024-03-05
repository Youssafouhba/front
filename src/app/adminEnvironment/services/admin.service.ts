import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {environment} from "../../../environments/environment";
import {Admin} from "../../models/admin/admin.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  getAdmines(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${environment.apiURL}/anti-heroes`).pipe(
      tap((data: Admin[]) => data),
      catchError(err => throwError(() => err))
   )
  }

  getAdmin(id: string): Observable<Admin> {
    return this.http.get<Admin>(`${environment.apiURL}/anti-heroes/${id}`).pipe(
       tap((data: Admin) => data),
       catchError(err => throwError(() => err))
    )
   }

  addAdmin(Admin: Admin) : Observable<Admin> {
    return this.http.post<Admin>(`${environment.apiURL}/anti-heroes`, Admin).pipe(
      tap((data: Admin) => data),
      catchError(err => throwError(() => err))
   )
  }

  updateAdmin(id:string, Admin: Admin) : Observable<Admin> {
    return this.http.put<Admin>(`${environment.apiURL}/anti-heroes/${id}`, Admin).pipe(
      catchError(err => throwError(() => err))
   )
  }

   deleteAdmin(id:string) : Observable<Admin> {
    return this.http.delete<Admin>(`${environment.apiURL}/anti-heroes/${id}`).pipe(
      catchError(err => throwError(() => err))
   )
  }
}
