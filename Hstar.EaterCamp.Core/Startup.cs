using System.IO;
using Hstar.Core.Ioc;
using Hstar.EaterCamp.Core.Providers;

namespace Hstar.EaterCamp.Core
{
   public static class StartupConfig
    {
       public static void StartUp(string basePath)
       {
           //初始化Ioc
           var autofacProvider = new AutofacProvider();
           autofacProvider.InitAutofacContainer(Path.Combine(basePath, "Config/Autofac/AutofacConfig.xml"));
           IocHelper.SetIocProvider(autofacProvider);
       }
    }
}
