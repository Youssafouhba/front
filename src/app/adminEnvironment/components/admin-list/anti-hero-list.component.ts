import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableActions } from '../../enums/table-actions.enum';
import { Admin } from '../../../models/admin/admin.model';


@Component({
  selector: 'app-anti-hero-list',
  templateUrl: './anti-hero-list.component.html',
  styleUrls: ['./anti-hero-list.component.scss']
})
export class AdminListComponent implements OnInit {
  @Input() headers: Array<{headerName: string, fieldName: keyof Admin}> = [];
  @Input() Admines: ReadonlyArray<Admin> = [];
  @Output() Admin = new EventEmitter<{Admin: Admin, action :TableActions}>();
  headerFields: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getHeaderFields();
  }

  getHeaderFields() {
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  selectAdmin(Admin: Admin, action: TableActions) {
    this.Admin.emit({Admin, action});
  }

}
