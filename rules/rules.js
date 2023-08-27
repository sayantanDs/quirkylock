import Rule from "./Rule";
import RuleWordle from "./RuleWordle";


var rules = [
    new Rule( 
        "Your password must be at least 8 characters.",
        (t) => t?.length >= 8
    ),
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
        (t) => /(january|february|march|april|may|june|july|august|september|october|november|december)/i.test(t)
    ),
    new RuleWordle()
];

export default rules;