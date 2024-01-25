import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public images: string[] = [`../../../assets/images/home/image-marquee/bach-suite-for-lute.png`];
  // public images: string[] = [1,2,3,4,5,3,4,1,2,4,3,5,4,2,3,4,1,2,3,4,5].map(x => `../../../assets/images/home/image-marquee/fake-notes/notes-${x}.png`);
  public year: number = new Date().getFullYear();
  public academicYear: string = this.year + '-' + (this.year + 1);
}
