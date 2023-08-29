import { useEffect, useRef } from "react";
import Rule from "../Rule";

export default class RuleEarthquake extends Rule{
    constructor(){
        super("Oh no! there is an earthquake! Put your password under a table \u{252C}\u{2500}\u{252C}");
        this.renderItem = ({pswd, setPswd, shakePasswordBox, correct}) => {
            return (
                <Earthquake 
                    pswd={pswd}
                    setPswd={setPswd}
                    shakePasswordBox={shakePasswordBox}
                    correct={correct}
                />
            )
        }
    }

    check(txt){
        return /^\u{252C}\u{2500}\u{252C}\n/u.test(txt);
    }

}

const upsideDownMap ={
    a: "\u0250",
    b: "q",
    c: "\u0254",
    d: "p",
    e: "\u01DD",
    f: "\u025F",
    g: "\u0183",
    h: "\u0265",
    i: "\u1D09",
    j: "\u027e",
    k: "\u029e",
    m: "\u026F",
    n: "u",
    p: "d",
    q: "b",
    r: "\u0279",
    t: "\u0287",
    u: "n",
    v: "\u028C",
    w: "\u028D",
    y: "\u028E",
}
function flipAlphabet(c){
    if(c in upsideDownMap){
        return upsideDownMap[c];
    }
    return c;
}

function Earthquake({pswd, setPswd, shakePasswordBox, correct}){
    const solvedOnce = useRef(false);
    const timerRef = useRef(null);
    const TIMEOUT = Math.floor(Math.random()*200) + 600;

    useEffect(()=>{
        timerRef.current = setTimeout(shuffleCharacters, TIMEOUT);

        shakePasswordBox(true);
        solvedOnce.current = false;

        //Cleanup - Clearing the interval
        return () => clearTimeout(timerRef.current);
    }, []);

    useEffect(()=>{
        if(!solvedOnce.current){
            // console.log("pswd:", pswd);
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(shuffleCharacters, TIMEOUT);
        }
    }, [pswd]);


    useEffect(()=>{
        if(!solvedOnce.current && correct){
            solvedOnce.current = true;
            clearTimeout(timerRef.current);
            shakePasswordBox(false);
        }
    }, [correct]);

    
    function shuffleCharacters(){
        if(pswd.length>4){
            // setPswd(pswd.substr(0, 3) + pswd.substr(4) + flipAlphabet(pswd[3]) )
            setPswd(pswd.substr(1) + flipAlphabet(pswd[0]) )
        }
    }

}