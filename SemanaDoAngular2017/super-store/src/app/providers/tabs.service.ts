import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  options: string[] = [
    'Nomes',
    'Idades',
    'Descrições'
  ]

  constructor() { }
}
