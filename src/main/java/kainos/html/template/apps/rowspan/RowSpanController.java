package kainos.html.template.apps.rowspan;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import kainos.framework.core.servlet.KainosResponseEntity;
import kainos.framework.core.support.jqgrid.RowSpenHandler;
import kainos.html.template.apps.rowspan.dto.RowSpanDto;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RowSpanController {

	private final RowSpenHandler handler;
	
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
		
		return KainosResponseEntity.builder().build()
				.addData(handler.GenerationRowSpen(datas, RowSpanDto.class))
				.close();
	}

}
