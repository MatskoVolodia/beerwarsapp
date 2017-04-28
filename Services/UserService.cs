using DAL.DataAccess;
using ModelClasses.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IUserService
    {
        bool IsLoginDataCorrect(string name, string password);
        User GetUserInformation(string username);
    }

    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;

        public UserService(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public bool IsLoginDataCorrect(string name, string password)
            => null != _userRepository.Get(user => user.Username == name && user.Password == password);

        public User GetUserInformation(string username)
        {
            return _userRepository.Get(user => user.Username == username);
        }
    }
}
