import { Ishrana } from "./Ishrana.js";
import { Korisnik } from "./Korisnik.js";
import { Trening } from "./Trening.js";

let divProfil = document.createElement("div");
document.body.appendChild(divProfil);
let dugmeProfil = document.createElement("button");
dugmeProfil.innerHTML = "Profil";
divProfil.appendChild(dugmeProfil);
let divProfilTab = document.createElement("div");
divProfilTab.className = "divProfilTab";
divProfil.appendChild(divProfilTab);

dugmeProfil.onclick = () => {
    crtajFormu("profil");
}

let divIshrana = document.createElement("div");
document.body.appendChild(divIshrana);
let dugmeIshrana = document.createElement("button");
dugmeIshrana.innerHTML = "Ishrana";
dugmeIshrana.className = "dugmeIshrana";
divIshrana.appendChild(dugmeIshrana);
let divIshranaTab = document.createElement("div");
divIshranaTab.className = "divIshranaTab";
let dugmePovuci = document.createElement("button");
dugmePovuci.innerHTML = "^";
divIshrana.appendChild(dugmePovuci);
divIshrana.appendChild(divIshranaTab);


dugmePovuci.onclick = () => {
    divIshranaTab.innerHTML = "";
}



dugmeIshrana.onclick = () => {
    divIshranaTab.innerHTML = "";
    let divDugmici = document.createElement("div");
    divIshranaTab.appendChild(divDugmici);

    let divDugmeDodajIsh = document.createElement("div");
    divDugmici.appendChild(divDugmeDodajIsh);
    let dugmeDodajIsh = document.createElement("button");
    dugmeDodajIsh.innerHTML = "Dodaj ishranu";
    divDugmeDodajIsh.appendChild(dugmeDodajIsh);

    dugmeDodajIsh.onclick = () => {
        crtajFormu("dodajIshranu");
    }   
    
    let divDugmeDodajRec = document.createElement("div");
    divDugmici.appendChild(divDugmeDodajRec);
    let dugmeDodajRec = document.createElement("button");
    dugmeDodajRec.innerHTML = "Dodaj recept";
    divDugmeDodajRec.appendChild(dugmeDodajRec);

    dugmeDodajRec.onclick = () => {
        crtajFormu("dodajRecept");
    }

    let divDugmeDodajNam = document.createElement("div");
    divDugmici.appendChild(divDugmeDodajNam);
    let dugmeDodajNam = document.createElement("button");
    dugmeDodajNam.innerHTML = "Dodaj namirnicu";
    divDugmeDodajNam.appendChild(dugmeDodajNam);

    dugmeDodajNam.onclick = () => {
        crtajFormu("dodajNamirnicu");
    }

    fetch("https://localhost:7015/Ishrana/VratiIshranu",
    {
        method:"GET",
    })
    .then(p => {
        if(p.status == 200){
            p.json().then(ishrana=> {

                ishrana.forEach(ish => {
                    
                    let i = new Ishrana(ish.id, ish.datum);
                    divIshranaTab.className = "divIshranaTab";
                    i.crtaj(divIshranaTab);


                });
           

            })
        }
        else {
            p.text().then(data => {
                alert(data);
            })
        }
    })
}

let divTrening = document.createElement("div");
document.body.appendChild(divTrening);
let dugmeTrening = document.createElement("button");
dugmeTrening.innerHTML = "Trening";
dugmeTrening.className = "dugmeTrening";
divTrening.appendChild(dugmeTrening);
let divTreningTab = document.createElement("div");
divTreningTab.className = "divTreningTab";
let dugmePovuci2 = document.createElement("button");
dugmePovuci2.innerHTML = "^";
divTrening.appendChild(dugmePovuci2);
divTrening.appendChild(divTreningTab);


dugmePovuci2.onclick = () => {
    divTreningTab.innerHTML = "";
}



dugmeTrening.onclick = () => {
    divTreningTab.innerHTML = "";
    let divDugmici = document.createElement("div");
    divTreningTab.appendChild(divDugmici);

    let divDugmeDodajTre = document.createElement("div");
    divDugmici.appendChild(divDugmeDodajTre);
    let dugmeDodajTre = document.createElement("button");
    dugmeDodajTre.innerHTML = "Dodaj trening";
    divDugmeDodajTre.appendChild(dugmeDodajTre);

    dugmeDodajTre.onclick = () => {
        crtajFormu("dodajTrening");
    }   
    
    let divDugmeDodajVez = document.createElement("div");
    divDugmici.appendChild(divDugmeDodajVez);
    let dugmeDodajVez = document.createElement("button");
    dugmeDodajVez.innerHTML = "Dodaj vežbu";
    divDugmeDodajVez.appendChild(dugmeDodajVez);

    dugmeDodajVez.onclick = () => {
        crtajFormu("dodajVezbu");
    }

    fetch("https://localhost:7015/Trening/VratiSveTreninge",
    {
        method:"GET",
    })
    .then(p => {
        if(p.status == 200){
            p.json().then(treninzi=> {

                treninzi.forEach(trening => {
                    
                    let t = new Trening(trening.id, trening.datum, trening.opis);
                    divTreningTab.className = "divTreningTab";
                    t.crtaj(divTreningTab);
                });
            })
        }
        else {
            p.text().then(data => {
                alert(data);
            })
        }
    })
}

function crtajFormu(flag){

    let zaBrisanje = document.querySelector(".profil");
    if(zaBrisanje != null){
        zaBrisanje.parentNode.removeChild(zaBrisanje);
    }
    let divGlavni = document.createElement("div");
    if (flag == "profil")
        divGlavni.classList.add("profil");
    else if (flag == "dodajIshranu")
        divGlavni.classList.add("dodajIshranu");
    else if (flag == "dodajNamirnicu")
        divGlavni.classList.add("dodajNamirnicu");
    else if (flag == "dodajRecept")
        divGlavni.classList.add("dodajRecept");
    else if (flag == "dodajTrening")
        divGlavni.classList.add("dodajTrening");
    else if (flag == "dodajVezbu")
        divGlavni.classList.add("dodajVezbu");
    
    document.body.appendChild(divGlavni);

    let divForma = document.createElement("div");
    divForma.classList.add("formaProfil");
    divGlavni.appendChild(divForma);

    let zatvori = document.createElement("div");
    zatvori.classList.add("zatvori");
    zatvori.innerHTML = "+";
    divForma.appendChild(zatvori);
    zatvori.onclick = () => {
        divGlavni.parentNode.removeChild(divGlavni);
    }

    let naslov = document.createElement("h1");
    if (flag == "profil")
        naslov.innerHTML = "Profil";
    else if (flag == "dodajIshranu")
        naslov.innerHTML = "Dodaj ishranu";
    else if (flag == "dodajNamirnicu")
        naslov.innerHTML = "Dodaj namirnicu";
    else if (flag == "dodajRecept")
        naslov.innerHTML = "Dodaj recept";
    else if (flag == "dodajTrening")
        naslov.innerHTML = "Dodaj trening";
    else if (flag == "dodajVezbu")
        naslov.innerHTML = "Dodaj vežbu";
    naslov.className = "naslovProfil"
    divForma.appendChild(naslov);

    let podaci = document.createElement("div");
    podaci.classList.add("podacii");
    divForma.appendChild(podaci);

    let host = document.createElement("div");
    host.className = "profill";
    podaci.appendChild(host);

    if (flag == "profil"){
        crtajProfil(host);
    }
    else if (flag == "dodajIshranu"){
        crtajDodajIshranu(host);
    }
    else if (flag == "dodajNamirnicu"){
        crtajDodajNamirnicu(host);
    }
    else if (flag == "dodajRecept"){
        crtajDodajRecept(host);
    }
    else if (flag == "dodajTrening"){
        crtajDodajTrening(host);
    }
    else if (flag == "dodajVezbu"){
        crtajDodajVezbu(host);
    }
}

function crtajProfil(divForma) {

    fetch("https://localhost:7015/Korisnik/VratiKorisnika",
    {
        method:"GET",
    })
    .then(p => {
        if(p.status == 200){
            p.json().then(korisnici => {
                korisnici.forEach(korisnik => {
                    var k = new Korisnik(korisnik.id,korisnik.ime, korisnik.prezime, korisnik.username, korisnik.visina, korisnik.tezina, korisnik.godine);
                    k.crtaj(divForma);
                });
            })
        }
        else {
            pp.text().then(data => {
                alert(data);
            })
        }
    })

}

function crtajDodajIshranu(host) {

    let divDatum = document.createElement("div");
    host.appendChild(divDatum);
    let labelaDatum = document.createElement("label");
    labelaDatum.innerHTML = "Datum: ";
    divDatum.appendChild(labelaDatum);

    let inputDatum = document.createElement("input");
    inputDatum.type = "date";
    var now = new Date();
    
    var month = (now.getMonth() + 1);               
    var day = now.getDate();
    if (month < 10) 
        month = "0" + month;
    if (day < 10) {
        day = "0" + day;
    }
    var today = now.getFullYear() + '-' + month + '-' + day ;
    inputDatum.value = today;
    divDatum.appendChild(inputDatum);

    for(let i = 0; i < 3; i++) {
        let divRecepti = document.createElement("div");
        host.appendChild(divRecepti);
        let divRec = document.createElement("div");
        divRecepti.appendChild(divRec);
        let labelaRec = document.createElement("label");
        labelaRec.innerHTML = "Izaberi " + (i+1) + ". obrok";
        divRec.appendChild(labelaRec);
        let inputRec = document.createElement("select");
        inputRec.className = "op";
        fetch("https://localhost:7015/Recept/VratiSveRecepte",
        {
            method:"GET",
        })
        .then(p => {
            if(p.status == 200){
                p.json().then(recepti => {
                    recepti.forEach(recept => {
                        let option = document.createElement("option");
                        option.innerHTML = recept.naziv;
                        inputRec.appendChild(option);
                        divRec.appendChild(inputRec);
                    });
                })
            }
            else {
                pp.text().then(data => {
                    alert(data);
                })
            }
        })
    }

    let divDugmeDodaj = document.createElement("div");
    host.appendChild(divDugmeDodaj);
    let dugmeDodaj = document.createElement("button");
    dugmeDodaj.innerHTML = "Dodaj ishranu";
    divDugmeDodaj.appendChild(dugmeDodaj);

    
    dugmeDodaj.onclick = () => {
        let receptiSel = document.querySelectorAll(".op");
        let recepti = [receptiSel[0].value, receptiSel[1].value, receptiSel[2].value];
        let datumi = inputDatum.value.split("-");
        let izabranDatum = datumi[2] + "." + datumi[1] + "." + datumi[0] + ".";
        fetch("https://localhost:7015/Ishrana/DodajIshranu/" + izabranDatum,
        {
            method:"POST",
            headers:
            {
                "Accept": "application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(recepti)
        })
        .then(p => {
            if(p.status == 200){
                p.text().then(data => {
                    alert(data);
                    let zat = document.querySelector(".zatvori");
                    zat.click();
                    zat = document.querySelector(".dugmeIshrana");
                    zat.click();
                    
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

function crtajDodajNamirnicu(host) {

    let divTip = document.createElement("div");
    host.appendChild(divTip);
    let labelaTip = document.createElement("label");
    labelaTip.innerHTML = "Tip: ";
    divTip.appendChild(labelaTip);
    let inputTip = document.createElement("select");

    let tipovi = ["povrće", "voće", "začin", "orašasti plod", "mlečni proizvod", "meso", "testenina", "ostalo"];
    tipovi.forEach(tip=> {
        let option = document.createElement("option");
        option.innerHTML = tip;
        inputTip.appendChild(option);
    })
    divTip.appendChild(inputTip);

    let divNaziv = document.createElement("div");
    host.appendChild(divNaziv);
    let labelaNaziv = document.createElement("label");
    labelaNaziv.innerHTML = "Naziv: ";
    divNaziv.appendChild(labelaNaziv);
    let inputNaziv = document.createElement("input");
    inputNaziv.type = "text";
    divNaziv.appendChild(inputNaziv);

    let divProteini = document.createElement("div");
    host.appendChild(divProteini);
    let labelaProteini = document.createElement("label");
    labelaProteini.innerHTML = "Proteini: ";
    divProteini.appendChild(labelaProteini);
    let inputProteini = document.createElement("input");
    inputProteini.type = "number";
    divProteini.appendChild(inputProteini);

    let divMasti = document.createElement("div");
    host.appendChild(divMasti);
    let labelaMasti = document.createElement("label");
    labelaMasti.innerHTML = "Masti: ";
    divMasti.appendChild(labelaMasti);
    let inputMasti = document.createElement("input");
    inputMasti.type = "number";
    divMasti.appendChild(inputMasti);

    let divUglenjiHidrati = document.createElement("div");
    host.appendChild(divUglenjiHidrati);
    let labelaUgljeniHidrati = document.createElement("label");
    labelaUgljeniHidrati.innerHTML = "Ugljeni hidrati: ";
    divUglenjiHidrati.appendChild(labelaUgljeniHidrati);
    let inputUgljeniHidrati = document.createElement("input");
    inputUgljeniHidrati.type = "number";
    divUglenjiHidrati.appendChild(inputUgljeniHidrati);

    let divKalorije = document.createElement("div");
    host.appendChild(divKalorije);
    let labelaKalorije = document.createElement("label");
    labelaKalorije.innerHTML = "Kalorije: ";
    divKalorije.appendChild(labelaKalorije);
    let inputKalorije = document.createElement("input");
    inputKalorije.type = "number";
    divKalorije.appendChild(inputKalorije);

    let divDugmeDodajNam = document.createElement("div");
    host.appendChild(divDugmeDodajNam);
    let dugmeDodajNamirnicu = document.createElement("button");
    dugmeDodajNamirnicu.innerHTML = "Dodaj namirnicu";
    divDugmeDodajNam.appendChild(dugmeDodajNamirnicu);


    dugmeDodajNamirnicu.onclick = () => {
        if(inputNaziv.value == "" || inputNaziv.value == null || inputNaziv.value == undefined) {
            alert("Unesite naziv");
            return;
        }
        if (inputProteini.value == "" || inputProteini.value == null || inputProteini.value == undefined) {
            alert("Unesite vrednost za proteine");
            return;
        }
        if(inputMasti.value == "" || inputMasti.value == null || inputMasti.value == undefined) {
            alert("Unesite vrednost za masti");
            return;
        }
        if (inputUgljeniHidrati.value == "" || inputUgljeniHidrati.value == null || inputUgljeniHidrati.value == undefined) {
            alert("Unesite vrednost za ugljene hidrate");
            return;
        }
        if(inputKalorije.value == "" || inputKalorije.value == null || inputKalorije.value == undefined) {
            alert("Unesite kaloričnu vrednost");
            return;
        }
        fetch("https://localhost:7015/Namirnica/DodajNamirnicu/" + inputTip.value + "/" + inputNaziv.value + "/" + inputProteini.value + "/" + inputMasti.value + "/" + inputUgljeniHidrati.value + "/" + inputKalorije.value,
        {
            method:"POST",
        })
        .then(p => {
            if(p.status == 200){
                p.text().then(data => {
                    alert(data);
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

function crtajDodajRecept(host) {

    let divNaziv = document.createElement("div");
    host.appendChild(divNaziv);
    let labelaNaziv = document.createElement("label");
    labelaNaziv.innerHTML = "Naziv: ";
    divNaziv.appendChild(labelaNaziv);

    let inputNaziv = document.createElement("input");
    inputNaziv.type = "text";
    divNaziv.appendChild(inputNaziv);

    let divPriprema = document.createElement("div");
    host.appendChild(divPriprema);
    let labelaPriprema = document.createElement("label");
    labelaPriprema.innerHTML = "Priprema: ";
    divPriprema.appendChild(labelaPriprema);

    let inputPriprema = document.createElement("textarea");
    inputPriprema.rows = 5;
    inputPriprema.cols = 40;
    divPriprema.appendChild(inputPriprema);

    let divKalorije = document.createElement("div");
    host.appendChild(divKalorije);
    let labelaKalorije = document.createElement("label");
    labelaKalorije.innerHTML = "Kalorije: ";
    divKalorije.appendChild(labelaKalorije);

    let inputKalorije = document.createElement("input");
    inputKalorije.type = "number";
    divKalorije.appendChild(inputKalorije);

    let divBrNamirnica = document.createElement("div");
    host.appendChild(divBrNamirnica);
    let labelaBrNam = document.createElement("label");
    labelaBrNam.innerHTML = "Broj namirnica: ";
    divBrNamirnica.appendChild(labelaBrNam);
    let inputBrNam = document.createElement("select");
    for(let i = 0; i < 20; i++) {
        let option = document.createElement("option");
        option.innerHTML = i + 1;
        inputBrNam.appendChild(option);
    }
    divBrNamirnica.appendChild(inputBrNam);

    inputBrNam.onchange = () => {
        let divNam = document.querySelector(".divNam");
        if(divNam != null)
            divBrNamirnica.removeChild(divNam);
        let divNamirnice = document.createElement("div");
        divNamirnice.className = "divNam";
        divBrNamirnica.appendChild(divNamirnice);
        for(let i = 0; i < inputBrNam.value; i++) {
            let divNamirnica = document.createElement("div");
            divNamirnice.appendChild(divNamirnica);
            let labelNam = document.createElement("label");
            labelNam.innerHTML = "Namirnica " + (i+1) + ":";
            divNamirnica.appendChild(labelNam);
            let inputNam = document.createElement("select");
            inputNam.className = "opNam";

            fetch("https://localhost:7015/Namirnica/VratiSveNamirnice",
            {
                method:"GET",
            })
            .then(p => {
                if(p.status == 200){
                    p.json().then(namirnice => {
                        namirnice.forEach(namirnica => {
                            let option = document.createElement("option");
                            option.innerHTML = namirnica.naziv;
                            inputNam.appendChild(option);
                            divNamirnica.appendChild(inputNam);
                        });
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

    let divDugmeDodaj = document.createElement("div");
    host.appendChild(divDugmeDodaj);
    let dugmeDodaj = document.createElement("button");
    dugmeDodaj.innerHTML = "Dodaj recept";
    divDugmeDodaj.appendChild(dugmeDodaj);
    
    dugmeDodaj.onclick = () => {
        let namirniceSel = document.querySelectorAll(".opNam");
        let namirnice = [];
        namirniceSel.forEach(namSel => {
            namirnice.push(namSel.value);
        })

        if(inputNaziv.value == "" || inputNaziv.value == null || inputNaziv.value == undefined) {
            alert("Unesite naziv");
            return;
        }
        if (inputPriprema.value == "" || inputPriprema.value == null || inputPriprema.value == undefined) {
            alert("Unesite način pripreme");
            return;
        }
        if(inputKalorije.value == "" || inputKalorije.value == null || inputKalorije.value == undefined) {
            alert("Unesite kaloričnu vrednost");
            return;
        }

        fetch("https://localhost:7015/Recept/DodajRecept/" + inputNaziv.value + "/" + inputPriprema.value + "/" + inputKalorije.value,
        {
            method:"POST",
            headers:
            {
                "Accept": "application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(namirnice)
        })
        .then(p => {
            if(p.status == 200){
                p.text().then(data => {
                    alert(data);
                    
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

function crtajDodajTrening(host) {

    let divDatum = document.createElement("div");
    host.appendChild(divDatum);
    let labelaDatum = document.createElement("label");
    labelaDatum.innerHTML = "Datum: ";
    divDatum.appendChild(labelaDatum);

    let inputDatum = document.createElement("input");
    inputDatum.type = "date";
    var now = new Date();
    
    var month = (now.getMonth() + 1);               
    var day = now.getDate();
    if (month < 10) 
        month = "0" + month;
    if (day < 10) {
        day = "0" + day;
    }
    var today = now.getFullYear() + '-' + month + '-' + day ;
    inputDatum.value = today;
    divDatum.appendChild(inputDatum);

    let divOpis = document.createElement("div");
    host.appendChild(divOpis);
    let labelaOpis = document.createElement("label");
    labelaOpis.innerHTML = "Opis: ";
    divOpis.appendChild(labelaOpis);

    let inputOpis = document.createElement("textarea");
    inputOpis.rows = 5;
    inputOpis.cols = 40;
    divOpis.appendChild(inputOpis);


    let divBrVezbi = document.createElement("div");
    host.appendChild(divBrVezbi);
    let labelaBrVezbi = document.createElement("label");
    labelaBrVezbi.innerHTML = "Broj vežbi: ";
    divBrVezbi.appendChild(labelaBrVezbi);
    let inputBrVezbi = document.createElement("select");
    for(let i = 0; i < 20; i++) {
        let option = document.createElement("option");
        option.innerHTML = i + 1;
        inputBrVezbi.appendChild(option);
    }
    divBrVezbi.appendChild(inputBrVezbi);

    inputBrVezbi.onchange = () => {
        let divVez = document.querySelector(".divVez");
        if(divVez != null)
            divBrVezbi.removeChild(divVez);
        let divVezbe = document.createElement("div");
        divVezbe.className = "divVez";
        divBrVezbi.appendChild(divVezbe);
        for(let i = 0; i < inputBrVezbi.value; i++) {
            let divVezba = document.createElement("div");
            divVezbe.appendChild(divVezba);
            let labelVez = document.createElement("label");
            labelVez.innerHTML = "Vežba " + (i+1) + ":";
            divVezba.appendChild(labelVez);
            let inputVez = document.createElement("select");
            inputVez.className = "opVez";

            fetch("https://localhost:7015/Vezba/VratiSveVezbe",
            {
                method:"GET",
            })
            .then(p => {
                if(p.status == 200){
                    p.json().then(vezbe => {
                        vezbe.forEach(vezba => {
                            let option = document.createElement("option");
                            option.innerHTML = vezba.naziv;
                            inputVez.appendChild(option);
                            divVezba.appendChild(inputVez);
                        });
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

    let divDugmeDodaj = document.createElement("div");
    host.appendChild(divDugmeDodaj);
    let dugmeDodaj = document.createElement("button");
    dugmeDodaj.innerHTML = "Dodaj trening";
    divDugmeDodaj.appendChild(dugmeDodaj);
    
    dugmeDodaj.onclick = () => {
        let datumi = inputDatum.value.split("-");
        let izabranDatum = datumi[2] + "." + datumi[1] + "." + datumi[0];
        let vezbeSel = document.querySelectorAll(".opVez");
        let vezbe = [];
        vezbeSel.forEach(vezSel => {
            vezbe.push(vezSel.value);
        })

        if(inputOpis.value == "" || inputOpis.value == null || inputOpis.value == undefined) {
            alert("Unesite naziv");
            return;
        }

        fetch("https://localhost:7015/Trening/DodajTrening/" + izabranDatum + "/" + inputOpis.value,
        {
            method:"POST",
            headers:
            {
                "Accept": "application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(vezbe)
        })
        .then(p => {
            if(p.status == 200){
                p.text().then(data => {
                    alert(data);
                    let zat = document.querySelector(".zatvori");
                    zat.click();
                    zat = document.querySelector(".dugmeTrening");
                    zat.click();
                    
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

function crtajDodajVezbu(host) {

    let divNaziv = document.createElement("div");
    host.appendChild(divNaziv);
    let labelaNaziv = document.createElement("label");
    labelaNaziv.innerHTML = "Naziv: ";
    divNaziv.appendChild(labelaNaziv);
    let inputNaziv = document.createElement("input");
    inputNaziv.type = "text";
    divNaziv.appendChild(inputNaziv);

    let divDugmeDodajVez = document.createElement("div");
    host.appendChild(divDugmeDodajVez);
    let dugmeDodajVezbu = document.createElement("button");
    dugmeDodajVezbu.innerHTML = "Dodaj vežbu";
    divDugmeDodajVez.appendChild(dugmeDodajVezbu);


    dugmeDodajVezbu.onclick = () => {
        if(inputNaziv.value == "" || inputNaziv.value == null || inputNaziv.value == undefined) {
            alert("Unesite naziv");
            return;
        }
        fetch("https://localhost:7015/Vezba/DodajVezbu/" + inputNaziv.value,
        {
            method:"POST",
        })
        .then(p => {
            if(p.status == 200){
                p.text().then(data => {
                    alert(data);
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
