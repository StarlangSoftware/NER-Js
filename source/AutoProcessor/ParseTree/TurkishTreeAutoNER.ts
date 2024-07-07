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

    /**
     * The method checks the LOCATION gazetteer, and if the word exists in the gazetteer, it assigns the LOCATION tag.
     * @param parseTree The tree for which LOCATION named entities checked.
     */
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

    /**
     * The method checks for the MONEY entities using regular expressions. After that, if the expression is a MONEY
     * expression, it also assigns the previous nodes, which may included numbers or some monetarial texts, MONEY tag.
     * @param parseTree The tree for which MONEY named entities checked.
     */
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

    /**
     * The method assigns the words "corp.", "inc.", and "co" ORGANIZATION tag. The method also checks the
     * ORGANIZATION gazetteer, and if the word exists in the gazetteer, it assigns ORGANIZATION tag.
     * @param parseTree The tree for which ORGANIZATION named entities checked.
     */
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

    /**
     * The method assigns the words "bay" and "bayan" PERSON tag. The method also checks the PERSON gazetteer, and if
     * the word exists in the gazetteer, it assigns PERSON tag. The parent node should have the proper noun tag NNP.
     * @param parseTree The tree for which PERSON named entities checked.
     */
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

    /**
     * The method checks for the TIME entities using regular expressions. After that, if the expression is a TIME
     * expression, it also assigns the previous texts, which are numbers, TIME tag.
     * @param parseTree The tree for which TIME named entities checked.
     */
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