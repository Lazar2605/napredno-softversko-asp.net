import { Recept } from "./Recept.js";
export class Ishrana {
    constructor(id,datum) {
        this.id = id;
        this.datum = datum;
    }

    crtaj(host) {
        let divv = document.querySelector(".ishrana");
        if (divv != null)
            host.removeChild(divv);
        fetch("https://localhost:7015/Ishrana/VratiSveRecepteIshrane/" + this.datum)
        .then(pp => {
            if(pp.status == 200){
                pp.json().then(recepti => {
                    let divRecepti = document.createElement("div");
                    let divIsh = document.createElement("div");
                    divIsh.className = "ishrana";
                    host.appendChild(divIsh);
                    let labelaIsh = document.createElement("label");
                    labelaIsh.innerHTML = this.datum;
                    divIsh.appendChild(labelaIsh);
                    let divIsh2 = document.createElement("div");
                    divIsh.appendChild(divIsh2);
                    let labelaIsh2 = document.createElement("label");
                    labelaIsh2.innerHTML = "------------------------";
                    divIsh2.appendChild(labelaIsh2);
                    divIsh.appendChild(divRecepti);
                    recepti.forEach((recept, ind) => {

                        var r = new Recept(recept.id, recept.naziv, recept.priprema, recept.kalorije);
                        r.crtaj(divRecepti, ind);

                    });
                    let divDugmeBrisi = document.createElement("div");
                    divIsh.appendChild(divDugmeBrisi);
                    let dugmeBrisi = document.createElement("button");
                    dugmeBrisi.innerHTML = "Obriši ishranu";
                    divDugmeBrisi.appendChild(dugmeBrisi);

                    dugmeBrisi.onclick = () => {
                        fetch("https://localhost:7015/Ishrana/IzbrisiIshranu/" + this.datum,
                        {
                            method:"DELETE",
                        })
                        .then(p => {
                            if(p.status == 200){
                                p.text().then(data=> {
                                    alert(data);
                                    let dugmeIsh = document.querySelector(".dugmeIshrana");
                                    dugmeIsh.click();
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