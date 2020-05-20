import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Debt } from "../models/debt.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class DebtService {
  baseUrl = "http://localhost:3000/api";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  create(debt: Debt): Observable<Debt> {
    return this.http.post<Debt>(`${this.baseUrl}/debt`, debt).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Debt[]> {
    return this.http.get<Debt[]>(`${this.baseUrl}/debt`).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Debt> {
    const url = `${this.baseUrl}/debt/${id}`;
    return this.http.get<Debt>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(debt: Debt): Observable<Debt> {
    const url = `${this.baseUrl}/debt/${debt.id}`;
    return this.http.put<Debt>(url, debt).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Debt> {
    const url = `${this.baseUrl}/debt/${id}`;
    return this.http.delete<Debt>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    console.log(e);
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
