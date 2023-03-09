package com.github.martvey.ssc.controller;

import com.github.martvey.ssc.entity.common.SscResult;
import com.github.martvey.ssc.entity.job.JobInsert;
import com.github.martvey.ssc.entity.request.DJobRequest;
import com.github.martvey.ssc.entity.request.GJobGraphRequest;
import com.github.martvey.ssc.entity.request.PJobRequest;
import com.github.martvey.ssc.entity.request.USqlJobRequest;
import com.github.martvey.ssc.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/job")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;

    @PostMapping
    public ResponseEntity<SscResult> insertJob(@RequestBody @Valid PJobRequest request){
        JobInsert insert = new JobInsert();
        BeanUtils.copyProperties(request, insert);
        jobService.createJob(insert);
        return ResponseEntity.ok(SscResult.ok());
    }


    @GetMapping("/list")
    public ResponseEntity<SscResult> listJob(){
        return ResponseEntity.ok(SscResult.ok("查询job成功", jobService.listJob()));
    }

    @GetMapping
    public ResponseEntity<SscResult> getJob(){
        return ResponseEntity.ok(SscResult.ok());
    }

    @DeleteMapping
    public ResponseEntity<SscResult> deleteJob(@Valid DJobRequest request){
        jobService.deleteJob(request.getId());
        return ResponseEntity.ok(SscResult.ok("删除job成功"));
    }

    @PutMapping("/run")
    public ResponseEntity<SscResult> jobDebug(@RequestBody @Valid USqlJobRequest request){
        jobService.jobRun(request.getId());
        return ResponseEntity.ok(SscResult.ok("启动任务成功"));
    }

    @PutMapping("/stop")
    public ResponseEntity<SscResult> jobStop(@RequestBody @Valid USqlJobRequest request){
        jobService.jobStop(request.getId());
        return ResponseEntity.ok(SscResult.ok());
    }

    @PutMapping("/re-run")
    public ResponseEntity<SscResult> jobReRun(@RequestBody @Valid USqlJobRequest request){
        jobService.jobRun(request.getId());
        return ResponseEntity.ok(SscResult.ok());
    }

    @GetMapping("/plan")
    public ResponseEntity<SscResult> getJobGraph(@Valid GJobGraphRequest request){
        return ResponseEntity.ok(SscResult.ok("查询任务图成功", jobService.getJobPlanInfo(request.getId())));
    }
}
