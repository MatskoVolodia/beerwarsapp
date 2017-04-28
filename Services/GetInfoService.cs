using DAL.DataAccess;
using ModelClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IGetInfoService
    {
        List<BeerItem> GetAllBeers();
        List<BeerBrand> GetAllBeerBrands();
    }
    public class GetInfoService : IGetInfoService
    {
        private readonly IRepository<BeerItem> _beerItemRepository;
        private readonly IRepository<BeerBrand> _beerBrandRepository;

        public GetInfoService(IRepository<BeerItem> beerItemRepository, IRepository<BeerBrand> beerBrandRepository)
        {
            _beerItemRepository = beerItemRepository;
            _beerBrandRepository = beerBrandRepository;
        }

        public List<BeerBrand> GetAllBeerBrands()
        {
            return _beerBrandRepository.GetAll().ToList();
        }

        public List<BeerItem> GetAllBeers()
        {
            return _beerItemRepository.GetAll().ToList();
        }
    }
}
