using System.Collections.Generic;

namespace ModelClasses
{
    public class BeerBrand
    {
        public BeerBrand()
        {
            BeerItems = new List<BeerItem>();
        }

        public int BeerBrandId { get; set; }
        public string Name { get; set; }
        public string LogoUrl { get; set; }

        public virtual ICollection<BeerItem> BeerItems { get; set; }
    }
}