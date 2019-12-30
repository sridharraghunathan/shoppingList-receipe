import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  constructor() { }
  @Input() errorMsg: string;
  @Output() close = new EventEmitter<void>();
 
  onCancel() {
    this.close.emit();
  }

}
