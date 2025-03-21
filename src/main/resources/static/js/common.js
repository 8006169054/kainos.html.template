loding = async (type) => {
	console.log('loding', type)
	if(type)
		$(".loading-mask").css('display','');
	else
		$(".loading-mask").css('display','none');
};

/**
 * type = success , info, warning, error
 */
alertMessage = async (message, type, title) => {
	if(title === undefined){
		if(type === 'success') title = 'Success';
		else if(type === 'info') title = 'Info';
		else if(type === 'warning') title = 'Warning';
		else if(type === 'error') title = 'Error';
	}
	swal(title, message, type);
};

/**
 * type = success , info, warning, error
 */
confirmMessage = async (message, type, title, callFn) => {
	swal({
      title: title,
      text: message,
      icon: type,
      buttons: true,
      dangerMode: true,
    })
    .then((selection) => {
      if (selection)
      	callFn(selection);
      else
      	callFn(false);
    });
};

dataBinding = async (bindingData, prefix = "") => {
	var keys = Object.keys(bindingData);
	$.each(keys, function(index, key) {
		$("#" + prefix + key).val(bindingData[key]);
	});
};