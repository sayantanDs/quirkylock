import { useEffect, useRef } from "react";
import Rule from "../Rule";

export default class RuleEarthquake extends Rule{
    constructor(){
        super("Oh no! there is an earthquake! Get your password to safety! Add this chair to your password and put the rest of your password below it.");
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
        return /^[\u{1FA91}]+\n/u.test(txt); // check for chair unicode
    }

}


function Earthquake({pswd, setPswd, shakePasswordBox, correct}){
    const solvedOnce = useRef(false);
    const timerRef = useRef(null);
    const replaceCount = useRef(0);

    
    // start Earthquake
    useEffect(()=>{
        timerRef.current = setTimeout(shuffleCharacters, 1000);

        shakePasswordBox(true);
        solvedOnce.current = false;

        //Cleanup - Clearing the interval
        return () => clearTimeout(timerRef.current);
    }, []);

    // continue Earthquake using timeout
    useEffect(()=>{
        if(!solvedOnce.current){
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(
                shuffleCharacters, 
                replaceCount.current<8?1000:3000
            );
        }
    }, [pswd]);


    // stop Earthquake
    useEffect(()=>{
        if(!solvedOnce.current && correct){
            solvedOnce.current = true;
            clearTimeout(timerRef.current);
            shakePasswordBox(false);
        }
    }, [correct]);

    
    
    function shuffleCharacters(){
        let matches = [...pswd.matchAll(/[!-~]/g)];
        if(matches.length > 0){
            let indices = matches.map(m => m.index);
            let i = Math.floor(Math.random()*indices.length);
            i = indices[i];

            const arr = ["\u{1FAA8}", "\u{1FAA8}", "\u{1F342}", "\u{1F343}"];
            const x = arr[Math.floor(Math.random()*arr.length)];

            setPswd(pswd.substr(0,i) + x + pswd.substr(i+1)); // add rock or leaf unicode
            replaceCount.current += 1;
        }
    }

    
    return (
        <div style={{fontWeight: "bold", fontSize: "50px", textAlign:"center"}}>
            {"\u{1FA91}"}
        </div>
    )

}