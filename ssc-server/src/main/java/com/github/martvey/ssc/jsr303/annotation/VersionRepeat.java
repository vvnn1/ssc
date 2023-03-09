package com.github.martvey.ssc.jsr303.annotation;


import com.github.martvey.ssc.jsr303.constraint.VersionRepeatConstraint;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = VersionRepeatConstraint.class)
public @interface VersionRepeat {
    String message();
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
