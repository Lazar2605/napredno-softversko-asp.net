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
using MongoDB.Driver.Core;

namespace MyAPIProject.Controllers;

[ApiController]
[Route("[controller]")]
public class IshranaController : ControllerBase
{
    

    private readonly ILogger<IshranaController> _logger;

    public IshranaController(ILogger<IshranaController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Route("VratiIshranu")]
    public async Task<ActionResult> VratiIshranu()
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var ishrana = db.GetCollection<Ishrana>("ishrana");
        var ish = await ishrana.Find(_ => true).ToListAsync();
        if(ish.Count == 0)
            return BadRequest("Nema ishrane");

        return Ok(ish);
    }

    [HttpDelete]
    [Route("IzbrisiIshranu/{datum}")]
    public async Task<ActionResult> IzbrisiIshranu(string datum)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var ishrana = db.GetCollection<Ishrana>("ishrana");
        var recepti = db.GetCollection<Recept>("recepti");
        var query = Builders<Ishrana>.Filter.Eq("Datum", datum);
        var i = await ishrana.Find(x => x.Datum == datum).FirstOrDefaultAsync();
        var ishr = new MongoDBRef("ishrana", i.Id);
        if (i == null)
        {
            return BadRequest("Ne postoji ishrana");
        }
        List<Recept> listaRecepti = new List<Recept>();

        foreach (MongoDBRef rcp in i.Recepti.ToList())
        {
            Recept r = await recepti.Find(dbRef => dbRef.Id == rcp.Id).FirstOrDefaultAsync();
            listaRecepti.Add(r);
            var rec = Builders<Recept>.Filter.Eq("Naziv", r.Naziv);
            await recepti.DeleteOneAsync(rec);
        }
        foreach(Recept rr in listaRecepti)
        {

            rr.Ishrana.Remove(ishr);
            await recepti.InsertOneAsync(rr);

        }

        await ishrana.DeleteOneAsync(query);
        
        return Ok("Uspešno izbrisana ishrana");
    }

    [HttpPost]
    [Route("DodajIshranu/{datum}")]
    public async Task<ActionResult> DodajIshranu(string datum, [FromBody] string[] ListaRecepata)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var ishrana = db.GetCollection<Ishrana>("ishrana");

        var queryD = Builders<Ishrana>.Filter.Eq("Datum", datum);
        var ii = await ishrana.Find(x => x.Datum == datum).FirstOrDefaultAsync();
        if(ii != null)
            return BadRequest("Već postoji ishrana za taj dan");
        
        Ishrana i = new Ishrana
        {
            Datum = datum,
            Recepti = new List<MongoDBRef>()
            
        };

        var recepti = db.GetCollection<Recept>("recepti");
        foreach (string rec in ListaRecepata)
        {
            Recept r = await recepti.Find(x => x.Naziv == rec).FirstOrDefaultAsync();
            if(r == null)
                return BadRequest("Ne postoji recept "+ rec);
        }
        await ishrana.InsertOneAsync(i);
        var query1 = Builders<Ishrana>.Filter.Eq("Datum", datum);
        
        foreach (string rec in ListaRecepata)
        {
            var query2 = Builders<Recept>.Filter.Eq("Naziv", rec);
            Recept r = await recepti.Find(x => x.Naziv == rec).FirstOrDefaultAsync();
            r.Ishrana.Add(new MongoDBRef("ishrana", i.Id));  
            i.Recepti.Add(new MongoDBRef("recepti", r.Id));
            await recepti.DeleteOneAsync(query2);
            await recepti.InsertOneAsync(r);
        }
        await ishrana.DeleteOneAsync(query1);
        await ishrana.InsertOneAsync(i); 
        return Ok("Uspešno dodata ishrana");
    }

    [HttpGet]
    [Route("VratiSveRecepteIshrane/{datum}")]
    public async Task<ActionResult> VratiSveRecepteIshrane(string datum)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var ishrana = db.GetCollection<Ishrana>("ishrana");
        var recepti = db.GetCollection<Recept>("recepti");

        Ishrana i = await ishrana.Find(x => x.Datum == datum).FirstOrDefaultAsync();
        if(i == null)
        {
            return BadRequest("Ne postoji ishrana za taj datum");
        }
        List<Recept> listaRec = new List<Recept>();

        foreach (MongoDBRef rec in i.Recepti.ToList())
        {
            Recept r = await recepti.Find(dbRef => dbRef.Id == rec.Id).FirstOrDefaultAsync();
            listaRec.Add(r);
        }

        return Ok(listaRec);
    }
    [HttpPut]
    [Route("DodajReceptUIshranu/{recept}/{datumIshrane}")]
    public async Task<ActionResult> DodajReceptUIshranu(string recept, string datumIshrane)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var ishrana = db.GetCollection<Ishrana>("ishrana");
        var recepti = db.GetCollection<Recept>("recepti");

        var queryD = Builders<Ishrana>.Filter.Eq("Datum", datumIshrane);
        Ishrana ii = await ishrana.Find(x => x.Datum == datumIshrane).FirstOrDefaultAsync();
        if(ii  == null)
            return BadRequest("Ne postoji ishrana za taj dan");

        var queryR = Builders<Recept>.Filter.Eq("Naziv", recept);
        Recept r = await recepti.Find(x => x.Naziv == recept).FirstOrDefaultAsync();
        if (r  == null)
            return BadRequest("Ne postoji recept");
        
        
        r.Ishrana.Add(new MongoDBRef("ishrana", ii.Id));  
        ii.Recepti.Add(new MongoDBRef("recepti", r.Id));
        await recepti.DeleteOneAsync(queryR);
        await recepti.InsertOneAsync(r);

        await ishrana.DeleteOneAsync(queryD);
        await ishrana.InsertOneAsync(ii); 
        return Ok("Uspešno dodat recept u ishranu");
    }
    [HttpGet]
    [Route("VratiKalorijskuVrednostIshrane/{datum}")]
    public async Task<ActionResult> VratiKalorijskuVrednostIshrane(string datum)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");
        var ishrana = db.GetCollection<Ishrana>("ishrana");
        var recepti = db.GetCollection<Recept>("recepti");
        Ishrana i = await ishrana.Find(x => x.Datum == datum).FirstOrDefaultAsync();
        if(i  == null)
            return BadRequest("Ne postoji ishrana za taj dan");
        
        List<Recept> listaRec = new List<Recept>();

        foreach (MongoDBRef rec in i.Recepti.ToList())
        {
            Recept r = await recepti.Find(dbRef => dbRef.Id == rec.Id).FirstOrDefaultAsync();
            listaRec.Add(r);
        }
        var suma=0.0;
        foreach(Recept rp in listaRec)
        {
            suma+=rp.Kalorije;
        }

        return Ok(suma);
    }
}