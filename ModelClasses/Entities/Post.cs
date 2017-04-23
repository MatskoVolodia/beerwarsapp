using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelClasses.Entities
{
    public class Post
    {
        public Post()
        {
            Guid = System.Guid.NewGuid().ToString();

            Comments = new List<Comment>();
            Likes = new List<Like>();
        }

        public int PostId { get; set;}

        public string Text { get; set; }
        public int BeerRatingMark { get; set; }
        public DateTime DateTime { get; set; }
        public string Guid { get; set; }

        public virtual User User { get; set; }
        public int UserId { get; set; }

        public virtual BeerItem BeerItem { get; set; }
        public int BeerItemId { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Like> Likes { get; set; }
    }
}
