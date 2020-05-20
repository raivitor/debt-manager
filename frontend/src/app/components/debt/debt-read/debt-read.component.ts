import { DebtService } from "../../../services/debt.service";
import { Debt } from "../../../models/debt.model";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-debt-read",
  templateUrl: "./debt-read.component.html",
  styleUrls: ["./debt-read.component.css"],
})
export class DebtReadComponent implements OnInit {
  debts: Debt[];
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns = ["id", "userName", "reason", "date", "value", "action"];
  dataSource;

  constructor(private debtService: DebtService) {}

  ngOnInit(): void {
    this.debtService.read().subscribe((debts) => {
      debts = debts.map((debt) => {
        debt.userName = debt.user.name;
        debt.user = undefined;
        return debt;
      });
      this.dataSource = new MatTableDataSource(debts);
      this.debts = debts;
      this.length = debts.length;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
