import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;
  
  @Input()
  public charactersLastSearch?: string;
  
  @Input()
  public placeHolderC: string = ''; //It recieves info fomr its paremt
  
  @Output()
  public searchName: EventEmitter<string> = new EventEmitter(); // it sends info to the parent

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();
  
  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit(value)
    });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  capitalName(nameEntered: string): void {
    this.searchName.emit(nameEntered)
  }

  onKeyPress(nameEntered: string): void{
    this.debouncer.next(nameEntered);
  }
}
