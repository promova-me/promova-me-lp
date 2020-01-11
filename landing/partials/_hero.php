<?php
$states = array('AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MS','MT','MG','PA','PB','PR','PE',
'PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO');
?>
<!-- Section Hero -->
<section class="hero" id="hero">
    <div class="container">

        <div class="header">

            <ul class="nav-bar">
                <li class="item-nav one active"><a href="#health-cards" rel="rel">Conheça</a></li>
                <li class="item-nav two"><a href="#preview-content" rel="rel">Por que baixar?</a></li>
                <hr />
            </ul>
        </div>

        <div class="row justify-content-md-center">

            <div class="left col-lg-8 col-md-6">
                <h3 class="desc-top">Baixe o E-book grátis</h3>
                <h1 class="title">Seu filho mais <span>saudável</span></h1>
                <h3 class="desc-bottom">Dicas de alimentação, ideias de lancheira e brincadeiras para seu filho viver bem e melhor!</h3>
                <a href="#" class="cta cta-white"><span>Veja o conteúdo</span></a>
            </div>

            <div class="right col-lg-4 col-md-6">

                <div class="box">

                    <div class="lead-form">
                        <h4 class="title-form">Baixe Grátis o e-book completo</h4>

                        <form id="form-ebook-download">
                            <div class="form-group">
                                <input type="text" class="form-control" id="name-form" tabindex="1" placeholder="Nome completo">
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control" id="email-form" tabindex="2" placeholder="E-mail">
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control" id="confirm-email-form" tabindex="3" placeholder="Confirme seu e-mail">
                            </div>
                            <div class="form-group">
                                <input type="tel" class="form-control" id="phone-form" tabindex="4" placeholder="Celular">
                                <select class="form-control" id="state-form" tabindex="5">
                                    <option selected disabled value="">Estado</option>
                                    <?php
                                    foreach ($states as $state){ ?>
                                        <option value="<?= strtolower($state) ?>"><?= $state ?></option>
                                    <?php
                                    } ?>
                                </select>
                            </div>
                            <div class="form-group child">
                                <input type="text" class="form-control" id="child-name-form" tabindex="6" placeholder="Nome do pequeno">
                                <input type="number" class="form-control" max="3" id="child-age-form" tabindex="7" placeholder="Idade">
                            </div>

                            <span class="error-msg"></span>
                            <a class="btn-download-ebook" tabindex="8">
                                <span>Baixar Grátis</span>
                            </a>
                        </form>
                        <div class="terms">
                            <h5>Ao continuar, você concorda com os termos presentes para download do e-book.</h5>
                        </div>
                    </div>

                    <div class="lead-answer">
                        <div class="img-check">
                            <img src="/assets/images/confirmacaoo.png" alt="">
                        </div>
                        <h3 class="title">Parabéns!</h3>
                        <h4 class="msg">Você recebera um email para baixar nosso e-book.</h4>
                        <h4 class="msg2">
                            Agora é só checar seu e-mail, que enviamos nosso e-book para: <br>
                            <span>email@email.com</span>
                        </h4>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>
