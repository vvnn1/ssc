package com.github.martvey.cli.entity.metastore;

import com.github.martvey.cli.annotation.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author martvey
 * @date 2022/5/29 15:05
 */
@Getter
@Setter
@ToString
public class ModuleTable extends MetastoreTable{
    @Column("id")
    private String id;
    @Column("函数名称")
    private String name;
    @Column("创建时间")
    private String createTime;
}
