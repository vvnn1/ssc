package com.github.martvey.ssc.datasource;

import com.alibaba.druid.pool.DruidDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.type.EnumOrdinalTypeHandler;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

public class LocalDataSourceConfig {
    private String mapperLocation;

    @Bean
    @Primary
    @ConfigurationProperties(prefix = "spring.datasource.local")
    public DataSource localDataSource(){
        return new DruidDataSource();
    }

    @Bean
    @Primary
    public DataSourceTransactionManager localDataSourceTransactionManager(DataSource localDataSource){
        return new DataSourceTransactionManager(localDataSource);
    }


    @Bean
    @Primary
    public SqlSessionFactory localSqlSessionFactory(DataSource localDataSource) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(localDataSource);
        factoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources(mapperLocation));
        factoryBean.setDefaultEnumTypeHandler(EnumOrdinalTypeHandler.class);
        return factoryBean.getObject();
    }

    @Value("${spring.datasource.local.mapper-location}")
    public void setMapperLocation(String mapperLocation) {
        this.mapperLocation = mapperLocation;
    }
}
