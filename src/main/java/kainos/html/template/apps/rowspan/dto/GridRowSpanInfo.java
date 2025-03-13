package kainos.html.template.apps.rowspan.dto;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GridRowSpanInfo {

	@Builder.Default
	private List<Field> orderFieldList = new ArrayList<> ();
	@Builder.Default
	private List<Field> rowSpanFieldList = new ArrayList<> ();
	
}
