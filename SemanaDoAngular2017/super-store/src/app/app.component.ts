import { Component } from '@angular/core';
import { StorageService } from './providers/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'super-store';

  constructor (public storage: StorageService)
  {
    storage.setDrive('local'); // "session" pode ser "local" ou session
    // "session" criará uma base de dados que persistirá por sessão (aba)
    // "local" criará uma base de dados que persistirá no disco rígido
  }
}
