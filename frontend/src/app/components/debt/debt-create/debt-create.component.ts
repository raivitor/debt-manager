import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { DebtService } from "../../../services/debt.service";
import { Debt } from "../../../models/debt.model";
import { User } from "../../../models/user.model";

@Component({
  selector: "app-debt-create",
  templateUrl: "./debt-create.component.html",
  styleUrls: ["./debt-create.component.css"],
})
export class DebtCreateComponent implements OnInit {
  registerForm: FormGroup;
  maxDate = new Date();
  debt: Debt;
  users: User[];

  constructor(
    private debtService: DebtService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.debtService.getUsers().subscribe((users) => {
      this.users = users;
    });

    this.registerForm = this.formBuilder.group({
      idUser: [null, Validators.required],
      reason: ["", Validators.required],
      date: ["", [Validators.required]],
      value: [null, [Validators.required]],
    });
  }

  // created for easy access in the view
  get f() {
    return this.registerForm.controls;
  }

  createDebt(): void {
    if (this.registerForm.invalid) return;
    this.debt = {
      idUser: this.registerForm.value.idUser,
      reason: this.registerForm.value.reason,
      date: this.registerForm.value.date,
      value: this.registerForm.value.value,
    };
    this.debtService.create(this.debt).subscribe(() => {
      this.debtService.showMessage("Dívida criada!");
      this.router.navigate(["/debts"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/debts"]);
  }
}
