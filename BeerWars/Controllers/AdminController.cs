using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BeerWars.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        // GET: Admin
        public string Index()
        {
            return "Important";
        }
    }
}