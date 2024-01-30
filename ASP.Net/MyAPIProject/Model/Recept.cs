using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Model
{
    public class Recept
    {
        public ObjectId Id { get; set; }
        public string Naziv { get; set; }
        public string Priprema { get; set; }
        public double Kalorije { get; set; }
        [JsonIgnore]
        public List<MongoDBRef> Namirnice { get; set; }
        [JsonIgnore]
        public List<MongoDBRef> Ishrana { get; set; }
        public Recept()
        {
            Namirnice = new List<MongoDBRef>();
            Ishrana = new List<MongoDBRef>();
        }

    }
}
