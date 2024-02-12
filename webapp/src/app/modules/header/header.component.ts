import { Component, TemplateRef, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public loggedInUser: object | null = null;
    public searchText: string = '';
    private offcanvasService = inject(NgbOffcanvas);

    constructor() { }

    async openOffCanvas(content: TemplateRef<any>) {
        this.offcanvasService.open(content, { position: 'top' });
    }
}
