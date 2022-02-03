
import { Injectable } from "@angular/core";
import { end } from "@popperjs/core";
import { Verb } from "../Models/Verb";
import { PresentTenseService } from "./PresentTenseService";

@Injectable({
    providedIn: 'root'
})
export class ImparfaitService {
    Hint: string = "";
    Pronoun: string = "";
    NousRoot: string = "";
    VerbEnding: string = "";
    Verb!: Verb;
    NousForm: string = "";

    constructor(private presentTenseService: PresentTenseService) { }

    SortVerbs(Verb: Verb, VerbEnding: string, Pronoun: string, VerbRoot: string) {
        this.Pronoun = Pronoun;
        this.Verb = Verb;
        this.VerbEnding = VerbEnding;

        this.NousForm = this.presentTenseService.SortVerbs(Verb, VerbEnding, "Nous", VerbRoot);
        this.NousRoot = this.NousForm.substring(0, this.NousForm.length - 3);

        

        if (Verb.french == "être") {
            return this.Etre();
        } else if(Verb.presentVerbTypeId == 16){
            return this.StemChangingER();
        }else {
            return this.Regular();
        }

        return "ERROR";
    }


    getHint() {
        return this.Hint;
    }

    Regular() {
        var ending = "";

        if (this.Pronoun == "Je") {
            ending = "ais";
        } else if (this.Pronoun == "Tu") {
            ending = "ais";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            ending = "ait";
        } else if (this.Pronoun == "Nous") {
            ending = "ions";
        } else if (this.Pronoun == "Vous") {
            ending = "iez";
        } else if (this.Pronoun == "Ils" || this.Pronoun == "Elles") {
            ending = "aient";
        }

        this.Hint = "Take the present tense 'Nous' form ("+ this.NousForm +") and remove the -ons. Then add '" + ending + "'."
        
        return this.NousRoot + ending;
    }

    Etre() {
        this.Hint = "Etre is a truly irregular RE verb. Conjugation may start with 'ét-'.";

        if (this.Pronoun == "Je") {
            return "étais";
        } else if (this.Pronoun == "Tu") {
            return "étais";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            return "était";
        } else if (this.Pronoun == "Nous") {
            return "étions";
        } else if (this.Pronoun == "Vous") {
            return "étiez";
        } else {
            return "étaient";
        }
    }

    StemChangingER(){
        var ending = "";
        var smallerRoot = this.NousRoot.substring(0, this.NousRoot.length - 1);


        if (this.Pronoun == "Je") {
            ending = "çais";
        } else if (this.Pronoun == "Tu") {
            ending = "çais";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            ending = "çait";
        } else if (this.Pronoun == "Nous") {
            ending = "cions";
        } else if (this.Pronoun == "Vous") {
            ending = "ciez";
        } else if (this.Pronoun == "Ils" || this.Pronoun == "Elles") {
            ending = "çaient";
        }

        this.Hint = "Take the present tense 'Nous' form ("+ this.NousForm +") and remove the -ons. Then add '" + ending + "'. Note the c changes to ç in every form but vous and nous."
        
        return smallerRoot + ending;
    }

}