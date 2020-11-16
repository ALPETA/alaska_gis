package com.alaska.test.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alaska.test.dto.LineDto;
import com.alaska.test.dto.PointDto;
import com.alaska.test.dto.PolygonDto;
import com.alaska.test.dto.RasterDto;
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
		model.addAttribute("polygon", testService.getPolygon());

		// point
		model.addAttribute("point", testService.getPoint());

		// line
		model.addAttribute("line", testService.getLine());

		//model.addAttribute("list", testService.getAll());
		
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
	@RequestMapping("/insert/raster")
	private String boardInsertRaster(HttpServletRequest request) throws Exception {

		RasterDto rasterDto = new RasterDto();

		rasterDto.setLocal_name(request.getParameter("local_name"));
		rasterDto.setData_name(request.getParameter("data_name"));

		testService.insertRaster(rasterDto);

		return "redirect:/";
	}

	// insert into polygon
	@RequestMapping("/insert/polygon")
	private String boardInsertPolygon(HttpServletRequest request) throws Exception {

		PolygonDto polygonDto = new PolygonDto();

		polygonDto.setLocal_name(request.getParameter("local_name"));
		polygonDto.setData_name(request.getParameter("data_name"));
		polygonDto.setFill_color(request.getParameter("fill_color"));

		testService.insertPolygon(polygonDto);

		return "redirect:/";
	}

	// insert into point
	@RequestMapping("/insert/point")
	private String boardInsertPoint(HttpServletRequest request) throws Exception {

		PointDto pointDto = new PointDto();

		pointDto.setLocal_name(request.getParameter("local_name"));
		pointDto.setData_name(request.getParameter("data_name"));
		pointDto.setFill_color(request.getParameter("fill_color"));

		testService.insertPoint(pointDto);

		return "redirect:/";
	}

	// insert into line 
	@RequestMapping("/insert/line")
	private String boardInsertLine(HttpServletRequest request) throws Exception {

		LineDto lineDto = new LineDto();

		lineDto.setLocal_name(request.getParameter("local_name"));
		lineDto.setData_name(request.getParameter("data_name"));
		lineDto.setLine_color(request.getParameter("line_color"));

		testService.insertLine(lineDto);

		return "redirect:/";
	}

	
	
	
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

	// update raster layer name
	@RequestMapping("/update/raster/name")
	private String boardUpdateRaster(HttpServletRequest request) throws Exception {

		RasterDto rasterDto = new RasterDto();

		rasterDto.setLocal_name(request.getParameter("local_name"));
		rasterDto.setData_name(request.getParameter("data_name"));

		testService.updateRaster(rasterDto);

		return "redirect:/";
	}

	// update polygon layer name
	@RequestMapping("/update/polygon/name")
	private String boardUpdatePolygon(HttpServletRequest request) throws Exception {

		PolygonDto polygonDto = new PolygonDto();

		polygonDto.setLocal_name(request.getParameter("local_name"));
		polygonDto.setData_name(request.getParameter("data_name"));

		testService.updatePolygon(polygonDto);

		return "redirect:/";
	}

	// update point layer name
	@RequestMapping("/update/point/name")
	private String boardUpdatePoint(HttpServletRequest request) throws Exception {

		PointDto pointDto = new PointDto();

		pointDto.setLocal_name(request.getParameter("local_name"));
		pointDto.setData_name(request.getParameter("data_name"));

		testService.updatePoint(pointDto);

		return "redirect:/";
	}

	// update line layer name
	@RequestMapping("/update/line/name")
	private String boardUpdateLine(HttpServletRequest request) throws Exception {

		LineDto lineDto = new LineDto();

		lineDto.setLocal_name(request.getParameter("local_name"));
		lineDto.setData_name(request.getParameter("data_name"));

		testService.updateLine(lineDto);

		return "redirect:/";
	}
	
	
	

	// update polygon layer style
	@RequestMapping("/update/polygon/style")
	private String boardUpdatePolygonStyle(HttpServletRequest request) throws Exception {

		PolygonDto polygonDto = new PolygonDto();

		polygonDto.setLocal_name(request.getParameter("local_name"));
		polygonDto.setLine_color(request.getParameter("line_color"));
		polygonDto.setLine_width(Integer.parseInt(request.getParameter("line_width")));
		polygonDto.setFill_color(request.getParameter("fill_color"));
		polygonDto.setOpacity(Integer.parseInt(request.getParameter("opacity")));

		testService.updatePolygonStyle(polygonDto);

		return "redirect:/";
	}

	// update point layer style
	@RequestMapping("/update/point/style")
	private String boardUpdatePointStyle(HttpServletRequest request) throws Exception {

		PointDto pointDto = new PointDto();

		pointDto.setLocal_name(request.getParameter("local_name"));
		pointDto.setPoint_shape(request.getParameter("point_shape"));
		pointDto.setFill_color(request.getParameter("fill_color"));
		pointDto.setPoint_radius(Integer.parseInt(request.getParameter("point_radius")));
		pointDto.setOpacity(Integer.parseInt(request.getParameter("opacity")));
		
		testService.updatePointStyle(pointDto);

		return "redirect:/";
	}

	// update line layer style
	@RequestMapping("/update/line/style")
	private String boardUpdateLineStyle(HttpServletRequest request) throws Exception {

		LineDto lineDto = new LineDto();

		lineDto.setLocal_name(request.getParameter("local_name"));
		lineDto.setLine_color(request.getParameter("line_color"));
		lineDto.setLine_width(Integer.parseInt(request.getParameter("line_width")));
		lineDto.setOpacity(Integer.parseInt(request.getParameter("opacity")));

		testService.updateLineStyle(lineDto);

		return "redirect:/";
	}

	
	
	
	// delete
	@RequestMapping("/delete/{layer_num}")
	private String boardDelete(@PathVariable int layer_num) throws Exception {

		testService.deleteLayer(layer_num);

		return "redirect:/";
	}

	// delete from raster layer
	@RequestMapping("/delete/raster/{local_name}")
	private String boardDeleteRaster(@PathVariable String local_name) throws Exception {

		testService.deleteRaster(local_name);

		return "redirect:/";
	}

	// delete from polygon layer
	@RequestMapping("/delete/polygon/{local_name}")
	private String boardDeletePolygon(@PathVariable String local_name) throws Exception {

		testService.deletePolygon(local_name);

		return "redirect:/";
	}

	// delete from point layer
	@RequestMapping("/delete/point/{local_name}")
	private String boardDeletePoint(@PathVariable String local_name) throws Exception {

		testService.deletePoint(local_name);

		return "redirect:/";
	}

	// delete from line layer
	@RequestMapping("/delete/line/{local_name}")
	private String boardDeleteLine(@PathVariable String local_name) throws Exception {

		testService.deleteLine(local_name);

		return "redirect:/";
	}

}
