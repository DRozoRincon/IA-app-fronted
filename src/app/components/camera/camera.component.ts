import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ActionSheetController } from '@ionic/angular';

const { Camera } = Plugins;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {

  @Input() OneImage = false;
  @Output() imgsPath = new EventEmitter<any>();
  tempImages: string[] = [];

  constructor(private actSheetCtrl: ActionSheetController) { 
    this.imgsPath.emit([]);
  }

  ngOnInit() {}

  async imgSource(){
    const buttons = [
      {
        text: 'Tomar una foto',
        icon: 'camera',
        handler: () => {
          this.getImage(CameraSource.Camera)
        }
      },
      {
        text: 'Seleccionar una foto',
        icon: 'image',
        handler: () => {
          this.getImage(CameraSource.Photos)
        }
      }
    ]

    const actionSheet = await this.actSheetCtrl.create({
      header: 'Obtener imagen',
      buttons
    });

    await actionSheet.present();
  } 



  async getImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      source
    });
    
    let imageUrl = image.webPath;
    this.tempImages.push(imageUrl);

    this.imgsPath.emit(this.tempImages);
    
    // let blob = await fetch(imageUrl).then(r => r.blob());
    
    // this.postServices.subirArchivosPost(blob, 'image').subscribe(
    //   res=>console.log(res),
    //   err=>console.log(err)
    // )
  }

  eliminarImg(index){
    this.tempImages.splice(index,1);
    this.imgsPath.emit(this.tempImages);
  }

}
