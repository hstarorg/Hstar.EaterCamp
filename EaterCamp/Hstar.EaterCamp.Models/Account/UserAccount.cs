using System.ComponentModel.DataAnnotations;

namespace Hstar.EaterCamp.Models.Account
{
    public class UserAccount
    {
        [Required(ErrorMessageResourceName = "UserNameRequired", ErrorMessageResourceType = typeof(Resources.Resource))]
        public string UserName { get; set; }

        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}