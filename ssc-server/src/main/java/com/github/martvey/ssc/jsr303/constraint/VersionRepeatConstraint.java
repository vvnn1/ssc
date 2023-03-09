package com.github.martvey.ssc.jsr303.constraint;

import com.github.martvey.ssc.jsr303.annotation.VersionRepeat;
import com.github.martvey.ssc.dao.VersionDao;
import com.github.martvey.ssc.entity.request.PAppVersionRequest;
import com.github.martvey.ssc.entity.version.VersionQuery;
import com.github.pagehelper.PageHelper;
import org.hibernate.validator.internal.engine.constraintvalidation.ConstraintValidatorContextImpl;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class VersionRepeatConstraint implements ConstraintValidator<VersionRepeat, PAppVersionRequest> {
    private final VersionDao versionDao;

    public VersionRepeatConstraint(VersionDao versionDao) {
        this.versionDao = versionDao;
    }

    @Override
    public boolean isValid(PAppVersionRequest value, ConstraintValidatorContext context) {
        VersionQuery query = VersionQuery.builder()
                .appId(value.getAppId())
                .version(value.getVersion())
                .build();
        long count = PageHelper.count(() -> versionDao.listVersionDO(query));
        if (count > 0){
            ((ConstraintValidatorContextImpl) context)
                    .addMessageParameter("version", value.getVersion());
            return false;
        }
        return true;
    }
}
