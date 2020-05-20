import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { DebtService } from "../../../services/debt.service";
import { Debt } from "../../../models/debt.model";
import { User } from "../../../models/user.model";

@Component({
  selector: "app-debt-update",
  templateUrl: "./debt-update.component.html",
  styleUrls: ["./debt-update.component.css"],
})
export class DebtUpdateComponent implements OnInit {
  registerForm: FormGroup;
  maxDate = new Date();
  debt: Debt;
  users: User[];

  constructor(
    private debtService: DebtService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.debtService.getUsers().subscribe((users) => {
      this.users = users;
    });

    const id = +this.route.snapshot.paramMap.get("id");
    this.debtService.readById(id).subscribe((debt) => {
      this.debt = debt;
      this.registerForm = this.formBuilder.group({
        idUser: [debt.idUser, Validators.required],
        reason: [debt.reason, Validators.required],
        date: [debt.date, [Validators.required]],
        value: [debt.value, [Validators.required]],
      });
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  updateDebt(): void {
    console.log(this.registerForm);
    if (this.registerForm.invalid) return;

    this.debt.idUser = this.registerForm.value.idUser;
    this.debt.reason = this.registerForm.value.reason;
    this.debt.date = this.registerForm.value.date;
    this.debt.value = this.registerForm.value.value;

    this.debtService.update(this.debt).subscribe(() => {
      this.debtService.showMessage("Dívida atualizada com sucesso!");
      this.router.navigate(["/debts"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/debts"]);
  }
}
