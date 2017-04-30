using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeerWars.ViewModel
{
    public class CommentViewModel
    {
        public string Text { get; set; }
        public DateTime DateTime { get; set; }
        public string Guid { get; set; }

        public virtual PostViewModel Post { get; set; }
        public virtual UserViewModel User { get; set; }
    }
}