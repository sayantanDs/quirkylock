
import React, {useRef, useEffect} from 'react';
import "./PasswordBox.css";


// https://codepen.io/feketegy/pen/RwGBgyq
function getCaret(el) {
    let caretAt = 0;
    const sel = window.getSelection();
    
    if(sel?.anchorNode?.parentElement?.id === "pswdbox"){
        if ( sel.rangeCount == 0 ) { return caretAt; }
    
        const range = sel.getRangeAt(0);    
        const preRange = range.cloneRange();
        preRange.selectNodeContents(el);
        preRange.setEnd(range.endContainer, range.endOffset);
        caretAt = preRange.toString().length;
    }
    return caretAt;   
}

function setCaret(el, offset) {
    let sel = window.getSelection();
    if(sel?.anchorNode?.parentElement?.id === "pswdbox"){
        let range = document.createRange();
        
        try{
            range.setStart(el.childNodes[0], offset);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
        catch(err){
            console.log(err);
        }
    }
}



function PasswordBox(props, ref) {
    const {pswd, setPswd} = props;
    const caretPos = useRef();

    useEffect(() => {
        setCaret(ref.current, caretPos.current);
        // ref.current.focus();
    }, [pswd]);

    function handleChange(e){
        caretPos.current = getCaret(ref.current);
        setPswd(e.currentTarget.textContent);
    }

    return ( 
        <>
            <div className="pswdbox_label">
                Choose a password
                <span className="psswd_len">
                    {pswd.length}
                </span>
            </div>
            <div 
                id="pswdbox"
                className="pswdbox" 
                contentEditable="plaintext-only"
                suppressContentEditableWarning={true}
                spellCheck="false"
                onInput={handleChange}
                ref={ref}
            >
                {pswd}
            </div>
            
        </>
    );
}

export default React.forwardRef(PasswordBox);