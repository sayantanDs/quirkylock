import Rule from "./Rule";
import RuleWordle from "./RuleWordle/RuleWordle";
import RuleSlidingPuzzle from "./RuleSlidingPuzzle/RuleSlidingPuzzle";
import RuleMorse from "./RuleMorse/RuleMorse";
import RuleEarthquake from "./RuleEarthquake/RuleEarthquake";
import RuleRiddle from "./RuleRiddle/RuleRiddle";


var rules = [
    new Rule( 
        "Your password must be at least 5 characters.",
        (t) => t?.length >= 5
    ),
    new Rule( 
        "Your password must include an uppercase and a lowercase letter.",
        (t) => (/[A-Z]/.test(t) && /[a-z]/.test(t))
    ),
    new Rule( 
        "Your password must include a number.",
        (t) => /\d/.test(t)
    ), 
    new Rule( 
        "Your password must include a special character.",
        (t) => /\W/.test(t)
    ),
    new Rule( 
        "Your password must include the name of a continent.",
        (t) => /asia|america|europe|africa|australia|north america|south america|antartica/i.test(t)
    ),
    new Rule( 
        "Your password must include the name of \"The power house of the cell\". \u{1F9A0}", //&#x1F9A0;
        (t) => /(?:mitochondria)|(?:mitochondrion)/i.test(t)
    ),
    new Rule( 
        "Your password must contain the value of pi up to first 5 decimal places.",
        (t) => /(?:3\.14159)/.test(t)
    ),
    
    // new RuleMorse(),
    new RuleSlidingPuzzle(),
    new RuleRiddle(),
    new RuleWordle(),
    // new RuleEarthquake(),   
    
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