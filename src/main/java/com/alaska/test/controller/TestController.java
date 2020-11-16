package com.alaska.test.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alaska.test.dto.TestDto;
import com.alaska.test.service.TestService;

@Controller
@RequestMapping("/")
public class TestController {

	@Autowired
	private TestService testService;

	// list
	@RequestMapping("/")
	public String index(Model model) throws Exception {

		// raster
		model.addAttribute("raster", testService.getRaster());

		// polygon

		// point

		// line

		model.addAttribute("list", testService.getAll());
		
		return "index";
	}

	// insert
	@RequestMapping("/insert")
	private String boardInsertProc(HttpServletRequest request) throws Exception {

		TestDto testDto = new TestDto();

		testDto.setLocal_name(request.getParameter("local_name"));
		testDto.setData_name(request.getParameter("data_name"));

		testService.insertLayer(testDto);

		return "redirect:/";
	}

	// insert into raster

	// insert into polygon

	// insert into point

	// insert into line

	// update
	@RequestMapping("/updateProc")
	private String boardUpdateProc(HttpServletRequest request) throws Exception {

		TestDto testDto = new TestDto();
		testDto.setLayer_num(Integer.parseInt(request.getParameter("update_layer_num")));
		testDto.setLocal_name(request.getParameter("update_local_name"));
		testDto.setData_name(request.getParameter("update_data_name"));

		testService.updateLayer(testDto);

		return "redirect:/";
	}

	// update raster layer

	// update polygon layer

	// update point layer

	// update line layer

	// update polygon style

	// update point style

	// update line style

	// delete
	@RequestMapping("/delete/{layer_num}")
	private String boardDelete(@PathVariable int layer_num) throws Exception {

		testService.deleteLayer(layer_num);

		return "redirect:/";
	}

	// delete from raster layer

	// delete from polygon layer

	// delete from point layer

	// delete from line layer

}
