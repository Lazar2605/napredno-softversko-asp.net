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
public class NamirnicaController : ControllerBase
{
    

    private readonly ILogger<NamirnicaController> _logger;

    public NamirnicaController(ILogger<NamirnicaController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    [Route("DodajNamirnicu/{tip}/{naziv}/{proteini}/{masti}/{ugh}/{kalorije}")]
    public async Task<ActionResult> DodajNamirnicu(string tip,string naziv,double proteini,double masti,double ugh,double kalorije)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var namirnice = db.GetCollection<Namirnica>("namirnice");

        Namirnica n = new Namirnica{Tip=tip,Naziv=naziv,Proteini=proteini,Masti=masti,Ugh=ugh,Kalorije=kalorije};
        await namirnice.InsertOneAsync(n);
        return Ok("Uspešno dodata namirnica");
    }
    [HttpGet]
    [Route("VratiSveNamirnice")]
    public async Task<ActionResult> VratiSveNamirnice()
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var namirnice = db.GetCollection<Namirnica>("namirnice");
        var namirnicee = await namirnice.Find(_ => true).ToListAsync();
        if(namirnicee.Count == 0)
            return BadRequest("Nema namirnica");
        return Ok(namirnicee);
    }
    [HttpDelete]
    [Route("IzbrisiNamirnicu/{naziv}")]
    public async Task<ActionResult> IzbrisiNamirnicu(string naziv)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var namirnice = db.GetCollection<Namirnica>("namirnice");

        var query = Builders<Namirnica>.Filter.Eq("Naziv", naziv);
        Namirnica n = await namirnice.Find(x => x.Naziv == naziv).FirstOrDefaultAsync();
        if (n == null)
        {
            return BadRequest("Ne postoji namirnica");
        }
        await namirnice.DeleteOneAsync(query);
        
        return Ok("Uspešno obrisana namirnica");
    }
    [HttpGet]
    [Route("VratiSveNamirniceKojeSadrzeManjeUgh/{ugh}")]
    public async Task<ActionResult> VratiSveNamirniceKojeSadrzeManjeUgh(double ugh)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");
        var namirnice = db.GetCollection<Namirnica>("namirnice");
        var namirnicee = await namirnice.Find(x => x.Ugh < ugh).ToListAsync();
        return Ok(namirnicee);
    }
    [HttpGet]
    [Route("VratiSveNamirniceKojeSadrzeManjeKalorijaOd/{kalorije}")]
    public async Task<ActionResult> VratiSveNamirniceKojeSadrzeManjeKalorijaOd(double kalorije)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");
        var namirnice = db.GetCollection<Namirnica>("namirnice");
        var namirnicee = await namirnice.Find(x => x.Kalorije < kalorije).ToListAsync();
        return Ok(namirnicee);
    }
    [HttpGet]
    [Route("VratiSveNamirniceKojeSadrzeViseProteinaIManjeMasti/{proteini}/{masti}")]
    public async Task<ActionResult> VratiSveNamirniceKojeSadrzeViseProteinaIManjeMasti(double proteini,double masti)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");
        var namirnice = db.GetCollection<Namirnica>("namirnice");
        var namirnicee = await namirnice.Find(x => x.Masti < masti && x.Proteini > proteini).ToListAsync();
        return Ok(namirnicee);
    }
}