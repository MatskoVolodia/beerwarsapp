using BeerWars.ViewModel;
using ModelClasses;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BeerWars.Controllers
{
    public class ApilikeController : Controller
    {
        private readonly IUserService _userService;
        private readonly IGetInfoService _getInfoService;
        private readonly IHighLevelManagementService _highLevelManagementService;
        private readonly IMapper _mapper;

        public ApilikeController(IUserService userService,
            IGetInfoService getInfoService,
            IHighLevelManagementService highLevelManagementService,
            IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
            _getInfoService = getInfoService;
            _highLevelManagementService = highLevelManagementService;
        }

        [HttpGet]
        public JsonResult GetUserInformation(string username)
        {
            var resultViewModel =
                _mapper.MapUser(_userService
                .GetUserInformation(username));

            return Json(resultViewModel, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllBeers()
        {
            var result = _getInfoService.GetAllBeers().Select(beer => _mapper.MapBeerItem(beer));
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddNewBeer(BeerItemViewModel bivm)
        {
            var beerItem = _mapper.MapBeerItemViewModel(bivm);
            var brandId = _getInfoService.GetAllBeerBrands().Find(item => item.Name == bivm.BeerBrand.Name && item.LogoUrl == bivm.BeerBrand.LogoUrl)?.BeerBrandId;
            if(brandId != null)
            {
                beerItem.BeerBrand = null;
                beerItem.BeerBrandId = (int)brandId;
            }
            _highLevelManagementService.AddNewBeer(beerItem);
            bivm.Guid = beerItem.Guid;
            return Json(bivm, JsonRequestBehavior.AllowGet);
        }
    }
}