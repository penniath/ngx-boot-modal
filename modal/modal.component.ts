import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

export const modalTemplate = `
        <div class="modal"
             tabindex="-1"
             role="dialog"
             #modalRoot
             (keydown.esc)="closeOnEscape ? close() : 0"
             [class.in]="isOpened"
             [class.fade]="isOpened"
             [style.z-index]="zIndex"
             [ngStyle]="{ display: isOpened ? 'block' : 'none' }"
             (click)="closeOnOutsideClick ? checkClickOutside($event) : 0">
            <div [class]="'modal-dialog ' + modalClass" #modalDialog>
                <div class="modal-content" tabindex="0" *ngIf="isOpened">
                    <div class="modal-header" *ngIf="!hideHeader">
                        <button *ngIf="!hideCloseButton" type="button" class="close" data-dismiss="modal" [attr.aria-label]="cancelButtonLabel || 'Close'" (click)="close()"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" *ngIf="title">{{ title }}</h4>
                        <ng-content select="modal-header"></ng-content>
                    </div>
                    <div class="modal-body">
                        <ng-content select="modal-content"></ng-content>
                    </div>
                    <div class="modal-footer" *ngIf="!hideFooter">
                        <ng-content select="modal-footer"></ng-content>
                        <button *ngIf="cancelButtonLabel" type="button" class="btn btn-default" data-dismiss="modal" (click)="close()">{{ cancelButtonLabel }}</button>
                        <button *ngIf="submitButtonLabel" type="button" class="btn btn-primary" (click)="onSubmit.emit(undefined)">{{ submitButtonLabel }}</button>
                    </div>
                </div>
            </div>
        </div>
    `;

@Component({
    selector: 'modal',
    template: modalTemplate
})
export class ModalComponent implements OnInit {
    @Input() public autoShow = false;
    @Input() public backdrop = true;
    @Input() public cancelButtonLabel: string;
    @Input() public closeOnEscape = true;
    @Input() public closeOnOutsideClick = true;
    @Input() public hideCloseButton = false;
    @Input() public hideFooter = false;
    @Input() public hideHeader = false;
    @Input() public modalClass: string;
    @Input() public submitButtonLabel: string;
    @Input() public title: string;
    @Input() public zIndex: number;
    @Output() public onClose = new EventEmitter(false);
    @Output() public onOpen = new EventEmitter(false);
    @Output() public onSubmit = new EventEmitter(false);

    public isOpened = false;
    @ViewChild('modalRoot') public modalRoot: ElementRef;
    @ViewChild('modalDialog') public modalDialog: ElementRef;
    protected backdropElement: HTMLElement;

    constructor() {
        this.createBackDrop();
    }

    ngOnInit() {
        if (this.autoShow) {
            this.open();
        }
    }

    ngOnDestroy() {
        document.body.className = document.body.className.replace(/modal-open\b/, '');
        if (this.backdropElement && this.backdropElement.parentNode === document.body)
            document.body.removeChild(this.backdropElement);
    }

    open(...args: any[]) {
        if (this.isOpened)
            return;

        this.isOpened = true;
        this.onOpen.emit(args);
        document.body.appendChild(this.backdropElement);
        window.setTimeout(() => this.modalRoot.nativeElement.focus(), 0);
        document.body.className += ' modal-open';
    }

    close(...args: any[]) {
        if (!this.isOpened)
            return;

        this.isOpened = false;
        this.onClose.emit(args);
        document.body.removeChild(this.backdropElement);
        document.body.className = document.body.className.replace(/modal-open\b/, '');
    }

    checkClickOutside(event: MouseEvent) {
        if (!this.modalDialog.nativeElement.contains(event.target)) {
            this.close();
        }
    }

    protected createBackDrop() {
        this.backdropElement = document.createElement('div');
        this.backdropElement.classList.add('fade');
        this.backdropElement.classList.add('in');
        if (this.backdrop) {
            this.backdropElement.classList.add('modal-backdrop');
        }
    }
}