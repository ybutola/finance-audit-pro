import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ReportService } from '../services/report.service';
import { Org } from '../data/org';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css']
})
export class OrgComponent implements OnInit {
      org: Org = new Org();
      constructor(private http: HttpClient, private reportService: ReportService) {}

      ngOnInit(): void {
      }

      url: string = 'http://localhost:8080/report/word/org/saveOrgInfo';

     onSubmit() {

         const headers = new HttpHeaders({
             'Content-Type': 'application/json'
         });

         this.http.post(this.url, JSON.stringify(this.org), { headers }).subscribe(
               (response) => {
              // alert("Response: " +response);
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
