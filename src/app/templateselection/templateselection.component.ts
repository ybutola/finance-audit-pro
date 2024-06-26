import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Template } from '../data/template';
import { TemplateSearchService } from '../services/search/templatesearch.service';
import { ReportService } from 'app/services/report.service';

@Component({
  selector: 'app-templateselection',
  templateUrl: './templateselection.component.html',
  styleUrls: ['./templateselection.component.css']
})
export class TemplateselectionComponent implements OnInit {

  errorMessage: string = '';
  isButtonDisabled: boolean = true;
  templates: Template[] = [];
  template: Template;
  selectedOption: number | null = null;
  constructor(
    private templateSearchService: TemplateSearchService,
    private http: HttpClient,
    private reportService: ReportService) { }

  ngOnInit(): void { }

  onRadioChange(id: number) {
    this.selectedOption = id;
    this.enableContinueButton();
    this.template = this.templates[id];
    //alert("Company Name: " + this.template.version);

  }
  onSubmit(formValues: NgForm) {
    this.templateSearchService.searchTemplates(formValues).subscribe(
      response => {
        this.templates = response;
        this.errorMessage = null;
      },
      error => {
        this.errorMessage = 'Error searching users';
        console.error(error);
      }
    );
  }

  // Put this code ina preview service
  generatePreview(): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    var url = "http://localhost:8080/report/template/viewTemplate?companyName=" + this.template.companyName
      + "&version=" + this.template.version
      + "&year=" + this.template.year;
    //alert("URL: " + url);
    return this.http.get(url, { headers, responseType: 'blob' });
  }

  preview(id: number): void {
    this.selectedOption = id;
    this.enableContinueButton();
    this.template = this.templates[id];
    this.generatePreview().subscribe(response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }, error => {
      console.error('Error fetching data:', error)
    });
  }

  enableContinueButton() {
    this.isButtonDisabled = false;
  }

  continue() {
    this.reportService.setTemplate(this.template);
  }
}

