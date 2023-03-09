package com.github.martvey.cli.jsr303.constraint;

import com.github.martvey.cli.jsr303.annotation.ScopeInUse;
import com.github.martvey.cli.constant.ScopeEnum;
import org.hibernate.validator.internal.engine.constraintvalidation.ConstraintValidatorContextImpl;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import static com.github.martvey.cli.util.CatalogUtils.*;

public class ScopeInUseConstraint implements ConstraintValidator<ScopeInUse, String> {

    private ScopeEnum scopeType;

    @Override
    public void initialize(ScopeInUse scopeInUse) {
        scopeType = scopeInUse.scopeType();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        boolean inUse;
        switch (scopeType){
            case SPACE:
                inUse = isSpaceInUse(value);
                break;
            case PROJECT:
                inUse = isProjectInUse(value);
                break;
            case APPLICATION:
                inUse = isAppInUse(value);
                break;
            default:
                throw new RuntimeException("非法的范围类型");
        }
        if (!inUse){
            return true;
        }
        ((ConstraintValidatorContextImpl) context).addMessageParameter("scope", scopeType.getDesc());
        return false;
    }
}
