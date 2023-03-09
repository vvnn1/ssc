package com.github.martvey.ssc.datasource;

import org.mybatis.spring.mapper.MapperFactoryBean;
import org.springframework.beans.factory.support.AbstractBeanDefinition;
import org.springframework.beans.factory.support.BeanNameGenerator;
import org.springframework.context.annotation.Import;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
@Import({LocalDataSourceConfig.class,LocalMapperScannerRegistrar.class})
public @interface EnableLocalDataSource {
    String[] value() default {};

    String[] basePackages() default {};

    Class<?>[] basePackageClasses() default {};

    Class<? extends BeanNameGenerator> nameGenerator() default BeanNameGenerator.class;

    Class<? extends Annotation> annotationClass() default Annotation.class;

    Class<?> markerInterface() default Class.class;

    String sqlSessionTemplateRef() default "";

    String sqlSessionFactoryRef() default "localSqlSessionFactory";

    Class<? extends MapperFactoryBean> factoryBean() default MapperFactoryBean.class;

    String lazyInitialization() default "";

    String defaultScope() default AbstractBeanDefinition.SCOPE_DEFAULT;
}
