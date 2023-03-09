package com.github.martvey.ssc.entity.metastore;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

/**
 * @author martvey
 * @date 2022/5/14 11:48
 */
@Getter
@Setter
@ToString
public class CatalogVO extends MetastoreVO{
    private String name;
}
