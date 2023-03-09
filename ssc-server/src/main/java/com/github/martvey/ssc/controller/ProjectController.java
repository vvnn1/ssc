package com.github.martvey.ssc.controller;

import com.github.martvey.ssc.entity.common.SscResult;
import com.github.martvey.ssc.entity.project.ProjectQuery;
import com.github.martvey.ssc.entity.project.ProjectUpsert;
import com.github.martvey.ssc.entity.request.*;
import com.github.martvey.ssc.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<SscResult> createProject(@Valid @RequestBody PProjectRequest request){
        ProjectUpsert upsert = new ProjectUpsert();
        BeanUtils.copyProperties(request,upsert);
        projectService.insertProject(upsert);
        return ResponseEntity.ok(SscResult.ok("创建应用成功"));
    }

    @DeleteMapping
    public ResponseEntity<SscResult> deleteProject(@Valid DProjectRequest request){
        projectService.deleteProject(request.getId());
        return ResponseEntity.ok(SscResult.ok("删除应用成功"));
    }

    @GetMapping("/list")
    public ResponseEntity<SscResult> listProject(@Valid GProjectListRequest request){
        ProjectQuery query = new ProjectQuery();
        BeanUtils.copyProperties(request, query);
        return ResponseEntity.ok(SscResult.ok("查询应用成功", projectService.listProjectVO(query)));
    }

    @GetMapping
    public ResponseEntity<SscResult> getProject(@Valid GProjectRequest request){
        return ResponseEntity.ok(SscResult.ok("查询工程成功", projectService.getProjectVO(request.getId())));
    }

    @PutMapping
    public ResponseEntity<SscResult> updateProject(@Valid @RequestBody UProjectRequest request){
        ProjectUpsert upsert = new ProjectUpsert();
        BeanUtils.copyProperties(request, upsert);
        projectService.updateProject(upsert);
        return ResponseEntity.ok(SscResult.ok("更新工程名称成功"));
    }

}
