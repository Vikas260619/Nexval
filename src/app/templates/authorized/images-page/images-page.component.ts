import { Component, Input, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';


@Component({
  selector: 'app-images-page',
  templateUrl: './images-page.component.html',
  styleUrls: ['./images-page.component.scss']
})
export class ImagesPageComponent implements OnInit {
  user:boolean=true;
  @Input()
  collabChat: any;
  filterImage: any;
  nickName: any;
  filterImages: any;
  modelData: any;
  base64Image: any;

  constructor() { }

  ngOnInit(): void {
    if (
      localStorage.getItem('user-role') != null &&
      localStorage.getItem('user-role') == 'SUPERADMIN'
    ) {
      this.user = false;
    }
    this.filterImage = this.collabChat.filter(el => el.type == el.type?.match(/^image\/.+$/) && el.type && el.customType !== 'DELETED');
    this.filterImages = this.filterImage.sort((a: any,b: any) => b.createdAt - a.createdAt)
    this.nickName = localStorage.getItem('nickname')
  }

  getShortName(fullName) {
    const splitFullName = fullName.split(' ')
    const intials = splitFullName.shift().charAt(0);
      return intials.toUpperCase();
  }

  getModelMessage(message: any) {
    this.modelData = message;
  }

  downloadImage(modelData) {
    let imageUrl = modelData.plainUrl;
    // let imageUrl =
    // "http://radium-file-storage.s3.amazonaws.com/org_170/Communication/user_773/61b19d7a-8f90-4ec4-8444-afbec8c662ee.jpg";

    this.getBase64ImageFromURL(imageUrl).subscribe((base64data) => {
      this.base64Image = 'data:image/jpg;base64,' + base64data;
      // save image to disk
      var link = document.createElement('a');

      document.body.appendChild(link); // for Firefox

      link.setAttribute('href', this.base64Image);
      link.setAttribute('download', modelData.name);
      // link.setAttribute("download", "mrHankey.jpg");

      link.click();
    });
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL('image/png');

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

}
