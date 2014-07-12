using Hstar.EaterCamp.IBLL;
using Hstar.EaterCamp.IDAL;
using Hstar.EaterCamp.Models.Account;
using Hstar.Framework.Ioc;

namespace Hstar.EaterCamp.BLL
{
    public class AccountBll : IAccountBll
    {
        private readonly IAccountDal accountDal;

        public AccountBll()
        {
            accountDal = AutofacHelper.GetInstance<IAccountDal>();
        }



        public UserAccount LoginCheck(UserAccount user)
        {
           return accountDal.LoginCheck(user);
        }
    }
}