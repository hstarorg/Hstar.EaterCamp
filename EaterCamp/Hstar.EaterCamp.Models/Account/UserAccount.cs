using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Hstar.EaterCamp.Models.Account
{
    public class UserAccount
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}