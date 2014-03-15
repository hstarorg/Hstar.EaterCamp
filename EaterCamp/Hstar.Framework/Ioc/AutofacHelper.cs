using Autofac;
using Autofac.Configuration;

namespace Hstar.Framework.Ioc
{
    public sealed class AutofacHelper
    {
        /// <summary>
        /// 定义静态的Ioc容器对象
        /// </summary>
        private static IContainer container;

        /// <summary>
        /// 通过配置文件，初始化Ioc容器的配置
        /// </summary>
        /// <param name="configFilePath">配置文件地址</param>
        public static void InitAutofacContainer(string configFilePath = null)
        {
            var containerBuilder = new ContainerBuilder();
            //从指定的xml配置文件中，读取Ioc依赖配置（如果未指定配置文件，那么从App.config/Web.config中读取）
            containerBuilder.RegisterModule(configFilePath == null ? new ConfigurationSettingsReader("autofac") : new ConfigurationSettingsReader("autofac", configFilePath));
            //初始化Ioc容器
            container = containerBuilder.Build();
        }

        /// <summary>
        /// 返回对象的实例
        /// </summary>
        /// <typeparam name="T">类型T</typeparam>
        /// <returns></returns>
        public static T GetInstance<T>() where T : class
        {
            return container.Resolve<T>();
        }
    }
}