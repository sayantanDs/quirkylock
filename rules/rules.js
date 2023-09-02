import Rule from "./Rule";
import RuleWordle from "./RuleWordle/RuleWordle";
import RuleSlidingPuzzle from "./RuleSlidingPuzzle/RuleSlidingPuzzle";
import RuleMorse from "./RuleMorse/RuleMorse";
import RuleRiddle from "./RuleRiddle/RuleRiddle";
import RuleLocation from "./RuleLocation/RuleLocation";
import RuleTimeEmoji from "./RuleTimeEmoji/RuleTimeEmoji";
import RuleQR from "./RuleQR/RuleQR";
import RuleSum from "./RuleSum/RuleSum";
import RuleEarthquake from "./RuleEarthquake/RuleEarthquake";


var rules = [
    new Rule( 
        "Your password must be at least 8 characters.",
        (t) => t?.length >= 8
    ),
    new Rule( 
        "Your password must include an uppercase and a lowercase letter.",
        (t) => (/[A-Z]/.test(t) && /[a-z]/.test(t))
    ),
    new Rule( 
        "Your password must include a special character.",
        (t) => /\W/.test(t)
    ),
    new Rule( 
        "Your password must include a negative number.",
        (t) => /-\d/.test(t)
    ),
    new Rule( 
        "Your password must contain the value of pi up to first 5 decimal places.",
        (t) => /(?:3\.14159)/.test(t)
    ),    
    new Rule( 
        "Your password must contain all the english vowels.",
        (t) => /a/i.test(t) && /e/i.test(t) && /i/i.test(t) && /o/i.test(t) && /u/i.test(t)
    ),
    new RuleSum(),
    new Rule( 
        "Your password must include the name of a continent.",
        (t) => /asia|america|europe|africa|australia|north america|south america|antartica/i.test(t)
    ),
    new Rule( 
        "Your password must include the name of \"The power house of the cell\". \u{1F9A0}", //&#x1F9A0;
        (t) => /(?:mitochondria)|(?:mitochondrion)/i.test(t)
    ),
    
    new RuleTimeEmoji(),
    new RuleWordle(),
    new RuleEarthquake(),
    new RuleQR(),
    new RuleMorse(),
    new RuleLocation(),
    new RuleRiddle(),
    new RuleSlidingPuzzle(),
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