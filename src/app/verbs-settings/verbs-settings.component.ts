import { Component, OnInit } from '@angular/core';
import { VerbsComponent } from '../verbs/verbs.component';
import { Verb } from 'src/app/Models/Verb';

@Component({
  selector: 'app-verbs-settings',
  templateUrl: './verbs-settings.component.html',
  styleUrls: ['./verbs-settings.component.css']
})
export class VerbsSettingsComponent implements OnInit {
  VerbTypes: string[] = ["ER", "IR", "RE"];
  SelectedVerbTypes: string[] = ["ER", "IR", "RE"];
  Pronouns: string[] = ["Je", "Ils", "Tu", "Elles", "Elle", "Nous", "Il", "Vous", "On"];
  SelectedPronouns: string[] = ["Je", "Tu", "On", "Il", "Elle", "Nous", "Vous", "Ils", "Elles"];
  Tenses: string[] = ["Present", "Futur", "Imparfait", "Passé Composé"];
  SelectedTenses: string[] = ["Present", "Futur", "Imparfait", "Passé Composé"];
  AuxilaryVerbs: string[] = ["Avoir", "Etre"];
  SelectedAuxilaryVerbs: string[] = ["Avoir", "Etre"];
  AlwaysShowHint: boolean = false;
  ShowHint: boolean = false;
  ShowEnglishTranslation: boolean = true;

  constructor(private verbsComp: VerbsComponent) {
  }



  ngOnInit(): void {
    let verbEndingPreferencesStr: any = localStorage.getItem("VerbEndings") == null ? "" : localStorage.getItem("VerbEndings");
    let tensePreferencesStr: any = localStorage.getItem("Tenses") == null ? "" : localStorage.getItem("Tenses");
    let AuxVerbPreferencesStr: any = localStorage.getItem("AuxVerbs") == null ? "" : localStorage.getItem("AuxVerbs");
    let PronounPreferencesStr: any = localStorage.getItem("Pronouns") == null ? "" : localStorage.getItem("Pronouns");
    let AlwaysShowHintStr: any = localStorage.getItem("AlwaysShowHint") == null ? "" : localStorage.getItem("AlwaysShowHint");
    let ShowEngTransStr: any = localStorage.getItem("EnglishTrans") == null ? "" : localStorage.getItem("EnglishTrans");
    
    if (verbEndingPreferencesStr != "") {
        this.SelectedVerbTypes = JSON.parse(verbEndingPreferencesStr);
    }

    if (tensePreferencesStr != "") {
        this.SelectedTenses = JSON.parse(tensePreferencesStr);
    }

    if (AuxVerbPreferencesStr != "") {
        this.SelectedAuxilaryVerbs = JSON.parse(AuxVerbPreferencesStr);
    }

    if (PronounPreferencesStr != "") {
        this.SelectedPronouns = JSON.parse(PronounPreferencesStr);
    }         
    
    if (ShowEngTransStr != "") {
        this.ShowEnglishTranslation = JSON.parse(ShowEngTransStr);
    }        
    
    if (AlwaysShowHintStr != "") {
        this.AlwaysShowHint = JSON.parse(AlwaysShowHintStr);
        this.ShowHint = true;
    }
  }

  Reset() {
    this.verbsComp.CountCorrect = 0;
    this.UpdateOptions();
    this.verbsComp.GetVerbList();
    this.verbsComp.SaveSelection();
  }

  Save() {
    this.verbsComp.CountCorrect = 0;
    this.UpdateOptions();
    this.verbsComp.GetVerb();
    this.verbsComp.SaveSelection();
  }

  ToggleShowHint() {
    this.verbsComp.ShowHint = this.AlwaysShowHint;
    this.verbsComp.AlwaysShowHint = this.AlwaysShowHint;
  }

  ToggleShowEnglish() {
    this.verbsComp.ShowEnglishTranslation = this.ShowEnglishTranslation;
  }

  UpdateOptions() {
    this.verbsComp.SelectedAuxilaryVerbs = this.SelectedAuxilaryVerbs;
    this.verbsComp.SelectedPronouns = this.SelectedPronouns;
    this.verbsComp.SelectedTenses = this.SelectedTenses;
    this.verbsComp.SelectedVerbTypes = this.SelectedVerbTypes;
    this.verbsComp.ShowHint = this.ShowHint;
    this.verbsComp.AlwaysShowHint = this.AlwaysShowHint;
    this.verbsComp.ShowEnglishTranslation = this.ShowEnglishTranslation;
  }

  GetDefault() {
    this.SelectedAuxilaryVerbs = this.verbsComp.SelectedAuxilaryVerbs;
    this.SelectedPronouns = this.verbsComp.SelectedPronouns;
    this.SelectedTenses = this.verbsComp.SelectedTenses;
    this.SelectedVerbTypes = this.verbsComp.SelectedVerbTypes;
    this.ShowHint = this.verbsComp.ShowHint;
    this.AlwaysShowHint = this.verbsComp.AlwaysShowHint;
    this.ShowEnglishTranslation = this.verbsComp.ShowEnglishTranslation;
  }

}
