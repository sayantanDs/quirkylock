
import React from 'react';
import "./PasswordBox.css";


function PasswordBox(props, ref) {
    const {pswd, setPswd} = props;
    function handleChange(e){
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
                className="pswdbox" 
                contentEditable="plaintext-only"
                spellCheck="false"
                onInput={handleChange}
                ref={ref}
            />
            
        </>
    );
}

export default React.forwardRef(PasswordBox);