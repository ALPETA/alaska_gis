package com.alaska.test.mapper;

import java.util.List;
import org.springframework.stereotype.Repository;

import com.alaska.test.dto.LineDto;
import com.alaska.test.dto.PointDto;
import com.alaska.test.dto.PolygonDto;
import com.alaska.test.dto.RasterDto;
import com.alaska.test.dto.TestDto;

@Repository
public interface TestMapper {

	// list
	public List<TestDto> getAll() throws Exception;
	
	//raster list
	public List<RasterDto> getRaster() throws Exception;
	
	//polygon list
	public List<PolygonDto> getPolygon() throws Exception;
	
	//point list
	public List<PointDto> getPoint() throws Exception;
	
	//line list
	public List<LineDto> getLine() throws Exception;

	
	
	
	// insert
	public int insertLayer(TestDto testDto) throws Exception;
	
	//insert into raster
	public int insertRaster(RasterDto rasterDto) throws Exception;
	
	//insert into polygon
	public int insertPolygon(PolygonDto polygonDto) throws Exception;
	
	//insert into point
	public int insertPoint(PointDto pointDto) throws Exception;
	
	//insert into line
	public int insertLine(LineDto lineDto) throws Exception;

	
	
	
	//layer detail
	public TestDto detailLayer(int layer_num) throws Exception;
	
	//raster layer detail
	public TestDto detailRaster(int layer_num) throws Exception;
	
	//polygon layer detail
	public TestDto detailPolygon(int layer_num) throws Exception;
	
	//point layer detail
	public TestDto detailPoint(int layer_num) throws Exception;
	
	//line layer detail
	public TestDto detailLine(int layer_num) throws Exception;

	
	
	
	// update
	public int updateLayer(TestDto testDto) throws Exception;
	
	//update raster layer name
	public int updateRaster(RasterDto rasterDto) throws Exception;
	
	//update polygon layer name
	public int updatePolygon(PolygonDto polygonDto) throws Exception;
	
	//update point layer name
	public int updatePoint(PointDto pointDto) throws Exception;
	
	//update line layer name
	public int updateLine(LineDto lineDto) throws Exception;

	
	
	
	//update polygon layer style
	public int updatePolygonStyle(PolygonDto polygonDto) throws Exception;
	
	//update point layer style
	public int updatePointStyle(PointDto pointDto) throws Exception;
	
	//update line layer style
	public int updateLineStyle(LineDto lineDto) throws Exception;
	
	
	
	
	// delete
	public int deleteLayer(int layer_num) throws Exception;
	
	//delete from raster layer
	public int deleteRaster(int layer_num) throws Exception;
	
	//delete from polygon layer
	public int deletePolygon(int layer_num) throws Exception;
	
	//delete from point layer
	public int deletePoint(int layer_num) throws Exception;
	
	//delete from line layer
	public int deleteLine(int layer_num) throws Exception;
	
	

}
