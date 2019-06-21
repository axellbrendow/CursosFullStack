import { Component } from '@angular/core';
import { PessoasService } from './pessoas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'SemanaDoAngular2017';
  
  // já declara um campo público da classe no construtor, evita uso do this e etc.
  constructor(public pessoasService: PessoasService) { }
}
