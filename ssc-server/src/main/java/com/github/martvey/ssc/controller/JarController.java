package com.github.martvey.ssc.controller;


import com.github.martvey.ssc.entity.common.SscResult;
import com.github.martvey.ssc.constant.ScopeEnum;
import com.github.martvey.ssc.entity.jar.JarDelete;
import com.github.martvey.ssc.entity.jar.JarUpsert;
import com.github.martvey.ssc.entity.metastore.ScopeQuery;
import com.github.martvey.ssc.entity.request.DJarRequest;
import com.github.martvey.ssc.entity.request.GJarListRequest;
import com.github.martvey.ssc.entity.request.PJarRequest;
import com.github.martvey.ssc.service.JarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping("/jar")
@RequiredArgsConstructor
public class JarController {
    private final JarService jarService;

    @PostMapping
    public ResponseEntity<SscResult> insertJar(MultipartFile file, @Valid PJarRequest request){
        JarUpsert upsert = new JarUpsert();
        upsert.setJarName(file.getOriginalFilename());
        upsert.setScopeId(request.getScopeId());
        upsert.setScopeType(request.getScopeType());
        jarService.insertJar(file, upsert);
        return ResponseEntity.ok(SscResult.ok());
    }

    @DeleteMapping
    public ResponseEntity<SscResult> deleteJar(@Valid DJarRequest request){
        JarDelete delete = new JarDelete();
        delete.setJarId(request.getId());
        jarService.deleteJar(delete);
        return ResponseEntity.ok(SscResult.ok());
    }

    @GetMapping("/list")
    public ResponseEntity<SscResult> listJar(@Valid GJarListRequest request){
        ScopeQuery query = ScopeQuery.builder(request.getSpaceId(), request.getProjectId(), request.getAppId())
                .scopeTypeList(ScopeEnum.SPACE, ScopeEnum.PROJECT, ScopeEnum.APPLICATION)
                .build();
        return ResponseEntity.ok(SscResult.ok("查询jar包路径成功", jarService.listJar(query)));
    }
}
