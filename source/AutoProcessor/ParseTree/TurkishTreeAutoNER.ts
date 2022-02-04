import {TreeAutoNER} from "./TreeAutoNER";
import {ParseTreeDrawable} from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {NodeDrawableCollector} from "nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector";
import {ParseNodeDrawable} from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import {IsTurkishLeafNode} from "nlptoolkit-annotatedtree/dist/Processor/Condition/IsTurkishLeafNode";
import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";

export class TurkishTreeAutoNER extends TreeAutoNER{

    constructor() {
        super(ViewLayerType.TURKISH_WORD);
    }

    protected autoDetectLocation(parseTree: ParseTreeDrawable): void {
        let nodeDrawableCollector = new NodeDrawableCollector(<ParseNodeDrawable> parseTree.getRoot(), new IsTurkishLeafNode());
        let leafList = nodeDrawableCollector.collect();
        for (let parseNode of leafList){
            if (!parseNode.layerExists(ViewLayerType.NER)){
                let word = parseNode.getLayerData(ViewLayerType.TURKISH_WORD).toLocaleLowerCase("tr");
                parseNode.checkGazetteer(this.locationGazetteer, word);
            }
        }
    }

    protected autoDetectMoney(parseTree: ParseTreeDrawable): void {
        let nodeDrawableCollector = new NodeDrawableCollector(<ParseNodeDrawable> parseTree.getRoot(), new IsTurkishLeafNode());
        let leafList = nodeDrawableCollector.collect();
        for (let i = 0; i < leafList.length; i++) {
            let parseNode = leafList[i];
            if (!parseNode.layerExists(ViewLayerType.NER)){
                let word = parseNode.getLayerData(ViewLayerType.TURKISH_WORD).toLocaleLowerCase("tr");
                if (Word.isMoney(word)) {
                    parseNode.getLayerInfo().setLayerData(ViewLayerType.NER, "MONEY");
                    let j = i - 1;
                    while (j >= 0){
                        let previous = leafList[j];
                        if (previous.getParent().getData().getName() == "CD"){
                            previous.getLayerInfo().setLayerData(ViewLayerType.NER, "MONEY");
                        } else {
                            break;
                        }
                        j--;
                    }
                }
            }
        }
    }

    protected autoDetectOrganization(parseTree: ParseTreeDrawable): void {
        let nodeDrawableCollector = new NodeDrawableCollector(<ParseNodeDrawable> parseTree.getRoot(), new IsTurkishLeafNode());
        let leafList = nodeDrawableCollector.collect();
        for (let parseNode of leafList){
            if (!parseNode.layerExists(ViewLayerType.NER)){
                let word = parseNode.getLayerData(ViewLayerType.TURKISH_WORD).toLocaleLowerCase("tr");
                if (Word.isOrganization(word)){
                    parseNode.getLayerInfo().setLayerData(ViewLayerType.NER, "ORGANIZATION");
                }
                parseNode.checkGazetteer(this.organizationGazetteer, word);
            }
        }
    }

    protected autoDetectPerson(parseTree: ParseTreeDrawable): void {
        let nodeDrawableCollector = new NodeDrawableCollector(<ParseNodeDrawable> parseTree.getRoot(), new IsTurkishLeafNode());
        let leafList = nodeDrawableCollector.collect();
        for (let parseNode of leafList){
            if (!parseNode.layerExists(ViewLayerType.NER)){
                let word = parseNode.getLayerData(ViewLayerType.TURKISH_WORD).toLocaleLowerCase("tr");
                if (Word.isHonorific(word) && parseNode.getParent().getData().getName() == "NNP"){
                    parseNode.getLayerInfo().setLayerData(ViewLayerType.NER, "PERSON");
                }
                parseNode.checkGazetteer(this.personGazetteer, word);
            }
        }
    }

    protected autoDetectTime(parseTree: ParseTreeDrawable): void {
        let nodeDrawableCollector = new NodeDrawableCollector(<ParseNodeDrawable> parseTree.getRoot(), new IsTurkishLeafNode());
        let leafList = nodeDrawableCollector.collect();
        for (let i = 0; i < leafList.length; i++){
            let parseNode = leafList[i];
            if (!parseNode.layerExists(ViewLayerType.NER)){
                let word = parseNode.getLayerData(ViewLayerType.TURKISH_WORD).toLocaleLowerCase("tr");
                if (Word.isTime(word)){
                    parseNode.getLayerInfo().setLayerData(ViewLayerType.NER, "TIME");
                    if (i > 0){
                        let previous = leafList[i - 1];
                        if (previous.getParent().getData().getName() == "CD"){
                            previous.getLayerInfo().setLayerData(ViewLayerType.NER, "TIME");
                        }
                    }
                }
            }
        }
    }

}