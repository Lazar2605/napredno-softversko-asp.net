export class Korisnik {
    constructor(id, ime, prezime, username, visina, tezina, godine) {
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.username = username;
        this.visina = visina;
        this.tezina = tezina;
        this.godine = godine;
    }

    crtaj(host) {
        
        let divUsername = document.createElement("div");
        host.appendChild(divUsername);
        let labelaUsername = document.createElement("label");
        labelaUsername.innerHTML = "Username: " + this.username;
        divUsername.appendChild(labelaUsername);
        
    
        let divIme = document.createElement("div");
        host.appendChild(divIme);
        let labelaIme = document.createElement("label");
        labelaIme.innerHTML = "Ime: " + this.ime;
        divIme.appendChild(labelaIme);
        let divPrezime = document.createElement("div");
        host.appendChild(divPrezime);
        let labelaPrezime = document.createElement("label");
        labelaPrezime.innerHTML = "Prezime: " + this.prezime;
        divPrezime.appendChild(labelaPrezime);
        let divGodine = document.createElement("div");
        host.appendChild(divGodine);
        let labelaGodine = document.createElement("label");
        labelaGodine.innerHTML = "Godine: " + this.godine;
        divGodine.appendChild(labelaGodine);
        let dugmeIzmeniGodine = document.createElement("button");
        dugmeIzmeniGodine.innerHTML = "Izmeni";
        divGodine.appendChild(dugmeIzmeniGodine);

        dugmeIzmeniGodine.onclick = () => {
            let divv = document.querySelector(".divGodine2");
            if (divv != null)
                divGodine.removeChild(divv);
            let divGodine2 = document.createElement("div");
            divGodine2.className = "divGodine2";
            divGodine.appendChild(divGodine2);
            let labelaGodine2 = document.createElement("label");
            labelaGodine2.innerHTML = "Nove godine";
            let inputNoveGodine = document.createElement("input");
            inputNoveGodine.type = "number";
            let dugmePotvrdi = document.createElement("button");
            dugmePotvrdi.innerHTML = "Potvrdi izmenu";
            divGodine2.appendChild(labelaGodine2);
            divGodine2.appendChild(inputNoveGodine);
            divGodine2.appendChild(dugmePotvrdi);
            dugmePotvrdi.onclick = () => {

                if (inputNoveGodine.value == "" || inputNoveGodine.value == null || inputNoveGodine.value == undefined) {
                    alert("Unesite nove godine");
                    return;
                }
                fetch("https://localhost:7015/Korisnik/IzmeniGodineKorisnika/" + this.username + "/" + inputNoveGodine.value,
                {
                    method:"PUT",
                })
                .then(p => {
                    if(p.status == 200){
                        p.text().then(data => {
                            alert(data);
                            labelaGodine.innerHTML = "Godine: " + inputNoveGodine.value;
                            divGodine2.removeChild(labelaGodine2);
                            divGodine2.removeChild(inputNoveGodine);
                            divGodine2.removeChild(dugmePotvrdi);
                        })
                    }
                    else {
                        p.text().then(data => {
                            alert(data);
                        })
                    }
                })
            }

        }

        let divVisina = document.createElement("div");
        host.appendChild(divVisina);
        let labelaVisina = document.createElement("label");
        labelaVisina.innerHTML = "Visina: " + this.visina;
        divVisina.appendChild(labelaVisina);
        let dugmeIzmeniVisinu = document.createElement("button");
        dugmeIzmeniVisinu.innerHTML = "Izmeni";
        divVisina.appendChild(dugmeIzmeniVisinu);

        dugmeIzmeniVisinu.onclick = () => {
            let divv = document.querySelector(".divVisina2");
            if (divv != null)
                divVisina.removeChild(divv);
            let divVisina2 = document.createElement("div");
            divVisina2.className = "divVisina2";
            divVisina.appendChild(divVisina2);
            let labelaVisina2 = document.createElement("label");
            labelaVisina2.innerHTML = "Nova visina";
            let inputNovaVisina = document.createElement("input");
            inputNovaVisina.type = "number";
            let dugmePotvrdi = document.createElement("button");
            dugmePotvrdi.innerHTML = "Potvrdi izmenu";
            divVisina2.appendChild(labelaVisina2);
            divVisina2.appendChild(inputNovaVisina);
            divVisina2.appendChild(dugmePotvrdi);
            dugmePotvrdi.onclick = () => {
                if (inputNovaVisina.value == "" || inputNovaVisina.value == null || inputNovaVisina.value == undefined) {
                    alert("Unesite novu visinu");
                    return;
                }
                console.log(this.username);
                fetch("https://localhost:7015/Korisnik/IzmeniVisinuKorisnika/" + this.username + "/" + inputNovaVisina.value,
                {
                    method:"PUT",
                })
                .then(p => {
                    if(p.status == 200){
                        p.text().then(data => {
                            alert(data);
                            labelaVisina.innerHTML = "Godine: " + inputNovaVisina.value;
                            divVisina2.removeChild(labelaVisina2);
                            divVisina2.removeChild(inputNovaVisina);
                            divVisina2.removeChild(dugmePotvrdi);
                        })
                    }
                    else {
                        p.text().then(data => {
                            alert(data);
                        })
                    }
                })
            }

        }

        let divTezina = document.createElement("div");
        host.appendChild(divTezina);
        let labelaTezina = document.createElement("label");
        labelaTezina.innerHTML = "Težina: " + this.tezina;
        divTezina.appendChild(labelaTezina);
        let dugmeIzmeniTezinu = document.createElement("button");
        dugmeIzmeniTezinu.innerHTML = "Izmeni";
        divTezina.appendChild(dugmeIzmeniTezinu);

        dugmeIzmeniTezinu.onclick = () => {
            let divv = document.querySelector(".divTezina2");
            if (divv != null)
                divTezina.removeChild(divv);
            let divTezina2 = document.createElement("div");
            divTezina2.className = "divTezina2";
            divTezina.appendChild(divTezina2);
            let labelaTezina2 = document.createElement("label");
            labelaTezina2.innerHTML = "Nova težina";
            let inputNovaTezina = document.createElement("input");
            inputNovaTezina.type = "number";
            let dugmePotvrdi = document.createElement("button");
            dugmePotvrdi.innerHTML = "Potvrdi izmenu";
            divTezina2.appendChild(labelaTezina2);
            divTezina2.appendChild(inputNovaTezina);
            divTezina2.appendChild(dugmePotvrdi);
            dugmePotvrdi.onclick = () => {
                if (inputNovaTezina.value == "" || inputNovaTezina.value == null || inputNovaTezina.value == undefined) {
                    alert("Unesite novu težinu");
                    return;
                }
                fetch("https://localhost:7015/Korisnik/IzmeniTezinuKorisnika/" + this.username + "/" + inputNovaTezina.value,
                {
                    method:"PUT",
                })
                .then(p => {
                    if(p.status == 200){
                        p.text().then(data => {
                            alert(data);
                            labelaTezina.innerHTML = "Godine: " + inputNovaTezina.value;
                            divTezina2.removeChild(labelaTezina2);
                            divTezina2.removeChild(inputNovaTezina);
                            divTezina2.removeChild(dugmePotvrdi);
                        })
                    }
                    else {
                        pp.text().then(data => {
                            alert(data);
                        })
                    }
                })
            }

        }
    
        
    }
}