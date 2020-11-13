package com.alaska.test.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointDto {
	private String local_name;
	private String data_name;
	private String point_shape;
	private String fill_color;
	private int point_radius;
	private int opacity;
	private String layer_type;

}
