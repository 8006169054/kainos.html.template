package kainos.html.template.apps.rowspan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RowSpanDto {

	@GridRowSpan(merge = true)
	private String a;
	@GridRowSpan(merge = true)
	private String b;
	@GridRowSpan(merge = true)
	private String c;
	@GridRowSpan(merge = true)
	private String d;
	@GridRowSpan(merge = true)
	private String e;
	@GridRowSpan(merge = true)
	private String f;
	@GridRowSpan(merge = true)
	private String g;
	@GridRowSpan(mergeOrder = 0, merge = true)
	private String h;
	@GridRowSpan(merge = true)
	private String i;
	@GridRowSpan(merge = true)
	private String j;
	@GridRowSpan(merge = true)
	private String k;
	private String l;
	@GridRowSpan(merge = true)
	private String m;
	private String n;
	private String o;
	private String p;
	private String q;
	private String r;
	private String s;
	@GridRowSpan(mergeOrder = 1, merge = true)
	private String t;
	private String u;
	private String v;
	@GridRowSpan(merge = true)
	private String w;
	private String x;
	private String y;
	private String z;
	@Builder.Default
	private RowSpanOtion attr = RowSpanOtion.builder().build();
	
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
		private RowSpan c = RowSpan.builder().build();
		@Builder.Default
		private RowSpan d = RowSpan.builder().build();
		@Builder.Default
		private RowSpan e = RowSpan.builder().build();
		@Builder.Default
		private RowSpan f = RowSpan.builder().build();
		@Builder.Default
		private RowSpan g = RowSpan.builder().build();
		@Builder.Default
		private RowSpan h = RowSpan.builder().build();
		@Builder.Default
		private RowSpan i = RowSpan.builder().build();
		@Builder.Default
		private RowSpan j = RowSpan.builder().build();
		@Builder.Default
		private RowSpan k = RowSpan.builder().build();
		@Builder.Default
		private RowSpan l = RowSpan.builder().build();
		@Builder.Default
		private RowSpan m = RowSpan.builder().build();
		@Builder.Default
		private RowSpan n = RowSpan.builder().build();
		@Builder.Default
		private RowSpan o = RowSpan.builder().build();
		@Builder.Default
		private RowSpan p = RowSpan.builder().build();
		@Builder.Default
		private RowSpan q = RowSpan.builder().build();
		@Builder.Default
		private RowSpan r = RowSpan.builder().build();
		@Builder.Default
		private RowSpan s = RowSpan.builder().build();
		@Builder.Default
		private RowSpan t = RowSpan.builder().build();
		@Builder.Default
		private RowSpan u = RowSpan.builder().build();
		@Builder.Default
		private RowSpan v = RowSpan.builder().build();
		@Builder.Default
		private RowSpan w = RowSpan.builder().build();
		@Builder.Default
		private RowSpan x = RowSpan.builder().build();
		@Builder.Default
		private RowSpan y = RowSpan.builder().build();
		@Builder.Default
		private RowSpan z = RowSpan.builder().build();
	};
	
}
