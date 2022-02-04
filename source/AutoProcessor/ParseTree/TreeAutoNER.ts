import {AutoNER} from "nlptoolkit-namedentityrecognition/dist/AutoNER";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {ParseTreeDrawable} from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import {NodeDrawableCollector} from "nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector";
import {ParseNodeDrawable} from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import {IsTransferable} from "nlptoolkit-annotatedtree/dist/Processor/Condition/IsTransferable";

export abstract class TreeAutoNER extends AutoNER{

    protected secondLanguage: ViewLayerType
    protected abstract autoDetectPerson(parseTree: ParseTreeDrawable): void
    protected abstract autoDetectLocation(parseTree: ParseTreeDrawable): void
    protected abstract autoDetectOrganization(parseTree: ParseTreeDrawable): void
    protected abstract autoDetectMoney(parseTree: ParseTreeDrawable): void
    protected abstract autoDetectTime(parseTree: ParseTreeDrawable): void

    constructor(secondLanguage: ViewLayerType) {
        super();
        this.secondLanguage = secondLanguage
    }

    autoNER(parseTree: ParseTreeDrawable){
        this.autoDetectPerson(parseTree);
        this.autoDetectLocation(parseTree);
        this.autoDetectOrganization(parseTree);
        this.autoDetectMoney(parseTree);
        this.autoDetectTime(parseTree);
        let nodeDrawableCollector = new NodeDrawableCollector(<ParseNodeDrawable> parseTree.getRoot(), new IsTransferable(this.secondLanguage));
        let leafList = nodeDrawableCollector.collect();
        for (let parseNode of leafList){
            if (!parseNode.layerExists(ViewLayerType.NER)){
                parseNode.getLayerInfo().setLayerData(ViewLayerType.NER, "NONE");
            }
        }
    }
}