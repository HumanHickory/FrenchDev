import { Component, OnInit } from '@angular/core';
import { VerbsComponent } from '../verbs/verbs.component';
import { Verb } from 'src/app/Models/Verb';
import { MessageService } from 'primeng/api';
import { LocalStorageObject } from '../Models/LocalStorageObject';
import { VerbService } from 'src/app/Services/VerbServices';

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

  constructor(
    private verbService: VerbService,
    private verbsComp: VerbsComponent,
    private messageService: MessageService) {
  }



  ngOnInit(): void {
    this.GetUserPreferences();
    this.UpdateVerbComponentSelectedOptions();
    this.CreateVerbList();
    this.verbsComp.GetVerb();
  }

  GetUserPreferences() {
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
    } else {
      this.SelectedVerbTypes = this.VerbTypes;
      this.SelectedTenses = this.Tenses;
      this.ToggleAdditionalTenseOptions();

      this.SelectedAuxilaryVerbs = this.AuxilaryVerbs;
      this.SelectedPresentTenseOptions = this.PresentTenseOptions;
      this.SelectedPronouns = this.Pronouns;
      this.ShowEnglishTranslation = this.ShowEnglishTranslation;
      this.AlwaysShowHint = this.AlwaysShowHint;
      this.ShowHint = true;
    }
  }

  async GetVerbList(): Promise<Array<Verb>> {
    return new Promise((resolve, reject) => {
      this.verbService.getVerbs(this.SelectedVerbTypes.includes('ER'),
        this.SelectedVerbTypes.includes('IR'),
        this.SelectedVerbTypes.includes('RE')).subscribe(verbs => {
          this.verbsComp.Verbs = verbs;
          localStorage.setItem("SavedVerbsList", JSON.stringify(this.verbsComp.Verbs));
          resolve(verbs);
        }, error => {
          reject(error);
        });
    });
  }

  async CreateVerbList() {
    let SavedVerbsListStr: any = localStorage.getItem("SavedVerbsList") == null ? "" : localStorage.getItem("SavedVerbsList");

    if (SavedVerbsListStr != "") {
      this.verbsComp.Verbs = JSON.parse(SavedVerbsListStr);
    } else {
      await this.GetVerbList();
    }

    this.CreateAbridgedVerbLists();
  }

  CreateAbridgedVerbLists() {
    if (this.SelectedTenses.includes("Passé Composé")) {
      this.PasseComposeCreateAbridgedVerbList(false);
    }

    if (this.SelectedTenses.includes("Present")) {
      this.PresentTenseCreateAbridgedVerbList(false);
    }

    if (this.SelectedTenses.includes("Futur")) {
      this.FutureTenseCreateAbridgedVerbList(false);
    }
  }

  async Reset() {
    this.verbsComp.CountCorrect = 0;
    this.UpdateVerbComponentSelectedOptions();
    await this.GetVerbList();
    this.CreateAbridgedVerbLists();
    this.verbsComp.GetVerb();

    this.verbsComp.Display = false;
  }

  Save() {
    this.verbsComp.CountCorrect = 0;
    this.UpdateVerbComponentSelectedOptions();
    this.verbsComp.GetVerb();
  }

  ToggleShowHint() {
    this.verbsComp.ShowHint = this.AlwaysShowHint;
    this.verbsComp.AlwaysShowHint = this.AlwaysShowHint;
  }

  ToggleShowEnglish() {
    this.verbsComp.ShowEnglishTranslation = this.ShowEnglishTranslation;
  }

  UpdateVerbComponentSelectedOptions() {
    this.verbsComp.SelectedAuxilaryVerbs = this.SelectedAuxilaryVerbs;
    this.verbsComp.SelectedPresentTenseOptions = this.SelectedPresentTenseOptions;
    this.verbsComp.SelectedPronouns = this.SelectedPronouns;
    this.verbsComp.SelectedTenses = this.SelectedTenses;
    this.verbsComp.SelectedVerbTypes = this.SelectedVerbTypes;
    this.verbsComp.ShowHint = this.ShowHint;
    this.verbsComp.AlwaysShowHint = this.AlwaysShowHint;
    this.verbsComp.ShowEnglishTranslation = this.ShowEnglishTranslation;

    this.UserPreferences = this.verbsComp.SaveUserPreferences();
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


  PresentTenseCreateAbridgedVerbList(save: boolean) {

    if (this.SelectedPresentTenseOptions.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Must select one or more present tense verbs.' });
      this.SelectedPresentTenseOptions = [];
      this.UserPreferences.PresentVerbs.forEach((option) => {
        this.SelectedPresentTenseOptions.push(option);
      });
    }

    if (this.SelectedPresentTenseOptions.includes('Regular')) {
      let abridgedVerbList: Array<Verb> = [];

      this.verbsComp.Verbs.forEach((verb) => {
        if (verb.presentVerbTypeId == 1 || verb.presentVerbTypeId == 2 || verb.presentVerbTypeId == 3) {
          abridgedVerbList.push(verb);
        }
      });

      this.verbsComp.PresentTenseVerbs = abridgedVerbList;
    }

    if (this.SelectedPresentTenseOptions.includes('Irregular')) {
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

  FutureTenseCreateAbridgedVerbList(save: boolean) {
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

  PasseComposeCreateAbridgedVerbList(save: boolean) {

    if (this.SelectedAuxilaryVerbs.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Must select one or more auxiliary verbs.' });
      this.SelectedAuxilaryVerbs = [];
      this.UserPreferences.AuxVerbs.forEach((option) => {
        this.SelectedAuxilaryVerbs.push(option);
      });
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

  
  SaveTenses() {

    if (this.SelectedTenses.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Must select one or more tenses.' });

      this.SelectedTenses = [];
      this.UserPreferences.Tenses.forEach((option) => {
        this.SelectedTenses.push(option);
      });
    }

    this.ToggleAdditionalTenseOptions();

    if (this.SelectedTenses.includes("Passé Composé")) {
      this.PasseComposeCreateAbridgedVerbList(false);
    }

    if (this.SelectedTenses.includes("Present")) {
      this.PresentTenseCreateAbridgedVerbList(false);
    }

    if (this.SelectedTenses.includes("Futur")) {
      this.FutureTenseCreateAbridgedVerbList(false);
    }

    this.Save();
  }


  SaveVerbEndings(){
    if (this.SelectedVerbTypes.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Must select one or more verb endings.' });
      this.SelectedVerbTypes = [];
      this.UserPreferences.VerbEndings.forEach((option) => {
        this.SelectedVerbTypes.push(option);
      });
    }

    this.Reset();
  }

  SavePronouns(){
    if (this.SelectedPronouns.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Must select one or more pronouns.' });
      this.SelectedPronouns = [];
      this.UserPreferences.Pronouns.forEach((option) => {
        this.SelectedPronouns.push(option);
      });
    }

    this.Save();
  }



}
