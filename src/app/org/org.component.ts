import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ReportService } from '../services/report.service';
import { Org } from '../data/org';
import { Template } from 'app/data/template';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css']
})
export class OrgComponent implements OnInit {
  template: Template = null;
  org: Org = new Org();
  companyName: string = "";
  isReadOnly: boolean = false;
  constructor(private http: HttpClient, private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getCompanyName.subscribe(companyName => this.org.companyName = companyName);
    if (this.org.companyName != "") {
      this.isReadOnly = true;
    }

    this.reportService.getTemplate.subscribe(template => this.template = template);
    //alert("this.companyName:" + this.template.companyName + " year: " + this.template.year + " version: " + this.template.version);
  }

  url: string = 'http://localhost:8080/report/word/org/saveOrgInfo';

  onSubmit() {
    if (!this.isReadOnly) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post(this.url, JSON.stringify(this.org), { headers }).subscribe(
        (response) => {
          console.log('POST request successful:', response);
        },
        (error) => {
          //  alert("Error: "+ error.data);
          console.error('Error making POST request:', error);
        }
      );
      this.reportService.setCompanyName(this.org.companyName);
      this.reportService.setVersion(this.org.version);
      this.reportService.setYear(this.org.assessmentYear);
    }
  }
}
