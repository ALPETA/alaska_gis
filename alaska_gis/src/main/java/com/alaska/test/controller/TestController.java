package com.alaska.test.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alaska.test.dto.TestDto;
import com.alaska.test.service.TestService;

@Controller
@RequestMapping("/")
public class TestController {

	@Autowired
	private TestService testService;
	
	//list
	@RequestMapping("/")
	public String index(Model model) throws Exception {

		model.addAttribute("list", testService.getAll());
		return "index";
	}
	
    
	//insert
    @RequestMapping("/insert")
    private String boardInsertProc(HttpServletRequest request) throws Exception{
        
        TestDto testDto = new TestDto();
        
        testDto.setLocal_name(request.getParameter("local_name"));
        testDto.setData_name(request.getParameter("data_name"));
        
        testService.insertLayer(testDto);

        return "redirect:/";
    }
    
    //update page
    @RequestMapping("/update/{layer_num}")
    private String updatePage(@PathVariable int layer_num, Model model) throws Exception{
        
        model.addAttribute("detail", testService.detailLayer(layer_num));
        
        return "update";
    }
    
    //update
    @RequestMapping("/updateProc")
    private int boardUpdateProc(HttpServletRequest request) throws Exception{
        
    	TestDto testDto = (TestDto) request.getParameterMap();
        
        return testService.updateLayer(testDto);
    }

    //delete
	@RequestMapping("/delete/{layer_num}")
    private String boardDelete(@PathVariable int layer_num) throws Exception{
        
        testService.deleteLayer(layer_num);
        
        return "redirect:/";
    }

}
