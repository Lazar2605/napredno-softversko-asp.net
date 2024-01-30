import { Vezba } from "./Vezba.js";
export class Trening {
    constructor(id, datum, opis) {
        this.id = id;
        this.datum = datum;
        this.opis = opis;
    }

    crtaj(host) {
        let divv = document.querySelector(".trening");
        if (divv != null)
            host.removeChild(divv);
        fetch("https://localhost:7015/Trening/VratiSveVezbeZaTrening/" + this.datum)
        .then(pp => {
            if(pp.status == 200){
                pp.json().then(vezbe => {
                    let divVezbe = document.createElement("div");
                    let divTre = document.createElement("div");
                    divTre.className = "trening";
                    host.appendChild(divTre);
                    let labelaTre = document.createElement("label");
                    labelaTre.innerHTML = this.datum;
                    divTre.appendChild(labelaTre);
                    let divTre2 = document.createElement("div");
                    divTre.appendChild(divTre2);
                    let labelaTre2 = document.createElement("label");
                    labelaTre2.innerHTML = "------------------------";
                    divTre2.appendChild(labelaTre2);
                    divTre.appendChild(divVezbe);
                    let divVezbeL = document.createElement("div");
                    divTre.appendChild(divVezbeL);
                    let labelaVez = document.createElement("label");
                    labelaVez.innerHTML = "Vežbe: ";
                    divVezbeL.appendChild(labelaVez);
                    let divLabOP = document.createElement("div");
                    divTre.appendChild(divLabOP);
                    let labelaOp = document.createElement("label");
                    labelaOp.innerHTML = "Opis: ";
                    divLabOP.appendChild(labelaOp);
                    let op = this.opis.split(" ");
                    for(let i = 0; i < op.length; i++) {
                        if(i % 6 == 0) {
                            if(i + 6 < op.length) {
                                let divOpis = document.createElement("div");
                                divLabOP.appendChild(divOpis);
                                let labelaOpis = document.createElement("label");
                                labelaOpis.innerHTML = op[i] + " " + op[i + 1] + " " + op[i + 2] + " " + op[i + 3] + " " + op[i + 4] + " " + op[i + 5];
                                divOpis.appendChild(labelaOpis);
                            }
                            else {
                                let labelaOpis = document.createElement("label");
                                labelaOpis.innerHTML = "";
                                for (let j = i; j < op.length; j++) {
            
                                    let divOpis = document.createElement("div");
                                    divLabOP.appendChild(divOpis);
                                    labelaOpis.innerHTML += op[j] + " " ;
                                    divOpis.appendChild(labelaOpis);
                                }
                            }
                        }
                        
                    }

                    vezbe.forEach((vezba, ind) => {
                        
                        var v = new Vezba(vezba.id, vezba.naziv);
                        v.crtajNaziv(divVezbeL, ind);
                        
                    });
                    let divDugmeBrisi = document.createElement("div");
                    divTre.appendChild(divDugmeBrisi);
                    let dugmeBrisi = document.createElement("button");
                    dugmeBrisi.innerHTML = "Obriši trening";
                    divDugmeBrisi.appendChild(dugmeBrisi);

                    dugmeBrisi.onclick = () => {
                        fetch("https://localhost:7015/Trening/IzbrisiTrening/" + this.datum,
                        {
                            method:"DELETE",
                        })
                        .then(p => {
                            if(p.status == 200){
                                p.text().then(data=> {
                                    alert(data);
                                    let dugmeTre = document.querySelector(".dugmeTrening");
                                    dugmeTre.click();
                                })
                            }
                            else {
                                p.text().then(data => {
                                    alert(data);
                                })
                            }
                        })
                    }

                })
            }
            else{
                pp.text().then(data => {
                    alert(data);
                })
            }   
        })
    }
}