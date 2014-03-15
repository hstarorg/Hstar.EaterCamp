using Hstar.Framework.Ioc;
using NUnit.Framework;

namespace Hstar.Framework.Test.Ioc
{
    internal class AutofacTest
    {
        /// <summary>
        /// 测试采用默认配置文件时的情况
        /// </summary>
        [TestCase]
        public void TestCase1()
        {
            AutofacHelper.InitAutofacContainer();
            var fun = AutofacHelper.GetInstance<IFun>();
            Assert.AreEqual("Fun1", fun.GetInstanceType());
        }

        /// <summary>
        /// 测试独立配置文件时的情况
        /// </summary>
        [TestCase]
        public void TestCase2()
        {
            AutofacHelper.InitAutofacContainer("../../Ioc/Autofac.xml");
            var fun = AutofacHelper.GetInstance<IFun>();
            Assert.AreEqual("Fun2", fun.GetInstanceType());
        }
    }

    internal interface IFun
    {
        string GetInstanceType();
    }

    internal class Fun1 : IFun
    {
        public string GetInstanceType()
        {
            return "Fun1";
        }
    }

    internal class Fun2 : IFun
    {
        public string GetInstanceType()
        {
            return "Fun2";
        }
    }
}