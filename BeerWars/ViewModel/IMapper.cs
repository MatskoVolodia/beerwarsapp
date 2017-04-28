using ModelClasses;
using ModelClasses.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeerWars.ViewModel
{
    public interface IMapper
    {
        UserViewModel MapUser(User user);
        User MapUserViewModel(UserViewModel uservm);
        BeerBrandViewModel MapBeerBrand(BeerBrand beerbrand);
        BeerBrand MapBeerBrandViewModel(BeerBrandViewModel bbvm);
        BeerItemViewModel MapBeerItem(BeerItem beeritem);
        BeerItem MapBeerItemViewModel(BeerItemViewModel bivm);
        PostViewModel MapPost(Post post);
        Post MapPostViewModel(PostViewModel pvm);
    }

    public class Mapper : IMapper
    {
        public BeerBrandViewModel MapBeerBrand(BeerBrand beerbrand)
        {
            return new BeerBrandViewModel
            {
                Name = beerbrand.Name,
                LogoUrl = beerbrand.LogoUrl
            };
        }

        public BeerItemViewModel MapBeerItem(BeerItem beeritem)
        {
            return new BeerItemViewModel
            {
                BeerBrand = MapBeerBrand(beeritem.BeerBrand),
                Guid = beeritem.Guid,
                Sort = beeritem.Sort,
                Name = beeritem.Name
            };
        }

        public BeerBrand MapBeerBrandViewModel(BeerBrandViewModel bbvm)
        {
            return new BeerBrand
            {
                LogoUrl = bbvm.LogoUrl,
                Name = bbvm.Name
            };
        }
        public BeerItem MapBeerItemViewModel(BeerItemViewModel bivm)
        {
            return new BeerItem
            {
                BeerBrand = MapBeerBrandViewModel(bivm.BeerBrand),
                Name = bivm.Name,
                Sort = bivm.Sort,
            };
        }

        public UserViewModel MapUser(User user)
        {
            return new UserViewModel()
            {
                Username = user.Username,
                Role = user.Role,
                UserPictureUrl = user.UserPictureUrl,
                WarSide = user.WarSide
            };
        }

        public User MapUserViewModel(UserViewModel uservm)
        {
            return new User()
            {
                Username = uservm.Username,
                Role = uservm.Role,
                UserPictureUrl = uservm.UserPictureUrl,
                WarSide = uservm.WarSide
            };
        }

        public PostViewModel MapPost(Post post)
        {
            return new PostViewModel()
            {
                BeerItem = MapBeerItem(post.BeerItem),
                DateTime = post.DateTime,
                BeerRatingMark = post.BeerRatingMark,
                Guid = post.Guid,
                Text = post.Text,
                User = MapUser(post.User)
            };
        }

        public Post MapPostViewModel(PostViewModel pvm)
        {
            return new Post()
            {
                BeerItem = MapBeerItemViewModel(pvm.BeerItem),
                DateTime = pvm.DateTime,
                BeerRatingMark = pvm.BeerRatingMark,
                Text = pvm.Text,
                User = MapUserViewModel(pvm.User)
            };
        }
    }
}