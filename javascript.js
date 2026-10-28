const svg = "http://www.w3.org/2000/svg";
const input = document.getElementById("input");
const div = document.getElementById("div");
const text = document.getElementById("txt");
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
    div.innerHTML=null;
}

function txt() {
    document.getElementById("kb").style.display="none";
    text.style.display="block";
}
function kb() {
    document.getElementById("kb").style.display="block";
    text.style.display="none";
}


input.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        Render(input.value);
    }
})

const vowel_char = "aiu";
const cons_char  = "ptkbdgmnlrszN";
const punct = " .;-#0123456789"
const cons_final = new Set(["n","m","ng","p","t","k","l","N","ng"]);
const cons_digraph = new Set(["ph","th","kh","bv","dv","gv","sr","zr","ts","dz","ge","ke","po","to","ko","bo","do","go","ng"]);

function Normalize(s) {
    return s.replaceAll("ą","a~").replaceAll("į","i~").replaceAll("ų","u~").replaceAll("aa","va").replaceAll("ii","vi").replaceAll("uu","vu").replaceAll("a~","aN").replaceAll("i~","iN").replaceAll("u~","uN");
}

function Render(smth) {
    Clear();
    smth=Normalize(smth);
    const boxes = [];
    let i = 0;
    while (i < smth.length) {
        const pair = smth.slice(i, i + 2);
        if (cons_digraph.has(pair)) {
            boxes.push({ text: pair, kind: "C"});
            i += 2;
            continue;
        }
        const ch = smth[i];
        if (ch!=`'`) boxes.push({ text: ch, kind: KindOf(ch)});
        i++;
    }

    for (let i=0;i<boxes.length;i++) {
        let j=i+1;
        let k=i-1;
        if (boxes[i]["kind"]=="?") {
            return alert(`you have entered an invalid input at ${j}: ${boxes[i]["text"]}`);
        }
        else if (boxes[i]["kind"]=="C") {
            if (boxes[j]["kind"]=="C"&&boxes[k]["kind"]=="C") return alert(`you have entered an invalid input at ${j}: ${boxes[i]["text"]}`);
            if (boxes[i]["text"]=="ng"&&boxes[j]["kind"]=="V"&&boxes[k]["kind"]=="V") {
                boxes[i]["text"]="n";boxes.splice(j,0,{ text: "g", kind: "C"});
            }
            if (boxes[i]==boxes[boxes.length-1]&&boxes[k]["kind"]=="V") {
                if (cons_final.has(boxes[i]["text"])) boxes[i]["text"]+="_";
                else return alert(`you have entered an invalid input at ${j}: ${boxes[i]["text"]}`);
            }
            else if (boxes[j]["kind"]=="C"||boxes[j]["kind"]=="P"&&boxes[k]["kind"]=="V") {
                if (cons_final.has(boxes[i]["text"])) boxes[i]["text"]+="_";
                else return alert(`you have entered an invalid input at ${j}: ${boxes[i]["text"]}`);
            }
            Char(boxes[i]["text"]);
        }
        else if (boxes[i]["kind"]=="V") {
            if (i!=boxes.length-1) if (boxes[j]["kind"]=="V") return alert(`you have entered an invalid input at ${j}: ${boxes[i]["text"]}`);
            if (i==0) Char(`c`);
            else if (boxes[k]["kind"]=="P") Char(`c`);
            if (boxes[i]["text"]=="a") continue;
            Vowel(boxes[i]["text"]);
        }
        else if (boxes[i]["kind"]=="P") {
            if (i!=boxes.length-1) if (boxes[j]["kind"]=="P") return alert(`you have entered an invalid input at ${j}: ${boxes[i]["text"]}`);
            boxes[i]["text"]=boxes[i]["text"].replace(" ","dotOne").replace("-","dotJoin").replace(";","dotTwo").replace(".","dotThree").replace("#","duplicate");
            boxes[i]["text"]=boxes[i]["text"].replace("0","nZero").replace("1","nOne").replace("2","nTwo").replace("3","nThree").replace("4","nFour").replace("5","nFive").replace("6","nSix").replace("7","nSeven").replace("8","nEight").replace("9","nNine")
            Punct(boxes[i]["text"]);
        }
    }
}

function KindOf(ch) {
    if (vowel_char.includes(ch)) return "V";
    if (cons_char.includes(ch)) return "C";
    if (punct.includes(ch)) return "P";
    return "?";
}