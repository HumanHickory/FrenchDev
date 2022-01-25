

import { Injectable } from "@angular/core";
import { end } from "@popperjs/core";
import { Verb } from "../Models/Verb";

@Injectable({
    providedIn: 'root'
})
export class PresentTenseService {
    Hint: string = "";
    Pronoun: string = "";
    VerbRoot: string = "";
    Verb!: Verb;

    constructor() { }

    SortVerbs(Verb: Verb, VerbEnding: string, Pronoun: string, VerbRoot: string) {
        this.Pronoun = Pronoun;
        this.VerbRoot = VerbRoot;
        this.Verb = Verb;

        console.log(Verb);

        if (VerbEnding == "ir") {
            let verbLast4 = Verb.french.slice(-4);

            if (Verb.presentVerbTypeId == 12) {
                return this.VerbsLikePartir();
            } else if (verbLast4 == "llir" || verbLast4 == "frir" || verbLast4 == "vrir") {
                return this.RegularER()
            } else if (Verb.presentVerbTypeId == 14) {
                return this.VerbsLikeVenir();
            } else if (Verb.french == "pouvoir" || Verb.french == "vouloir") {
                return this.PouvoirVouloir();
            } else if (Verb.french == "devoir" || Verb.french == "voir") {
                return this.DevoirVoir();
            } else if (Verb.french == "savoir") {
                return this.Savoir();
            } else {
                return this.RegularIR();
            }
        } else if (VerbEnding == "er") {
            if (Verb.french == "aller") {
                return this.Aller();
            } else {
                return this.RegularER();
            }
        } else {
            if (Verb.french == "être") {
                return this.Etre();
            } else if (Verb.french == "faire") {
                return this.Faire();
            } else if (Verb.presentVerbTypeId == 8) {
                return this.VerbsLikeMettre();
            } else if (Verb.presentVerbTypeId == 5) {
                return this.VerbsLikeLire();
            } else if (Verb.presentVerbTypeId == 9) {
                return this.VerbsLikePrendre();
            } else if (Verb.french == "suivre" || Verb.french == "poursuivre") {
                return this.SuivrePoursuivre();
            } else if (Verb.presentVerbTypeId == 10) {
                return this.VerbsLikeConnaitre();
            }
            return this.RegularRE();
        }

        return "ERROR";
    }

    getHint() {
        return this.Hint;
    }



    //IR VERBS
    RegularIR() {
        var ending = "";

        if (this.Pronoun == "Je" || this.Pronoun == "Tu") {
            ending = "is";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            ending = "it";
        } else if (this.Pronoun == "Nous") {
            ending = "issons";
        } else if (this.Pronoun == "Vous") {
            ending = "issez";
        } else if (this.Pronoun == "Ils" || this.Pronoun == "Elles") {
            ending = "issent";
        }
        this.Hint = "Regular '" + this.Pronoun + "' -ir verbs take the root and add '" + ending + "'.";

        return this.VerbRoot + ending;
    }

    VerbsLikePartir() {
        var smallerRoot = this.VerbRoot.substring(0, this.VerbRoot.length - 1)
        this.Hint = "Verbs like this drop the final letter of the stem in the singular form and add an 's' or 't'. Plural forms end regularly.";

        var ending = "";
        if (this.Pronoun == "Je" || this.Pronoun == "Tu") {
            return smallerRoot + "s";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            return smallerRoot + "t";
        } else if (this.Pronoun == "Nous") {
            ending = "ons";
        } else if (this.Pronoun == "Vous") {
            ending = "ez";
        } else if (this.Pronoun == "Ils" || this.Pronoun == "Elles") {
            ending = "ent";
        }

        return this.VerbRoot + ending;
    }

    VerbsLikeVenir() {
        var smallerRoot = this.VerbRoot.substring(0, this.VerbRoot.length - 2);
        this.Hint = "Verbs like this typically end in 'iens', 'ient', 'enons', 'enez' or 'iennent'.";
        var ending = "";
        if (this.Pronoun == "Je" || this.Pronoun == "Tu") {
            ending = "iens";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            ending = "ient";
        } else if (this.Pronoun == "Nous") {
            ending = "enons";
        } else if (this.Pronoun == "Vous") {
            ending = "enez";
        } else if (this.Pronoun == "Ils" || this.Pronoun == "Elles") {
            ending = "iennent";
        }

        this.Hint = "Irregular verbs that end in 'enir' change a bit. For '" + this.Pronoun + "', verbs take the abbreviated root (" + smallerRoot + ") and add " + ending + ".";

        return smallerRoot + ending;
    }

    DevoirVoir() {
        var firstLetter = this.VerbRoot.substring(0, 1);
        var middleLetter = this.VerbRoot == "devo" ? "ev" : "oy";

        var ending = "";

        if (this.Pronoun == "Je" || this.Pronoun == "Tu") {
            ending = "ois";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            ending = "oit";
        } else if (this.Pronoun == "Nous") {
            ending = middleLetter + "ons";
        } else if (this.Pronoun == "Vous") {
            ending = middleLetter + "ez";
        } else {
            if (firstLetter == "v") {
                ending = "oient";
            } else {
                ending = "oivent";
            }
        }

        this.Hint = "An irregular -ir verb, this verb will take the first letter and add the ending '" + ending + "' for the '" + this.Pronoun + "' pronoun conjugation.";
        return firstLetter + ending;
    }

    Savoir() {
        this.Hint = "Savoir is a truly irregular -ir verb.";

        if (this.Pronoun == "Je") {
            return "sais";
        } else if (this.Pronoun == "Tu") {
            return "sais";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            return "sait";
        } else if (this.Pronoun == "Nous") {
            return "savons";
        } else if (this.Pronoun == "Vous") {
            return "savez";
        } else {
            return "savent";
        }
    }

    PouvoirVouloir() {
        this.Hint = "Verbs like Pouvoir and Vouloir are irregular. Conjugations may end in 'eux' or something similar.";
        var firstLetter = this.VerbRoot.substring(0, 1);
        var middleLetter = this.VerbRoot == "pouvo" ? "v" : "l";

        var ending = "";

        if (this.Pronoun == "Je" || this.Pronoun == "Tu") {
            ending = "eux";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            ending = "eut";
        } else if (this.Pronoun == "Nous") {
            ending = "ou" + middleLetter + "ons";
        } else if (this.Pronoun == "Vous") {
            ending = "ou" + middleLetter + "ez";
        } else {
            ending = "eu" + middleLetter + "ent";
        }

        return firstLetter + ending;
    }





    /*ER VERBS */
    RegularER() {
        var ending = "";

        if (this.Pronoun == "Je" || this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            ending = "e";
        } else if (this.Pronoun == "Tu") {
            ending = "es";
        } else if (this.Pronoun == "Nous") {
            ending = "ons";
        } else if (this.Pronoun == "Vous") {
            ending = "ez";
        } else if (this.Pronoun == "Ils" || this.Pronoun == "Elles") {
            ending = "ent";
        }
        this.Hint = "Regular '" + this.Pronoun + "' -er verbs take the root and add '" + ending + "'.";

        return this.VerbRoot + ending;
    }

    Aller() {
        this.Hint = "Aller is a truly irregular ER verb. Conjugation may begin with 'v' or 'all'.";

        if (this.Pronoun == "Je") {
            return "vais";
        } else if (this.Pronoun == "Tu") {
            return "vas";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            return "va";
        } else if (this.Pronoun == "Nous") {
            return "allons";
        } else if (this.Pronoun == "Vous") {
            return "allez";
        } else {
            return "vont";
        }
    }






    /*RE VERBS */
    RegularRE() {
        var ending = "";

        if (this.Pronoun == "Je" || this.Pronoun == "Tu") {
            ending = "s";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            ending = "";
        } else if (this.Pronoun == "Nous") {
            ending = "ons";
        } else if (this.Pronoun == "Vous") {
            ending = "ez";
        } else if (this.Pronoun == "Ils" || this.Pronoun == "Elles") {
            ending = "ent";
        }

        this.Hint = "Regular '" + this.Pronoun + "' -re verbs take the root and add '" + ending + "'.";

        return this.VerbRoot + ending;
    }

    Etre() {
        this.Hint = "Etre is a truly irregular RE verb. Conjugation may begin with 'e' or 'so'.";

        if (this.Pronoun == "Je") {
            return "suis";
        } else if (this.Pronoun == "Tu") {
            return "es";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            return "est";
        } else if (this.Pronoun == "Nous") {
            return "sommes";
        } else if (this.Pronoun == "Vous") {
            return "êtes";
        } else {
            return "sont";
        }
    }

    Faire() {
        this.Hint = "Faire is a truly irregular RE verb that usually ends in 'ais', 'ait', 'aisons', 'aites' or 'ont'";

        if (this.Pronoun == "Je") {
            return "fais";
        } else if (this.Pronoun == "Tu") {
            return "fais";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            return "fait";
        } else if (this.Pronoun == "Nous") {
            return "faisons";
        } else if (this.Pronoun == "Vous") {
            return "faites";
        } else {
            return "font";
        }
    }

    VerbsLikeMettre() {
        var smallerRoot = this.VerbRoot.substring(0, this.VerbRoot.length - 1)
        this.Hint = "Verbs like this drop the duplicate 't' of the stem in the singular form and add an 's' or nothing. Plural forms end regularly.";

        var ending = "";
        if (this.Pronoun == "Je" || this.Pronoun == "Tu") {
            return smallerRoot + "s";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            return smallerRoot;
        } else if (this.Pronoun == "Nous") {
            ending = "ons";
        } else if (this.Pronoun == "Vous") {
            ending = "ez";
        } else if (this.Pronoun == "Ils" || this.Pronoun == "Elles") {
            ending = "ent";
        }

        return this.VerbRoot + ending;
    }

    VerbsLikeLire() {
        var ending = "";
        this.Hint = "For irregular verbs like this one, conjugate singlar with 's' or 't', and add an extra 's' to the root of verb.";

        if (this.Pronoun == "Je" || this.Pronoun == "Tu") {
            ending = "s";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            ending = "t";
        } else if (this.Pronoun == "Nous") {
            ending = "sons";
        } else if (this.Pronoun == "Vous") {
            if (this.Verb.french == "dire" || this.Verb.french == "redire") {
                ending = "tes";
                this.Hint = "For irregular verbs like this one, you would normally add 'sez' to the end (i.e. vous lisez). But for 'Dire' and 'Redire' you add 'tes' instead (i.e. vous dites)";
            } else {
                ending = "sez";
            }
        } else if (this.Pronoun == "Ils" || this.Pronoun == "Elles") {
            ending = "sent";
        }

        return this.VerbRoot + ending;
    }

    VerbsLikePrendre() {
        var smallerRoot = this.VerbRoot.substring(0, this.VerbRoot.length - 1);
        this.Hint = "Conjugated in the present tense by dropping the d in all the plural forms and doubling the n in the third person plural, then adding the regular -re endings.";

        var ending = "";
        if (this.Pronoun == "Je" || this.Pronoun == "Tu") {
            return this.VerbRoot + "s";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            return this.VerbRoot;
        } else if (this.Pronoun == "Nous") {
            ending = "ons";
        } else if (this.Pronoun == "Vous") {
            ending = "ez";
        } else if (this.Pronoun == "Ils" || this.Pronoun == "Elles") {
            ending = "nent";
        }

        return smallerRoot + ending;
    }

    SuivrePoursuivre() {
        var ending = "";
        this.Hint = "Suivre and Poursuivre are irregular RE verbs that typically start with 'sui-' or 'poursui-'";

        if (this.Pronoun == "Je" || this.Pronoun == "Tu") {
            ending = "suis";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            ending = "suit";
        } else if (this.Pronoun == "Nous") {
            ending = "suivons";
        } else if (this.Pronoun == "Vous") {
            ending = "suivez";
        } else if (this.Pronoun == "Ils" || this.Pronoun == "Elles") {
            ending = "suivent";
        }

        if (this.Verb.french == "poursuivre") {
            return "pour" + ending;
        }
        return ending;
    }

    VerbsLikeConnaitre() {
        var ending = "";
        var smallerRoot = this.VerbRoot.substring(0, this.VerbRoot.length - 2);

        if (this.Pronoun == "Je" || this.Pronoun == "Tu") {
            ending = "s";
        } else if (this.Pronoun == "On" || this.Pronoun == "Elle" || this.Pronoun == "Il") {
            ending = "ît";
        } else if (this.Pronoun == "Nous") {
            ending = "ssons";
        } else if (this.Pronoun == "Vous") {
            ending = "ssez";
        } else if (this.Pronoun == "Ils" || this.Pronoun == "Elles") {
            ending = "ssent";
        }

        this.Hint = "Irregular Ir Verbs like this will drop the last 4 letters 'ître' and use irregular endings. In this case, '" + ending + "'.";

        return smallerRoot + ending;
    }

}