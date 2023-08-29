import Rule from "./Rule";
import RuleWordle from "./RuleWordle/RuleWordle";
import RuleSlidingPuzzle from "./RuleSlidingPuzzle/RuleSlidingPuzzle";
import RuleMorse from "./RuleMorse/RuleMorse";

class RuleShake extends Rule{
    constructor(){
        super("Oh no! there is an earthquake!");
        const Btn = ({specialPowers}) => <button onClick={()=>specialPowers.shakePasswordBox(true)}>Shake</button>
        this.children = <Btn/>
    }

    check(txt){
        return /table/.test(txt);
    }

}
var rules = [
    new Rule( 
        "Your password must be at least 8 characters.",
        (t) => t?.length >= 8
    ), 
    new RuleShake(),
    new Rule( 
        "Your password must include a number.",
        (t) => /\d/.test(t)
    ),
    new Rule( 
        "Your password must include an uppercase letter.",
        (t) => /[A-Z]/.test(t)
    ),
    new Rule( 
        "Your password must include a special character.",
        (t) => /\W/.test(t)
    ),
    new Rule( 
        "The digits in your password must add up to 25.",
        (t) => (t.match(/\d/g)?.map(x => +x).reduce((acc, v) => acc+v, 0) | 0) === 25
    ),
    new Rule( 
        "Your password must include a month of the year.",
        (t) => /january|february|march|april|may|june|july|august|september|october|november|december/i.test(t)
    ),
    new RuleMorse(),
    new RuleSlidingPuzzle(),
    new RuleWordle(),
    
    
];

function sort_rules(a, b){
    if(a.correct == b.correct){
        return b.num - a.num;
    }
    else if(!a.correct && b.correct){
        return -1;
    }
    else{
        return 1;
    }
}

export default rules;
export {sort_rules};