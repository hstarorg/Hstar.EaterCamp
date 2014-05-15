/*********************************************************
 * CreateBy：Hstar
 * CreateOn：14/03/15 21:10:39
 * Description：Object类型相关的扩展方法
 * *******************************************************/

using System;
using System.IO;

namespace Hstar.Framework.Extension
{
    /// <summary>
    /// 针对Object的相关静态扩展
    /// </summary>
    public static class ObjectExtention
    {
        /// <summary>
        /// 将对象转换为指定的值类型
        /// </summary>
        /// <typeparam name="T">泛型T，值类型</typeparam>
        /// <param name="obj">原始对象</param>
        /// <returns></returns>
        public static T To<T>(this object obj) where T : struct
        {
            return (T)Convert.ChangeType(obj, typeof(T));
        }

        /// <summary>
        /// 将对象转换为指定的引用类型
        /// </summary>
        /// <typeparam name="T">泛型T，引用类型</typeparam>
        /// <param name="obj">原始对象</param>
        /// <param name="defaultValue">[可选]原始对象为null时的默认值</param>
        /// <returns></returns>
        public static T As<T>(this object obj, T defaultValue = null) where T : class
        {
            if (defaultValue != null && obj == null)
            {
                return defaultValue;
            }
            return obj as T;
        }
    }
}