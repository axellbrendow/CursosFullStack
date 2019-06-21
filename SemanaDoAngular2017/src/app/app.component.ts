import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SemanaDoAngular2017';
  lista:any[] = [
    {
      nome: 'Fulano',
      idade: 16
    },
    {
      nome: 'Beltrano',
      idade: 17
    },
    {
      nome: 'Ciclano',
      idade: 18
    },
    {
      nome: 'Deltrano',
      idade: 19
    },
    {
      nome: 'Eltrano',
      idade: 20
    },
  ]
}
