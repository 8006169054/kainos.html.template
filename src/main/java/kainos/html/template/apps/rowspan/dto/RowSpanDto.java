package kainos.html.template.apps.rowspan.dto;

import kainos.framework.core.support.excel.annotations.Field;
import kainos.framework.core.support.jqgrid.dto.RowSpan;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RowSpanDto {

	@Field(value = "A", merge = true)
	private String a;
	@Field(value = "B", merge = true)
	private String b;
	@Field("C")
	private String c;
	@Field("D")
	private String d;
	@Field("E")
	private String e;
	@Field("F")
	private String f;
	@Field("G")
	private String g;
	@Field(value = "H", mergeOrder = 0, merge = true)
	private String h;
	@Field("I")
	private String i;
	@Field("J")
	private String j;
	@Field("K")
	private String k;
	@Field("L")
	private String l;
	@Field("M")
	private String m;
	@Field("N")
	private String n;
	@Field("O")
	private String o;
	@Field("P")
	private String p;
	@Field("Q")
	private String q;
	@Field("R")
	private String r;
	@Field("S")
	private String s;
	@Field(value = "T", mergeOrder = 1, merge = true)
	private String t;
	@Field("U")
	private String u;
	@Field("V")
	private String v;
	@Field(value = "W", merge = true)
	private String w;
	@Builder.Default
	private RowSpanOtion rowspan = RowSpanOtion.builder().build();
	
	@Data
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	public static class RowSpanOtion{
		@Builder.Default
		private RowSpan a = RowSpan.builder().build();
		@Builder.Default
		private RowSpan b = RowSpan.builder().build();
		@Builder.Default
		private RowSpan h = RowSpan.builder().build();
		@Builder.Default
		private RowSpan t = RowSpan.builder().build();
		@Builder.Default
		private RowSpan w = RowSpan.builder().build();
	};
	
}
