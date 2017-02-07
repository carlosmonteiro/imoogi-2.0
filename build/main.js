$(document).ready(function() {
	// menu
	$('#menu a').on('click', function(event) {
		// rolagem da página
	    getElement = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(getElement).offset().top
		}, 800, function(){
	  	});

	  	// retiro a class active do item ativo
		$('#menu li').removeClass('active');

		// adiciono a class no item clicado
		$(this).parent('li').addClass('active');
	});


	// contact us
    emailjs.init("user_jx7G6T2SPK3KbHueAFW59");

    $("#send").click(function() {
		// validating form
		$("#contact form .validate").each(function() {
			if(!$(this).val()) {
				$(this).addClass('error');
			} else {
				$(this).removeClass('error');
			}
		});

		if(!$("#email").val()) {
			$("#email").addClass('error');
		} else if (!validateEmail($("#email").val())) {
			$("#email").addClass('error');
		} else {
			$("#email").removeClass('error');
		}

		if ($("#contact form .validate").hasClass('error')) {
			return false;
		}

		// sending email
		emailjs.send(
			"mailgun",
			"template_imoogi", {
				name: $("#name").val(),
				subject: $("#subject").val(),
				message: $("message").val(),
				email: $("#email").val()
			}
		)
		.then(function(response) {
		   alert("E-mail enviado com sucesso! Em breve entraremos em contato");
		}, function(err) {
		   alert("Algo deu errado :( Por favor tente mais tarde");
		});
	});
});

$(window).scroll(function () {
	if(isScrolledIntoView($('#introduction'))) {
    	$('#menu li').removeClass('active');
        $('#link-home').addClass('active');
    }

    if(isScrolledIntoView($('#about-hapkido'))) {
    	$('#menu li').removeClass('active');
        $('#link-hapkido').addClass('active');
    }

    if(isScrolledIntoView($('#about-team'))) {
    	$('#menu li').removeClass('active');
        $('#link-team').addClass('active');
    }

    if(isScrolledIntoView($('#where-to-train'))) {
    	$('#menu li').removeClass('active');
        $('#link-train').addClass('active');
    }

    if(isScrolledIntoView($('#teachers'))) {
    	$('#menu li').removeClass('active');
        $('#link-teachers').addClass('active');
    }

    if(isScrolledIntoView($('#contact'))) {
    	$('#menu li').removeClass('active');
        $('#link-contact').addClass('active');
    }
});

//function for verify email
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//function for find id with scroll
function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}