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
public class TreningController : ControllerBase
{
    

    private readonly ILogger<TreningController> _logger;

    public TreningController(ILogger<TreningController> logger)
    {
        _logger = logger;
    }

   
    [HttpGet]
    [Route("VratiSveTreninge")]
    public async Task<ActionResult> VratiSveTreninge()
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var treninzi = db.GetCollection<Trening>("treninzi");
        var treninzii = await treninzi.Find(_ => true).ToListAsync();

        return Ok(treninzii);
    }
    [HttpDelete]
    [Route("IzbrisiTrening/{datum}")]
    public async Task<ActionResult> IzbrisiTrening(string datum)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var treninzi = db.GetCollection<Trening>("treninzi");
        var vezbe = db.GetCollection<Vezba>("vezbe");
        var query = Builders<Trening>.Filter.Eq("Datum", datum);
        Trening t = await treninzi.Find(x => x.Datum == datum).FirstOrDefaultAsync();
        var tr = new MongoDBRef("treninzi", t.Id);
        if (t == null)
        {
            return BadRequest("Ne postoji trening");
        }
        List<Vezba> listaVezbi = new List<Vezba>();

        foreach (MongoDBRef vez in t.Vezbe.ToList())
        {
            Vezba v = await vezbe.Find(dbRef => dbRef.Id == vez.Id).FirstOrDefaultAsync();
            listaVezbi.Add(v);
            var vv = Builders<Vezba>.Filter.Eq("Naziv", v.Naziv);
            await vezbe.DeleteOneAsync(vv);
        }
        foreach(Vezba vezba in listaVezbi)
        {

            vezba.Treninzi.Remove(tr);
            await vezbe.InsertOneAsync(vezba);

        }

        await treninzi.DeleteOneAsync(query);
        
        return Ok("Uspešno izbrisan terning");
    }
    

    [HttpPost]
    [Route("DodajTrening/{datum}/{opis}")]
    public async Task<ActionResult> DodajTrening(string datum, string opis, [FromBody] string[] ListaVezbi)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var treninzi = db.GetCollection<Trening>("treninzi");
        Trening tt = await treninzi.Find(x => x.Datum == datum).FirstOrDefaultAsync();
        if(tt != null)
            return BadRequest("Već postoji trening za taj dan");

        Trening t = new Trening
        {
            Datum = datum,
            Opis = opis,
            Vezbe = new List<MongoDBRef>()
            
        };


        var vezbe = db.GetCollection<Vezba>("vezbe");
        foreach (string vez in ListaVezbi)
        {
            Vezba v = await vezbe.Find(x => x.Naziv == vez).FirstOrDefaultAsync();
            if (v == null)
                return BadRequest("Ne postoji vežba "+ vez);
        }
        await treninzi.InsertOneAsync(t);
        var query1 = Builders<Trening>.Filter.Eq("Datum", datum);
        
        foreach (string vez in ListaVezbi)
        {
            var query2 = Builders<Vezba>.Filter.Eq("Naziv", vez);
            Vezba v = await vezbe.Find(x => x.Naziv == vez).FirstOrDefaultAsync();
            v.Treninzi.Add(new MongoDBRef("treninzi", t.Id));  
            t.Vezbe.Add(new MongoDBRef("vezbe", v.Id));
            await vezbe.DeleteOneAsync(query2);
            await vezbe.InsertOneAsync(v);
        }
        await treninzi.DeleteOneAsync(query1);
        await treninzi.InsertOneAsync(t); 
        return Ok("Uspešno dodat trening");
    }

    [HttpGet]
    [Route("VratiSveVezbeZaTrening/{datum}")]
    public async Task<ActionResult> VratiSveVezbeZaTrening(string datum)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var treninzi = db.GetCollection<Trening>("treninzi");
        var vezbe = db.GetCollection<Vezba>("vezbe");

        Trening t = await treninzi.Find(x => x.Datum == datum).FirstOrDefaultAsync();
        if(t == null)
        {
            return BadRequest("Ne postoji trening za taj datum");
        }
        List<Vezba> listaVez = new List<Vezba>();

        foreach (MongoDBRef vez in t.Vezbe.ToList())
        {
            Vezba v = await vezbe.Find(dbRef => dbRef.Id == vez.Id).FirstOrDefaultAsync();
            listaVez.Add(v);
        }

        return Ok(listaVez);
    }
    [HttpGet]
    [Route("VratiSveTreningeKojiSadrzeVezbu/{vezbaNaziv}")]
    public async Task<ActionResult> VratiSveTreningeKojiSadrzeVezbu(string vezbaNaziv)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var vezbe = db.GetCollection<Vezba>("vezbe");
        var treninzi = db.GetCollection<Trening>("treninzi");

        //var queryR = Query.EQ("Naziv", vezbaNaziv);
        Vezba v = await vezbe.Find(x => x.Naziv == vezbaNaziv).FirstOrDefaultAsync();
        if(v == null)
        {
            return BadRequest("Ne postoji namirnica");
        }
        List<Trening> listaTr = new List<Trening>();

        foreach (MongoDBRef tr in v.Treninzi.ToList())
        {
            Trening t = await treninzi.Find(dbRef => dbRef.Id == tr.Id).FirstOrDefaultAsync();
            listaTr.Add(t);
        }

        return Ok(listaTr);
    }

    [HttpPut]
    [Route("DodajVezbuZaTrening/{vezba}/{datumTreninga}")]
    public async Task<ActionResult> DodajVezbuZaTrening(string vezba, string datumTreninga)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
        //var server = client.GetServer();
            
        var db = client.GetDatabase("NotesDB");

        var treninzi = db.GetCollection<Trening>("treninzi");
        var vezbe = db.GetCollection<Vezba>("vezbe");

        var queryT = Builders<Trening>.Filter.Eq("Datum", datumTreninga);
        Trening t = await treninzi.Find(x => x.Datum == datumTreninga).FirstOrDefaultAsync();
        if(t  == null)
            return BadRequest("Ne postoji trening za taj dan");

        var queryV = Builders<Vezba>.Filter.Eq("Naziv", vezba);
        Vezba v = await vezbe.Find(x => x.Naziv == vezba).FirstOrDefaultAsync();
        if (v  == null)
            return BadRequest("Ne postoji vežba");
        
        
        v.Treninzi.Add(new MongoDBRef("treninzi", t.Id));  
        t.Vezbe.Add(new MongoDBRef("vezbe", v.Id));
        await vezbe.DeleteOneAsync(queryV);
        await vezbe.InsertOneAsync(v);

        await treninzi.DeleteOneAsync(queryT);
        await treninzi.InsertOneAsync(t); 
        return Ok("Uspešno dodata vežba za trening");
    }
    
}