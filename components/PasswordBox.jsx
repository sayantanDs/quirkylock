import "./PasswordBox.css";


function PasswordBox({pswd, setPswd}) {

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
                contentEditable 
                spellCheck="false" 
                onInput={handleChange}
            />
            
        </>
    );
}

export default PasswordBox;