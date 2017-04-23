using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelClasses.Entities
{
    public class Comment
    {
        public Comment()
        {
            Guid = System.Guid.NewGuid().ToString();
        }

        public int CommentId { get; set; }

        public string Text { get; set; }
        public DateTime DateTime { get; set; }
        public string Guid { get; set; }

        public virtual Post Post { get; set; }
        public int? PostId { get; set; }

        public virtual User User { get; set; }
        public int? UserId { get; set; }
    }
}
