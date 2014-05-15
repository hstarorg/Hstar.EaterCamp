using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Configuration;

namespace Hstar.Framework.IBatis4Net
{
    /// <summary>
    /// SqlMapper帮助类（密封类，不能实例化）
    /// </summary>
    public sealed class SqlMapperHelper
    {
        private static volatile ISqlMapper mapper;

        /// <summary>
        /// 初始化Ibatis的SqlMapper
        /// </summary>
        public static void InitMapper()
        {
            DomSqlMapBuilder builder = new DomSqlMapBuilder();
            mapper = builder.Configure();
        }

        /// <summary>
        /// SqlMapper实例
        /// </summary>
        public static ISqlMapper Instance
        {
            get
            {
                if (mapper != null) return mapper;
                lock (typeof(SqlMapper))
                {
                    if (mapper == null) // double-check
                    {
                        InitMapper();
                    }
                }
                return mapper;
            }
        }
    }
}