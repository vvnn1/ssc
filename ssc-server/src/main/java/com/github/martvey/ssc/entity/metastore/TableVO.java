package com.github.martvey.ssc.entity.metastore;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

/**
 * @author martvey
 * @date 2022/5/14 11:45
 */
@Getter
@Setter
@ToString
public class TableVO extends MetastoreVO{
    private String name;
}
