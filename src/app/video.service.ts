import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { uploadVideoResponse } from './model/uploadVideoResponse';
import { VideoDto } from './model/VideoDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  uploadVideoFile(fileEntry: File):Observable<uploadVideoResponse> {
    const formData = new FormData();
    formData.append("file", fileEntry, fileEntry.name);
    return this.http.post<uploadVideoResponse>("http://localhost:8082/api/videos",formData);
  }

  uploadThumbnail(fileEntry: File,videoId:string): Observable<string> {
    const formData = new FormData();
    formData.append("file", fileEntry, fileEntry.name);
    formData.append("videoId",videoId);
    return this.http.post("http://localhost:8082/api/videos/thumbnail",formData,{
      responseType:'text'
    });
  }

  getVideo(videoId:string):Observable<VideoDto>{
     return this.http.get<VideoDto>("http://localhost:8082/api/videos/"+videoId);
  }

  saveVideo(videoMetaData:VideoDto):Observable<VideoDto>{
    return this.http.put<VideoDto>("http://localhost:8082/api/videos",videoMetaData);
  }
}
