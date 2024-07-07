import {AutoNER} from "nlptoolkit-namedentityrecognition/dist/AutoNER";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {ParseTreeDrawable} from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import {NodeDrawableCollector} from "nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector";
import {ParseNodeDrawable} from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import {IsTransferable} from "nlptoolkit-annotatedtree/dist/Processor/Condition/IsTransferable";

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
export abstract class TreeAutoNER extends AutoNER{

    protected secondLanguage: ViewLayerType
    /**
     * The method should detect PERSON named entities. PERSON corresponds to people or
     * characters. Example: {\bf Atatürk} yurdu düşmanlardan kurtardı.
     * @param parseTree The tree for which PERSON named entities checked.
     */
    protected abstract autoDetectPerson(parseTree: ParseTreeDrawable): void

    /**
     * The method should detect LOCATION named entities. LOCATION corresponds to regions,
     * mountains, seas. Example: Ülkemizin başkenti {\bf Ankara'dır}.
     * @param parseTree The tree for which LOCATION named entities checked.
     */
    protected abstract autoDetectLocation(parseTree: ParseTreeDrawable): void

    /**
     * The method should detect ORGANIZATION named entities. ORGANIZATION corresponds to companies,
     * teams etc. Example:  {\bf IMKB} günü 60 puan yükselerek kapattı.
     * @param parseTree The tree for which ORGANIZATION named entities checked.
     */
    protected abstract autoDetectOrganization(parseTree: ParseTreeDrawable): void

    /**
     * The method should detect MONEY named entities. MONEY corresponds to monetarial
     * expressions. Example: Geçen gün {\bf 3000 TL} kazandık.
     * @param parseTree The tree for which MONEY named entities checked.
     */
    protected abstract autoDetectMoney(parseTree: ParseTreeDrawable): void

    /**
     * The method should detect TIME named entities. TIME corresponds to time
     * expressions. Example: {\bf Cuma günü} tatil yapacağım.
     * @param parseTree The tree for which TIME named entities checked.
     */
    protected abstract autoDetectTime(parseTree: ParseTreeDrawable): void

    /**
     * Constructor for the TreeAutoNER. Sets the language for the NER annotation. Currently, the system supports Turkish
     * and Persian.
     * @param secondLanguage Language for NER annotation.
     */
    protected constructor(secondLanguage: ViewLayerType) {
        super();
        this.secondLanguage = secondLanguage
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