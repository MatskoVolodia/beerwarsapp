using DAL.DataAccess;
using ModelClasses.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IUserService
    {
        bool IsLoginDataCorrect(string name, string password);
        User GetUserInformation(string username);
        void SignIn(string name, string password);
        void SaveUserChanges(string username, string url, bool warside);
    }

    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;

        public UserService(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public bool IsLoginDataCorrect(string name, string password)
        {
            var hashed = Hash(password);
            return null != _userRepository.Get(user => user.Username == name &&
            user.Password == hashed);
        }

        public User GetUserInformation(string username)
        {
            return _userRepository.Get(user => user.Username == username);
        }

        public void SignIn(string name, string password)
        {
            var user = new User
            {
                Username = name,
                Password = Hash(password),
                Role = "user"
            };

            _userRepository.Add(user);
        }

        private string Hash(string password)
        {
            var bytes = new UTF8Encoding().GetBytes(password);
            byte[] hashBytes;
            using (var algorithm = new System.Security.Cryptography.SHA512Managed())
            {
                hashBytes = algorithm.ComputeHash(bytes);
            }
            return Convert.ToBase64String(hashBytes);
        }

        public void SaveUserChanges(string username, string url, bool warside)
        {
            var user = GetUserInformation(username);
            user.WarSide = warside;
            user.UserPictureUrl = url;
            _userRepository.Update(user);
        }
    }
}
