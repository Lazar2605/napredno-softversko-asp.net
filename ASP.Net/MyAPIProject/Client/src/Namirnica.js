export class Namirnica {
    constructor(id, tip, naziv, proteini, masti, ugljeniHidrati, kalorije) {
        this.id = id;
        this.tip = tip;
        this.naziv = naziv;
        this.proteini = proteini;
        this.masti = masti;
        this.ugljeniHidrati = ugljeniHidrati;
        this.kalorije = kalorije;
    }

    crtajNaziv(host, ind) {

        if (ind == 0) {
            let labelaNam = document.createElement("label")
            labelaNam.innerHTML = this.naziv;
            host.appendChild(labelaNam);

            labelaNam.onclick = () => {
                this.crtajFormu("namirnica");
            }
            labelaNam.onmousemove = () => {
                labelaNam.style.cursor = 'pointer';
                labelaNam.style.color = "white";
            }
            labelaNam.onmouseleave = () => {
                labelaNam.style.color = "black";
            }
            
        }
        else {
            let labelZarez = document.createElement("label");
            labelZarez.innerHTML = ", ";
            host.appendChild(labelZarez);
            let labelaNam = document.createElement("label")
            labelaNam.innerHTML = this.naziv;
            host.appendChild(labelaNam);

            labelaNam.onclick = () => {
                this.crtajFormu("namirnica");
            }

            labelaNam.onmousemove = () => {
                labelaNam.style.cursor = 'pointer';
                labelaNam.style.color = "white";
            }
            labelaNam.onmouseleave = () => {
                labelaNam.style.color = "black";
            }
        }
        
    }

    crtajFormu(flag){

        let zaBrisanje = document.querySelector(".profil");
        if(zaBrisanje != null){
            zaBrisanje.parentNode.removeChild(zaBrisanje);
        }
        let divGlavni = document.createElement("div");
        if (flag == "namirnica")
            divGlavni.classList.add("namirnica");
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
        if (flag == "namirnica")
            naslov.innerHTML = "Namirnica: " + this.naziv;

        naslov.className = "naslovProfil"
        divForma.appendChild(naslov);
    
        let podaci = document.createElement("div");
        podaci.classList.add("podacii");
        divForma.appendChild(podaci);
    
        let host = document.createElement("div");
        host.className = "profill";
        podaci.appendChild(host);
    
        if (flag == "namirnica"){
            let divTip = document.createElement("div");
            host.appendChild(divTip);
            let labelaTip = document.createElement("label");
            labelaTip.innerHTML = "Tip: " + this.tip;
            divTip.appendChild(labelaTip);
        
            let divProteini = document.createElement("div");
            host.appendChild(divProteini);
            let labelaProteini = document.createElement("label");
            labelaProteini.innerHTML = "Proteini: " + this.proteini;
            divProteini.appendChild(labelaProteini);

            let divUGH = document.createElement("div");
            host.appendChild(divUGH);
            let labelaUGH = document.createElement("label");
            labelaUGH.innerHTML = "Ugljeni hidrati: " + this.ugljeniHidrati;
            divUGH.appendChild(labelaUGH);

            let divMasti = document.createElement("div");
            host.appendChild(divMasti);
            let labelaMasti = document.createElement("label");
            labelaMasti.innerHTML = "Masti: " + this.masti;
            divMasti.appendChild(labelaMasti);
        }
    }  

}