import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import { ProductsService } from '../../providers/products.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.sass']
})
export class SearchbarComponent implements OnInit, OnDestroy {

  submitted: boolean = false;
  keyword: string = null;
  items: any[] = [];
  openEventSubscription: Subscription;
  // @Output é um decorator https://ultimatecourses.com/blog/angular-decorators
  // https://blog.wgbn.com.br/fazendo-o-typescript-trabalhar-para-voc%C3%AA-546bd08a93ac
  @Output() closeSearch = new EventEmitter();
  @Input() openEvent: Observable<void>;
  @ViewChild('productName', { static: false }) myInput: ElementRef;

  constructor(public products: ProductsService, public router: Router) { }

  ngOnInit() {
    this.openEventSubscription = this.openEvent.subscribe(() => this.focusInput());
  }

  ngOnDestroy() {
    this.openEventSubscription.unsubscribe();
  }

  focusInput() {
    setTimeout(() => {
      this.myInput.nativeElement.focus();
    }, 0);
  }

  submit(e) {
    e.preventDefault();
  }

  searchProducts(e)
  {
    if (this.keyword)
    {
      this.submitted = true;

      this.products.search(this.keyword).then(
        (items: any[]) =>
        {
          this.items = items;
          if (items.length) this.submitted = false;
        }
      );
    }
  }

  hideModal()
  {
    this.closeSearch.emit();
  }

  goTo(item)
  {
    this.hideModal();
    this.router.navigate([item.router]);
    this.products.scrollTop();
  }

}
