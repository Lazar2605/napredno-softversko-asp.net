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
public class VezbaController : ControllerBase
{
    

    private readonly ILogger<VezbaController> _logger;

    public VezbaController(ILogger<VezbaController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    [Route("DodajVezbu/{naziv}")]
    public async Task<ActionResult> DodajVezbu(string naziv)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var vezbe = db.GetCollection<Vezba>("vezbe");

        Vezba v = new Vezba{
            Naziv=naziv
        };
        await vezbe.InsertOneAsync(v);
        return Ok("Uspešno dodata vežba");
    }
    [HttpGet]
    [Route("VratiSveVezbe")]
    public async Task<ActionResult> VratiSveVezbe()
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var vezbe = db.GetCollection<Vezba>("vezbe");
        var vezbee = await vezbe.Find(_ => true).ToListAsync();
        return Ok(vezbee);
    }
    [HttpDelete]
    [Route("IzbrisiVezbu/{naziv}")]
    public async Task<ActionResult> IzbrisiVezbu(string naziv)
    {
        var connectionString = "mongodb://localhost/?safe=true";
        var client = new MongoClient(connectionString);
            
        var db = client.GetDatabase("NotesDB");

        var vezbe = db.GetCollection<Vezba>("vezbe");

        var query = Builders<Vezba>.Filter.Eq("Naziv", naziv);

        Vezba v = await vezbe.Find(x => x.Naziv == naziv).FirstOrDefaultAsync();
        if (v == null)
        {
            return BadRequest("Ne postoji vežba");
        }
        await vezbe.DeleteOneAsync(query);
        
        return Ok("Uspešno obrisana vežba");
    }
}