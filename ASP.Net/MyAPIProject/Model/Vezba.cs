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
    public class Vezba
    {
        public ObjectId Id { get; set; }
        public string Naziv { get; set; }
        [JsonIgnore]
        public List<MongoDBRef> Treninzi { get; set; }

        public Vezba()
        {
            Treninzi = new List<MongoDBRef>();
        }

    }
}
