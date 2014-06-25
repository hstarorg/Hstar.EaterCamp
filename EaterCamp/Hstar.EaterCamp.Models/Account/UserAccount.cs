using System.ComponentModel.DataAnnotations;

namespace Hstar.EaterCamp.Models.Account
{
    public class UserAccount
    {
        [Required(ErrorMessage = "请输入用户名")]
        public string UserName { get; set; }

        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}