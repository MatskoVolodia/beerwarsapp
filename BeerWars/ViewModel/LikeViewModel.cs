using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeerWars.ViewModel
{
    public class LikeViewModel
    {
        public virtual UserViewModel User { get; set; }
        public virtual PostViewModel Post { get; set; }

        public string Guid { get; set; }
    }
}