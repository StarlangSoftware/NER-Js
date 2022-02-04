(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SentenceAutoNER", "nlptoolkit-dictionary/dist/Dictionary/Word", "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalTag"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TurkishSentenceAutoNER = void 0;
    const SentenceAutoNER_1 = require("./SentenceAutoNER");
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    const MorphologicalTag_1 = require("nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalTag");
    class TurkishSentenceAutoNER extends SentenceAutoNER_1.SentenceAutoNER {
        /**
         * The method checks the LOCATION gazetteer, and if the word exists in the gazetteer, it assigns the LOCATION tag.
         * @param sentence The sentence for which LOCATION named entities checked.
         */
        autoDetectLocation(sentence) {
            for (let i = 0; i < sentence.wordCount(); i++) {
                let word = sentence.getWord(i);
                if (word.getNamedEntityType() == null && word.getParse() != null) {
                    word.checkGazetteer(this.locationGazetteer);
                }
            }
        }
        /**
         * The method checks for the MONEY entities using regular expressions. After that, if the expression is a MONEY
         * expression, it also assigns the previous text, which may included numbers or some monetarial texts, MONEY tag.
         * @param sentence The sentence for which MONEY named entities checked.
         */
        autoDetectMoney(sentence) {
            for (let i = 0; i < sentence.wordCount(); i++) {
                let word = sentence.getWord(i);
                let wordLowercase = word.getName().toLocaleLowerCase("tr");
                if (word.getNamedEntityType() == null && word.getParse() != null) {
                    if (Word_1.Word.isMoney(wordLowercase)) {
                        word.setNamedEntityType("MONEY");
                        let j = i - 1;
                        while (j >= 0) {
                            let previous = sentence.getWord(j);
                            if (previous.getParse() != null && (previous.getName() == "amerikan" || previous.getParse().containsTag(MorphologicalTag_1.MorphologicalTag.REAL) || previous.getParse().containsTag(MorphologicalTag_1.MorphologicalTag.CARDINAL) || previous.getParse().containsTag(MorphologicalTag_1.MorphologicalTag.NUMBER))) {
                                previous.setNamedEntityType("MONEY");
                            }
                            else {
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
        autoDetectOrganization(sentence) {
            for (let i = 0; i < sentence.wordCount(); i++) {
                let word = sentence.getWord(i);
                if (word.getNamedEntityType() == null && word.getParse() != null) {
                    if (Word_1.Word.isOrganization(word.getName())) {
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
        autoDetectPerson(sentence) {
            for (let i = 0; i < sentence.wordCount(); i++) {
                let word = sentence.getWord(i);
                if (word.getNamedEntityType() == null && word.getParse() != null) {
                    if (Word_1.Word.isHonorific(word.getName())) {
                        word.setNamedEntityType("PERSON");
                    }
                    word.checkGazetteer(this.personGazetteer);
                }
            }
        }
        autoDetectTime(sentence) {
        }
    }
    exports.TurkishSentenceAutoNER = TurkishSentenceAutoNER;
});
//# sourceMappingURL=TurkishSentenceAutoNER.js.map