import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Admin} from "../../../models/admin/admin.model";


@Component({
  selector: 'app-anti-hero-form',
  templateUrl: './anti-hero-form.component.html',
  styleUrls: ['./anti-hero-form.component.scss']
})
export class AdminFormComponent implements OnInit {
  @Input() selectedAdmin: Admin | null = null;
  @Input() actionButtonLabel: string = 'Create';
  @Output() action = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      house: [''],
      knownAs: ['']
    })

   }

  ngOnInit(): void {
    this.checkAction();
  }

  checkAction() {
    if(this.selectedAdmin) {
      this.actionButtonLabel = "Update";
      this.patchDataValues()
    }
  }

  patchDataValues () {
     if(this.selectedAdmin)
     this.form.patchValue(this.selectedAdmin);
  }

  emitAction() {
    this.action.emit({value: this.form.value, action: this.actionButtonLabel})
  }

  clear() {
     this.form.reset();
  }


}
