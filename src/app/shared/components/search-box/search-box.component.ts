import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @Input()
  public placeHolderC: string = ''; //It recieves info fomr its paremt

  @Output()
  public searchName: EventEmitter<string> = new EventEmitter(); // it sends info to the parent

  capitalName(nameEntered: string): void {
    this.searchName.emit(nameEntered)
  }
}
