import {TreeAutoNER} from "./TreeAutoNER";
import {ParseTreeDrawable} from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class PersianAutoNER extends TreeAutoNER{

    constructor() {
        super(ViewLayerType.PERSIAN_WORD);
    }

    protected autoDetectLocation(parseTree: ParseTreeDrawable): void {
    }

    protected autoDetectMoney(parseTree: ParseTreeDrawable): void {
    }

    protected autoDetectOrganization(parseTree: ParseTreeDrawable): void {
    }

    protected autoDetectPerson(parseTree: ParseTreeDrawable): void {
    }

    protected autoDetectTime(parseTree: ParseTreeDrawable): void {
    }

}