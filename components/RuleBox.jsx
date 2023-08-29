import React from 'react';
import "./RuleBox.css";

function RuleBox({heading, msg, correct, children, specialPowers}) {
    // https://medium.com/@justynazet/passing-props-to-props-children-using-react-cloneelement-and-render-props-pattern-896da70b24f6
    // https://react.dev/reference/react/cloneElement
    
    // pass specialPowers prop to children
    const childrenWithProps = React.Children.map(children, (child, i) => {
        return React.cloneElement(child, {correct, specialPowers});
    })
    
    
    return ( 
        <div className={`rulebox ${correct? "rule-correct": "rule-err" }`}>
            <div className={`rulebox-top ${correct? "rule-correct": "rule-err" }`}>
                {heading}
            </div>
            <div className="rulebox-desc">
                {msg}
                {childrenWithProps}
            </div>
        </div> 
    );
}

export default RuleBox;