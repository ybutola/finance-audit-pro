import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { OrgComponent } from './org/org.component';
import { LiquidityComponent } from './liquidity/liquidity.component';
import { CashflowComponent } from './cashflow/cashflow.component';
import { TemplatesComponent } from './templates/templates.component';
import { ReportsComponent } from './reports/reports.component';
import { TemplateselectionComponent } from './templateselection/templateselection.component';
import { FileuploadComponent } from './fileupload/fileupload.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    OrgComponent,
    LiquidityComponent,
    CashflowComponent,
    TemplatesComponent,
    ReportsComponent,
    TemplateselectionComponent,
    FileuploadComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
