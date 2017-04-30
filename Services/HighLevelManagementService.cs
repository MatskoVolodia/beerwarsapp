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
        void Like(Like like);
        void Dislike(string likeGuid);
    }

    public class HighLevelManagementService: IHighLevelManagementService
    {
        private readonly IRepository<BeerItem> _beerItemRepository;
        private readonly IRepository<BeerBrand> _beerBrandRepository;
        private readonly IRepository<Post> _postRepository;
        private readonly IRepository<Like> _likeRepository;

        public HighLevelManagementService(IRepository<BeerItem> beerItemRepository, IRepository<BeerBrand> beerBrandRepository,
            IRepository<Post> postRepository,
            IRepository<Like> likeRepository)
        {
            _beerItemRepository = beerItemRepository;
            _beerBrandRepository = beerBrandRepository;
            _postRepository = postRepository;
            _likeRepository = likeRepository;
        }

        public void AddNewBeer(BeerItem beeritem)
        {
            _beerItemRepository.Add(beeritem);
        }

        public void AddNewPost(Post post)
        {
            _postRepository.Add(post);
        }

        public void Like(Like like)
        {
            _likeRepository.Add(like);
        }

        public void Dislike(string likeGuid)
        {
            var like = _likeRepository.Get(item => item.Guid == likeGuid);
            _likeRepository.Delete(like);
        }
    }
}
