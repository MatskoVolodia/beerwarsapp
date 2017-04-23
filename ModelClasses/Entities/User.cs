using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelClasses.Entities
{
    public class User
    {
        public User()
        {
            Posts = new List<Post>();
            Comments = new List<Comment>();
            Likes = new List<Like>();
        }

        public int UserId { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string UserPictureUrl { get; set; }
        public bool WarSide { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Like> Likes { get; set; }
    }
}
