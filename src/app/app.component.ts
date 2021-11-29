import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imageName: any;
  title = 'ImageUploader';
  selectedFile: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string="";
  id: Number=0;
  constructor(private httpClient: HttpClient) {
    // selectedFile: File;
  }

  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

   //Gets called when the user clicks on submit to upload the image
   onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/upload/', uploadImageData, { responseType: 'text' })
      .subscribe((response) => {
        if (response === "Image Uploaded") {
          this.message = 'Image uploaded successfully';
          alert(this.message);
        } else {
          this.message = 'Image not uploaded successfully';
          alert(this.message);
        }
        
      }
      );


  }
    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
      //Make a call to Sprinf Boot to get the Image Bytes.
      this.httpClient.get('http://localhost:8080/image/get/' + this.id)
        .subscribe(
          res => {
            this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            alert("Image Retrieved Successfully")
          }
        );
    }
}
