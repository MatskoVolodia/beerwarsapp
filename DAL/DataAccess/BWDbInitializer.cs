using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ModelClasses.Entities;
using System.Diagnostics;

namespace DAL.DataAccess
{
    public class BWDbInitializer : DropCreateDatabaseIfModelChanges<BWContext>
    {
        protected override void Seed(BWContext context)
        {
            Debug.WriteLine("SEED");

            //Add admin user
            context.Users.Add(new User { UserId = 1, Username = "admin", Password = "admin", WarSide = true, Role="admin", UserPictureUrl="./temp" });

            base.Seed(context);
        }
    }
}
