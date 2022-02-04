(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-namedentityrecognition/dist/AutoNER"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SentenceAutoNER = void 0;
    const AutoNER_1 = require("nlptoolkit-namedentityrecognition/dist/AutoNER");
    /**
     * Abstract class to detect named entities in a sentence automatically. By implementing 5 abstract methods,
     * the class can detect (i) Person, (ii) Location, (iii) Organization, (iv) Money, (v) Time.
     * Each method tries to detect those named entities and if successful, sets the correct named entity for the word.
     * Anything that is denoted by a proper name, i. e., for instance, a person, a location, or an organization,
     * is considered to be a named entity. In addition, named entities also include things like dates, times,
     * or money. Here is a sample text with named entities marked:
     * [$_{ORG}$ Türk Hava Yolları] bu [$_{TIME}$ Pazartesi'den] itibaren [$_{LOC}$ İstanbul] [$_{LOC}$ Ankara]
     * güzergahı için indirimli satışlarını [$_{MONEY}$ 90 TL'den] başlatacağını açıkladı.
     * This sentence contains 5 named entities including 3 words labeled as ORGANIZATION, 2 words labeled as
     * LOCATION, 1 word labeled as TIME, and 1 word labeled as MONEY.
     * */
    class SentenceAutoNER extends AutoNER_1.AutoNER {
        /**
         * The main method to automatically detect named entities in a sentence. The algorithm
         * 1. Detects PERSON(s).
         * 2. Detects LOCATION(s).
         * 3. Detects ORGANIZATION(s).
         * 4. Detects MONEY.
         * 5. Detects TIME.
         * For not detected words, the algorithm sets the named entity "NONE".
         * @param sentence The sentence for which named entities checked.
         */
        autoNER(sentence) {
            this.autoDetectPerson(sentence);
            this.autoDetectLocation(sentence);
            this.autoDetectOrganization(sentence);
            this.autoDetectMoney(sentence);
            this.autoDetectTime(sentence);
            for (let i = 0; i < sentence.wordCount(); i++) {
                let word = sentence.getWord(i);
                if (word.getNamedEntityType() == null) {
                    word.setNamedEntityType("NONE");
                }
            }
        }
    }
    exports.SentenceAutoNER = SentenceAutoNER;
});
//# sourceMappingURL=SentenceAutoNER.js.map