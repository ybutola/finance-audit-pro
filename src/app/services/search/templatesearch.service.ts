import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateSearchService {
    private apiUrl = 'http://localhost:8080/report/template/searchTemplate';
    constructor(private http: HttpClient) {}

    searchTemplates(filters: any): Observable<any> {
      const body = {
        companyName: filters.value.companyName,
        year: filters.value.year,
        version: filters.value.version,
        createdBy: filters.value.createdBy,
        updatedBy: filters.value.updatedBy,
        createdDate: filters.value.createdDate ? filters.value.createdDate.toISOString() : null,
        updatedDate: filters.value.updatedDate ? filters.value.updatedDate.toISOString() : null,
      };
      return this.http.post<any>(this.apiUrl, body);
    }
}
