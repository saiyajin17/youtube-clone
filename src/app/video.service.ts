import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  uploadVideoFile(fileEntry: File) {
    const formData = new FormData();
    formData.append("file", fileEntry, fileEntry.name);
    
    return this.http.post("http://localhost:8082/api/videos",formData);
  }
}
