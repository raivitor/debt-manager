import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { DebtService } from "../../../services/debt.service";
import { Debt } from "../../../models/debt.model";

@Component({
  selector: "app-debt-delete",
  templateUrl: "./debt-delete.component.html",
  styleUrls: ["./debt-delete.component.css"],
})
export class DebtDeleteComponent implements OnInit {
  debt: Debt;

  constructor(
    private debtService: DebtService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.debtService.readById(id).subscribe((debt) => {
      this.debt = debt;
    });
  }

  deletedebt(): void {
    this.debtService.delete(this.debt.id).subscribe(() => {
      this.debtService.showMessage("Dívida excluida com sucesso!");
      this.router.navigate(["/debts"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/debts"]);
  }
}
