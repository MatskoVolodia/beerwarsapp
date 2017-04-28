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
    }
}