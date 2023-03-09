package com.github.martvey.ssc.entity.space;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class SpaceVO {
    private String id;
    private String spaceName;
    private Date createTime;
}
