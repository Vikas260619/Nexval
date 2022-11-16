import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { FormatTimestampPipe } from 'src/app/pipes/format-timestamp.pipe';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { base64ToFile } from 'ngx-image-cropper';
import { ProfilePicUploadService } from 'src/app/service/profile-pic-upload.service';

@Component({
  selector: 'app-profile-image-upload',
  templateUrl: './profile-image-upload.component.html',
  styleUrls: ['./profile-image-upload.component.scss']
})
export class ProfileImageUploadComponent implements OnInit {
  modalObj: Modal | null = null;
  subscriptionObj: Subscription | null;
  imagePath:any='';
  fileUploaded:boolean=false;
  currentImage:any='';
  uploaded:boolean=true;
  

  ngAfterViewInit(): void {
    this.modalObj = new Modal(this.cropModalEle?.nativeElement);
  }
 
   

  constructor(private eventEmitterService: EventEmitterService,
    private _sanitizer: DomSanitizer,
    private picService:ProfilePicUploadService,
    private http:AuthHttpService
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem('user-profile-image')=='null'){
      this.fileUploaded=false;
    }else{
      this.fileUploaded=true;
    }
    this.subscriptionObj =
      this.eventEmitterService.imageCroppEventEmitter.subscribe(
        (status) => {
          console.log(status);
          if (status) this.openCropModal();
          console.log(status);
        }
      );
      this.eventEmitterService.imageuploadPopupEventEmitter.subscribe((status) => {
        console.log('Cropp Called');
        if (status) this.openCropModal();
      });  
  }

  @ViewChild('crop_modal', { static: false })
  cropModalEle: ElementRef | null = null;
  

  openCropModal(){
  //  this.currentImage = this.toDataURL(localStorage.getItem("user-profile-image"), function (dataUrl) {
  //   //console.log(dataUrl)
  //        }) 
    //this.currentImage=localStorage.getItem("user-profile-image");
    //console.log("++++++++",localStorage.getItem("user-profile-image"));
    let imageSrcString:any =  this.toDataURL(localStorage.getItem("user-profile-pic")).then(meta => {
      this.currentImage=meta;
       //localStorage.setItem("user-profile-image",data); // {"metadata": "for: test.png"}
       //this.EventEmitter.imageCropSaveEventEmitter.emit(true);
     });
     //this.currentImage=localStorage.getItem("user-profile-image");
    console.log("yyyyyyyyyyyyyyyyyyyyyyyyy",this.currentImage);
      
    if (this.cropModalEle) this.modalObj.show();
  }
  toDataURL = async (url) => {
    console.log("Downloading image...");
    var res = await fetch(url);
    var blob = await res.blob();

    const result = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })

    return result
  };
  closeCropModal(){
  if (this.cropModalEle) this.modalObj.hide();
 // if (this.cropModalEle) this.modalObj.remove();
 // window.location.reload()
  setTimeout(()=>{
    //window.location.reload();
  }, 500);
  }
  title = 'angular-image-uploader';

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      this.fileUploaded=true;
      this.uploaded=true;
      console.log('kllllllllllllllllllllllll');
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      localStorage.setItem("user-profile-image",this.croppedImage);
  }
  imageLoaded() {
      // show cropper
     
      //this.uploaded=true;
  }
  cropperReady() {
      // cropper ready
      
  }
  loadImageFailed() {
      // show message
  }
  imageSave(){
    localStorage.setItem("cropped-profile-image",this.croppedImage);
    this.eventEmitterService.imageCropSaveEventEmitter.emit(true);
    let phyFile= base64ToFile(this.croppedImage);
    //let fl = this.blobToFile(phyFile,'profile-pic.png')

    const fl = new File([phyFile], 'profile-pic.png', {
      type: phyFile.type,
    });

    
    console.log(fl);

    this.picService.upload(fl).subscribe(
      (response) => {
        if (response) {
          console.log(response);
         // this.router.navigate([this.returnUrl]);
        } else {
          
        }
      },
      (_) => {
        
      }
    );
    this.closeCropModal();
    this.uploaded=false;
  }
 

blobToFile(theBlob, fileName){
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return <File>theBlob;
}
ngOnDestroy() {
  if (this.subscriptionObj) {
    this.subscriptionObj.unsubscribe();
  }
}
deleteImage(){
  let data:any={
  }
  this.http.deleteProfilePicture(data).subscribe(
    (response) => {

      this.closeCropModal();
      localStorage.setItem('user-profile-image',null)
      this.eventEmitterService.imageCropSaveEventEmitter.emit(true);
    },
    (error) => {
      //this.isSubmitFormLoading = false;
    }
  );
}
}
