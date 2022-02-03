

import { Injectable } from "@angular/core";
import { Verb } from "../Models/Verb";

@Injectable({
    providedIn: 'root'
})
export class PasseComposeService {
    Hint: string = "";
    Pronoun: string = "";
    VerbRoot: string = "";
    Verb!: Verb;

    constructor() { }

    SortVerbs(Verb: Verb, VerbEnding: string, Pronoun: string, VerbRoot: string) {
        this.Pronoun = Pronoun;
        this.VerbRoot = VerbRoot;
        this.Verb = Verb;
        var answers: string[] = [];

        let auxVerb = "";
          if (this.Verb.usesEtre) {
              if (this.Pronoun == "Je") {
                  auxVerb = "Suis";

                  answers.push(auxVerb + " " + this.Verb.pastParticiple);
                  answers.push(auxVerb + " " + this.Verb.pastParticiple + "e");
              } else if (this.Pronoun == "Tu") {
                  auxVerb = "Es";

                  answers.push(auxVerb + " " + this.Verb.pastParticiple);
                  answers.push(auxVerb + " " + this.Verb.pastParticiple + "e");
              } else if (this.Pronoun == "Il") {
                  auxVerb = "Est";

                  answers.push(auxVerb + " " + this.Verb.pastParticiple);
              } else if (this.Pronoun == "On") {
                  auxVerb = "Est";

                  answers.push(auxVerb + " " + this.Verb.pastParticiple);
                  answers.push(auxVerb + " " + this.Verb.pastParticiple + "s");
                  answers.push(auxVerb + " " + this.Verb.pastParticiple + "e");
                  answers.push(auxVerb + " " + this.Verb.pastParticiple + "es");
              } else if (this.Pronoun == "Elle") {
                  auxVerb = "Est";

                  answers.push(auxVerb + " " + this.Verb.pastParticiple + "e");
              } else if (this.Pronoun == "Nous") {
                  auxVerb = "Sommes";

                  answers.push(auxVerb + " " + this.Verb.pastParticiple + "s");
                  answers.push(auxVerb + " " + this.Verb.pastParticiple + "es");
              } else if (this.Pronoun == "Vous") {
                  auxVerb = "Etes";

                  answers.push(auxVerb + " " + this.Verb.pastParticiple);
                  answers.push(auxVerb + " " + this.Verb.pastParticiple + "e");
                  answers.push(auxVerb + " " + this.Verb.pastParticiple + "s");
                  answers.push(auxVerb + " " + this.Verb.pastParticiple + "es");
              } else if (this.Pronoun == "Ils") {
                  auxVerb = "Sont";

                  answers.push(auxVerb + " " + this.Verb.pastParticiple + "s");
              } else if (this.Pronoun == "Elles") {
                  auxVerb = "Sont";

                  answers.push(auxVerb + " " + this.Verb.pastParticiple + "es");
              }
              this.Hint = "This verb uses 'Etre' .The base past participle for this verb is '" + this.Verb.pastParticiple + "', but the ending of the past participle changes with gender and number.";

          } else {
              if (this.Pronoun == "Je") {
                  auxVerb = "Ai";
              } else if (this.Pronoun == "Tu") {
                  auxVerb = "As";
              } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
                  auxVerb = "A";
              } else if (this.Pronoun == "Nous") {
                  auxVerb = "Avons";
              } else if (this.Pronoun == "Vous") {
                  auxVerb = "Avez";
              } else if (this.Pronoun == "Ils" || this.Pronoun == "Elles") {
                  auxVerb = "ont";
              }
              this.Hint = "This verb uses 'Avoir'. The past participle for this verb is '" + this.Verb.pastParticiple + "'.";
              answers.push(auxVerb + " " + this.Verb.pastParticiple);

          }
        return answers;
    }

    getHint() {
        return this.Hint;
    }

}