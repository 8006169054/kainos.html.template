package kainos.html.template.apps.rowspan;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import kainos.html.template.apps.rowspan.dto.GridRowSpan;
import kainos.html.template.apps.rowspan.dto.GridRowSpanInfo;
import kainos.html.template.apps.rowspan.dto.RowSpan;
import kainos.html.template.apps.rowspan.dto.RowSpanDto;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RowSpanController {

	
	@GetMapping(value = "/open/rowspan")
	public ResponseEntity<List<RowSpanDto>> fiendCustomerOrder() throws Exception {
		List<RowSpanDto> datas = new ArrayList<>();
		datas.add(RowSpanDto.builder().a("").b("").c("1").d("-").e("-").f("").g("").h("국도화학").i("").j("-").k("150.00").l("SUMEX").m("SMXU9200107").n("HOCHMINH").o("BUSAN").p("").q("SNKO").r("SNKO101230802144").s("SNKO101230802144").t("2023-09-06").u("2023-09-14").v("").w("INVENTORY ONLY 디머리지 선적지 정산").build());
		datas.add(RowSpanDto.builder().a("").b("").c("1").d("-").e("-").f("").g("").h("국도화학").i("").j("-").k("150.00").l("SUMEX").m("EXFU5645770").n("HOCHMINH").o("BUSAN").p("").q("SNKO").r("SNKO101230802144").s("SNKO101230802144").t("2023-09-06").u("2023-09-14").v("").w("INVENTORY ONLY 디머리지 선적지 정산").build());
		datas.add(RowSpanDto.builder().a("").b("").c("0").d("-").e("-").f("").g("").h("국도화학").i("").j("-").k("150.00").l("SUMEX").m("EXFU5645656").n("HOCHMINH").o("BUSAN").p("").q("SNKO").r("SNKO101230802144").s("SNKO101230802144").t("2023-09-06").u("2023-09-14").v("").w("INVENTORY ONLY 디머리지 선적지 정산").build());
		datas.add(RowSpanDto.builder().a("").b("").c("0").d("-").e("-").f("").g("").h("국도화학").i("").j("").k("150.00").l("SUMEX").m("EXFU5645656").n("HOCHMINH").o("BUSAN").p("").q("SNKO").r("SNKO101230802144").s("SNKO101230802144").t("2023-09-26").u("2023-09-29").v("").w("SA 확인 후 인보이스 발생").build());
		datas.add(RowSpanDto.builder().a("").b("").c("0").d("-").e("-").f("").g("").h("국도화학").i("").j("").k("150.00").l("SUMEX").m("EXFU5645656").n("HOCHMINH").o("BUSAN").p("").q("SNKO").r("SNKO101230802144").s("SNKO101230802144").t("2023-09-26").u("2023-09-29").v("").w("SA 확인 후 인보이스 발생").build());
		datas.add(RowSpanDto.builder().a("").b("").c("1").d("-").e("-").f("").g("").h("태광정밀화학").i("").j("70.00").k("150.00").l("SUMEX").m("EXFU5645656").n("HOCHMINH").o("BUSAN").p("").q("SNKO").r("SNKO101230802144").s("SNKO101230802144").t("2023-09-26").u("2023-09-29").v("").w("BAF, CAF, EBS, CIC X").build());
		datas.add(RowSpanDto.builder().a("").b("").c("1").d("-").e("-").f("").g("").h("태광정밀화학").i("").j("70.00").k("150.00").l("SUMEX").m("EXFU5645656").n("HOCHMINH").o("BUSAN").p("").q("SNKO").r("SNKO101230802144").s("SNKO101230802144").t("2023-09-26").u("2023-09-29").v("").w("BAF, CAF, EBS, CIC X").build());
		
		GridRowSpanInfo rowSpaninfo = gridRowSpanInit(RowSpanDto.class);
		for (int i = 0; i < datas.size();) {
			int rowSpanIndex = getRowSpanIndex(i, datas.size(), rowSpaninfo, datas);
			setRowSpan(i, (i+rowSpanIndex), rowSpanIndex, rowSpaninfo, datas);
			i += rowSpanIndex;
			System.out.println(rowSpanIndex);
		}
		
		return ResponseEntity.ok().body(datas);
	}
	
	public void setRowSpan(int startRow, int endRow, int rowSpan, GridRowSpanInfo rowSpaninfo, List<RowSpanDto> datas) throws Exception {
		List<Field> rowSpanFieldList = rowSpaninfo.getRowSpanFieldList();
		for (int i = startRow; endRow > i; i++) {
			Field attrSubField = datas.get(i).getClass().getDeclaredField("attr");
			attrSubField.setAccessible(true);
			Object attrObj = attrSubField.get(datas.get(i));
			
			for (int j = 0; j < rowSpanFieldList.size(); j++) {
				Field field = attrObj.getClass().getDeclaredField(rowSpanFieldList.get(j).getName());
				field.setAccessible(true);
				
				if(i == startRow) {
					field.set(attrObj, RowSpan.builder().rowspan(rowSpan).build());
				}
				else {
					field.set(attrObj, RowSpan.builder().display("none").build());
				}
//				System.out.println(i + " , " + attrObj);
				/* attr 클래스 가져온다. */
				
//				System.out.println("");
//				Field rowspan = datas.get(i).getClass().getDeclaredField("attr").getClass().getDeclaredField("rowspan");
//				Field display = datas.get(i).getClass().getDeclaredField("attr").getClass().getDeclaredField("display");
//				if(i == startRow) {
//					attrSubField.setAccessible(true);
//					System.out.println(attrSubField.getName());
//					datas.get(i).getClass().getDeclaredField("attr").set(rowspan, rowSpan);
			}
			
		}
	}
	
	/**
	 * 
	 * @param startRow
	 * @param endRow
	 * @param rowSpaninfo
	 * @param datas
	 * @return
	 * @throws NoSuchFieldException
	 * @throws SecurityException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */
	public int getRowSpanIndex(int startRow, int endRow, GridRowSpanInfo rowSpaninfo, List<?> datas) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException {
		int rowSpanIndex = 1;
		List<Field> fields = rowSpaninfo.getOrderFieldList();
		for (int i = 0; i < fields.size(); i++) {
			Field field = fields.get(i);
			int loopIndex = 1;
			/** 데이터 lopp */
			Field mainDataField = datas.get(startRow).getClass().getDeclaredField(field.getName());
			mainDataField.setAccessible(true);
			Object mainValue = mainDataField.get(datas.get(startRow));

			/** 하위 데이터 */
			for (int j = (startRow+1); j < datas.size(); j++) {
				Field subDataField = datas.get(j).getClass().getDeclaredField(field.getName());
				subDataField.setAccessible(true);
				Object subValue = mainDataField.get(datas.get(j));
				if(!mainValue.equals(subValue)) {
					break;
				}
				loopIndex++;
			}
			
			if(rowSpanIndex == 1 || rowSpanIndex > loopIndex) rowSpanIndex = loopIndex;
			
		}
		return rowSpanIndex;
	}
	
//	public int getRowSpanIndex(int startRow, int endRow, GridRowSpanInfo rowSpaninfo, List<?> datas) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException {
//		int rowSpanIndex = 1;
//		for (int i = startRow; i < endRow; i++) {
//			List<Field> fields = rowSpaninfo.getOrderFieldList();
//			for (int j = 0; j < fields.size(); j++) {
//				Field field = fields.get(j);
//				Field mainDataField = datas.get(i).getClass().getDeclaredField(field.getName());
//				mainDataField.setAccessible(true);
//				Object mainValue = mainDataField.get(datas.get(i));
//				
//				
//				for (int k = (i+1); k < datas.size(); k++) {
//					Field subDataField = datas.get(k).getClass().getDeclaredField(field.getName());
//					subDataField.setAccessible(true);
//					Object subValue = mainDataField.get(datas.get(k));
//					
//					if(!mainValue.equals(subValue)) {
//						if(j > 0) rowSpanIndex -= k;
//						break;
//					}
//					rowSpanIndex++;				
//				}
//			}
//		}
//		return rowSpanIndex;
//	}
	
	
	public GridRowSpanInfo gridRowSpanInit(Class<?> clss) {
		GridRowSpanInfo rowSpaninfo = GridRowSpanInfo.builder().build();
		Field[] fields = clss.getDeclaredFields();
		for (java.lang.reflect.Field field : fields) {
			if(field.isAnnotationPresent(GridRowSpan.class)) {
				GridRowSpan anno = field.getAnnotation(GridRowSpan.class);
				if(anno.mergeOrder() > -1)
					rowSpaninfo.getOrderFieldList().add(anno.mergeOrder(), field);
				
				if(anno.merge())
					rowSpaninfo.getRowSpanFieldList().add(field);
			}
		}
		return rowSpaninfo;
	}
	
}
