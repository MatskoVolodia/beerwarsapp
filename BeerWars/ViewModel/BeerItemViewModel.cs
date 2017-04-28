using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeerWars.ViewModel
{
    public class BeerItemViewModel
    {
        public string Name { get; set; }
        public string Sort { get; set; }
        public BeerBrandViewModel BeerBrand { get; set; }
        public string Guid { get; set; }
    }
}