package com.github.martvey.cli.jsr303.annotation;

import com.github.martvey.cli.jsr303.constraint.FileTypeConstraint;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = FileTypeConstraint.class)
public @interface FileExist {
    String[] fileSuffix();
    String message();
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
