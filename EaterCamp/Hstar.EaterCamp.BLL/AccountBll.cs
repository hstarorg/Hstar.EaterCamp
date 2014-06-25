using Hstar.EaterCamp.IBLL;
using Hstar.EaterCamp.IDAL;
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

        public string GetTest()
        {
            return accountDal.GetTest();
        }
    }
}