import Rule from "../Rule";

const morse = {
    a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....", 
    i: "..", j: ".---", k: "-.-", l: ".-..", m: "--", n: "-.", o: "---", p: ".--.", 
    q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--", z: "--.." 
}

export default class RuleMorse extends Rule{
    constructor(){
        super("Your password must contain Morse code of the first 3 english alphabets in your password.");
    }

    check(txt){
        let letters = txt.match(/[A-Za-z]/g).slice(0, 3);
        let code = `${morse[letters[0].toLowerCase()]} ${morse[letters[1].toLowerCase()]} ${morse[letters[2].toLowerCase()]}`;
        let code_nospace = code.replaceAll(" ", "");
        console.log(code_nospace)

        let r = new RegExp(`(${code})|(${code_nospace})`);
        return r.test(txt);
    }
}