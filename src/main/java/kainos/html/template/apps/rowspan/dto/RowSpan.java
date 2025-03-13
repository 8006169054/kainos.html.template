package kainos.html.template.apps.rowspan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RowSpan {

	@Builder.Default
	private int rowspan = 0;
	private String display;
}
