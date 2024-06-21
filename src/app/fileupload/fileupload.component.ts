import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
  selectedFile: File;
  uploadProgress: number = 0;
    uploadMessage: string | null = null;
    errorMessage: string | null = null;

  companyName: string = "";
  year: number = 2024;
  version: number = 1;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

    onUpload() {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append("companyName", this.companyName);
      formData.append("year", String(this.year));
      formData.append("version", String(this.version));

      this.http.post('http://localhost:8080/report/template/saveTemplate', formData, { reportProgress: true, observe: 'events' })
        .subscribe((event: any) => {
             if (event.status === 'progress') {
               this.uploadProgress = event.message;
             } else if (event.status === 'done') {
             alert(event.status)
               this.uploadMessage = 'File successfully uploaded!';
               this.uploadProgress = null;
               this.errorMessage = null;
             }
           },
           error => {
        //   alert("Error : " + error.error)
             console.log('Upload error:', error);
             this.errorMessage = error.error || 'File upload failed!';
             this.uploadProgress = null;
             this.uploadMessage = null;
           }
         );
    }
}