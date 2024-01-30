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
    public class Namirnica
    {
        public ObjectId Id { get; set; }
        public string Tip { get; set; }
        public string Naziv { get; set; }
        public double Proteini { get; set; }
        public double Masti { get; set; }
        public double Ugh { get; set; }
        public double Kalorije { get; set; }
        [JsonIgnore]
        public List<MongoDBRef> Recepti { get; set; }

        public Namirnica()
        {
            Recepti = new List<MongoDBRef>();
        }

    }
}
