import { VideoService } from './../video.service';
import { Video } from './../video';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

/*
  videos: Video[] = [
    {'_id': '1', 'title': 'Title 1', 'url': 'url 1', 'description': 'Description 1'},
    {'_id': '2', 'title': 'Title 2', 'url': 'url 2', 'description': 'Description 2'},
    {'_id': '3', 'title': 'Title 3', 'url': 'url 3', 'description': 'Description 3'},
    {'_id': '4', 'title': 'Title 4', 'url': 'url 4', 'description': 'Description 4'}
  ];
*/

  videos: Array<Video>;

  selectedVideo: Video;

  private hideNewVideo: boolean = true;

  constructor(private _videoService: VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
    .subscribe(resVideoData => this.videos = resVideoData);
  }

  onSelectVideo(video: any) {
    this.selectedVideo = video;
    this.hideNewVideo = true;
    console.log(this.selectedVideo);
  }

  onSubmitAddVideo(video: Video) {
    this._videoService.addVideo(video).subscribe(resNewVideo => {
      this.videos.push(resNewVideo);
      this.selectedVideo = resNewVideo;
      this.hideNewVideo = true;
    });
  }

  newVideo() {
    this.hideNewVideo = false;
  }

  onUpdateVideoEvent(video: Video) {
    this._videoService.updateVideo(video).subscribe(resUpdateVideo =>  video = resUpdateVideo);
    this.selectedVideo = null;
  }

  onDeleteVideoEvent(video: any) {
    let videoArray = this.videos;
    this._videoService.deleteVideo(video)
        .subscribe(resDeleteVideo => {
          for (let i = 0; i < videoArray.length; i++) {
            if (videoArray[i]._id === video._id) {
              videoArray.splice(i, 1);
            }
          }
        });
        console.log("Hello");
    this.selectedVideo = null;
  }
}
