
import { Injectable } from "@angular/core";
import { end } from "@popperjs/core";
import { Verb } from "../Models/Verb";

@Injectable({
    providedIn: 'root'
})
export class FuturService {
    IrregularStem = [""]
    Hint: string = "";
    Pronoun: string = "";
    VerbRoot: string = "";
    VerbEnding: string = "";
    Verb!: Verb;

    constructor() { }

    SortVerbs(Verb: Verb, VerbEnding: string, Pronoun: string, VerbRoot: string) {
        this.Pronoun = Pronoun;
        this.VerbRoot = VerbRoot;
        this.VerbEnding = VerbEnding;
        this.Verb = Verb;

        console.log(Verb);

        if (Verb.futureVerbTypeId == 7) {
            this.TrueIrregulars();
            return this.VerbRoot + this.BaseRule();       
        } else {
            return this.RegularVerbs(this.BaseRule());
        }

        return "ERROR";
    }


    getHint() {
        return this.Hint;
    }

    BaseRule(){
        var ending = "";
        if (this.Pronoun == "Je") {
            ending = "ai";
        } else if (this.Pronoun == "Tu") {
            ending = "as";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            ending = "a";
        } else if (this.Pronoun == "Nous") {
            ending = "ons";
        } else if (this.Pronoun == "Vous") {
            ending = "ez";
        } else if (this.Pronoun == "Ils" || this.Pronoun == "Elles") {
            ending = "ont";
        }

        return ending;
    }

    RegularVerbs(ending: string){
        if (this.VerbEnding == "er" || this.VerbEnding == "ir") {
            this.Hint = "Take the infinitive verb and add '" + ending + "'.";
            return this.Verb.french + ending;

        } else {
            this.Hint = "Take the infinitive verb, drop the 'e', and add '" + ending + "'.";
            return this.Verb.french.substring(0, this.Verb.french.length - 1) + ending;
        }
    }


    TrueIrregulars() {
        if (this.Verb.french == "aller") {
            this.VerbRoot = "ir";
        } else if (this.Verb.french == "avoir") {
            this.VerbRoot = "aur";
        } else if (this.Verb.french == "devoir") {
            this.VerbRoot = "devr";
        } else if (this.Verb.french == "envoyer") {
            this.VerbRoot = "enverr";
        } else if (this.Verb.french == "être") {
            this.VerbRoot = "ser";
        } else if (this.Verb.french == "faire") {
            this.VerbRoot = "fer";
        } else if (this.Verb.french == "falloir") {
            this.VerbRoot = "faudr";
        } else if (this.Verb.french == "pleuvoir") {
            this.VerbRoot = "pleuvr";
        } else if (this.Verb.french == "pouvoir") {
            this.VerbRoot = "pourr";
        } else if (this.Verb.french == "savoir") {
            this.VerbRoot = "saur";
        } else if (this.Verb.french == "valoir") {
            this.VerbRoot = "vaudr";
        } else if (this.Verb.french == "vouloir") {
            this.VerbRoot = "voudr";
        } else if (this.Verb.french == "acquérir") {
            this.VerbRoot = "acquerr";
        } else if (this.Verb.french == "conquérir") {
            this.VerbRoot = "conquerr";
        } else if (this.Verb.french == "courir") {
            this.VerbRoot = "courr";
        } else if (this.Verb.french == "concourir") {
            this.VerbRoot = "concourr";
        } else if (this.Verb.french == "discourir") {
            this.VerbRoot = "discourr";
        } else if (this.Verb.french == "parcourir") {
            this.VerbRoot = "parcourr";
        } else if (this.Verb.french == "renvoyer") {
            this.VerbRoot = "renverr";
        } else if (this.Verb.french == "venir") {
            this.VerbRoot = "viendr";
        } else if (this.Verb.french == "devenir") {
            this.VerbRoot = "deviendr";
        } else if (this.Verb.french == "tenir") {
            this.VerbRoot = "tiendr";        
        } else if (this.Verb.french == "revenir") {
            this.VerbRoot = "reviendr";
        } else if (this.Verb.french == "obtenir") {
            this.VerbRoot = "obtiendr";
        } else if (this.Verb.french == "voir") {
            this.VerbRoot = "verr";
        } else if (this.Verb.french == "revoir") {
            this.VerbRoot = "reverr";
        }

        this.Hint = "This is an irregular verb. The root changes to '" + this.VerbRoot + "'.";

    }



}