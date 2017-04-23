using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ModelClasses.Entities;
using ModelClasses;
using System.Diagnostics;

namespace DAL.DataAccess
{
    public class BWContext : DbContext
    {
        public BWContext() : base("BWContextDB")
        {
            Database.SetInitializer<BWContext>(new BWDbInitializer());
        }

        public DbSet<BeerItem> BeerItems { set; get; }
        public DbSet<BeerBrand> BeerBrands { set; get; }
        public DbSet<Comment> Comments { set; get; }
        public DbSet<Like> Likes { set; get; }
        public DbSet<Post> Posts { set; get; }

        public DbSet<User> Users { set; get; }   
    
    }
}
