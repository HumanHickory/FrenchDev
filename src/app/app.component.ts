import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'French';
  FlagRef!: string;

  constructor(){}

ngOnInit() {
    this.FlagRef = environment.assetsUrl() + "FrenchFlag.png"; 
}
}



