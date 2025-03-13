package kainos.html.template.apps.rowspan.dto;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface GridRowSpan {

	public int mergeOrder() default -1;
	public boolean merge() default false;
	
}
