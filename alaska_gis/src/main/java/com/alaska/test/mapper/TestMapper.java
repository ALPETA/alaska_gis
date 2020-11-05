package com.alaska.test.mapper;

import java.util.List;
import org.springframework.stereotype.Repository;

import com.alaska.test.dto.TestDto;

@Repository
public interface TestMapper {

	public List<TestDto> getAll() throws Exception;
}
