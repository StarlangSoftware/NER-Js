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
    class TreeAutoNER extends AutoNER_1.AutoNER {
        constructor(secondLanguage) {
            super();
            this.secondLanguage = secondLanguage;
        }
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