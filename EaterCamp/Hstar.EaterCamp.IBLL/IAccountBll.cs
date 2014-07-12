using Hstar.EaterCamp.Models.Account;

namespace Hstar.EaterCamp.IBLL
{
    public interface IAccountBll
    {
        UserAccount LoginCheck(UserAccount user);
    }
}