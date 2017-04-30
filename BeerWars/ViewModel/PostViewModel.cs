using ModelClasses;
using ModelClasses.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeerWars.ViewModel
{
    public class PostViewModel
    {
        public string Text { get; set; }
        public int BeerRatingMark { get; set; }
        public DateTime DateTime { get; set; }
        public string Guid { get; set; }
        public UserViewModel User { get; set; }
        public BeerItemViewModel BeerItem { get; set; }

        public List<CommentViewModel> Comments { get; set; } 
        public List<LikeViewModel> Likes { get; set; }
    }
}