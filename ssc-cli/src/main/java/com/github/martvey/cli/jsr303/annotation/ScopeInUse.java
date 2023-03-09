package com.github.martvey.cli.jsr303.annotation;

import com.github.martvey.cli.constant.ScopeEnum;
import com.github.martvey.cli.jsr303.constraint.ScopeInUseConstraint;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = ScopeInUseConstraint.class)
public @interface ScopeInUse {
    ScopeEnum scopeType();
    String message();
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
