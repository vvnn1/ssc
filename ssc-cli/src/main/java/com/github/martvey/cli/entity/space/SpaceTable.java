package com.github.martvey.cli.entity.space;

import com.github.martvey.cli.annotation.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SpaceTable {
    @Column("空间id")
    private String id;
    @Column("空间名称")
    private String spaceName;
    @Column("创建时间")
    private String createTime;
}
