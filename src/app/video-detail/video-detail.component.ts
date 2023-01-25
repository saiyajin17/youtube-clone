import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent {

  videoId!:string;
  videoUrl!:string;
  videoAvailable: boolean=false;
  description!: string;
  videoTitle!: string;
  tags: string[]=[];
  constructor(private activatedRoute:ActivatedRoute,private videoservice:VideoService){
    this.videoId=this.activatedRoute.snapshot.params['videoId'];
    this.videoservice.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.videoTitle=data.title;
      this.description=data.description;
      this.tags=data.tags;
      this.videoAvailable=true;
    });
  }


}
