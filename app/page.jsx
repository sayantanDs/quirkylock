'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import styles from './page.module.css'
import PasswordBox from "../components/PasswordBox";
import RuleBox from "../components/RuleBox";



import ruleList, {sort_rules} from "../rules/rules";





export default function Home(){
    const [pswd, setPswd] = useState("");
    const [ruleState, setRuleState] = useState([]);
    const max_unlocked_rules = useRef(0);
    const pswdBoxRef = useRef(null);


    // initialization rule numbers
    useEffect(() => {

        for (let i = 0; i < ruleList.length; i++) {
            ruleList[i].num = i + 1;
        }
        max_unlocked_rules.current = 0;

        setRuleState(ruleList);

    }, []);



    // callback on textbox change, check rules along with setPswd
    function setPswdAndCheckRules(txt){
        setPswd(txt);
        checkRules(txt);
    }

    
    //check rules loop
    function checkRules(txt) {
        let rules = [...ruleState];

        //base case, first rule
        if(!rules[0].unlocked && txt.length > 0){
            rules[0].unlocked = true;
            max_unlocked_rules.current++;
        }
        
        let solved_count = 0;
        for(let i=0;i<rules.length;i++){

            if(i===max_unlocked_rules.current){                         // coming to rule that was not unlocked before
                if(solved_count===max_unlocked_rules.current){          // if all previous rules are solved i.e correct at this moment
                    rules[i].unlocked = true;                           // unlock this new rule
                    max_unlocked_rules.current++;                       // increment max unlocked rules
                }                                               
                else{                                                   // if all previous rules are not solved
                    break;                                              // break, do not unlock a new rule
                }
            }

            rules[i].correct = rules[i].check(txt);
            if(rules[i].correct){
                solved_count++;
            }
        }

        setRuleState(rules);
    }

    function shakePasswordBox(boolean){
        if(boolean){
            pswdBoxRef.current.classList.add("shake");
        }
        else{
            pswdBoxRef.current.classList.remove("shake");
        }
    }

    function regenerateRule(num){
        console.log("regenerate", num);
        num--; //change to rule index
        let rules = [...ruleState];
        if("regenerate" in rules[num]){
            rules[num].regenerate();
            setRuleState(rules);
        }

    }

    return (
        <>
        <div className={styles.container}>
            
            <div className={styles.title}>
                <Image
                    src="/quirkylock.png"
                    width={70}
                    height={70}
                    alt=""
                />
                <div className={styles.title_text}>                
                    QuirkyLock
                </div>
            </div>
            
            <p className={styles.introduction}>
                <b>Hello adventurer!</b>
                <br/>
                The residents of &quot;Quirky Town&quot; are holding a unique competition.
                Their chief  &quot;The RuleMaster&quot; has a knack for crafting passwords that defy convention.
                Can you piece together a passphrase that adheres to all the requirements?
            </p>
            
            <PasswordBox pswd={pswd} setPswd={setPswdAndCheckRules} ref={pswdBoxRef}/>
            <div>level: {max_unlocked_rules.current}</div>
            {ruleState.filter(r => r.unlocked).sort(sort_rules).map(r => {
                return(
                    <RuleBox 
                        key={r.num} 
                        heading={`Rule ${r.num}`} 
                        msg={r.msg} 
                        correct={r.correct} 
                        renderItem={r.renderItem}
                        propsToChild={{pswd, setPswd: setPswdAndCheckRules, shakePasswordBox, regenerateRule, correct: r.correct}}
                    />
                )
            })}

        </div>
        <footer className={styles.footer}>
          <small>
            This site is heavily inspired by&nbsp;
            <a href="https://neal.fun/password-game/" target="_blank">The Password Game</a> by&nbsp;
            <a href="https://twitter.com/nealagarwal" target="_blank">Neal</a>
          </small>
        </footer>
        </>
      )
}