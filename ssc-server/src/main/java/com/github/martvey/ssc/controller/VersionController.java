package com.github.martvey.ssc.controller;


import com.github.martvey.ssc.entity.common.SscResult;
import com.github.martvey.ssc.entity.request.DSqlVersionRequest;
import com.github.martvey.ssc.entity.request.GVersionListRequest;
import com.github.martvey.ssc.entity.request.PAppVersionRequest;
import com.github.martvey.ssc.entity.version.VersionUpsert;
import com.github.martvey.ssc.service.VersionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/version")
@RequiredArgsConstructor
public class VersionController {
    private final VersionService versionService;

    @PostMapping
    public ResponseEntity<SscResult> insertVersion(@RequestBody @Valid PAppVersionRequest request){
        VersionUpsert upsert = new VersionUpsert();
        BeanUtils.copyProperties(request, upsert);
        versionService.insertVersion(upsert);
        return ResponseEntity.ok(SscResult.ok("发布版本成功"));
    }

    @GetMapping("/list")
    public ResponseEntity<SscResult> listVersion(@Valid GVersionListRequest request){
        return ResponseEntity.ok(SscResult.ok("查询版本成功", versionService.listVersion(request.getAppId())));
    }


    @DeleteMapping
    public ResponseEntity<SscResult> deleteVersion(@Valid DSqlVersionRequest request){
        versionService.deleteVersion(request.getId());
        return ResponseEntity.ok(SscResult.ok());
    }
}
