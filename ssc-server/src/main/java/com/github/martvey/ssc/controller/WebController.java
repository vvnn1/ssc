package com.github.martvey.ssc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/web")
@Controller
public class WebController {
    @GetMapping("/{workSpace}/{language}")
    public String webPage(@PathVariable("workSpace") String workSpace, @PathVariable("language") String language) {
        System.out.println(workSpace);
        return "/index.html";
    }
}
