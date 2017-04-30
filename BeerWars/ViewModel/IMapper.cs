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
        CommentViewModel MapComment(Comment comment);
        Comment MapCommentViewModel(CommentViewModel cvm);
        LikeViewModel MapLike(Like like);
        Like MapLikeViewModel(LikeViewModel lvm);
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
                User = MapUser(post.User),
                Comments = post.Comments.Select(item => MapComment(item)).ToList(),
                Likes = post.Likes.Select(item => MapLike(item)).ToList()
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
                User = MapUserViewModel(pvm.User),
                Comments = pvm.Comments.Select(item => MapCommentViewModel(item)).ToList(),
                Likes = pvm.Likes.Select(item => MapLikeViewModel(item)).ToList()
            };
        }

        public CommentViewModel MapComment(Comment comment)
        {
            return new CommentViewModel
            {
                DateTime = comment.DateTime,
                Guid = comment.Guid,
                Post = MapPost(comment.Post),
                Text = comment.Text,
                User = MapUser(comment.User)
            };
        }

        public Comment MapCommentViewModel(CommentViewModel cvm)
        {
            return new Comment
            {
                DateTime = cvm.DateTime,
                Post = MapPostViewModel(cvm.Post),
                Text = cvm.Text,
                User = MapUserViewModel(cvm.User),
            };
        }

        public LikeViewModel MapLike(Like like)
        {
            return new LikeViewModel
            {
                Post = MapPost(like.Post),
                User = MapUser(like.User),
                Guid = like.Guid
            };
        }

        public Like MapLikeViewModel(LikeViewModel lvm)
        {
            return new Like
            {
                Post = MapPostViewModel(lvm.Post),
                User = MapUserViewModel(lvm.User)
            };
        }
    }
}