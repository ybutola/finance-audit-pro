import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CashFlow } from '../data/cashflow';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.component.html',
  styleUrls: ['./cashflow.component.css']
})
export class CashflowComponent implements OnInit {
  companyName: string = '';
  version: number = 1;
  year: number = 2024;
  templateName: string = '';

  constructor(private http: HttpClient, private reportService: ReportService) { }
  url: string = 'http://localhost:8080/report/word/cashflow/saveCashflow?companyName=butolaorg&version=1&year=2024';

  cashflow: CashFlow = new CashFlow();

  ngOnInit(): void {
    this.getCashFlow().subscribe(data => {
      if (null != data) {
        this.cashflow = data;
      }
    }, error => {
      console.error('Error fetching data:', error)
    });

    this.reportService.getTemplate.subscribe(template => {
      this.templateName = template.companyName + "_" + template.year + "_" + template.version
    });
  }


  cashflowUrl: string = 'http://localhost:8080/report/word/cashflow/findCashflow?companyName=';//butolaorg&version=1&year=2024';

  getCashFlow(): Observable<CashFlow> {
    this.reportService.getCompanyName.subscribe(companyName => this.companyName = companyName);
    this.reportService.getVersion.subscribe(version => this.version = version);
    this.reportService.getYear.subscribe(year => this.year = year);

    return this.http.get<CashFlow>(this.cashflowUrl + this.companyName + "&version=" + this.version + "&year=" + this.year);
  }

  onSubmit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post(this.url, JSON.stringify(this.cashflow), { headers }).subscribe(
      (response) => {
        alert("Response: " + response);
        console.log('POST request successful:', response);
      },
      (error) => {
        alert("Error: " + error);
        console.error('Error making POST request:', error);
      }
    );
  }


  generatePreview(): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    var url = 'http://localhost:8080/report/word/report/preview?templateName=' + this.templateName
    + '&companyName=' + this.companyName
    + '&version=' + this.version
    + '&year=' + this.year;

    return this.http.get(url, { headers, responseType: 'blob' });
  }

  preview(): void {
    this.generatePreview().subscribe(response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }, error => {
      console.error('Error fetching data:', error)
    });
  }
}
