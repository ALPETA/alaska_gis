package com.alaska.test.mapper;

import java.util.List;
import org.springframework.stereotype.Repository;

import com.alaska.test.dto.TestDto;

@Repository
public interface TestMapper {

	// list
	public List<TestDto> getAll() throws Exception;
	
	//raster list
	
	//polygon list
	
	//point list
	
	//line list

	// insert
	public int insertLayer(TestDto testDto) throws Exception;
	
	//insert into raster
	
	//insert into polygon
	
	//insert into point
	
	//insert into line

	//layer detail
	public TestDto detailLayer(int layer_num) throws Exception;
	
	//raster layer detail
	
	//polygon layer detail
	
	//point layer detail
	
	//line layer detail

	// update
	public int updateLayer(TestDto testDto) throws Exception;
	
	//update raster layer
	
	//update polygon layer
	
	//update point layer
	
	//update line layer

	// delete
	public int deleteLayer(int layer_num) throws Exception;
	
	//delete from raster layer
	
	//delete from polygon layer
	
	//delete from point layer
	
	//delete from line layer

}
