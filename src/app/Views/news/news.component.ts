import { Component, OnInit } from '@angular/core';
import { VerbService } from '../../Services/VerbServices';
import { MessageService } from 'primeng/api';
import { Verb } from '../../Models/Verb';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [MessageService]
})
export class NewsComponent implements OnInit {
  Verbs: Array<Verb> = [];

  constructor(private verbService: VerbService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.GetRecentlyAddedVerbs();
  }

  GetRecentlyAddedVerbs(){
    return this.verbService.getRecentlyAdded().subscribe((verbs) => {
        this.Verbs = verbs;
    }, error => {
      this.messageService.add({ severity: 'warning', summary: 'Failed To Get Verbs', detail: 'Could not retrieve recently added verbs.' });

    });
  }

}
