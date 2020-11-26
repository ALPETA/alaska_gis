package com.alaska.test.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LineDto {
	private int layer_num;
	private String local_name;
	private String data_name;
	private String line_color;
	private float line_width;
	private float opacity;
	private String layer_type;

}
