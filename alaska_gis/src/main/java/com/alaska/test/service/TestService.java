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

	// insert
	public int insertLayer(TestDto testDto) throws Exception {

		return testMapper.insertLayer(testDto);
	}

	// layer detail
	public TestDto detailLayer(int layer_num) throws Exception {

		return testMapper.detailLayer(layer_num);
	}

	// update
	public int updateLayer(TestDto testDto) throws Exception {

		return testMapper.updateLayer(testDto);
	}

	// delete
	public int deleteLayer(String[] layer_num) throws Exception {

		return testMapper.deleteLayer(layer_num);
	}

}
