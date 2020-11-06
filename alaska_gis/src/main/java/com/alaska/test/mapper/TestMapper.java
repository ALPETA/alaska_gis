package com.alaska.test.mapper;

import java.util.List;
import org.springframework.stereotype.Repository;

import com.alaska.test.dto.TestDto;

@Repository
public interface TestMapper {

	// list
	public List<TestDto> getAll() throws Exception;

	// insert
	public int insertLayer(TestDto testDto) throws Exception;

	//layer detail
	public TestDto detailLayer(int layer_num) throws Exception;

	// update
	public int updateLayer(TestDto testDto) throws Exception;

	// delete
	public int deleteLayer(String[] layer_num) throws Exception;

}
