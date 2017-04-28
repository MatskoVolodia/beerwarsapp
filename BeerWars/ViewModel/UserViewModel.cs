using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeerWars.ViewModel
{
    public class UserViewModel
    {
        public string Username { get; set; }
        public string Role { get; set; }
        public string UserPictureUrl { get; set; }
        public bool WarSide { get; set; }
    }
}