using DAL.DataAccess;
using ModelClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IHighLevelManagementService
    {
        void AddNewBeer(BeerItem beeritem);
    }

    public class HighLevelManagementService: IHighLevelManagementService
    {
        private readonly IRepository<BeerItem> _beerItemRepository;
        private readonly IRepository<BeerBrand> _beerBrandRepository;

        public HighLevelManagementService(IRepository<BeerItem> beerItemRepository, IRepository<BeerBrand> beerBrandRepository)
        {
            _beerItemRepository = beerItemRepository;
            _beerBrandRepository = beerBrandRepository;
        }

        public void AddNewBeer(BeerItem beeritem)
        {
            _beerItemRepository.Add(beeritem);
        }
    }
}
