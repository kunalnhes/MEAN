import { Video } from './video';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class VideoService {

  private _getUrl = '/api/videos';
  private _postUrl = '/api/video';

  constructor(private _http: Http) { }

  getVideos() {
    console.log(this._http.get(this._getUrl));
    return this._http.get(this._getUrl).pipe(map((response: Response) => response.json()));
  }

  addVideo(video: Video) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._http.post(this._postUrl, JSON.stringify(video), options)
      .pipe(map((response: Response) => response.json()));
  }
}