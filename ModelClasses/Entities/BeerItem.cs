using ModelClasses.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelClasses
{
    public class BeerItem
    {
        public BeerItem()
        {
            Posts = new List<Post>();
            Guid = System.Guid.NewGuid().ToString();
        }

        public int BeerItemId { get; set; }
        public string Name { get; set; }
        public string Sort { get; set; }

        public virtual BeerBrand BeerBrand { get; set; }
        public int BeerBrandId { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        public string Guid { get; set; }
    }
}
