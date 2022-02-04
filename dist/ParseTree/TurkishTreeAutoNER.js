(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./TreeAutoNER", "nlptoolkit-annotatedsentence/dist/ViewLayerType", "nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector", "nlptoolkit-annotatedtree/dist/Processor/Condition/IsTurkishLeafNode", "nlptoolkit-dictionary/dist/Dictionary/Word"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TurkishTreeAutoNER = void 0;
    const TreeAutoNER_1 = require("./TreeAutoNER");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    const NodeDrawableCollector_1 = require("nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector");
    const IsTurkishLeafNode_1 = require("nlptoolkit-annotatedtree/dist/Processor/Condition/IsTurkishLeafNode");
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    class TurkishTreeAutoNER extends TreeAutoNER_1.TreeAutoNER {
        constructor() {
            super(ViewLayerType_1.ViewLayerType.TURKISH_WORD);
        }
        autoDetectLocation(parseTree) {
            let nodeDrawableCollector = new NodeDrawableCollector_1.NodeDrawableCollector(parseTree.getRoot(), new IsTurkishLeafNode_1.IsTurkishLeafNode());
            let leafList = nodeDrawableCollector.collect();
            for (let parseNode of leafList) {
                if (!parseNode.layerExists(ViewLayerType_1.ViewLayerType.NER)) {
                    let word = parseNode.getLayerData(ViewLayerType_1.ViewLayerType.TURKISH_WORD).toLocaleLowerCase("tr");
                    parseNode.checkGazetteer(this.locationGazetteer, word);
                }
            }
        }
        autoDetectMoney(parseTree) {
            let nodeDrawableCollector = new NodeDrawableCollector_1.NodeDrawableCollector(parseTree.getRoot(), new IsTurkishLeafNode_1.IsTurkishLeafNode());
            let leafList = nodeDrawableCollector.collect();
            for (let i = 0; i < leafList.length; i++) {
                let parseNode = leafList[i];
                if (!parseNode.layerExists(ViewLayerType_1.ViewLayerType.NER)) {
                    let word = parseNode.getLayerData(ViewLayerType_1.ViewLayerType.TURKISH_WORD).toLocaleLowerCase("tr");
                    if (Word_1.Word.isMoney(word)) {
                        parseNode.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.NER, "MONEY");
                        let j = i - 1;
                        while (j >= 0) {
                            let previous = leafList[j];
                            if (previous.getParent().getData().getName() == "CD") {
                                previous.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.NER, "MONEY");
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
        autoDetectOrganization(parseTree) {
            let nodeDrawableCollector = new NodeDrawableCollector_1.NodeDrawableCollector(parseTree.getRoot(), new IsTurkishLeafNode_1.IsTurkishLeafNode());
            let leafList = nodeDrawableCollector.collect();
            for (let parseNode of leafList) {
                if (!parseNode.layerExists(ViewLayerType_1.ViewLayerType.NER)) {
                    let word = parseNode.getLayerData(ViewLayerType_1.ViewLayerType.TURKISH_WORD).toLocaleLowerCase("tr");
                    if (Word_1.Word.isOrganization(word)) {
                        parseNode.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.NER, "ORGANIZATION");
                    }
                    parseNode.checkGazetteer(this.organizationGazetteer, word);
                }
            }
        }
        autoDetectPerson(parseTree) {
            let nodeDrawableCollector = new NodeDrawableCollector_1.NodeDrawableCollector(parseTree.getRoot(), new IsTurkishLeafNode_1.IsTurkishLeafNode());
            let leafList = nodeDrawableCollector.collect();
            for (let parseNode of leafList) {
                if (!parseNode.layerExists(ViewLayerType_1.ViewLayerType.NER)) {
                    let word = parseNode.getLayerData(ViewLayerType_1.ViewLayerType.TURKISH_WORD).toLocaleLowerCase("tr");
                    if (Word_1.Word.isHonorific(word) && parseNode.getParent().getData().getName() == "NNP") {
                        parseNode.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.NER, "PERSON");
                    }
                    parseNode.checkGazetteer(this.personGazetteer, word);
                }
            }
        }
        autoDetectTime(parseTree) {
            let nodeDrawableCollector = new NodeDrawableCollector_1.NodeDrawableCollector(parseTree.getRoot(), new IsTurkishLeafNode_1.IsTurkishLeafNode());
            let leafList = nodeDrawableCollector.collect();
            for (let i = 0; i < leafList.length; i++) {
                let parseNode = leafList[i];
                if (!parseNode.layerExists(ViewLayerType_1.ViewLayerType.NER)) {
                    let word = parseNode.getLayerData(ViewLayerType_1.ViewLayerType.TURKISH_WORD).toLocaleLowerCase("tr");
                    if (Word_1.Word.isTime(word)) {
                        parseNode.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.NER, "TIME");
                        if (i > 0) {
                            let previous = leafList[i - 1];
                            if (previous.getParent().getData().getName() == "CD") {
                                previous.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.NER, "TIME");
                            }
                        }
                    }
                }
            }
        }
    }
    exports.TurkishTreeAutoNER = TurkishTreeAutoNER;
});
//# sourceMappingURL=TurkishTreeAutoNER.js.map