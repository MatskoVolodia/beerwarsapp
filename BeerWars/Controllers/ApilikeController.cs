using BeerWars.ViewModel;
using ModelClasses;
using ModelClasses.Entities;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

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
            var brandId = _getInfoService.GetIdOf(beerItem.BeerBrand);
            if(brandId != null)
            {
                beerItem.BeerBrand = null;
                beerItem.BeerBrandId = (int)brandId;
            }
            _highLevelManagementService.AddNewBeer(beerItem);
            bivm.Guid = beerItem.Guid;
            return Json(bivm, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllPosts()
        {
            var result = _getInfoService.GetAllPosts().Select(post => _mapper.MapPost(post));
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetPostsOnPage(int page, int itemsPerPage)
        {
            var result = _getInfoService.GetPostsOnPage(page, itemsPerPage)
                .Select(post => _mapper.MapPost(post));
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddNewPost(PostViewModel pvm)
        {
            var post = _mapper.MapPostViewModel(pvm);
            post.BeerItem.Guid = pvm.BeerItem.Guid;

            post.UserId = (int)_getInfoService.GetIdOf(post.User);
            post.User = null;

            post.BeerItemId = (int)_getInfoService.GetIdOf(post.BeerItem);
            post.BeerItem = null;

            _highLevelManagementService.AddNewPost(post);
            pvm.Guid = post.Guid;

            return Json(pvm, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCurrentUser()
        {
            var username = System.Web.HttpContext.Current.User.Identity.Name;
            var result = GetUserInformation(username);
            return result;
        }

        [HttpPost]
        public JsonResult Like(LikeViewModel lvm)
        {
            var like = _mapper.MapLikeViewModel(lvm);
            like.Post.Guid = lvm.Post.Guid;

            like.UserId = (int)_getInfoService.GetIdOf(like.User);
            like.User = null;

            like.PostId = (int)_getInfoService.GetIdOf(like.Post);
            like.Post = null;

            _highLevelManagementService.Like(like);
            lvm.Guid = like.Guid;

            return Json(lvm, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Dislike(LikeViewModel lvm)
        {
            _highLevelManagementService.Dislike(lvm.Guid);

            return Json(lvm, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RemovePost(string postGuid)
        {
            _highLevelManagementService.RemovePost(postGuid);

            return Json(postGuid, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllLikes()
        {
            var result = _getInfoService.GetAllLikes().Select(like => _mapper.MapLike(like));

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetLikesByPostGuids(string postsGuids)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var arrayOfGuids = js.Deserialize<string[]>(postsGuids).ToList();
            var result = _getInfoService.GetLikesByPostGuids(arrayOfGuids)
                .Select(like => _mapper.MapLike(like));

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCommentsByPostGuid(string postGuid)
        {
            var result = _getInfoService.GetCommentsByPostGuid(postGuid).Select(item => _mapper.MapComment(item));

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddNewComment(CommentViewModel cvm)
        {
            var comment = _mapper.MapCommentViewModel(cvm);
            comment.Post.Guid = cvm.Post.Guid;

            comment.UserId = (int)_getInfoService.GetIdOf(comment.User);
            comment.User = null;

            comment.PostId = (int)_getInfoService.GetIdOf(comment.Post);
            comment.Post = null;

            _highLevelManagementService.AddNewComment(comment);
            cvm.Guid = comment.Guid;

            return Json(cvm, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetBeerRatings()
        {
            var posts = _getInfoService.GetAllPosts();
            var ratings = posts.GroupBy(item => item.BeerItem)
                .Select(item => new BeerRatingViewModel
                {
                    BeerItemGuid = item.Key.Guid,
                    Rating = item.Average(post => post.BeerRatingMark)
                });

            return Json(ratings, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RemoveBeerItem(string beerItemGuid)
        {
            _highLevelManagementService.RemoveBeerItem(beerItemGuid);

            return Json(beerItemGuid, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetUsersContribution(string username)
        {
            var usersPosts = _getInfoService.GetUsersPosts(username);
            var result = new ContributionViewModel();
            result.LightSide = usersPosts.Count(item => item.BeerItem.Sort == "Light");
            result.DarkSide = usersPosts.Count - result.LightSide;

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}