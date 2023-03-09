package com.github.martvey.ssc.controller;

import com.github.martvey.ssc.entity.common.SscResult;
import com.github.martvey.ssc.entity.metastore.MetastoreDefine;
import com.github.martvey.ssc.entity.metastore.MetastoreDelete;
import com.github.martvey.ssc.entity.metastore.MetastoreQuery;
import com.github.martvey.ssc.entity.request.*;
import com.github.martvey.ssc.service.MetastoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/metastore")
@RequiredArgsConstructor
public class MetastoreController {
    private final MetastoreService metastoreService;

    @GetMapping
    public ResponseEntity<SscResult> getMetastore(@Valid GMetastoreRequest request){
        MetastoreQuery query = new MetastoreQuery();
        BeanUtils.copyProperties(request, query);
        return ResponseEntity.ok(SscResult.ok("查询元数据成功", metastoreService.getMetastore(query)));
    }

    @GetMapping("/list")
    public ResponseEntity<SscResult> listMetastore(@Valid GMetastoreListRequest request){
        MetastoreQuery query = new MetastoreQuery();
        BeanUtils.copyProperties(request, query);
        return ResponseEntity.ok(SscResult.ok("查询元数据成功", metastoreService.listMetastore(query)));
    }

    @PostMapping
    public ResponseEntity<SscResult> insertMetastore(@Valid @RequestBody PMetastoreRequest request){
        MetastoreDefine<?> metastoreDefine = request.getMetastoreDefine();
        BeanUtils.copyProperties(request,metastoreDefine);
        metastoreService.insertMetastore(metastoreDefine);
        return ResponseEntity.ok(SscResult.ok("添加元数据成功"));
    }

    @DeleteMapping
    public ResponseEntity<SscResult> deleteMetastore(@Valid DMetastoreRequest request){
        MetastoreDelete delete = new MetastoreDelete();
        BeanUtils.copyProperties(request,delete);
        metastoreService.deleteMetastore(delete);
        return ResponseEntity.ok(SscResult.ok("删除元数据成功"));
    }

    @PutMapping
    public ResponseEntity<SscResult> updateMetastore(@Valid UMetastoreRequest request){
        MetastoreDefine<?> metastoreDefine = request.getMetastoreDefine();
        BeanUtils.copyProperties(request,metastoreDefine);
        metastoreService.updateMetastore(request.getId(), metastoreDefine);
        return ResponseEntity.ok(SscResult.ok("更新元数据成功"));
    }
}
