package kainos.html.template.common.view;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.CacheControl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.LocaleResolver;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kainos.html.template.common.util.CookieUtil;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ViewController {

	private final String contextPath = "view";
    @Value("${kainos.security.sameSite:#{null}}")
    private String sameSite;
    @Value("${kainos.security.secure:#{null}}")
    private boolean secure;
    @Value("${kainos.security.httpOnly:#{null}}")
    private boolean httpOnly;
	
    private final LocaleResolver localeResolver;
    
	/**
	 * Index 페이지
	 * @return
	 * @throws Exception
	 */
	@GetMapping(value = "/")
    public String index(HttpServletRequest request, HttpServletResponse response, Locale locale) throws Exception {
		String cacheControl = CacheControl.noCache().getHeaderValue();
		response.addHeader("Cache-Control", cacheControl);
		setLocale(request, response, locale);
		return "html/index";
    }
	
	/**
	 * 메인 페이지
	 * @return
	 * @throws Exception
	 */
	@GetMapping(value = contextPath + "/**")
    public String view(HttpServletResponse response,  HttpServletRequest request, Locale locale) throws Exception {
		String cacheControl = CacheControl.noCache().getHeaderValue();
		response.addHeader("Cache-Control", cacheControl);
		String htmlPath = request.getRequestURI().split(contextPath)[1];
		
		if(PagePaths.links.containsKey(htmlPath.toUpperCase())) 
			htmlPath = PagePaths.links.get(htmlPath.toUpperCase()).getLinkPath();
		
		setLocale(request, response, locale);
		// OPEN << 권한 체크 패스
        return "html" + htmlPath;
    }
	
	private void setLocale(HttpServletRequest request, HttpServletResponse response, Locale locale) {
		Cookie langCookie = CookieUtil.getCookie("kainos-lang");
		Cookie cookie = null;
		if(langCookie != null && langCookie.getValue().equals("en")) {
	       	localeResolver.setLocale(request, response, Locale.ENGLISH);
			cookie = new Cookie("kainos-lang", "en");
	    }
		else {
	       	localeResolver.setLocale(request, response, Locale.CHINESE);
	       	cookie = new Cookie("kainos-lang", "zh");
	    }
		cookie.setPath("/");
        response.addCookie(cookie);
	}
	
}
