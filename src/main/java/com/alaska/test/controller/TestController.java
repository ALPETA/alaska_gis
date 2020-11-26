package com.alaska.test.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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

	// main page
	@GetMapping("/")
	public String index() {
		return "index";
	}

	// raster layer list
	@RequestMapping("/list/raster")
	@ResponseBody
	public List<RasterDto> rasterlist() throws Exception {

		// model.addAttribute("list", testService.getAll());

		return testService.getRaster();
	}

	// polygon layer list
	@RequestMapping("/list/polygon")
	@ResponseBody
	public List<PolygonDto> polygonlist() throws Exception {

		// model.addAttribute("list", testService.getAll());

		return testService.getPolygon();
	}

	// point layer list
	@RequestMapping("/list/point")
	@ResponseBody
	public List<PointDto> pointlist() throws Exception {

		// model.addAttribute("list", testService.getAll());

		return testService.getPoint();
	}

	// line layer list
	@RequestMapping("/list/line")
	@ResponseBody
	public List<LineDto> linelist() throws Exception {

		// model.addAttribute("list", testService.getAll());

		return testService.getLine();
	}

	
	
	

	// insert into raster
	@RequestMapping("/insert/raster")
	private String boardInsertRaster(HttpServletRequest request) throws Exception {

		RasterDto rasterDto = new RasterDto();

		rasterDto.setLocal_name(request.getParameter("insert_local_name"));
		rasterDto.setData_name(request.getParameter("insert_data_name"));

		testService.insertRaster(rasterDto);

		return "redirect:/";
	}

	// insert into polygon
	@RequestMapping("/insert/polygon")
	private String boardInsertPolygon(HttpServletRequest request) throws Exception {

		PolygonDto polygonDto = new PolygonDto();

		polygonDto.setLocal_name(request.getParameter("insert_local_name"));
		polygonDto.setData_name(request.getParameter("insert_data_name"));

		testService.insertPolygon(polygonDto);

		return "redirect:/";
	}

	// insert into point
	@RequestMapping("/insert/point")
	private String boardInsertPoint(HttpServletRequest request) throws Exception {

		PointDto pointDto = new PointDto();

		pointDto.setLocal_name(request.getParameter("insert_local_name"));
		pointDto.setData_name(request.getParameter("insert_data_name"));

		testService.insertPoint(pointDto);

		return "redirect:/";
	}

	// insert into line
	@RequestMapping("/insert/line")
	private String boardInsertLine(HttpServletRequest request) throws Exception {

		LineDto lineDto = new LineDto();

		lineDto.setLocal_name(request.getParameter("insert_local_name"));
		lineDto.setData_name(request.getParameter("insert_data_name"));

		testService.insertLine(lineDto);

		return "redirect:/";
	}

	// update raster layer name
	@RequestMapping("/update/name/raster")
	private String boardUpdateRaster(HttpServletRequest request) throws Exception {

		RasterDto rasterDto = new RasterDto();

		rasterDto.setLayer_num(Integer.parseInt(request.getParameter("update_layer_num")));
		rasterDto.setLocal_name(request.getParameter("update_local_name"));
		rasterDto.setData_name(request.getParameter("update_data_name"));

		testService.updateRaster(rasterDto);

		return "redirect:/";
	}

	// update polygon layer name
	@RequestMapping("/update/name/polygon")
	private String boardUpdatePolygon(HttpServletRequest request) throws Exception {

		PolygonDto polygonDto = new PolygonDto();

		polygonDto.setLayer_num(Integer.parseInt(request.getParameter("update_layer_num")));
		polygonDto.setLocal_name(request.getParameter("update_local_name"));
		polygonDto.setData_name(request.getParameter("update_data_name"));

		testService.updatePolygon(polygonDto);

		return "redirect:/";
	}

	// update point layer name
	@RequestMapping("/update/name/point")
	private String boardUpdatePoint(HttpServletRequest request) throws Exception {

		PointDto pointDto = new PointDto();

		pointDto.setLayer_num(Integer.parseInt(request.getParameter("update_layer_num")));
		pointDto.setLocal_name(request.getParameter("update_local_name"));
		pointDto.setData_name(request.getParameter("update_data_name"));

		testService.updatePoint(pointDto);

		return "redirect:/";
	}

	// update line layer name
	@RequestMapping("/update/name/line")
	private String boardUpdateLine(HttpServletRequest request) throws Exception {

		LineDto lineDto = new LineDto();

		lineDto.setLayer_num(Integer.parseInt(request.getParameter("update_layer_num")));
		lineDto.setLocal_name(request.getParameter("update_local_name"));
		lineDto.setData_name(request.getParameter("update_data_name"));

		testService.updateLine(lineDto);

		return "redirect:/";
	}

	// update polygon layer style
	@RequestMapping("/update/style/polygon")
	@ResponseBody
	private void boardUpdatePolygonStyle(HttpServletRequest request, HttpServletResponse response) throws Exception {

		PolygonDto polygonDto = new PolygonDto();

		polygonDto.setLayer_num(Integer.parseInt(request.getParameter("polygon_num")));
		polygonDto.setLine_color(request.getParameter("plline_fill_color"));
		polygonDto.setLine_width(Float.parseFloat(request.getParameter("pllline_width")));
		polygonDto.setFill_color(request.getParameter("plfill_color"));
		polygonDto.setOpacity(Float.parseFloat(request.getParameter("plopacity")));
		
		testService.updatePolygonStyle(polygonDto);

	}

	// update point layer style
	@RequestMapping("/update/style/point")
	@ResponseBody
	private void boardUpdatePointStyle(HttpServletRequest request, HttpServletResponse response) throws Exception {

		PointDto pointDto = new PointDto();

		pointDto.setLayer_num(Integer.parseInt(request.getParameter("point_num")));
		pointDto.setPoint_shape(request.getParameter("point_shape"));
		pointDto.setFill_color(request.getParameter("pofill_color"));
		pointDto.setPoint_radius(Float.parseFloat(request.getParameter("point_radius")));
		pointDto.setOpacity(Float.parseFloat(request.getParameter("popacity")));

		testService.updatePointStyle(pointDto);

	}

	// update line layer style
	@RequestMapping("/update/style/line")
	@ResponseBody
	private void boardUpdateLineStyle(HttpServletRequest request, HttpServletResponse response) throws Exception {

		LineDto lineDto = new LineDto();

		lineDto.setLayer_num(Integer.parseInt(request.getParameter("line_num")));
		lineDto.setLine_color(request.getParameter("liline_color"));
		lineDto.setLine_width(Float.parseFloat(request.getParameter("liline_width")));
		lineDto.setOpacity(Float.parseFloat(request.getParameter("liopacity")));

		testService.updateLineStyle(lineDto);

	}

	

	// delete from raster layer
	@RequestMapping("/delete/raster/{layer_num}")
	private String boardDeleteRaster(@PathVariable int layer_num) throws Exception {

		testService.deleteRaster(layer_num);

		return "redirect:/";
	}

	// delete from polygon layer
	@RequestMapping("/delete/polygon/{layer_num}")
	private String boardDeletePolygon(@PathVariable int layer_num) throws Exception {

		testService.deletePolygon(layer_num);

		return "redirect:/";
	}

	// delete from point layer
	@RequestMapping("/delete/point/{layer_num}")
	private String boardDeletePoint(@PathVariable int layer_num) throws Exception {

		testService.deletePoint(layer_num);

		return "redirect:/";
	}

	// delete from line layer
	@RequestMapping("/delete/line/{layer_num}")
	private String boardDeleteLine(@PathVariable int layer_num) throws Exception {

		testService.deleteLine(layer_num);

		return "redirect:/";
	}

}
