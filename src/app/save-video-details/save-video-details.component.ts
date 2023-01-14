import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VideoDto } from '../model/VideoDto';


@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent {


  saveVideoDetails!: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  selectedFile!: File;
  fileName: string = '';
  videoId: string = '';
  fileselected: boolean = false;
  videoUrl!: string;


  constructor(private activatedRoute: ActivatedRoute, private videoservice: VideoService,
    private matsnackBar: MatSnackBar) {

    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoservice.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      console.log(data.videoUrl);
    });

    this.saveVideoDetails = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus,
    });
  }

  /* chips */
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onFileSelected(event: Event) {
    //@ts-ignore
    this.selectedFile = event.target!.files[0];
    this.fileName = this.selectedFile.name;
    this.fileselected = true;
  }

  onUpload() {

    this.videoservice.uploadThumbnail(this.selectedFile, this.videoId)
      .subscribe(() => {
        //show an upload success notification
        this.matsnackBar.open("Thumbnail uploaded successfully", "Ok")
      })
  }



}
