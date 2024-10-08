import { Component, Input } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() columns: any = [];
  @Input() list = [];
  @Input() dtoptions: Config = {};
  @Input() dttrigger: Subject<any> = new Subject<any>();
}
