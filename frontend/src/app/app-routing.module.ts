import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./views/home/home.component";
import { DebtCrudComponent } from "./views/debt-crud/debt-crud.component";
import { DebtCreateComponent } from "./components/debt/debt-create/debt-create.component";
import { DebtDeleteComponent } from "./components/debt/debt-delete/debt-delete.component";
import { DebtUpdateComponent } from "./components/debt/debt-update/debt-update.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "debts",
    component: DebtCrudComponent,
  },
  {
    path: "debts/create",
    component: DebtCreateComponent,
  },
  {
    path: "debts/update/:id",
    component: DebtUpdateComponent,
  },
  {
    path: "debts/delete/:id",
    component: DebtDeleteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
