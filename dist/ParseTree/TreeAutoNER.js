(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-namedentityrecognition/dist/AutoNER", "nlptoolkit-annotatedsentence/dist/ViewLayerType", "nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector", "nlptoolkit-annotatedtree/dist/Processor/Condition/IsTransferable"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TreeAutoNER = void 0;
    const AutoNER_1 = require("nlptoolkit-namedentityrecognition/dist/AutoNER");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    const NodeDrawableCollector_1 = require("nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector");
    const IsTransferable_1 = require("nlptoolkit-annotatedtree/dist/Processor/Condition/IsTransferable");
    /**
     * Abstract class to detect named entities in a tree automatically. By implementing 5 abstract methods,
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
    class TreeAutoNER extends AutoNER_1.AutoNER {
        /**
         * Constructor for the TreeAutoNER. Sets the language for the NER annotation. Currently, the system supports Turkish
         * and Persian.
         * @param secondLanguage Language for NER annotation.
         */
        constructor(secondLanguage) {
            super();
            this.secondLanguage = secondLanguage;
        }
        /**
         * The main method to automatically detect named entities in a tree. The algorithm
         * 1. Detects PERSON(s).
         * 2. Detects LOCATION(s).
         * 3. Detects ORGANIZATION(s).
         * 4. Detects MONEY.
         * 5. Detects TIME.
         * For not detected nodes, the algorithm sets the named entity "NONE".
         * @param parseTree The tree for which named entities checked.
         */
        autoNER(parseTree) {
            this.autoDetectPerson(parseTree);
            this.autoDetectLocation(parseTree);
            this.autoDetectOrganization(parseTree);
            this.autoDetectMoney(parseTree);
            this.autoDetectTime(parseTree);
            let nodeDrawableCollector = new NodeDrawableCollector_1.NodeDrawableCollector(parseTree.getRoot(), new IsTransferable_1.IsTransferable(this.secondLanguage));
            let leafList = nodeDrawableCollector.collect();
            for (let parseNode of leafList) {
                if (!parseNode.layerExists(ViewLayerType_1.ViewLayerType.NER)) {
                    parseNode.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.NER, "NONE");
                }
            }
        }
    }
    exports.TreeAutoNER = TreeAutoNER;
});
//# sourceMappingURL=TreeAutoNER.js.map