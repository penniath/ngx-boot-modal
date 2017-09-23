import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalContentComponent } from './modal-content.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalComponent } from './modal.component';
import { RouteModalComponent } from './route-modal.component';

const declarations = [
    ModalComponent,
    ModalHeaderComponent,
    ModalContentComponent,
    ModalFooterComponent,
    RouteModalComponent
];

@NgModule({
    imports: [ CommonModule ],
    declarations: [...declarations],
    exports: [...declarations],
})
export class ModalModule { }
