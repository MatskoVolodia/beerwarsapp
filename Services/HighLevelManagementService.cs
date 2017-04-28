using DAL.DataAccess;
using ModelClasses;
using ModelClasses.Entities;
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
        void AddNewPost(Post post);
    }

    public class HighLevelManagementService: IHighLevelManagementService
    {
        private readonly IRepository<BeerItem> _beerItemRepository;
        private readonly IRepository<BeerBrand> _beerBrandRepository;
        private readonly IRepository<Post> _postRepository; 

        public HighLevelManagementService(IRepository<BeerItem> beerItemRepository, IRepository<BeerBrand> beerBrandRepository,
            IRepository<Post> postRepository)
        {
            _beerItemRepository = beerItemRepository;
            _beerBrandRepository = beerBrandRepository;
            _postRepository = postRepository;
        }

        public void AddNewBeer(BeerItem beeritem)
        {
            _beerItemRepository.Add(beeritem);
        }

        public void AddNewPost(Post post)
        {
            _postRepository.Add(post);
        }
    }
}
