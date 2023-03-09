package com.github.martvey.ssc.controller;

import com.github.martvey.ssc.entity.common.SscResult;
import com.github.martvey.ssc.entity.request.*;
import com.github.martvey.ssc.entity.space.SpaceQuery;
import com.github.martvey.ssc.entity.space.SpaceUpsert;
import com.github.martvey.ssc.service.SpaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/space")
@RequiredArgsConstructor
public class SpaceController {
    private final SpaceService spaceService;

    @PostMapping
    public ResponseEntity<SscResult> postSpace(@Valid @RequestBody PSpaceRequest request){
        SpaceUpsert upsert = new SpaceUpsert();
        BeanUtils.copyProperties(request,upsert);
        spaceService.insertSpace(upsert);
        return ResponseEntity.ok(SscResult.ok("创建项目空间成功"));
    }

    @DeleteMapping
    public ResponseEntity<SscResult> deleteSpace(@Valid DSpaceRequest request){
        spaceService.deleteSpace(request.getId());
        return ResponseEntity.ok(SscResult.ok("删除项目空间成功"));
    }

    @GetMapping("/list")
    public ResponseEntity<SscResult> listSpacePage(@Valid GSpaceListRequest request){
        SpaceQuery query = new SpaceQuery();
        BeanUtils.copyProperties(request, query);
        return ResponseEntity.ok(SscResult.ok("查询项目空间成功", spaceService.listSpaceVO(query)));
    }

    @GetMapping
    public ResponseEntity<SscResult> getSpace(@Valid GSpaceRequest request){
        return ResponseEntity.ok(SscResult.ok("查询项目空间成功", spaceService.getSpaceVO(request.getId())));
    }

    @PutMapping
    public ResponseEntity<SscResult> updateSpace(@Valid @RequestBody USpaceRequest request){
        SpaceUpsert upsert = new SpaceUpsert();
        BeanUtils.copyProperties(request, upsert);
        spaceService.updateSpace(upsert);
        return ResponseEntity.ok(SscResult.ok("更新项目成功"));
    }
}
