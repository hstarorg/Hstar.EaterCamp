using System.Collections.Generic;
using Hstar.EaterCamp.IDAL;
using Hstar.EaterCamp.Models.Account;
using Hstar.Framework.IBatis4Net;

namespace Hstar.EaterCamp.DAL
{
    public class AccountDal : DataDalBase, IAccountDal
    {
        public UserAccount LoginCheck(UserAccount user)
        {
            return base.QueryForObject<UserAccount>("ac_LoginCheck", user);
        }
    }
}