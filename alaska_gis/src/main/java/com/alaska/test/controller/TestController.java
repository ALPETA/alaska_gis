package com.alaska.test.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alaska.test.dto.TestDto;
import com.alaska.test.service.TestService;

@Controller
@RequestMapping("/")
public class TestController {

	@Autowired
	private TestService testService;

	@RequestMapping("/")
	public String index() {

		return "index";
	}

	@RequestMapping("/query")
	public @ResponseBody List<TestDto> query() throws Exception {
		return testService.getAll();
	}

}
