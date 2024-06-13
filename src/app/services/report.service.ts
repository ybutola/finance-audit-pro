import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

   constructor() {}

   private companyName = new BehaviorSubject<string>('');
   getCompanyName = this.companyName.asObservable();
   setCompanyName(name: string) {
     this.companyName.next(name);
   }

      private version = new BehaviorSubject<number>(1);
      getVersion = this.version.asObservable();
      setVersion(version: number) {
        this.version.next(version);
      }


     private year = new BehaviorSubject<number>(2024);
     getYear = this.year.asObservable();
     setYear(yr: number) {
       this.year.next(yr);
     }
}
