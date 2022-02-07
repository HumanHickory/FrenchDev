import { Component } from '@angular/core';
import { Verb } from 'src/app/Models/Verb';
import { FuturService } from 'src/app/Services/FuturService';
import { ImparfaitService } from 'src/app/Services/ImparfaitService';
import { PresentTenseService } from 'src/app/Services/PresentTenseService';
import { PasseComposeService } from 'src/app/Services/PasseComposeService';
import { ErrorService } from '../Services/ErrorService';
import { ErrorModel } from '../Models/ErrorModel';
import { LocalStorageObject } from '../Models/LocalStorageObject';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-verbs',
    templateUrl: './verbs.component.html',
    styleUrls: ['./verbs.component.css'],
    providers: [MessageService]
})
export class VerbsComponent {

    title = 'French Verb Drills';
    SelectedVerbTypes: string[] = ["ER", "IR", "RE"];
    SelectedPronouns: string[] = ["Je", "Tu", "On", "Il", "Elle", "Nous", "Vous", "Ils", "Elles"];
    SelectedTenses: string[] = ["Present", "Futur", "Imparfait", "Passé Composé"];
    SelectedAuxilaryVerbs: string[] = ["Avoir", "Etre"];
    SelectedPresentTenseOptions: string[] = ["Regular", "Irregular"];
    SelectedPasseComposeOptions: string[] = ["Regular", "Irregular"];
    SelectedFuturTenseOptions: string[] = ["Regular", "Irregular"];
    SelectedImparfaitOptions: string[] = ["Regular", "Irregular"];
    Verbs: Array<Verb> = [];
    Verb!: Verb;
    Tense: string = "";
    Pronoun: string = "";
    UsersAnswer: string = "";
    CorrectAnswers: string[] = [];
    VerbEnding: string = "";
    VerbRoot: string = "";
    CountCorrect: number = 0;
    Correct: string = "textSuccess";
    Hint: string = "";
    ErrorDescription: string = "";

    PasseComposeVerbs: Array<Verb> = [];
    PresentTenseVerbs: Array<Verb> = [];
    ImparfaitVerbs: Array<Verb> = [];
    FuturVerbs: Array<Verb> = [];

    Display = false;
    DisplayError = false;

    ShowHint: boolean = false;
    AlwaysShowHint: boolean = false;
    ShowAnswer: boolean = false;
    ShowEnglishTranslation: boolean = true;

    constructor(
        private presentTenseService: PresentTenseService,
        private futurService: FuturService,
        private imparfaitService: ImparfaitService,
        private passeComposeService: PasseComposeService,
        private errorService: ErrorService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.Correct = "textSuccess";
    }



    GetVerb() {
        this.ShowAnswer = false;

        if (!this.AlwaysShowHint)
            this.ShowHint = false;
        this.Tense = this.GetRandomTense();
        
        var newVerb= this.GetRandomVerb();
        if(newVerb == this.Verb){
            this.Verb = this.GetRandomVerb(); 
        } else {
            this.Verb = newVerb;
        }

        this.Pronoun = this.RandomPronoun();
        this.GetVerbRootAndEnding();
        this.CorrectAnswers = this.GetAnswer();

        document.getElementById("userAnswer")?.focus();
    }

    CheckAnswer() {
        var lowerCaseAnswers: string[] = [];
        var isSame: boolean = false;
        this.CorrectAnswers.forEach((value) => {
            var compared = this.CompareAnswers(value.toLowerCase(), this.UsersAnswer.toLowerCase().trim());
            if (compared) isSame = true;
        });


        if (isSame) {
            this.Correct = "textSuccess";
            this.CountCorrect += 1;
            this.UsersAnswer = "";
            this.GetVerb();
        } else {
            this.Correct = "textDanger";
            this.CountCorrect = 0;
        }
    }

    GetRandomVerb() {
        if (this.Tense == "Passé Composé") {
             return this.PasseComposeVerbs[Math.floor(Math.random() * this.PasseComposeVerbs.length)];
        } else if (this.Tense == "Present") {
            return this.PresentTenseVerbs[Math.floor(Math.random() * this.PresentTenseVerbs.length)];
        } else if (this.Tense == "Futur") {
            return this.FuturVerbs[Math.floor(Math.random() * this.FuturVerbs.length)];
        } else if (this.Tense == "Imparfait") {
            return this.ImparfaitVerbs[Math.floor(Math.random() * this.ImparfaitVerbs.length)];
        }

        return this.Verbs[Math.floor(Math.random() * this.Verbs.length)];
    }


    RandomPronoun() {
        return this.SelectedPronouns[Math.floor(Math.random() * this.SelectedPronouns.length)];
    }

    GetRandomTense() {
        return this.SelectedTenses[Math.floor(Math.random() * this.SelectedTenses.length)];
    }

    GetVerbRootAndEnding() {
        this.VerbRoot = this.Verb.french.substring(0, this.Verb.french.length - 2);
        this.VerbEnding = this.Verb.french.slice(-2);
    }

    GetAnswer(): string[] {
        var answers: string[] = [];
        var ending = "";
        var answer = "";
        this.Hint = "";
        if (this.Tense == "Present") {

            let answer = this.presentTenseService.SortVerbs(this.Verb, this.VerbEnding, this.Pronoun, this.VerbRoot);
            this.Hint = this.presentTenseService.getHint();
            answers.push(answer);

        } //End Present

        if (this.Tense == "Imparfait") {
            let answer = this.imparfaitService.SortVerbs(this.Verb, this.VerbEnding, this.Pronoun, this.VerbRoot);
            this.Hint = this.imparfaitService.getHint();
            answers.push(answer);

        } //End Imperfect

        if (this.Tense == "Futur") {
            let answer = this.futurService.SortVerbs(this.Verb, this.VerbEnding, this.Pronoun, this.VerbRoot);
            this.Hint = this.futurService.getHint();
            answers.push(answer);
        } //End Future

        if (this.Tense == "Passé Composé") {
            answers = this.passeComposeService.SortVerbs(this.Verb, this.VerbEnding, this.Pronoun, this.VerbRoot);
            this.Hint = this.passeComposeService.getHint();
        } //end Passe Compose

        return answers;
    }


    eventHandler(keyCode: any) {
        if (keyCode == 13) {
            this.CheckAnswer();
        }
    }

    SaveUserPreferences() {
        let FrenchVerbDrills: LocalStorageObject;
        FrenchVerbDrills = {
            VerbEndings: this.SelectedVerbTypes,
            Tenses: this.SelectedTenses,
            AuxVerbs: this.SelectedAuxilaryVerbs,
            PresentVerbs: this.SelectedPresentTenseOptions,
            PasseComposeVerbs: this.SelectedPasseComposeOptions,
            ImparfaitVerbs: this.SelectedImparfaitOptions,
            FutureVerbs: this.SelectedFuturTenseOptions,
            Pronouns: this.SelectedPronouns,
            AlwaysShowHint: this.AlwaysShowHint,
            EnglishTrans: this.ShowEnglishTranslation
        }
        localStorage.setItem("FrenchVerbDrills", JSON.stringify(FrenchVerbDrills));

        return FrenchVerbDrills;
    }

    CompareAnswers = (firstWord: string, secondWord: string) => {
        var finalString = "";

        if (firstWord == secondWord) return true;
        if (firstWord.length != secondWord.length) return false; //if they're not the same length, the answer is wrong anyway

        for (var i = 0; i < firstWord.length; i++) {
            var letter1 = firstWord[i];
            var letter2 = secondWord[i];

            if (letter1 == letter2) {
                finalString += letter1;
            } else {
                if (letter1 == "é" || letter1 == "é" || letter1 == "ê" || letter1 == "è") {
                    if (letter2 == "e") finalString += letter1
                } else if (letter1 == "â" || letter1 == "à") {
                    if (letter2 == "a") finalString += letter1
                } else if (letter1 == "î" || letter1 == "ì" || letter1 == "ï") {
                    if (letter2 == "i") finalString += letter1
                } else if (letter1 == "ô" || letter1 == "ò") {
                    if (letter2 == "o") finalString += letter1
                } else if (letter1 == "û" || letter1 == "ù" || letter1 == "ü") {
                    if (letter2 == "u") finalString += letter1
                } else if (letter1 == "ç") {
                    if (letter2 == "c") finalString += letter1
                }
            }
        }

        return (finalString == firstWord);
    }

    SubmitError() {
        var newError: ErrorModel = {
            verb: this.Verb.french,
            pronoun: this.Pronoun,
            tense: this.Tense,
            description: this.ErrorDescription,
            id: 0
        };

        this.errorService.test(newError).subscribe(result => {
            if (result) {
                this.messageService.add({ severity: 'success', summary: 'Recorded', detail: 'Thank you for your help! Your error has been recorded' });
            } else {
                this.messageService.add({ severity: 'warning', summary: 'Failed To Record', detail: 'There has been an error recording your error.' });
            }

            this.ErrorDescription = "";
            this.DisplayError = false;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not record error at this time.' });
        });



    }


}
