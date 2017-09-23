import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { ModalComponent, modalTemplate } from './modal.component';

@Component({
    selector: 'route-modal',
    template: modalTemplate
})
export class RouteModalComponent extends ModalComponent implements OnInit {
    @Input() public cancelUrl: any[];
    @Input() public cancelUrlExtras: { relative: boolean } & NavigationExtras;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        super();
    }

    ngOnInit() {
        this.open();
    }

    close(...args: any[]) {
        super.close(args);
        if (this.cancelUrl) {
            let navigationExtras: NavigationExtras = { };
            if (this.cancelUrlExtras) {
                if (this.cancelUrlExtras.relative) {
                    navigationExtras.relativeTo = this.activatedRoute;
                }
                navigationExtras = (Object as any).assign(navigationExtras, this.cancelUrlExtras);
            }
            this.router.navigate(this.cancelUrl, navigationExtras);

        } else {
            window.history.back();
        }
    }
}