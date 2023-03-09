package com.github.martvey.cli.jsr303.constraint;

import com.github.martvey.cli.jsr303.annotation.FileExist;
import org.hibernate.validator.internal.engine.constraintvalidation.ConstraintValidatorContextImpl;
import org.springframework.util.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.io.File;

public class FileTypeConstraint implements ConstraintValidator<FileExist, File> {

    private String[] fileSuffix;

    @Override
    public void initialize(FileExist constraintAnnotation) {
        fileSuffix = constraintAnnotation.fileSuffix();
    }

    @Override
    public boolean isValid(File file, ConstraintValidatorContext context) {
        if (file == null){
            return true;
        }
        if (file.isFile()){
            for (String suffix : fileSuffix) {
                if (StringUtils.endsWithIgnoreCase(file.getName(), suffix)) {
                    return true;
                }
            }
        }

        ((ConstraintValidatorContextImpl) context)
                .addMessageParameter("supportFile", String.join(",", fileSuffix));
        return false;
    }
}
