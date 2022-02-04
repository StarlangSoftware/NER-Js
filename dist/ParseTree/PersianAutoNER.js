(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./TreeAutoNER", "nlptoolkit-annotatedsentence/dist/ViewLayerType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PersianAutoNER = void 0;
    const TreeAutoNER_1 = require("./TreeAutoNER");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    class PersianAutoNER extends TreeAutoNER_1.TreeAutoNER {
        constructor() {
            super(ViewLayerType_1.ViewLayerType.PERSIAN_WORD);
        }
        autoDetectLocation(parseTree) {
        }
        autoDetectMoney(parseTree) {
        }
        autoDetectOrganization(parseTree) {
        }
        autoDetectPerson(parseTree) {
        }
        autoDetectTime(parseTree) {
        }
    }
    exports.PersianAutoNER = PersianAutoNER;
});
//# sourceMappingURL=PersianAutoNER.js.map