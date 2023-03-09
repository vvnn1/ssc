package com.github.martvey.cli.entity.app;

import com.github.martvey.cli.annotation.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AppValidResultTable {
    @Column("错误SQL")
    private String sqlContent;
    @Column("错误原因")
    private String errMessage;
}
