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
    public class Ishrana
    {
        public ObjectId Id { get; set; }
        public string Datum { get; set; }
        [JsonIgnore]
        public List<MongoDBRef> Recepti { get; set; }
    

        public Ishrana()
        {
            Recepti = new List<MongoDBRef>();
        }

    }
}
