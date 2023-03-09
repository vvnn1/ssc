package com.github.martvey.cli.entity.metastore;

import com.github.martvey.cli.annotation.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author martvey
 * @date 2022/5/29 15:29
 */
@Getter
@Setter
@ToString
public class ExecutionTable extends MetastoreTable{
    @Column("id")
    private String id;
    @Column("创建时间")
    private String createTime;
}
