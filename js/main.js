!function(){
    document.querySelector(".formulario").addEventListener('submit', function(e){
        e.preventDefault();
        var form = this;
		var dataEnviar = $(form).serialize();

        $.ajax({
            url: "//www.semperti.com/mailing/blog_mailer.php",
            success: function(){
                Array.prototype.forEach.call(form.querySelectorAll("input:not([type=hidden]),textarea"), function(ele){
                    ele.value = "";
                });
				alert("Mensaje enviado correctamente.");
            },
            failure: function(){
                alert("Error");
            },
            method: 'POST',
            data: dataEnviar
        });
    }, false);
}();
