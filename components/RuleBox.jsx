import React from 'react';
import "./RuleBox.css";

function RuleBox({heading, msg, correct, renderItem, propsToChild}) {
    
    // Using renderItem prop to render child component so that we can pass props to them
    // the props coming from parent, that are to be passed to the child component are in 'propsToChild'
    // this pattern is discussed in: https://react.dev/reference/react/cloneElement#alternatives

    return ( 
        <div className={`rulebox ${correct? "rule-correct": "rule-err" }`}>
            <div className={`rulebox-top ${correct? "rule-correct": "rule-err" }`}>
                {correct?"\u{2705}":"\u{274C}"} {heading}
            </div>
            <div className="rulebox-desc">
                {msg}
                {renderItem===undefined? null: renderItem(propsToChild)}
            </div>
        </div> 
    );
}

export default RuleBox;