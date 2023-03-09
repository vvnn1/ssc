package com.github.martvey.ssc.controller;


import com.github.martvey.ssc.entity.common.SscResult;
import com.github.martvey.ssc.entity.request.*;
import com.github.martvey.ssc.entity.sql.AppUpsert;
import com.github.martvey.ssc.service.AppService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/app")
@RequiredArgsConstructor
public class AppController {
    private final AppService appService;

    @PostMapping
    public ResponseEntity<SscResult> postSql(@Valid @RequestBody PUAppRequest request){
        AppUpsert upsert = new AppUpsert();
        BeanUtils.copyProperties(request,upsert);
        appService.insertApp(upsert);
        return ResponseEntity.ok(SscResult.ok("添加sql成功"));
    }

    @PutMapping
    public ResponseEntity<SscResult> updateSql(@Valid @ModelAttribute("request") PUAppRequest request){
        AppUpsert upsert = new AppUpsert();
        BeanUtils.copyProperties(request,upsert);
        appService.updateApp(upsert);
        return ResponseEntity.ok(SscResult.ok("更新sql成功"));
    }

    @ModelAttribute
    public void requestModelAttribute(HttpServletRequest request, Model model){
        if (StringUtils.pathEquals("/app", request.getRequestURI()) && StringUtils.pathEquals("PUT", request.getMethod())){
            String id = request.getParameter("id");
            PUAppRequest puAppRequest = appService.buildPUAppRequestById(id);
            model.addAttribute("request", puAppRequest);
        }
    }

    @DeleteMapping
    public ResponseEntity<SscResult> deleteSql(@Valid DSqlRequest request){
        appService.deleteAppById(request.getId());
        return ResponseEntity.ok(SscResult.ok("删除sql成功"));
    }

    @GetMapping("/list")
    public ResponseEntity<SscResult> listSql(@Valid GSqlListRequest request){
        return ResponseEntity.ok(SscResult.ok("查询sql成功", appService.listAppVO(request.getProjectId())));
    }

    @GetMapping
    public ResponseEntity<SscResult> getSql(@Valid GSqlRequest request){
        return ResponseEntity.ok(SscResult.ok("查询sql成功", appService.getAppVO(request.getId())));
    }

    @GetMapping("/validate")
    public ResponseEntity<SscResult> validateSql(@Valid GAppValidateRequest request){
        return ResponseEntity.ok(SscResult.ok("校验SQL成功", appService.validateSql(request.getId())));
    }
}
