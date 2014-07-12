using System.Collections;
using System.Collections.Generic;
using Hstar.EaterCamp.Models.Account;

namespace Hstar.EaterCamp.IDAL
{
    public interface IAccountDal
    {
        UserAccount LoginCheck(UserAccount user);
    }
}