export interface Verb{
    id: number;
    french: string;
    english: string;
    pastParticiple: string;
    isIrregular: boolean;
    usesEtre: boolean;
    presentVerbTypeId: number;
    futureVerbTypeId: number;
}     