import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ReportService } from '../services/report.service';
import { Liquidity } from '../data/liquidity';

@Component({
  selector: 'app-liquidity',
  templateUrl: './liquidity.component.html',
  styleUrls: ['./liquidity.component.css']
})
export class LiquidityComponent implements OnInit {
  data: string = '';
  companyName: string = '';
  version: number = 1;
  year: number = 2024;
  templateName: string = '';

  constructor(private http: HttpClient, private reportService: ReportService) { }

  url: string = 'http://localhost:8080/report/word/liquidity/liquidity?companyName=butolaorg&version=1&year=2024';

  liquidity: Liquidity = new Liquidity();

  ngOnInit() {
    this.getLiquidity().subscribe(data => {
      if (null != data) {
        this.liquidity = data;
      }
    }, error => {
      console.error('Error fetching data:', error)
    });

    this.reportService.getTemplate.subscribe(template => {
      this.templateName = template.companyName + "_" + template.year + "_" + template.version
    });
  }

  liquidityUrl: string = 'http://localhost:8080/report/word/liquidity/findLiquidity?companyName=';//companyName=butolaorg&version=1&year=2024';
  getLiquidity(): Observable<Liquidity> {
    this.reportService.getCompanyName.subscribe(companyName => this.companyName = companyName);
    this.reportService.getVersion.subscribe(version => this.version = version);
    this.reportService.getYear.subscribe(year => this.year = year);

    //alert("URL: =" + this.liquidityUrl+"companyName="+this.companyName+"&version="+this.version+"&year="+this.year);
    return this.http.get<Liquidity>(this.liquidityUrl + this.companyName + "&version=" + this.version + "&year=" + this.year);
  }

  onSubmit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post(this.url, JSON.stringify(this.liquidity), { headers }).subscribe(
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

  // Put this code ina preview service
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

