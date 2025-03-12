package kainos.html.template.common.view;

import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class PagePaths {

	public static Map<String, PageInfo> links = new HashMap<>();
	static {
		PagePaths.links.put("/HOME", PageInfo.builder().linkPath("/apps/main/home").auth(true).build());
		PagePaths.links.put("/SAMPLE/GRID1", PageInfo.builder().linkPath("/apps/sample/grid1").auth(true).build());
	}
	
	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class PageInfo {
		private String linkPath;
		private boolean auth;
	}
}
