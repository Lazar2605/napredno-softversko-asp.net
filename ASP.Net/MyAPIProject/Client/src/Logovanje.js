
export class Logovanje{
    constructor(kontejner){
        this.kontejner = kontejner;
    }

    Crtaj(){
        
        let divLog = document.createElement("div");
        divLog.className="Log";
        this.kontejner.appendChild(divLog);
        let labelaa = document.createElement("label");
        labelaa.innerHTML = "Dobrodošli, unesite vaše podatke";
        divLog.appendChild(labelaa);
        let dugmePrijaviSe = document.createElement("button");
        dugmePrijaviSe.innerHTML = "Log in";
        dugmePrijaviSe.class="dugmeReg";
        let inputIme = document.createElement("input");
        inputIme.className="divDugmeReg";
        inputIme.type = "text";
        let inputPrezime = document.createElement("input");
        inputPrezime.className="divDugmeReg";
        inputPrezime.type = "text";
        let divLabel1 = document.createElement("div");
        divLabel1.className="divDugmeReg";
        let labela1 = document.createElement("label"); 
        labela1.innerHTML = "Ime";
        divLog.appendChild(divLabel1);
        divLabel1.appendChild(labela1);
        let divInput1 = document.createElement("div");
        divLog.appendChild(divInput1);
        divInput1.appendChild(inputIme);
        let divLabel2 = document.createElement("div");
        divLabel2.className="divDugmeReg";
        let labela2 = document.createElement("label"); 
        labela2.innerHTML = "Prezime";
        divLog.appendChild(divLabel2);
        divLabel2.appendChild(labela2);
        let divInput2 = document.createElement("div");
        divLog.appendChild(divInput2);
        divInput2.appendChild(inputPrezime);

        let inputPol = document.createElement("select");
        inputPol.className="divDugmeReg";
        let option = document.createElement("option");
        option.innerHTML = "Muški";
        inputPol.appendChild(option);
        option = document.createElement("option");
        option.innerHTML = "Ženski";
        inputPol.appendChild(option);
        divLabel1 = document.createElement("div");
        divLabel1.className="divDugmeReg";
        labela1 = document.createElement("label"); 
        labela1.innerHTML = "Pol";
        divLog.appendChild(divLabel1);
        divLabel1.appendChild(labela1);
        divLabel2 = document.createElement("div");
        divLog.appendChild(divLabel2);
        divLabel2.appendChild(inputPol);

        let inputUsername = document.createElement("input");
        inputUsername.className="divDugmeReg";
        inputUsername.type = "text";
        let inputVisina = document.createElement("input");
        inputVisina.className="divDugmeReg";
        inputVisina.type = "number";
        divLabel1 = document.createElement("div");
        divLabel1.className="divDugmeReg";
        labela1 = document.createElement("label"); 
        labela1.innerHTML = "Username";
        divLog.appendChild(divLabel1);
        divLabel1.appendChild(labela1);
        divInput1 = document.createElement("div");
        divLog.appendChild(divInput1);
        divInput1.appendChild(inputUsername);
        divLabel2 = document.createElement("div");
        divLabel2.className="divDugmeReg";
        labela2 = document.createElement("label"); 
        labela2.innerHTML = "Visina";
        divLog.appendChild(divLabel2);
        divLabel2.appendChild(labela2);
        divInput2 = document.createElement("div");
        divLog.appendChild(divInput2);
        divInput2.appendChild(inputVisina);

        let inputTezina = document.createElement("input");
        inputTezina.className="divDugmeReg";
        inputTezina.type = "number";
        let inputGodine = document.createElement("input");
        inputGodine.className="divDugmeReg";
        inputGodine.type = "number";
        divLabel1 = document.createElement("div");
        divLabel1.className="divDugmeReg";
        labela1 = document.createElement("label"); 
        labela1.innerHTML = "Težina";
        divLog.appendChild(divLabel1);
        divLabel1.appendChild(labela1);
        divInput1 = document.createElement("div");
        divLog.appendChild(divInput1);
        divInput1.appendChild(inputTezina);
        divLabel2 = document.createElement("div");
        divLabel2.className="divDugmeReg";
        labela2 = document.createElement("label"); 
        labela2.innerHTML = "Godine";
        divLog.appendChild(divLabel2);
        divLabel2.appendChild(labela2);
        divInput2 = document.createElement("div");
        divLog.appendChild(divInput2);
        divInput2.appendChild(inputGodine);

        let divDugme = document.createElement("div");
        divDugme.className="divDugmeReg";
        divLog.appendChild(divDugme);
        divDugme.appendChild(dugmePrijaviSe);


        dugmePrijaviSe.onclick = () => {
            if(inputIme.value == "" || inputIme.value == null || inputIme.value == undefined) {
                alert("Unesite ime");
                return;
            }
            if (inputPrezime.value == "" || inputPrezime.value == null || inputPrezime.value == undefined) {
                alert("Unesite prezime");
                return;
            }
            if(inputUsername.value == "" || inputUsername.value == null || inputUsername.value == undefined) {
                alert("Unesite username");
                return;
            }
            if (inputVisina.value == "" || inputVisina.value == null || inputVisina.value == undefined) {
                alert("Unesite visinu");
                return;
            }
            if(inputTezina.value == "" || inputTezina.value == null || inputTezina.value == undefined) {
                alert("Unesite težinu");
                return;
            }
            if (inputGodine.value == "" || inputGodine.value == null || inputGodine.value == undefined) {
                alert("Unesite godine");
                return;
            }
            fetch("https://localhost:7015/Korisnik/DodajKorisnika/" + inputIme.value + "/" + inputPrezime.value + "/" + inputPol.value + "/" + inputUsername.value + "/" + inputGodine.value + "/" + inputTezina.value + "/" + inputVisina.value,
            {
                method:"POST",
            })
            .then(p => {
                if(p.status == 200){
                    window.location.href = "./glavna.html";
                }
                else {
                    p.text().then(data => {
                        alert(data);
                    })
                }
            })
        }

        


    }
}