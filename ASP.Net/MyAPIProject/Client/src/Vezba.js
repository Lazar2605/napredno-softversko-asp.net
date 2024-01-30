export class Vezba {
    constructor(id, naziv) {
        this.id = id;
        this.naziv = naziv;
    }

    crtajNaziv(host, ind) {

        if (ind == 0) {
            let labelaVez = document.createElement("label")
            labelaVez.innerHTML = this.naziv;
            host.appendChild(labelaVez);
            
        }
        else {
            let labelZarez = document.createElement("label");
            labelZarez.innerHTML = ", ";
            host.appendChild(labelZarez);
            let labelaVez = document.createElement("label")
            labelaVez.innerHTML = this.naziv;
            host.appendChild(labelaVez);

        }
    }
    
}