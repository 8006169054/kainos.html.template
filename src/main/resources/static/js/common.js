loding = async (type) => {
	if(type)
		$("#loading").show();
	else
		$("#loading").hide();
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