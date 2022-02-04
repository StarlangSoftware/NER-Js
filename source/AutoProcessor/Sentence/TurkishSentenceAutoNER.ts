import {SentenceAutoNER} from "./SentenceAutoNER";
import {AnnotatedSentence} from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import {AnnotatedWord} from "nlptoolkit-annotatedsentence/dist/AnnotatedWord";
import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";
import {MorphologicalTag} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalTag";

export class TurkishSentenceAutoNER extends SentenceAutoNER{

    /**
     * The method checks the LOCATION gazetteer, and if the word exists in the gazetteer, it assigns the LOCATION tag.
     * @param sentence The sentence for which LOCATION named entities checked.
     */
    autoDetectLocation(sentence: AnnotatedSentence): void {
        for (let i = 0; i < sentence.wordCount(); i++){
            let word = <AnnotatedWord> sentence.getWord(i);
            if (word.getNamedEntityType() == null && word.getParse() != null){
                word.checkGazetteer(this.locationGazetteer);
            }
        }
    }

    /**
     * The method checks for the MONEY entities using regular expressions. After that, if the expression is a MONEY
     * expression, it also assigns the previous text, which may included numbers or some monetarial texts, MONEY tag.
     * @param sentence The sentence for which MONEY named entities checked.
     */
    autoDetectMoney(sentence: AnnotatedSentence): void {
        for (let i = 0; i < sentence.wordCount(); i++){
            let word = <AnnotatedWord> sentence.getWord(i);
            let wordLowercase = word.getName().toLocaleLowerCase("tr");
            if (word.getNamedEntityType() == null && word.getParse() != null){
                if (Word.isMoney(wordLowercase)) {
                    word.setNamedEntityType("MONEY");
                    let j = i - 1;
                    while (j >= 0){
                        let previous = <AnnotatedWord> sentence.getWord(j);
                        if (previous.getParse() != null && (previous.getName() == "amerikan" || previous.getParse().containsTag(MorphologicalTag.REAL) || previous.getParse().containsTag(MorphologicalTag.CARDINAL) || previous.getParse().containsTag(MorphologicalTag.NUMBER))){
                            previous.setNamedEntityType("MONEY");
                        } else {
                            break;
                        }
                        j--;
                    }
                }
            }
        }
    }

    /**
     * The method assigns the words "corp.", "inc.", and "co" ORGANIZATION tag. The method also checks the
     * ORGANIZATION gazetteer, and if the word exists in the gazetteer, it assigns ORGANIZATION tag.
     * @param sentence The sentence for which ORGANIZATION named entities checked.
     */
    autoDetectOrganization(sentence: AnnotatedSentence): void {
        for (let i = 0; i < sentence.wordCount(); i++){
            let word = <AnnotatedWord> sentence.getWord(i);
            if (word.getNamedEntityType() == null && word.getParse() != null){
                if (Word.isOrganization(word.getName())){
                    word.setNamedEntityType("ORGANIZATION");
                }
                word.checkGazetteer(this.organizationGazetteer);
            }
        }
    }

    /**
     * The method assigns the words "bay" and "bayan" PERSON tag. The method also checks the PERSON gazetteer, and if
     * the word exists in the gazetteer, it assigns PERSON tag.
     * @param sentence The sentence for which PERSON named entities checked.
     */
    autoDetectPerson(sentence: AnnotatedSentence): void {
        for (let i = 0; i < sentence.wordCount(); i++){
            let word = <AnnotatedWord> sentence.getWord(i);
            if (word.getNamedEntityType() == null && word.getParse() != null){
                if (Word.isHonorific(word.getName())){
                    word.setNamedEntityType("PERSON");
                }
                word.checkGazetteer(this.personGazetteer);
            }
        }
    }

    autoDetectTime(sentence: AnnotatedSentence): void {
    }
    
}