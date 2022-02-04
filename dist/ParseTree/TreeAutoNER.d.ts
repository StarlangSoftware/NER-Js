import { AutoNER } from "nlptoolkit-namedentityrecognition/dist/AutoNER";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import { ParseTreeDrawable } from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
export declare abstract class TreeAutoNER extends AutoNER {
    protected secondLanguage: ViewLayerType;
    protected abstract autoDetectPerson(parseTree: ParseTreeDrawable): void;
    protected abstract autoDetectLocation(parseTree: ParseTreeDrawable): void;
    protected abstract autoDetectOrganization(parseTree: ParseTreeDrawable): void;
    protected abstract autoDetectMoney(parseTree: ParseTreeDrawable): void;
    protected abstract autoDetectTime(parseTree: ParseTreeDrawable): void;
    constructor(secondLanguage: ViewLayerType);
    autoNER(parseTree: ParseTreeDrawable): void;
}
