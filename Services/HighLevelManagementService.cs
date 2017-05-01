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
        void AddNewComment(Comment comment);
        void Like(Like like);
        void Dislike(string likeGuid);
        void RemovePost(string postGuid);
    }

    public class HighLevelManagementService: IHighLevelManagementService
    {
        private readonly IRepository<BeerItem> _beerItemRepository;
        private readonly IRepository<BeerBrand> _beerBrandRepository;
        private readonly IRepository<Post> _postRepository;
        private readonly IRepository<Like> _likeRepository;
        private readonly IRepository<Comment> _commentRepository;

        public HighLevelManagementService(IRepository<BeerItem> beerItemRepository, IRepository<BeerBrand> beerBrandRepository,
            IRepository<Post> postRepository,
            IRepository<Like> likeRepository,
            IRepository<Comment> commentRepository)
        {
            _beerItemRepository = beerItemRepository;
            _beerBrandRepository = beerBrandRepository;
            _postRepository = postRepository;
            _likeRepository = likeRepository;
            _commentRepository = commentRepository;
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

        public void RemovePost(string postGuid)
        {
            var post = _postRepository.Get(item => item.Guid == postGuid);
            var postId = post.PostId;
            _likeRepository.Delete(like => like.PostId == postId);
            _commentRepository.Delete(comment => comment.PostId == postId);
            _postRepository.Delete(post);
        }

        public void AddNewComment(Comment comment)
        {
            _commentRepository.Add(comment);
        }
    }
}
