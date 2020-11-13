package com.alaska.test.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alaska.test.dto.TestDto;
import com.alaska.test.mapper.TestMapper;

@Service
public class TestService {

	@Autowired
	TestMapper testMapper;

	// list
	public List<TestDto> getAll() throws Exception {
		return testMapper.getAll();
	}

	// raster list

	// polygon list

	// point list

	// line list

	// insert
	public int insertLayer(TestDto testDto) throws Exception {

		return testMapper.insertLayer(testDto);
	}

	// insert into raster

	// insert into polygon

	// insert into point

	// insert into line

	// layer detail
	public TestDto detailLayer(int layer_num) throws Exception {

		return testMapper.detailLayer(layer_num);
	}

	// raster layer detail

	// polygon layer detail

	// point layer detail

	// line layer detail

	// update
	public int updateLayer(TestDto testDto) throws Exception {

		return testMapper.updateLayer(testDto);
	}

	// update raster layer

	// update polygon layer

	// update point layer

	// update line layer

	// delete
	public int deleteLayer(int layer_num) throws Exception {

		return testMapper.deleteLayer(layer_num);
	}

	// delete from raster layer

	// delete from polygon layer

	// delete from point layer

	// delete from line layer

}
