import { TreeAutoNER } from "./TreeAutoNER";
import { ParseTreeDrawable } from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
export declare class TurkishTreeAutoNER extends TreeAutoNER {
    constructor();
    protected autoDetectLocation(parseTree: ParseTreeDrawable): void;
    protected autoDetectMoney(parseTree: ParseTreeDrawable): void;
    protected autoDetectOrganization(parseTree: ParseTreeDrawable): void;
    protected autoDetectPerson(parseTree: ParseTreeDrawable): void;
    protected autoDetectTime(parseTree: ParseTreeDrawable): void;
}
