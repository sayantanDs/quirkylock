import "./RuleBox.css";

function RuleBox({heading, msg, correct, children}) {
    return ( 
        <div className={`rulebox ${correct? "rule-correct": "rule-err" }`}>
            <div className={`rulebox-top ${correct? "rule-correct": "rule-err" }`}>
                {heading}
            </div>
            <div className="rulebox-desc">
                {msg}
                {children}
            </div>
        </div> 
    );
}

export default RuleBox;