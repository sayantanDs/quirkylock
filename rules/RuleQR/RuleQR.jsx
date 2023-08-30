import Rule from "../Rule";
import getRandomWord from "./words";


async function getQR(word){
    
    //https://goqr.me/api/
    let url = `https://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=100x100`;
    url = 'https://corsproxy.io/?' + encodeURIComponent(url);   // CORS proxy

    const options = {
        method: 'GET',
    };

    let response = await fetch(url, options);
    const imageBlob = await response.blob()
    const imageObjectURL = URL.createObjectURL(imageBlob);
    return imageObjectURL;
}

export default class RuleQR extends Rule{
    constructor(){
        super("Your password must contain the word you get when you scan this QR code.");

        this.word = getRandomWord();
        console.log("QR word:", this.word); 
        
        getQR(this.word)
            .then(objectURL => this.objectURL=objectURL)
            .catch((error) => {
                console.log(error)
            });

        this.renderItem = () => <QRDisplay imgSrc={this.objectURL}/>

    }

    check(txt){
        let r = new RegExp(`(${this.word})`, "i");
        return r.test(txt); 
    }
}


function QRDisplay({imgSrc}){

    return (
        <div style={{textAlign: "center", paddingTop: "15px"}}>
            {imgSrc===null?null:
                
                <img 
                    width="150" 
                    height="150" 
                    src={imgSrc}
                    alt="QR code"
                />
            }
        </div>
    )
}