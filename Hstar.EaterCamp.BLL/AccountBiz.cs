using System;

namespace Hstar.EaterCamp.BLL
{
    /// <summary>
    /// 账户相关业务类
    /// </summary>
    public class AccountBiz
    {
        public Tuple<bool, string> IsLogin(string userName,string password)
        {
            return new Tuple<bool, string>(true,"LoginSucceed");
        }
    }
}
