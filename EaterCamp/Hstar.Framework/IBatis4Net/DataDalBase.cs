using System.Collections.Generic;

namespace Hstar.Framework.IBatis4Net
{
    public abstract class DataDalBase
    {
        /// <summary>
        ///
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="statementName"></param>
        /// <param name="paramObj"></param>
        /// <returns></returns>
        public IList<T> QueryForList<T>(string statementName, object paramObj)
        {
            return SqlMapperHelper.Instance.QueryForList<T>(statementName, paramObj);
        }

        /// <summary>
        ///
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="statementName"></param>
        /// <param name="paramObj"></param>
        /// <returns></returns>
        public T QueryForObject<T>(string statementName, object paramObj)
        {
            return SqlMapperHelper.Instance.QueryForObject<T>(statementName, paramObj);
        }

        /// <summary>
        /// 执行用于更新的SQL语句
        /// </summary>
        /// <param name="statementName"></param>
        /// <param name="paramObj"></param>
        /// <returns>受影响的行数</returns>
        public int ExecuteUpdate(string statementName, object paramObj)
        {
            return SqlMapperHelper.Instance.Update(statementName, paramObj);
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="statementName"></param>
        /// <param name="paramObj"></param>
        /// <returns></returns>
        public object ExecuteInsert(string statementName, object paramObj)
        {
            return SqlMapperHelper.Instance.Insert(statementName, paramObj);
        }
    }
}