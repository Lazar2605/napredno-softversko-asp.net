using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using Model;

namespace MyAPIProject.Controllers;

[ApiController]
[Route("[controller]")]
public class ReceptController : ControllerBase
{
    

    private readonly ILogger<ReceptController> _logger;

    public ReceptController(ILogger<ReceptController> logger)
    {
        _logger = logger;
    }

   
    [HttpGet]
    [Route("VratiSveRecepte")]
    public async Task<ActionResult> VratiSveRecepte()
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var recepti = db.GetCollection<Recept>("recepti");
        var receptii = await recepti.Find(_ => true).ToListAsync();

        return Ok(receptii);
    }
    [HttpDelete]
    [Route("IzbrisiRecept/{naziv}")]
    public async Task<ActionResult> IzbrisiRecept(string naziv)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
        //var server = client.GetServer();
            
        var db = client.GetDatabase("NotesDB");

        var recepti = db.GetCollection<Recept>("recepti");
        var namirnice = db.GetCollection<Namirnica>("namirnice");
        var ishrana = db.GetCollection<Ishrana>("ishrana");

        var query = Builders<Recept>.Filter.Eq("Naziv", naziv);
        Recept r = await recepti.Find(x => x.Naziv == naziv).FirstOrDefaultAsync();
        if(r == null) 
        {
            return BadRequest("Ne postoji recept");
        }

        var rcp = new MongoDBRef("recepti", r.Id);
       
        List<Namirnica> listaNam = new List<Namirnica>();

        foreach (MongoDBRef nam in r.Namirnice.ToList())
        {
            Namirnica n = await namirnice.Find(dbRef => dbRef.Id == nam.Id).FirstOrDefaultAsync();
            //Namirnica n = db.FetchDBRefAs<Namirnica>(nam);
            listaNam.Add(n);
            var namm = Builders<Namirnica>.Filter.Eq("Naziv", n.Naziv);
            await namirnice.DeleteOneAsync(namm);
        }
        foreach(Namirnica n in listaNam)
        {

            n.Recepti.Remove(rcp);
            await namirnice.InsertOneAsync(n);

        }

        List<Ishrana> listaIshrana = new List<Ishrana>();

        foreach (MongoDBRef ish in r.Ishrana.ToList())
        {
            Ishrana i = await ishrana.Find(dbRef => dbRef.Id == ish.Id).FirstOrDefaultAsync();
            //Ishrana i = db.FetchDBRefAs<Ishrana>(ish);
            listaIshrana.Add(i);
            var ish2 = Builders<Ishrana>.Filter.Eq("Datum", i.Datum);
            await ishrana.DeleteOneAsync(ish2);
        }
        foreach(Ishrana ii in listaIshrana)
        {

            ii.Recepti.Remove(rcp);
            await ishrana.InsertOneAsync(ii);

        }
        await recepti.DeleteOneAsync(query);
        
        return Ok("Uspešno izbrisan recept");
    }

    [HttpPost]
    [Route("DodajRecept/{receptNaziv}/{priprema}/{kalorije}")]
    public async Task<ActionResult> DodajRecept(string receptNaziv, string priprema, double kalorije, [FromBody] string[] ListaNamirnica)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
        //var server = client.GetServer();
            
        var db = client.GetDatabase("NotesDB");

        var recepti = db.GetCollection<Recept>("recepti");
        Recept r = new Recept
        {
            Naziv = receptNaziv,
            Priprema = priprema,
            Kalorije = kalorije,
            Namirnice = new List<MongoDBRef>()
            
        };
        var namirnicee = db.GetCollection<Namirnica>("namirnice");
        foreach (string nam in ListaNamirnica)
        {
            Namirnica n = await namirnicee.Find(x => x.Naziv == nam).FirstOrDefaultAsync();
            if(n == null)
                BadRequest("Ne postoji namirnica "+ nam);
        }
        await recepti.InsertOneAsync(r);
        var queryR = Builders<Recept>.Filter.Eq("Naziv", receptNaziv);
        foreach (string nam in ListaNamirnica)
        {
            var queryN = Builders<Namirnica>.Filter.Eq("Naziv", nam);
            Namirnica n = await namirnicee.Find(x => x.Naziv == nam).FirstOrDefaultAsync();
            n.Recepti.Add(new MongoDBRef("recepti", r.Id));  
            r.Namirnice.Add(new MongoDBRef("namirnice", n.Id));
            await namirnicee.DeleteOneAsync(queryN);
            await namirnicee.InsertOneAsync(n);
        }
        await recepti.DeleteOneAsync(queryR);
        await recepti.InsertOneAsync(r);
        return Ok("Uspešno dodat recept");
    }

    [HttpGet]
    [Route("VratiSveNamirniceZaRecept/{receptNaziv}")]
    public async Task<ActionResult> VratiSveNamirniceZaRecept(string receptNaziv)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
        //var server = client.GetServer();
            
        var db = client.GetDatabase("NotesDB");

        var recepti = db.GetCollection<Recept>("recepti");
        var namirnice = db.GetCollection<Namirnica>("namirnice");

        //var queryR = Query.EQ("Naziv", receptNaziv);
        Recept r = await recepti.Find(x => x.Naziv == receptNaziv).FirstOrDefaultAsync();
        if(r == null)
        {
            return BadRequest("Ne postoji recept");
        }
        List<Namirnica> listaNam = new List<Namirnica>();

        foreach (MongoDBRef nam in r.Namirnice.ToList())
        {
            Namirnica n = await namirnice.Find(dbRef => dbRef.Id == nam.Id).FirstOrDefaultAsync();
            listaNam.Add(n);
        }

        return Ok(listaNam);
    }

    
    [HttpGet]
    [Route("VratiSveRecepteKojiSadrzeNamirnicu/{namirnicaNaziv}")]
    public async Task<ActionResult> VratiSveRecepteKojiSadrzeNamirnicu(string namirnicaNaziv)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
          
        var db = client.GetDatabase("NotesDB");

        var namirnice = db.GetCollection<Namirnica>("namirnice");
        var recepti = db.GetCollection<Recept>("recepti");

        Namirnica n = await namirnice.Find(x => x.Naziv == namirnicaNaziv).FirstOrDefaultAsync();
        if(n == null)
        {
            return BadRequest("Ne postoji namirnica");
        }
        List<Recept> listaRec = new List<Recept>();

        foreach (MongoDBRef rcp in n.Recepti.ToList())
        {
            Recept r = await recepti.Find(dbRef => dbRef.Id == rcp.Id).FirstOrDefaultAsync();
            listaRec.Add(r);
        }

        return Ok(listaRec);
    }
    [HttpGet]
    [Route("VratiSveRecepteKalorije/{viseod}/{doo}")]
    public async Task<ActionResult> VratiSveRecepteKalorije(double viseod,double doo)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
        //var server = client.GetServer();
            
        var db = client.GetDatabase("NotesDB");
        //var query = Query.And(Query.LT("Kalorije", doo),Query.GT("Kalorije", viseod));
        var recepti = db.GetCollection<Recept>("recepti");
        var receptii = await recepti.Find(x => x.Kalorije < doo && x.Kalorije > viseod).ToListAsync();

        return Ok(receptii);
    }


  
    
}