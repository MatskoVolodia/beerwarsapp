﻿using DAL.DataAccess;
using ModelClasses;
using ModelClasses.Entities;
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
        List<Post> GetAllPosts();
        List<Like> GetAllLikes();
        List<Comment> GetAllComments();
        List<Post> GetUsersPosts(string username);
        List<Comment> GetCommentsByPostGuid(string postGuid);
        List<Post> GetPostsOnPage(int page, int itemsPerPage);
        List<Like> GetLikesByPostGuids(List<string> postGuids);
        int? GetIdOf(BeerBrand brand);
        int? GetIdOf(BeerItem beeritem);
        int? GetIdOf(User user);
        int? GetIdOf(Post post);
        int? GetIdOf(Like like);
    }
    public class GetInfoService : IGetInfoService
    { 
        private readonly IRepository<BeerItem> _beerItemRepository;
        private readonly IRepository<BeerBrand> _beerBrandRepository;
        private readonly IRepository<Post> _postRepository;
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Comment> _commentRepository;
        private readonly IRepository<Like> _likeRepository;

        public GetInfoService(
            IRepository<BeerItem> beerItemRepository, 
            IRepository<BeerBrand> beerBrandRepository, 
            IRepository<Post> postRepository, 
            IRepository<User> userRepository,
            IRepository<Comment> commentRepository,
            IRepository<Like> likeRepository)
        {
            _beerItemRepository = beerItemRepository;
            _beerBrandRepository = beerBrandRepository;
            _postRepository = postRepository;
            _userRepository = userRepository;
            _commentRepository = commentRepository;
            _likeRepository = likeRepository;
        }

        public List<BeerBrand> GetAllBeerBrands()
        {
            return _beerBrandRepository.GetAll().ToList();
        }

        public List<BeerItem> GetAllBeers()
        {
            return _beerItemRepository.GetAll().ToList();
        }

        public List<Comment> GetAllComments()
        {
            return _commentRepository.GetAll().ToList();
        }

        public List<Like> GetAllLikes()
        {
            return _likeRepository.GetAll().ToList();
        }

        public List<Post> GetAllPosts()
        {
            return _postRepository.GetAll().ToList();
        }

        public List<Comment> GetCommentsByPostGuid(string postGuid)
        {
            return _commentRepository.GetMany(comment => comment.Post.Guid == postGuid).ToList();
        }

        public int? GetIdOf(BeerBrand brand)
        {
            return _beerBrandRepository.Get(item => item.Name == brand.Name)?.BeerBrandId;
        }

        public int? GetIdOf(BeerItem beeritem)
        {
            return _beerItemRepository.Get(item => item.Guid == beeritem.Guid)?.BeerItemId;
        }

        public int? GetIdOf(User user)
        {
            return _userRepository.Get(item => item.Username == user.Username)?.UserId;
        }

        public int? GetIdOf(Post post)
        {
            return _postRepository.Get(item => item.Guid == post.Guid)?.PostId;
        }

        public int? GetIdOf(Like like)
        {
            return _likeRepository.Get(item => item.Guid == like.Guid)?.LikeId;
        }

        public List<Like> GetLikesByPostGuids(List<string> postGuids)
        {
            return _likeRepository.GetMany(like => postGuids.Contains(like.Post.Guid)).ToList();
        }

        public List<Post> GetPostsOnPage(int page, int itemsPerPage)
        {
            return _postRepository.GetAll()
                .OrderByDescending(item => item.DateTime)
                .Skip(page * itemsPerPage).Take(itemsPerPage).ToList();
        }

        public List<Post> GetUsersPosts(string username)
        {
            return _postRepository.GetMany(item => item.User.Username == username).ToList();
        }
    }
}
