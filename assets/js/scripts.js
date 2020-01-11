$(function() {

    // Slider Preview
    Slider.initSliderPreviewBook();
    if ($(window).innerWidth() < 767) {
        Slider.initSliderHealthCards();
    }

    // Init Effects
    Effects.initLinkRel();
    Effects.initSwitchNavBar();

    // Btn Form Lead clicked
    $('.btn-download-ebook').click( function () {
        if (Validation.validateLeadForm()){
            Lead.setLeadData();
            Effects.switchScreenOnBox('form', 'answer');
        }
    });

    // Init masks on form
    Util.initMasks();

});

const Slider = {
    initSliderPreviewBook: function () {
        $('#sliderPreviewBook').lightSlider({
            gallery: true,
            item: 1,
            slideMargin: 5,
            thumbItem: 3,
            autoWidth: false,
            galleryMargin: 20,
            thumbMargin: 15,
            currentPagerPosition: 'middle',
            speed: 1000,
            auto: true,
            loop: true,
            pause: 5000,
            responsive: [
                {
                    breakpoint:767,
                    settings: {
                        gallery: false,
                        pause: 3000,
                        galleryMargin: 0,
                        thumbMargin: 0,
                    }
                },
            ]
        });
    },

    initSliderHealthCards: function () {
        $('#sliderHealthCards').lightSlider({
            item:1,
            slideMargin:5,
            loop:true,
            autoWidth: false,
            currentPagerPosition: 'middle',
            auto: true,
        });
    },
};

const Effects = {
    initSwitchNavBar: function () {
        $('ul.nav-bar li a').on('click', function () {
            if (!$(this).parent().hasClass('active')){
                $('ul.nav-bar').find('li.active').removeClass('active');
                $(this).parent().addClass('active');
            }
        });
    },

    initLinkRel: function () {
        var top = 20;
        $('a[rel="rel"]').click(function(e){
            e.preventDefault();

            $('html, body').animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top - top
            }, 500).css('overflow-scroll','true');
            return false;
        });
    },

    switchScreenOnBox: function (close, open) {
        $(".lead-" + close).hide();
        $(".lead-" + open).fadeIn(500).addClass('active');
    }

};

const Lead = {

    name: '',
    surname: '',
    email: '',
    phone: '',
    state: '',
    childName: '',
    childAge: '',

    setLeadData: function () {
        try {
            this.name = $('#name-form').val();
            this.email = $('#email-form').val();
            this.phone = $('#phone-form').val();
            this.state = $('#state-form').children("option:selected").val();
            this.childName = $('#child-name-form').val();
            this.childAge = $('#child-age-form').val();
        } catch (e) {
            return false
        }
        return true;
    }

};

const Validation = {

    errorLeadElement: '#form-ebook-download .error-msg',

    validateLeadForm: function () {

        // Validate User Name
        if (!$("#name-form").val()) {

            Util.addError(this.errorLeadElement, 'Informe seu nome completo');
            return false;

        } else {

            var str = $("#name-form").val();
            var regex = '[@!#$%¨&*+_´`\'^~;:?|\?,./{}"<>()0-9]';

            if (str.match(regex)) {

                Util.addError(this.errorLeadElement, 'Há caracteres inválidos no seu nome');
                return false;

            } else {

                str = str.replace(/\n/g, "");
                $("#name-form").val(str);

            }

            this.name = $("#name-form").val().split(" ")[0];
            this.surname = $("#name-form").val().slice(this.name.length+1);

            if (!this.name.replace(/ /g,'') || !this.surname.replace(/ /g,'')) {

                Util.addError(this.errorLeadElement, 'Informe o seu nome e sobrenome');
                return false;
            }

        }

        // Validate User E-mail
        if (!$("#email-form").val()) {

            Util.addError(this.errorLeadElement, 'Informe seu e-mail');
            return false;

        } if (!$("#confirm-email-form").val()) {

            Util.addError(this.errorLeadElement, 'Confirme seu e-mail');
            return false;

        } else if (!Validation.validateEmail($("#email-form").val()) || !Validation.validateEmail($("#confirm-email-form").val())) {

            Util.addError(this.errorLeadElement, "E-mail em formato incorreto");
            return false;

        } else if (!($("#email-form").val() == $("#confirm-email-form").val())) {

            Util.addError(this.errorLeadElement, "Os E-mails não correspondem");
            return false;

        } else {

            var str = $("#email-form").val();
            str = str.replace(/\n/g, "");
            $("#email-form").val(str);

        }

        // Validate User Phone

        if (!$("#phone-form").val()) {

            Util.addError(this.errorLeadElement, "Informe seu telefone");
            return false;

        } else {

            var lengthPhone = $("#phone-form").val().length;
            if (lengthPhone <= 10) {

                Util.addError(this.errorLeadElement, "Seu Telefone está incompleto");
                return false;

            }

        }

        // Validate User State
        var selectedCountry = $('#state-form').children("option:selected").val();
        if (!selectedCountry) {

            Util.addError(this.errorLeadElement, 'Informe o estado');
            return false;

        }

        // Validate User Child
        if (!$("#child-name-form").val()) {

            Util.addError(this.errorLeadElement, 'Informe o nome do pequeno');
            return false;

        } else {

            var str = $("#name-form").val();
            var regex = '[@!#$%¨&*+_´`\'^~;:?|\?,./{}"<>()0-9]';

            if (str.match(regex)) {

                Util.addError(this.errorLeadElement, 'Há caracteres inválidos no nome do pequeno');
                return false;

            }
        }

        if (!$("#child-age-form").val()) {

            Util.addError(this.errorLeadElement, 'Informe a idade do pequeno');
            return false;

        }

        return true;

    },

    validateEmail: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

};

const Util = {

    addError: function (element, message) {
        $(element).text(message);
    },

    removeError: function (element) {
        $(element).text('');
    },

    initMasks: function () {
        $('#phone-form').mask('(99) 99999-9999');
    }

};
