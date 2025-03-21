package kainos.html.template.apps.rowspan;

import java.io.ByteArrayInputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import kainos.framework.core.servlet.KainosResponseEntity;
import kainos.framework.core.support.excel.handler.KainosExcelWriteHandler;
import kainos.framework.core.support.jqgrid.RowSpenHandler;
import kainos.html.template.apps.rowspan.dto.RowSpanDto;
import kainos.html.template.apps.rowspan.dto.SampleDto;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RowSpanController {

	private final RowSpenHandler handler;
	
	@PostMapping(value = "/open/reuqestbodyexceldown")
	public ResponseEntity<InputStreamResource> insertsReuqestBody(@RequestBody List<RowSpanDto> reupestBodyList) throws Exception {
		byte[] downLoadFile = null;
		
		KainosExcelWriteHandler excelWriteHandler = KainosExcelWriteHandler.builder().startRowNum(1)
				.templateFile("excel/sample-rowsanp.xlsx") // 템플릿 파일 경로
				.build();

		reupestBodyList.forEach(excelWrite -> {
			try {
				excelWriteHandler.writeADD(excelWrite);
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		});
		downLoadFile = excelWriteHandler.writeFlush();
		
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentLength(downLoadFile.length);
        ContentDisposition contentDisposition = ContentDisposition.builder("attachment")
                  .filename("aaaaaaaaaaa.xlsx", Charset.forName("UTF-8"))
                  .build();
        headers.setContentDisposition(contentDisposition);
		
		return ResponseEntity.ok()
                .headers(headers)
                .contentLength(downLoadFile.length)
                .body(new InputStreamResource(new ByteArrayInputStream(downLoadFile)));
	}
	
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

	@GetMapping(value = "/open/common-popup")
	public ResponseEntity<List<SampleDto.CommonPopupDto>> fiendCommonPopup() throws Exception {
		List<SampleDto.CommonPopupDto> datas = new ArrayList<>();
		datas.add(SampleDto.CommonPopupDto.builder().code("A").name("AA").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("B").name("BB").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("C").name("CC").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("D").name("DD").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("E").name("EE").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("F").name("FF").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("G").name("GG").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("H").name("HH").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("I").name("II").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("G").name("GG").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("K").name("KK").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("L").name("LL").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("M").name("MM").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("N").name("NN").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("O").name("OO").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("P").name("PP").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("Q").name("QQ").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("R").name("RR").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("S").name("SS").build());
		datas.add(SampleDto.CommonPopupDto.builder().code("T").name("TT").build());
		
		return KainosResponseEntity.builder().build()
				.addData(datas)
				.close();
	}

	
	@GetMapping(value = "/open/exceldown")
	public ResponseEntity<InputStreamResource> exceldown() throws Exception {
		List<RowSpanDto> datas = new ArrayList<>();
		datas.add(RowSpanDto.builder().a("").b("").c("1").d("-").e("-").f("").g("").h("국도화학").i("").j("-").k("150.00").l("SUMEX").m("SMXU9200107").n("HOCHMINH").o("BUSAN").p("").q("SNKO").r("SNKO101230802144").s("SNKO101230802144").t("2023-09-06").u("2023-09-14").v("").w("INVENTORY ONLY 디머리지 선적지 정산").build());
		datas.add(RowSpanDto.builder().a("").b("").c("1").d("-").e("-").f("").g("").h("국도화학").i("").j("-").k("150.00").l("SUMEX").m("EXFU5645770").n("HOCHMINH").o("BUSAN").p("").q("SNKO").r("SNKO101230802144").s("SNKO101230802144").t("2023-09-06").u("2023-09-14").v("").w("INVENTORY ONLY 디머리지 선적지 정산").build());
		datas.add(RowSpanDto.builder().a("").b("").c("0").d("-").e("-").f("").g("").h("국도화학").i("").j("-").k("150.00").l("SUMEX").m("EXFU5645656").n("HOCHMINH").o("BUSAN").p("").q("SNKO").r("SNKO101230802144").s("SNKO101230802144").t("2023-09-06").u("2023-09-14").v("").w("INVENTORY ONLY 디머리지 선적지 정산").build());
		datas.add(RowSpanDto.builder().a("").b("").c("0").d("-").e("-").f("").g("").h("국도화학").i("").j("").k("150.00").l("SUMEX").m("EXFU5645656").n("HOCHMINH").o("BUSAN").p("").q("SNKO").r("SNKO101230802144").s("SNKO101230802144").t("2023-09-26").u("2023-09-29").v("").w("SA 확인 후 인보이스 발생").build());
		datas.add(RowSpanDto.builder().a("").b("").c("0").d("-").e("-").f("").g("").h("국도화학").i("").j("").k("150.00").l("SUMEX").m("EXFU5645656").n("HOCHMINH").o("BUSAN").p("").q("SNKO").r("SNKO101230802144").s("SNKO101230802144").t("2023-09-26").u("2023-09-29").v("").w("SA 확인 후 인보이스 발생").build());
		datas.add(RowSpanDto.builder().a("").b("").c("1").d("-").e("-").f("").g("").h("태광정밀화학").i("").j("70.00").k("150.00").l("SUMEX").m("EXFU5645656").n("HOCHMINH").o("BUSAN").p("").q("SNKO").r("SNKO101230802144").s("SNKO101230802144").t("2023-09-26").u("2023-09-29").v("").w("BAF, CAF, EBS, CIC X").build());
		datas.add(RowSpanDto.builder().a("").b("").c("1").d("-").e("-").f("").g("").h("태광정밀화학").i("").j("70.00").k("150.00").l("SUMEX").m("EXFU5645656").n("HOCHMINH").o("BUSAN").p("").q("SNKO").r("SNKO101230802144").s("SNKO101230802144").t("2023-09-26").u("2023-09-29").v("").w("BAF, CAF, EBS, CIC X").build());
		handler.GenerationRowSpen(datas, RowSpanDto.class);
		
		byte[] downLoadFile = null;
		
		KainosExcelWriteHandler excelWriteHandler = KainosExcelWriteHandler.builder().startRowNum(1)
				.templateFile("excel/sample-rowsanp.xlsx") // 템플릿 파일 경로
				.build();

		datas.forEach(excelWrite -> {
			try {
				excelWriteHandler.writeADD(excelWrite);
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		});
		downLoadFile = excelWriteHandler.writeFlush();
		
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentLength(downLoadFile.length);
        ContentDisposition contentDisposition = ContentDisposition.builder("attachment")
                  .filename("aaaaaaaaaaa.xlsx", Charset.forName("UTF-8"))
                  .build();
        headers.setContentDisposition(contentDisposition);
		
		return ResponseEntity.ok()
                .headers(headers)
                .contentLength(downLoadFile.length)
                .body(new InputStreamResource(new ByteArrayInputStream(downLoadFile)));
	}
}
