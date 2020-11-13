package com.alaska.test.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PolygonDto {
	private String local_name;
	private String data_name;
	private String line_color;
	private int line_width;
	private String fill_color;
	private int opacity;
	private String layer_type;

}