import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

@Input()
public placeHolderC: string = '';

@Output()
public searchName: EventEmitter<string> = new EventEmitter();

capitalName(nameEntered: string): void{
  this.searchName.emit(nameEntered)
}
}
