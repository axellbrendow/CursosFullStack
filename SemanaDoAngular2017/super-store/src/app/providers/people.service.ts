import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  pessoas: any[] = [
    {
      nome: 'A',
      idade: 21
    },
    {
      nome: 'B',
      idade: 19
    },
    {
      nome: 'C',
      idade: 22
    },
    {
      nome: 'D',
      idade: 20
    },
  ]

  constructor() { }
}
