import { TreeAutoNER } from "./TreeAutoNER";
import { ParseTreeDrawable } from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
export declare class TurkishTreeAutoNER extends TreeAutoNER {
    constructor();
    /**
     * The method checks the LOCATION gazetteer, and if the word exists in the gazetteer, it assigns the LOCATION tag.
     * @param parseTree The tree for which LOCATION named entities checked.
     */
    protected autoDetectLocation(parseTree: ParseTreeDrawable): void;
    /**
     * The method checks for the MONEY entities using regular expressions. After that, if the expression is a MONEY
     * expression, it also assigns the previous nodes, which may included numbers or some monetarial texts, MONEY tag.
     * @param parseTree The tree for which MONEY named entities checked.
     */
    protected autoDetectMoney(parseTree: ParseTreeDrawable): void;
    /**
     * The method assigns the words "corp.", "inc.", and "co" ORGANIZATION tag. The method also checks the
     * ORGANIZATION gazetteer, and if the word exists in the gazetteer, it assigns ORGANIZATION tag.
     * @param parseTree The tree for which ORGANIZATION named entities checked.
     */
    protected autoDetectOrganization(parseTree: ParseTreeDrawable): void;
    /**
     * The method assigns the words "bay" and "bayan" PERSON tag. The method also checks the PERSON gazetteer, and if
     * the word exists in the gazetteer, it assigns PERSON tag. The parent node should have the proper noun tag NNP.
     * @param parseTree The tree for which PERSON named entities checked.
     */
    protected autoDetectPerson(parseTree: ParseTreeDrawable): void;
    /**
     * The method checks for the TIME entities using regular expressions. After that, if the expression is a TIME
     * expression, it also assigns the previous texts, which are numbers, TIME tag.
     * @param parseTree The tree for which TIME named entities checked.
     */
    protected autoDetectTime(parseTree: ParseTreeDrawable): void;
}
