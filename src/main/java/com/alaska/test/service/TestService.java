package com.alaska.test.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alaska.test.dto.LineDto;
import com.alaska.test.dto.PointDto;
import com.alaska.test.dto.PolygonDto;
import com.alaska.test.dto.RasterDto;
import com.alaska.test.dto.TestDto;
import com.alaska.test.mapper.TestMapper;

@Service
public class TestService{

	@Autowired
	TestMapper testMapper;

	// list
	public List<TestDto> getAll() throws Exception {
		return testMapper.getAll();
	}

	// raster list
	public List<RasterDto> getRaster() throws Exception {
		return testMapper.getRaster();
	}

	// polygon list
	public List<PolygonDto> getPolygon() throws Exception {
		return testMapper.getPolygon();
	}

	// point list
	public List<PointDto> getPoint() throws Exception {
		return testMapper.getPoint();
	}

	// line list
	public List<LineDto> getLine() throws Exception {
		return testMapper.getLine();
	}
	
	
	

	// insert
	public int insertLayer(TestDto testDto) throws Exception {

		return testMapper.insertLayer(testDto);
	}

	// insert into raster
	public int insertRaster(RasterDto rasterDto) throws Exception {

		return testMapper.insertRaster(rasterDto);
	}

	// insert into polygon
	public int insertPolygon(PolygonDto polygonDto) throws Exception {

		return testMapper.insertPolygon(polygonDto);
	}

	// insert into point
	public int insertPoint(PointDto pointDto) throws Exception {

		return testMapper.insertPoint(pointDto);
	}

	// insert into line
	public int insertLine(LineDto lineDto) throws Exception {

		return testMapper.insertLine(lineDto);
	}
	
	
	

	// layer detail
	public TestDto detailLayer(int layer_num) throws Exception {

		return testMapper.detailLayer(layer_num);
	}

	// raster layer detail
	public TestDto detailRaster(String local_name) throws Exception {

		return testMapper.detailRaster(local_name);
	}

	// polygon layer detail
	public TestDto detailPolygon(String local_name) throws Exception {

		return testMapper.detailPolygon(local_name);
	}

	// point layer detail
	public TestDto detailPoint(String local_name) throws Exception {

		return testMapper.detailPoint(local_name);
	}

	// line layer detail
	public TestDto detailLine(String local_name) throws Exception {

		return testMapper.detailLine(local_name);
	}
	
	
	

	// update
	public int updateLayer(TestDto testDto) throws Exception {

		return testMapper.updateLayer(testDto);
	}

	// update raster layer
	public int updateRaster(RasterDto rasterDto) throws Exception {

		return testMapper.updateRaster(rasterDto);
	}

	// update polygon layer
	public int updatePolygon(PolygonDto polygonDto) throws Exception {

		return testMapper.updatePolygon(polygonDto);
	}

	// update point layer
	public int updatePoint(PointDto pointDto) throws Exception {

		return testMapper.updatePoint(pointDto);
	}

	// update line layer
	public int updateLine(LineDto lineDto) throws Exception {

		return testMapper.updateLine(lineDto);
	}
	
	
	
	
	//update polygon style
	public int updatePolygonStyle(PolygonDto polygonDto) throws Exception {

		return testMapper.updatePolygonStyle(polygonDto);
	}
	
	//update point style
	public int updatePointStyle(PointDto pointDto) throws Exception {

		return testMapper.updatePointStyle(pointDto);
	}
	
	//update line style
	public int updateLineStyle(LineDto lineDto) throws Exception {

		return testMapper.updateLineStyle(lineDto);
	}
	
	
	

	// delete
	public int deleteLayer(int layer_num) throws Exception {

		return testMapper.deleteLayer(layer_num);
	}

	// delete from raster layer
	public int deleteRaster(String local_name) throws Exception {

		return testMapper.deleteRaster(local_name);
	}

	// delete from polygon layer
	public int deletePolygon(String local_name) throws Exception {

		return testMapper.deletePolygon(local_name);
	}

	// delete from point layer
	public int deletePoint(String local_name) throws Exception {

		return testMapper.deletePoint(local_name);
	}

	// delete from line layer
	public int deleteLine(String local_name) throws Exception {

		return testMapper.deleteLine(local_name);
	}

}
