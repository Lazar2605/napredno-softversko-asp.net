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
    public class Trening
    {
        public ObjectId Id { get; set; }
        public string Datum { get; set; }
        public string Opis { get; set; }
        [JsonIgnore]
        public List<MongoDBRef> Vezbe { get; set; }

        public Trening()
        {
            Vezbe = new List<MongoDBRef>();
        }

    }
}
