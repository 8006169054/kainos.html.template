package kainos.html.template.apps.rowspan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class SampleDto {

	@Data
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	public static class CommonPopupDto {
		private String code;
		private String name;
	}
}
