
import React, {useRef, useEffect} from 'react';
import "./PasswordBox.css";


// https://www.vishalon.net/blog/javascript-getting-and-setting-caret-position-in-textarea
function getCaretPosition(el){
    if(el.selectionStart || el.selectionStart == '0'){
        return {
            'start': el.selectionStart,
            'end': el.selectionEnd
        };
    }
    else {
        return {
            'start': 0,
            'end': 0
        };
    }
}

function setCaretPosition(el, pos){
    if (el && pos && el.setSelectionRange) {
        // el.focus();
        el.setSelectionRange(pos.start, pos.end);
    }
}



function PasswordBox(props, ref) {
    const {pswd, setPswd} = props;
    const caretPos = useRef();
    
    // https://saturncloud.io/blog/creating-a-textarea-with-autoresize/
    useEffect(() => {
        ref.current.style.height = 'auto';
        ref.current.style.height = `${ref.current.scrollHeight}px`;
    }, [pswd, ref]);


    function handleChange(e){
        caretPos.current = getCaretPosition(ref.current);
        setPswd(e.target.value);
    }
    useEffect(() => {
        setCaretPosition(ref.current, caretPos.current);
    }, [pswd]);

    return ( 
        <>
            <div className="pswdbox_label">
                Choose a password
                <span className="psswd_len">
                    {pswd.length}
                </span>
            </div>
            <textarea 
                id="pswdbox"
                className="pswdbox"
                ref={ref} 
                value={pswd} 
                onChange={handleChange} 
                rows={1}
                style={{resize: 'none', width: "100%", overflowY: 'hidden'}}
                spellCheck="false"
            />
            {/* <div>{caretPos.current && `${caretPos.current.start}, ${caretPos.current.end}`}</div> */}
        </>
    );
}

export default React.forwardRef(PasswordBox);