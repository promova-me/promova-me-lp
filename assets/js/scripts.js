$(function() {

    // Slider Preview
    if ($(window).innerWidth() < 767) {
        Slider.initSliderStepsCards();
    }

    // Init Effects
    Effects.initLinkRel();

    // input file

    // Init Listener img change
    $('#file-chooser').change(function () {
        ImageInputFileFunctions.readURL(this);
    });

    // On change layout, placeholder change
    $('#layout-form').on('change', function() {
        CardPreview.updateLayoutPreview(this);
    });

    // On change color, preview change
    $('#color-form').on('change', function() {
        CardPreview.updateColorPreview();
    });

    // Btn Form Card clicked
    $('#btn-generate-card').click( function () {
        if (Validation.validateCardForm()){
            CardData.setCardData();
            Effects.switchScreenOnBox('#card-placeholder', '#card-canvas');
            $(".bottom-share.mobile").addClass('preview');

            if ($(window).innerWidth() >= 768) {
                Effects.switchScreenOnBox('.card-form', '.card-answer');
            } else  {
                Effects.switchScreenOnBox('.bottom-share.desktop', '.bottom-share.mobile');
                Effects.switchScreenOnBox('.card-form', '.card-answer');
            }

            // AJAX AQUI
            CardData.sendCardData();
        }
    });

    // back-to-generate
    $('#back-to-generate, #back-to-generate-mobile').click( function () {
        $(".bottom-share.mobile").removeClass('preview');
        Effects.switchScreenOnBox('.card-answer', '.card-form');
        Effects.switchScreenOnBox('#card-canvas', '#card-placeholder');
    });

    // Remove error validation on focus field
    $('input, select').on('focus', function () {
        $('#form-generate-card .error-msg').text('');
        Util.removeRedBorderOnErrorInput(this);
    });

    // Init masks on form
    Util.initMasks();

    // Canvas Functions
    loadCanvasWithInputFile();

    function loadCanvasWithInputFile(){

        var canvas = document.getElementById('card-canvas');
        var ctx = canvas.getContext("2d");
        var fileinput = document.getElementById('file-chooser'); // input file
        var img = new Image();
        var defaultColor = Color.getDefaultColor();

        canvas.width = 600;
        canvas.height = 600;

        fileinput.onchange = function(evt) {
            var files = evt.target.files; // FileList object
            var file = files[0];
            if(file.type.match('image.*')) {
                var reader = new FileReader();
                // Read in the image file as a data URL.
                reader.readAsDataURL(file);
                reader.onload = function(evt){
                    if( evt.target.readyState == FileReader.DONE) {
                        img.src = evt.target.result;

                        $('#btn-generate-card').click( function () {
                            // Pega a cor selecionada
                            defaultColor = Color.getDefaultColor();

                            // Limpa o Canvas
                            ctx.clearRect(0, 0, canvas.width, canvas.height);

                            // Desenha imagem
                            // ctx.drawImage(img,0,0, canvas.width, canvas.height);
                            var offsetX = 0.5;   // center x
                            var offsetY = 0.5;   // center y
                            ImageInputFileFunctions.drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height, offsetX, offsetY);

                            switch ($('#layout-form').children("option:selected").val()) {

                                case 'left':
                                    // Desenha os quadrados
                                    ctx.fillStyle = defaultColor;
                                    ctx.beginPath();
                                    ctx.fillRect(0, 0, 150, 600);
                                    ctx.closePath();
                                    ctx.fill();

                                    ctx.fillStyle = "#ffffff";
                                    ctx.beginPath();
                                    ctx.fillRect(30, 100, 250, 400);
                                    ctx.closePath();
                                    ctx.fill();

                                    ctx.fillStyle = "rgb(0,0,0)";
                                    ctx.beginPath();
                                    ctx.fillRect(0, 400, 250, 8);
                                    ctx.closePath();
                                    ctx.fill();

                                    // Escreve os textos
                                    // Nome da empresa, ou da pessoa
                                    var maxWidth = 210;
                                    var lineHeight = 32;
                                    var x = 55;
                                    var y = 160;
                                    var text = CardData.name;
                                    ctx.fillStyle = "#282d39";
                                    if (text.length <= 8) {
                                        y = 170;
                                        ctx.font = "40px Avenir Black";
                                    } else if (text.length <= 22) {
                                        ctx.font = "36px Avenir Black";
                                        lineHeight = 38;
                                    } else {
                                        ctx.font = "30px Avenir Black";
                                    }
                                    wrapText(ctx, text, x, y, maxWidth, lineHeight);

                                    // Descrição do serviço ou promoção
                                    if (text.length <= 22)
                                        y = 250;
                                    else
                                        y = 270;
                                    lineHeight = 24;
                                    text = CardData.desc;
                                    ctx.font = '18px Avenir Book';
                                    ctx.fillStyle = '#282d39';
                                    wrapText(ctx, text, x, y, maxWidth, lineHeight);

                                    // Contato
                                    y = 445;
                                    text = 'Contato: ' + CardData.phone;
                                    ctx.font = '16px Avenir Book';
                                    ctx.fillStyle = '#282d39';
                                    wrapText(ctx, text, x, y, maxWidth, lineHeight);

                                    // site
                                    x = 15;
                                    y = 570;
                                    maxWidth = 150;
                                    lineHeight = 14;
                                    text = 'Imagem gerada por http://promova.me';
                                    ctx.font = '10px Avenir Book';
                                    ctx.fillStyle = '#ffffff';
                                    wrapText(ctx, text, x, y, maxWidth, lineHeight);
                                    break;

                                case 'bottom':
                                    // Desenha os quadrados
                                    ctx.fillStyle = defaultColor;
                                    ctx.beginPath();
                                    ctx.fillRect(0, 450, 600, 150);
                                    ctx.closePath();
                                    ctx.fill();

                                    ctx.fillStyle = "#ffffff";
                                    ctx.beginPath();
                                    ctx.fillRect(100, 390, 400, 170);
                                    ctx.closePath();
                                    ctx.fill();

                                    ctx.fillStyle = "rgb(0,0,0)";
                                    ctx.beginPath();
                                    ctx.fillRect(0, 515, 450, 8);
                                    ctx.closePath();
                                    ctx.fill();

                                    // Escreve os textos
                                    // Nome da empresa, ou da pessoa
                                    var maxWidth = 360;
                                    var lineHeight = 28;
                                    var x = 120;
                                    var y = 432;
                                    var text = CardData.name;
                                    ctx.fillStyle = "#282d39";
                                    if (text.length <= 25) {
                                        ctx.font = "32px Avenir Black";
                                        lineHeight = 36;
                                    } else {
                                        ctx.font = "25px Avenir Black";
                                    }
                                    wrapText(ctx, text, x, y, maxWidth, lineHeight);

                                    // Descrição do serviço ou promoção
                                    y = 470;
                                    lineHeight = 22;
                                    text = CardData.desc;
                                    ctx.font = '16px Avenir Book';
                                    ctx.fillStyle = '#282d39';
                                    wrapText(ctx, text, x, y, maxWidth, lineHeight);

                                    // Contato
                                    y = 545;
                                    text = 'Contato: ' + CardData.phone;
                                    ctx.font = '16px Avenir Book';
                                    ctx.fillStyle = '#282d39';
                                    wrapText(ctx, text, x, y, maxWidth, lineHeight);

                                    // site
                                    x = 15;
                                    y = 585;
                                    maxWidth = 300;
                                    lineHeight = 14;
                                    text = 'Imagem gerada por http://promova.me';
                                    ctx.font = '10px Avenir Book';
                                    ctx.fillStyle = '#ffffff';
                                    wrapText(ctx, text, x, y, maxWidth, lineHeight);
                                    break;

                                case 'right':
                                    // Desenha os quadrados
                                    ctx.fillStyle = defaultColor;
                                    ctx.beginPath();
                                    ctx.fillRect(450, 0, 150, 600);
                                    ctx.closePath();
                                    ctx.fill();

                                    ctx.fillStyle = "rgb(255,255,255)";
                                    ctx.beginPath();
                                    ctx.fillRect(320, 100, 250, 400);
                                    ctx.closePath();
                                    ctx.fill();

                                    ctx.fillStyle = "rgb(0,0,0)";
                                    ctx.beginPath();
                                    ctx.fillRect(350, 400, 250, 8);
                                    ctx.closePath();
                                    ctx.fill();

                                    // Escreve os textos
                                    // Nome da empresa, ou da pessoa
                                    var maxWidth = 210;
                                    var lineHeight = 32;
                                    var x = 345;
                                    var y = 160;
                                    var text = CardData.name;
                                    ctx.fillStyle = "#282d39";
                                    if (text.length <= 8) {
                                        y = 170;
                                        ctx.font = "40px Avenir Black";
                                    } else if (text.length <= 22) {
                                        ctx.font = "36px Avenir Black";
                                        lineHeight = 38;
                                    } else {
                                        ctx.font = "30px Avenir Black";
                                    }
                                    wrapText(ctx, text, x, y, maxWidth, lineHeight);

                                    // Descrição do serviço ou promoção
                                    if (text.length <= 22)
                                        y = 250;
                                    else
                                        y = 270;
                                    lineHeight = 24;
                                    text = CardData.desc;
                                    ctx.font = '18px Avenir Book';
                                    ctx.fillStyle = '#282d39';
                                    wrapText(ctx, text, x, y, maxWidth, lineHeight);

                                    // Contato
                                    y = 445;
                                    text = 'Contato: ' + CardData.phone;
                                    ctx.font = '16px Avenir Book';
                                    ctx.fillStyle = '#282d39';
                                    wrapText(ctx, text, x, y, maxWidth, lineHeight);

                                    // site
                                    x = 500;
                                    y = 570;
                                    maxWidth = 150;
                                    lineHeight = 14;
                                    text = 'Imagem gerada por http://promova.me';
                                    ctx.font = '10px Avenir Book';
                                    ctx.fillStyle = '#ffffff';
                                    wrapText(ctx, text, x, y, maxWidth, lineHeight);
                                    break;

                            }
                        })
                    }
                }

            }
        };
    }

    function wrapText(context, text, x, y, maxWidth, lineHeight){
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
    }

});

const Color = {
    azul: "#379abb",
    cinza: "#9e9e9e",
    verde: "#008000",
    laranja: "#d79f2e",
    vermelho: "#c64548",

    getDefaultColor: function () {
        switch ($('#color-form').children("option:selected").val()) {
            case 'azul':
                return this.azul;
                break;
            case 'cinza':
                return this.cinza;
                break;
            case 'verde':
                return this.verde;
                break;
            case 'laranja':
                return this.laranja;
                break;
            case 'vermelho':
                return this.vermelho;
                break;
            default:
                return this.vermelho;
                break;
        }
    }

};

const Slider = {
    initSliderStepsCards: function () {
        $('#sliderStepsCards').lightSlider({
            item:1,
            slideMargin:5,
            loop:true,
            autoWidth: false,
            currentPagerPosition: 'middle',
            auto: true,
            pause: 3000,
            speed: 1000,
        });
    },
};

const Effects = {
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
        $(close).removeClass('active');
        $(close).hide();
        $(open).fadeIn(500);
    },

};

const ImageInputFileFunctions = {

    readURL: function(input) {
        var url = input.value;
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#card-placeholder').css('background-image', 'url(' + e.target.result + ')');
            };

            reader.readAsDataURL(input.files[0]);
        }
    },

    drawImageProp: function(ctx, img, x, y, w, h, offsetX, offsetY) {

        if (arguments.length === 2) {
            x = y = 0;
            w = ctx.canvas.width;
            h = ctx.canvas.height;
        }

        // default offset is center
        offsetX = typeof offsetX === "number" ? offsetX : 0.5;
        offsetY = typeof offsetY === "number" ? offsetY : 0.5;

        // keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;

        var iw = img.width,
            ih = img.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r,   // new prop. width
            nh = ih * r,   // new prop. height
            cx, cy, cw, ch, ar = 1;

        // decide which gap to fill
        if (nw < w) ar = w / nw;
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
        nw *= ar;
        nh *= ar;

        // calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        // make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        // fill image in dest. rectangle
        ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
    }
};

const CardData = {

    name: '',
    desc: '',
    phone: '',
    delivery: '',
    email: '',
    newsletter: false,
    preview: false,

    setCardData: function () {
        try {
            this.name = $('#name-form').val();
            this.desc = $('#desc-form').val();
            this.phone = $('#phone-form').val();
            this.email = $('#email-form').val();
            this.newsletter = $('#newsletter-form').is(':checked');
        } catch (e) {
            return false
        }
        return true;
    },

    sendCardData: function (){
        $.ajax({
            type: "POST",
            url: '../../functions/functions.php',
            dataType: 'json',
            data: {
                name: this.name,
                desc: this.desc,
                phone: this.phone,
                delivery: this.delivery,
                email: this.email,
                newsletter: this.newsletter
            },
            success: function (response) {
                console.log(response.status);
            }
        });
    },

};

const CardPreview = {
    updateTextPreview: function (field) {
        const idField = $(field).attr('id');

        switch (idField) {
            case 'name-form':
                $("#card-placeholder .name").text(field.value);
                break;
            case 'desc-form':
                $("#card-placeholder .desc").text(field.value);
                break;
            case 'phone-form':
                $("#card-placeholder .phone").text("Contato: " + field.value);
                break;
        }
    },

    updateColorPreview: function () {
        const color = Color.getDefaultColor();
        $("#card-placeholder .rectangle-bg").css('background-color', color);
    },

    updateLayoutPreview: function (element) {
        const layout = element.value;
        switch (layout) {
            case 'left':
                $("#card-placeholder, #card-placeholder .black-line, #card-placeholder .footer-info").removeClass('right').removeClass('bottom').addClass(layout);
                break;
            case 'right':
                $("#card-placeholder, #card-placeholder .black-line, #card-placeholder .footer-info").removeClass('left').removeClass('bottom').addClass(layout);
                break;
            case 'bottom':
                $("#card-placeholder, #card-placeholder .black-line, #card-placeholder .footer-info").removeClass('left').removeClass('right').addClass(layout);
                break;
        }
    }
};

const FinalCard = {
    downloadCard: function () {
        var canvas = document.getElementById("card-canvas");
        image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = CardData.name.toLowerCase() + "-feito-por-promovame.png";
        link.href = image;
        link.click();
    },

    redirectToSocialMedia: function (socialMedia, display) {
        this.downloadCard();

        switch (socialMedia) {
            case "facebook":
                if (display == 'desktop')
                    window.location.replace("https://www.facebook.com/");
                else
                    window.location.replace("fb://");
                break;
            case "instagram":
                if (display == 'desktop')
                    window.location.replace("https://www.instagram.com/");
                else
                    window.location.replace("instagram://");
                break;
            case "whatsapp":
                if (display == 'desktop')
                    window.location.replace("https://web.whatsapp.com/");
                else
                    window.location.replace("https://api.whatsapp.com/");
                break;
        }
    }
};

const Validation = {

    errorFormElement: '#form-generate-card .error-msg',

    validateCardForm: function () {

        // Validate Name
        if (!$("#name-form").val()) {

            Util.addError(this.errorFormElement, 'Informe seu nome ou da sua empresa');
            Util.addRedBorderOnErrorInput('#name-form');
            return false;

        } else {

            var str = $("#name-form").val();
            str = str.replace(/\n/g, "");
            $("#name-form").val(str);

        }

        // Validate Desc
        if (!$("#desc-form").val()) {

            Util.addError(this.errorFormElement, 'Informe uma descrição para seu produto ou serviço');
            Util.addRedBorderOnErrorInput('#desc-form');
            return false;

        } else {

            var str = $("#desc-form").val();
            str = str.replace(/\n/g, "");
            $("#desc-form").val(str);

        }

        // Validate Phone
        if (!$("#phone-form").val()) {

            Util.addError(this.errorFormElement, "Informe seu telefone");
            Util.addRedBorderOnErrorInput('#phone-form');
            return false;

        } else {

            var lengthPhone = $("#phone-form").val().length;
            if (lengthPhone <= 10) {

                Util.addError(this.errorFormElement, "Seu Telefone está incompleto");
                Util.addRedBorderOnErrorInput('#phone-form');
                return false;

            }

        }

        // Validate E-mail
        if (!$("#email-form").val()) {

            Util.addError(this.errorFormElement, 'Informe seu e-mail');
            Util.addRedBorderOnErrorInput('#email-form');
            return false;

        }

        if (!Validation.validateEmail($("#email-form").val())) {

            Util.addError(this.errorFormElement, "E-mail em formato incorreto");
            Util.addRedBorderOnErrorInput('#email-form');
            Util.addRedBorderOnErrorInput('#confirm-email-form');
            return false;

        } else {

            var str = $("#email-form").val();
            str = str.replace(/\n/g, "");
            $("#email-form").val(str);

        }

        // Validate Layout
        var selectedLayout = $('#layout-form').children("option:selected").val();
        if (!selectedLayout) {

            Util.addError(this.errorFormElement, 'Selecione onde ficará suas informações');
            Util.addRedBorderOnErrorInput('#layout-form');
            return false;

        }

        // Validate Color
        var selectedColor = $('#color-form').children("option:selected").val();
        if (!selectedColor) {

            Util.addError(this.errorFormElement, 'Selecione uma cor');
            Util.addRedBorderOnErrorInput('#color-form');
            return false;

        }

        // Validate File
        if ($('#file-chooser').get(0).files.length === 0) {

            Util.addError(this.errorFormElement, 'Selecione uma imagem do seu negócio');
            Util.addRedBorderOnErrorInput('#file-chooser');
            return false;

        }

        // Validate Terms
        if (!$('#info-form').is(':checked')){
            Util.addError(this.errorFormElement, 'Aceite as condições para continuar.');
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

    addRedBorderOnErrorInput: function(element){
        $(element).addClass('error');
    },

    removeRedBorderOnErrorInput: function(element){
        $(element).removeClass('error');
    },

    initMasks: function () {
        $('#phone-form').mask('(99) 999999999');
    }

};
