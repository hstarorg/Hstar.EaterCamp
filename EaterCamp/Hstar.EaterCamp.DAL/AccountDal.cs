using Hstar.EaterCamp.IDAL;
using Hstar.Framework.IBatis4Net;

namespace Hstar.EaterCamp.DAL
{
    public class AccountDal : DataDalBase, IAccountDal
    {
        public string GetTest()
        {
            return base.QueryForObject<string>("test1", null);
        }
    }
}