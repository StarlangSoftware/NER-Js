import { SentenceAutoNER } from "./SentenceAutoNER";
import { AnnotatedSentence } from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
export declare class TurkishSentenceAutoNER extends SentenceAutoNER {
    /**
     * The method checks the LOCATION gazetteer, and if the word exists in the gazetteer, it assigns the LOCATION tag.
     * @param sentence The sentence for which LOCATION named entities checked.
     */
    autoDetectLocation(sentence: AnnotatedSentence): void;
    /**
     * The method checks for the MONEY entities using regular expressions. After that, if the expression is a MONEY
     * expression, it also assigns the previous text, which may included numbers or some monetarial texts, MONEY tag.
     * @param sentence The sentence for which MONEY named entities checked.
     */
    autoDetectMoney(sentence: AnnotatedSentence): void;
    /**
     * The method assigns the words "corp.", "inc.", and "co" ORGANIZATION tag. The method also checks the
     * ORGANIZATION gazetteer, and if the word exists in the gazetteer, it assigns ORGANIZATION tag.
     * @param sentence The sentence for which ORGANIZATION named entities checked.
     */
    autoDetectOrganization(sentence: AnnotatedSentence): void;
    /**
     * The method assigns the words "bay" and "bayan" PERSON tag. The method also checks the PERSON gazetteer, and if
     * the word exists in the gazetteer, it assigns PERSON tag.
     * @param sentence The sentence for which PERSON named entities checked.
     */
    autoDetectPerson(sentence: AnnotatedSentence): void;
    autoDetectTime(sentence: AnnotatedSentence): void;
}
