import { Component, OnInit } from '@angular/core';
import { Template } from '../data/template';
import { TemplateSearchService } from '../services/search/templatesearch.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-templateselection',
  templateUrl: './templateselection.component.html',
  styleUrls: ['./templateselection.component.css']
})
export class TemplateselectionComponent implements OnInit {

  errorMessage: string = '';
  templates: Template[] = [];
  template: Template;
  selectedOption: number | null = null;
  constructor(private templateSearchService: TemplateSearchService) { }

  ngOnInit(): void {
  }

  onRadioChange(id: number) {
    this.selectedOption = id;
    this.template = this.templates[id];
    //  alert("Company Name: " + this.template.version);

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
}

