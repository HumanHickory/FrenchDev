export interface Verb{
    id: number;
    french: string;
    english: string;
    pastParticiple: string;
    irregularPastParticiple: boolean;
    usesEtre: boolean;
    presentVerbTypeId: number;
    futureVerbTypeId: number;
}     