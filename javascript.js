const svg = "http://www.w3.org/2000/svg";
const div = document.getElementById("div");
function Char(smthidk) {
    if (smthidk.includes("_")) {
        let char=document.getElementById("div").lastChild;
        if (char.getAttribute("final")=="true") {
            return alert(`The block already has a final.`);
        }
        else if (char.getAttribute("final")==null) {
            return alert(`The character cannot have a final.`);
        }
        let old=char.firstChild.getAttribute("href");
        char.firstChild.setAttribute("href",`${old}-`);
        char.setAttribute("final","true");
        let use=document.createElementNS(svg,"use");
        use.setAttribute("href",`#${smthidk}`);
        char.appendChild(use);
        return;
    }
    let canvas=document.createElementNS(svg,"svg");
    let use=document.createElementNS(svg,"use");
    use.setAttribute("href",`#${smthidk}`);
    canvas.setAttribute("width","70");
    canvas.setAttribute("height","100");
    canvas.setAttribute("viewBox","0 0 6.9999996 9.9999996");
    canvas.setAttribute("final","false");
    canvas.setAttribute("vowel","false");
    canvas.appendChild(use);
    div.appendChild(canvas);
    return;
}
function Punct(smthidk) {
    let canvas=document.createElementNS(svg,"svg");
    let use=document.createElementNS(svg,"use");
    use.setAttribute("href",`#${smthidk}`);
    canvas.setAttribute("width","70");
    canvas.setAttribute("height","100");
    canvas.setAttribute("viewBox","0 0 6.9999996 9.9999996");
    canvas.appendChild(use);
    div.appendChild(canvas);
    return;
}

function Vowel(smthidk) {
let char=document.getElementById("div").lastChild;
if (char.getAttribute("vowel")==null) {
            return alert(`The character cannot have a vowel.`);
        }
else if (char.getAttribute(`vowel`)=="true") {
    return alert(`The block already has a vowel.`);
}
let use=document.createElementNS(svg,"use");
use.setAttribute("href",`#${smthidk}`);
char.appendChild(use);
char.setAttribute("vowel","true");
return;
}

function Del() {
    let char=document.getElementById("div").lastChild;
    if (char.getAttribute("final")=="true" && char.lastChild.getAttribute("href").includes("_")==true) {
        char.lastChild.remove();
        char.setAttribute(`final`,"false");
        let old=char.firstChild.getAttribute("href");
        old=old.replace("-","");
        char.firstChild.setAttribute("href",`${old}`);
        return;
    }
    if (char.getAttribute(`vowel`)=="true" && char.lastChild.getAttribute("href").includes("_")==false) {
    char.lastChild.remove();
    char.setAttribute(`vowel`,"false");
    return;
    }
    else char.remove();
}

function Clear() {
    let div=document.getElementById("div");
    div.innerHTML=null;
}
