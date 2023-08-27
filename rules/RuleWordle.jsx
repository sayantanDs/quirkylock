import Rule from "./Rule";


async function get_todays_wordle(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();

    let url = `https://www.nytimes.com/svc/wordle/v2/${year}-${("0"+month).slice(-2)}-${("0"+day).slice(-2)}.json`;
    url = 'https://corsproxy.io/?' + encodeURIComponent(url);   // CORS proxy

    const options = {
        method: 'GET',
    };

    let response = await fetch(url, options);
    let json = await response.json();

    return json.solution;
}



export default class RuleWordle extends Rule{
    constructor(){
        super("Your password must contain today's Wordle answer.");

        get_todays_wordle()
            .then(solution => this.solution = solution)
            .catch((error) => {
                console.log(error)
            });
    }

    check(txt){
        // console.log("check", this.solution)
        let r = new RegExp(`(${this.solution})`, "i");
        return r.test(txt); 
    }
}