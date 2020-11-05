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
	
	public List<TestDto> getAll() throws Exception{
        return testMapper.getAll();
    }

}
