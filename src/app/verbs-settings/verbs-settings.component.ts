import { Component, OnInit } from '@angular/core';
import { VerbsComponent } from '../verbs/verbs.component';
import { Verb } from 'src/app/Models/Verb';
import { MessageService } from 'primeng/api';
import { LocalStorageObject } from '../Models/LocalStorageObject';

@Component({
  selector: 'app-verbs-settings',
  templateUrl: './verbs-settings.component.html',
  styleUrls: ['./verbs-settings.component.css'],
  providers: [MessageService]
})
export class VerbsSettingsComponent implements OnInit {
  VerbTypes: string[] = ["ER", "IR", "RE"];
  SelectedVerbTypes: string[] = ["ER", "IR", "RE"];
  Pronouns: string[] = ["Je", "Ils", "Tu", "Elles", "Elle", "Nous", "Il", "Vous", "On"];
  SelectedPronouns: string[] = ["Je", "Tu", "On", "Il", "Elle", "Nous", "Vous", "Ils", "Elles"];
  Tenses: string[] = ["Present", "Futur", "Imparfait", "Passé Composé"];
  SelectedTenses: string[] = ["Present", "Futur", "Imparfait", "Passé Composé"];
  AuxilaryVerbs: string[] = ["Avoir", "Etre"];
  PresentTenseOptions: string[] = ["Regular", "Irregular"];
  FuturTenseOptions: string[] = ["Regular", "Irregular"];
  PasseComposeOptions: string[] = ["Regular", "Irregular"];
  SelectedAuxilaryVerbs: string[] = ["Avoir", "Etre"];
  SelectedPresentTenseOptions: string[] = ["Regular", "Irregular"];
  SelectedFuturTenseOptions: string[] = ["Regular", "Irregular"];
  SelectedPasseComposeOptions: string[] = ["Regular", "Irregular"];
  AlwaysShowHint: boolean = false;
  ShowHint: boolean = false;
  ShowEnglishTranslation: boolean = true;
  UserPreferences!: LocalStorageObject;


  includesPasseCompose!: boolean;
  includesPresent!: boolean;
  CallReset: boolean = false;

  constructor(private verbsComp: VerbsComponent, private messageService: MessageService) {
  }



  ngOnInit(): void {


    let UserPreferencesStr: any = localStorage.getItem("FrenchVerbDrills") == null ? "" : localStorage.getItem("FrenchVerbDrills");
    if (UserPreferencesStr != "") {
      this.UserPreferences = JSON.parse(UserPreferencesStr);
      this.SelectedVerbTypes = this.UserPreferences.VerbEndings;
      this.SelectedTenses = this.UserPreferences.Tenses;
      this.ToggleAdditionalTenseOptions();

      this.SelectedAuxilaryVerbs = this.UserPreferences.AuxVerbs;
      this.SelectedPresentTenseOptions = this.UserPreferences.PresentVerbs;
      this.SelectedPronouns = this.UserPreferences.Pronouns;
      this.ShowEnglishTranslation = this.UserPreferences.EnglishTrans;
      this.AlwaysShowHint = this.UserPreferences.AlwaysShowHint;
      this.ShowHint = true;
    }


    this.UpdateOptions();

    let SavedVerbsListStr: any = localStorage.getItem("SavedVerbsList") == null ? "" : localStorage.getItem("SavedVerbsList");

    if (SavedVerbsListStr != "") {
      this.verbsComp.Verbs = JSON.parse(SavedVerbsListStr);
    } else {
      this.verbsComp.GetVerbList();
    }

    if (this.SelectedTenses.includes("Passé Composé")) {
      this.PasseComposeVerbOptions(false);
    }

    if (this.SelectedTenses.includes("Present")) {
      this.PresentTenseVerbOptions(false);
    }

    this.Save();
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
    this.UserPreferences = this.verbsComp.SaveSelection();

    this.ToggleAdditionalTenseOptions();
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
    this.verbsComp.SelectedPresentTenseOptions = this.SelectedPresentTenseOptions;
    this.verbsComp.SelectedPronouns = this.SelectedPronouns;
    this.verbsComp.SelectedTenses = this.SelectedTenses;
    this.verbsComp.SelectedVerbTypes = this.SelectedVerbTypes;
    this.verbsComp.ShowHint = this.ShowHint;
    this.verbsComp.AlwaysShowHint = this.AlwaysShowHint;
    this.verbsComp.ShowEnglishTranslation = this.ShowEnglishTranslation;
  }

  ToggleAdditionalTenseOptions() {
    if (this.SelectedTenses.includes("Passé Composé")) {
      this.includesPasseCompose = true;
    } else {
      this.includesPasseCompose = false;
    }

    if (this.SelectedTenses.includes("Present")) {
      this.includesPresent = true;
    } else {
      this.includesPresent = false;
    }
  }


  SaveTenses() {

    if (this.SelectedTenses.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Must select one or more tenses.' });
      this.SelectedTenses = this.UserPreferences.Tenses;
    }

    if (this.SelectedTenses.includes("Passé Composé")) {
      this.PasseComposeVerbOptions(false);
    }

    if (this.SelectedTenses.includes("Present")) {
      this.PresentTenseVerbOptions(false);
    }

    if (this.SelectedTenses.includes("Futur")) {
      this.FutureTenseVerbOptions(false);
    }

    this.Save();
  }

  PresentTenseVerbOptions(save: boolean) {

    if (this.SelectedPresentTenseOptions.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Must select one or more present tense verbs.' });
      this.SelectedPresentTenseOptions = this.PresentTenseOptions;

    }

    if (this.SelectedPresentTenseOptions == this.PresentTenseOptions) {
      this.verbsComp.PresentTenseVerbs = this.verbsComp.Verbs;
    } else if (this.SelectedPresentTenseOptions.includes('Regular')) {
      let abridgedVerbList: Array<Verb> = [];

      this.verbsComp.Verbs.forEach((verb) => {
        if (verb.presentVerbTypeId == 1 || verb.presentVerbTypeId == 2 || verb.presentVerbTypeId == 3) {
          abridgedVerbList.push(verb);
        }
      });

      this.verbsComp.PresentTenseVerbs = abridgedVerbList;
    } else if (this.SelectedPresentTenseOptions.includes('Irregular')) {
      let abridgedVerbList: Array<Verb> = [];

      this.verbsComp.Verbs.forEach((verb) => {
        if (verb.presentVerbTypeId != 1 && verb.presentVerbTypeId != 2 && verb.presentVerbTypeId != 3) {
          abridgedVerbList.push(verb);
        }
      });

      this.verbsComp.PresentTenseVerbs = abridgedVerbList;
    }

    if (save)
      this.Save();

  }

  FutureTenseVerbOptions(save: boolean) {
    if (this.SelectedFuturTenseOptions == this.FuturTenseOptions) {
      this.verbsComp.FuturVerbs = this.verbsComp.Verbs;
    } else {
      let abridgedVerbList: Array<Verb> = [];

      if (this.SelectedFuturTenseOptions.includes('Regular')) {
        this.verbsComp.Verbs.forEach((verb) => {
          if (verb.futureVerbTypeId == 8) {
            abridgedVerbList.push(verb);
          }
        });
      } else {
        this.verbsComp.Verbs.forEach((verb) => {
          if (verb.futureVerbTypeId != 8) {
            abridgedVerbList.push(verb);
          }
        });
      }

      this.verbsComp.FuturVerbs = abridgedVerbList;

      if (save)
        this.Save();
    }
  }


  PasseComposeVerbOptions(save: boolean) {


    if (this.SelectedAuxilaryVerbs.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Must select one or more auxiliary verbs.' });

      this.SelectedAuxilaryVerbs = this.AuxilaryVerbs;
    }

    //TODO: Make sure they can't deselect all irregular/regular options


    if (this.SelectedPasseComposeOptions == this.PasseComposeOptions && this.SelectedAuxilaryVerbs == this.AuxilaryVerbs) {
      this.verbsComp.PasseComposeVerbs = this.verbsComp.Verbs;
    } else {
      let abridgedVerbList: Array<Verb> = [];

      if (this.SelectedPasseComposeOptions.includes('Regular')) {
        this.verbsComp.Verbs.forEach((verb) => {
          if (!verb.irregularPastParticiple) {
            if (verb.usesEtre && this.SelectedAuxilaryVerbs.includes("Etre")) {
              abridgedVerbList.push(verb);
            } else if (!verb.usesEtre && this.SelectedAuxilaryVerbs.includes("Avoir")) {
              abridgedVerbList.push(verb);
            }
          }
        });
      }

      if (this.SelectedPasseComposeOptions.includes('Irregular')) {
        this.verbsComp.Verbs.forEach((verb) => {
          if (verb.irregularPastParticiple) {
            if (verb.usesEtre && this.SelectedAuxilaryVerbs.includes("Etre")) {
              abridgedVerbList.push(verb);
            } else if (!verb.usesEtre && this.SelectedAuxilaryVerbs.includes("Avoir")) {
              abridgedVerbList.push(verb);
            }
          }
        });
      }

      this.verbsComp.PasseComposeVerbs = abridgedVerbList;

      if (save)
        this.Save();
    }
  }



}
