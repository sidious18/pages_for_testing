var filesUploadingModule = (function() {

	function validateAvatarFileType(input) {
    var i, fileInput, files, allowedFileTypes;

    // fileInput is a HTMLInputElement: <input type="file" multiple id="myfileinput">
    fileInput = input;

    // files is a FileList object (simliar to NodeList)
    files = fileInput.files;

    // our application only allows *.png, *.jpeg and *.gif images
    allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];

    for (i = 0; i < files.length; i++) {
      // Test if file.type is an allowed file type.int_types
      if (allowedFileTypes.indexOf(files[i].type) > -1) {
        return true;
      }
    };
    return false;
  };

  function validateCertificateFileType(input) {
    var i, fileInput, files, allowedFileTypes;

    // fileInput is a HTMLInputElement: <input type="file" multiple id="myfileinput">
    fileInput = input;

    // files is a FileList object (simliar to NodeList)
    files = fileInput.files;

    // our application only allows *.png, *.jpeg and *.gif images
    allowedFileTypes = ["image/png", "image/jpeg", "image/gif", "application/pdf"];

    for (i = 0; i < files.length; i++) {
      // Test if file.type is an allowed file type.int_types
      if (allowedFileTypes.indexOf(files[i].type) > -1) {
        return true;
      }
    };
    return false;
  };

  function readURL(input, callback) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = callback;

      reader.readAsDataURL(input.files[0]);
    }
  };

  return {
  	validateAvatar: validateAvatarFileType,
  	validateCertif: validateCertificateFileType,
  	blobToBase64: readURL
  };

}());
