import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-debt-crud",
  templateUrl: "./debt-crud.component.html",
  styleUrls: ["./debt-crud.component.css"],
})
export class DebtCrudComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToDebtCreate(): void {
    this.router.navigate(["/debts/create"]);
  }
}
