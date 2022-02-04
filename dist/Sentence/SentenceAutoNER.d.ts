import { AutoNER } from "nlptoolkit-namedentityrecognition/dist/AutoNER";
import { AnnotatedSentence } from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
/**
 * Abstract class to detect named entities in a sentence automatically. By implementing 5 abstract methods,
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
export declare abstract class SentenceAutoNER extends AutoNER {
    /**
     * The method should detect PERSON named entities. PERSON corresponds to people or
     * characters. Example: {\bf Atatürk} yurdu düşmanlardan kurtardı.
     * @param sentence The sentence for which PERSON named entities checked.
     */
    abstract autoDetectPerson(sentence: AnnotatedSentence): void;
    /**
     * The method should detect LOCATION named entities. LOCATION corresponds to regions,
     * mountains, seas. Example: Ülkemizin başkenti {\bf Ankara'dır}.
     * @param sentence The sentence for which LOCATION named entities checked.
     */
    abstract autoDetectLocation(sentence: AnnotatedSentence): void;
    /**
     * The method should detect ORGANIZATION named entities. ORGANIZATION corresponds to companies,
     * teams etc. Example:  {\bf IMKB} günü 60 puan yükselerek kapattı.
     * @param sentence The sentence for which ORGANIZATION named entities checked.
     */
    abstract autoDetectOrganization(sentence: AnnotatedSentence): void;
    /**
     * The method should detect MONEY named entities. MONEY corresponds to monetarial
     * expressions. Example: Geçen gün {\bf 3000 TL} kazandık.
     * @param sentence The sentence for which MONEY named entities checked.
     */
    abstract autoDetectMoney(sentence: AnnotatedSentence): void;
    /**
     * The method should detect TIME named entities. TIME corresponds to time
     * expressions. Example: {\bf Cuma günü} tatil yapacağım.
     * @param sentence The sentence for which TIME named entities checked.
     */
    abstract autoDetectTime(sentence: AnnotatedSentence): void;
    /**
     * The main method to automatically detect named entities in a sentence. The algorithm
     * 1. Detects PERSON(s).
     * 2. Detects LOCATION(s).
     * 3. Detects ORGANIZATION(s).
     * 4. Detects MONEY.
     * 5. Detects TIME.
     * For not detected words, the algorithm sets the named entity "NONE".
     * @param sentence The sentence for which named entities checked.
     */
    autoNER(sentence: AnnotatedSentence): void;
}
