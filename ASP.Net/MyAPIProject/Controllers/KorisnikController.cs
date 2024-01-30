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
public class KorisnikController : ControllerBase
{
    

    private readonly ILogger<KorisnikController> _logger;

    public KorisnikController(ILogger<KorisnikController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    [Route("DodajKorisnika/{ime}/{prezime}/{pol}/{username}/{godine}/{tezina}/{visina}")]
    public async Task<ActionResult> DodajKorisnika(string ime,string prezime,string pol,string username,int godine,double tezina,double visina)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var korisnici = db.GetCollection<Korisnik>("korisnik");
        var existingKorisnik = await korisnici.Find(x => x.Username == username).FirstOrDefaultAsync();
        if (existingKorisnik != null)
        {
            return BadRequest("Korisnik već postoji.");
        }
        var korisnicii = await korisnici.Find(_ => true).ToListAsync();
        if(korisnicii.Count == 1)
            return BadRequest("Ne mozes da dodas korisnika jer vec postoji. Ovo je jednokorisnicka aplikacija.");

        Korisnik k = new Korisnik{Ime=ime,Prezime=prezime,Pol=pol,Username=username,Godine=godine,Tezina=tezina,Visina=visina};
        korisnici.InsertOneAsync(k);
        return Ok("Uspešno dodat korisnik");
    }
    [HttpGet]
    [Route("VratiKorisnika")]
    public async Task<ActionResult> VratiKorisnika()
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var korisnici = db.GetCollection<Korisnik>("korisnik");
        var korisnicii = await korisnici.Find(_ => true).ToListAsync();
        if(korisnicii.Count == 0)
            return BadRequest("Nema korisnika");
        return Ok(korisnicii);
    }
    [HttpPut]
    [Route("IzmeniTezinuKorisnika/{username}/{vrednost}")]
    public async Task<ActionResult> IzmeniTezinuKorisnika(string username, double vrednost)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var korisnici = db.GetCollection<Korisnik>("korisnik");

        var filter = Builders<Korisnik>.Filter.Eq(k => k.Username, username);
        var update = Builders<Korisnik>.Update.Set(k => k.Tezina, vrednost);
        var result = await korisnici.UpdateOneAsync(filter, update);
        if(result.ModifiedCount == 0) 
        {
            return BadRequest("Ne postoji korisnik");
        }

        return Ok("Uspešno izmenjena težina korisniku");
    }
    [HttpPut]
    [Route("IzmeniVisinuKorisnika/{username}/{vrednost}")]
    public async Task<ActionResult> IzmeniVisinuKorisnika(string username, double vrednost)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var korisnici = db.GetCollection<Korisnik>("korisnik");

        var filter = Builders<Korisnik>.Filter.Eq(k => k.Username, username);
        var update = Builders<Korisnik>.Update.Set(k => k.Visina, vrednost);
        var result = await korisnici.UpdateOneAsync(filter, update);
        if(result.ModifiedCount == 0) 
        {
            return BadRequest("Ne postoji korisnik");
        }

        return Ok("Uspešno izmenjena visina korisniku");
    }
    [HttpPut]
    [Route("IzmeniGodineKorisnika/{username}/{vrednost}")]
    public async Task<ActionResult> IzmeniGodineKorisnika(string username, int vrednost)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var korisnici = db.GetCollection<Korisnik>("korisnik");
        
        var filter = Builders<Korisnik>.Filter.Eq(k => k.Username, username);
        var update = Builders<Korisnik>.Update.Set(k => k.Godine, vrednost);

        var result = await korisnici.UpdateOneAsync(filter, update);
        if(result.ModifiedCount == 0) 
        {
            return BadRequest("Ne postoji korisnik");
        }

        return Ok("Uspešno izmenjene godine korisniku");
    }

    [HttpGet]
    [Route("KalkulatorKalorija/{username}/{aktivnost}")]
    public async Task<ActionResult> KalkulatorKalorija(string username,int aktivnost)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");
        var korisnici = db.GetCollection<Korisnik>("korisnik");
        var filter = Builders<Korisnik>.Filter.Eq("Username", username);
        var k = await korisnici.Find(filter).FirstOrDefaultAsync();
        if(k == null) 
        {
            return BadRequest("Ne postoji korisnik");
        }
        var kalorije=0.0;
        if(k.Pol=="z"){
            kalorije=10*k.Tezina+6.25*k.Visina-5*k.Godine-161;
        }
        else
        {
            kalorije=10*k.Tezina+6.25*k.Visina-5*k.Godine+5;
        }
        if(aktivnost==0)
            kalorije*=1.2;
        else if(aktivnost<=3 &&aktivnost>=1)
            kalorije*=1.375;
        else if(aktivnost<=5 &&aktivnost>=4)
            kalorije*=1.55;
        else if(aktivnost<=7 &&aktivnost>=6)
            kalorije*=1.725;
        var update = Builders<Korisnik>.Update.Set("Kalorije", kalorije);
        await korisnici.UpdateOneAsync(filter, update);
        return Ok(kalorije);
    }

}
