using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MongoDB.Bson;
using MongoDB.Driver;

namespace Model
{
    public class Korisnik
    {
        public ObjectId Id { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Pol { get; set; }
        public string Username { get; set; }
        public double Visina { get; set; }
        public double Tezina { get; set; }
        public int Godine { get; set; }
        public double Kalorije { get; set; }


    }
}
