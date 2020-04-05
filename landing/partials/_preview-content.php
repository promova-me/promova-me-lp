<!-- Section Preview Content  -->
<?php
$colors = array('Azul','Amarelo','Laranja','Verde','Vermelho');
?>
<section class="preview-content" id="preview-content">
    <div class="container">

        <h1 class="title">
            Mão na massa
        </h1>


        <div class="row card-generator">

            <div class="col-md-6">

                <div id="form-anchor"></div>

                <div class="box">

                    <div class="card-form">
                        <h4 class="title-form">Insira as informações</h4>

                        <form id="form-generate-card">

                            <div class="form-group">
                                <input type="text" placeholder="Seu nome ou da sua empresa" class="form-control" id="name-form" maxlength="30" required="required" value="dsvsdfbvsdfbfds">
                            </div>
                            <div class="form-group">
                                <input type="text" placeholder="Descrição do produto ou serviço" class="form-control" id="desc-form" maxlength="50" required="required" value="dsavsdfvf sdvsdav sdvsdav sdvsdvsadv">
                            </div>
                            <div class="form-group">
                                <input type="tel" placeholder="Telefone para contato" class="form-control" id="phone-form" required="required" value="(35) 99999-9999">
                            </div>
                            <div class="form-group">
                                <input type="text" placeholder="Região de entrega" class="form-control" id="delivery-form" required="required" value="dasvsadfvfdsvfdsvfvsfdvfsdvdds">
                            </div>
                            <div class="form-group">
                                <select class="form-control" id="color-form" tabindex="5">
                                    <option selected disabled value="">Escolha uma cor desejada</option>
                                    <?php
                                    foreach ($colors as $color){ ?>
                                        <option value="<?= strtolower($color) ?>"><?= $color ?></option>
                                        <?php
                                    } ?>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="file" id="file-chooser" class="file-chooser form-control" accept="image/*" required="required" />
                            </div>

                            <span class="error-msg"></span>
                            <a class="btn-generate-card" tabindex="8">
                                <span>Gerar Grátis</span>
                            </a>
                        </form>
                    </div>

                    <div class="card-answer">
                        <div class="img-check">
                            <img src="/assets/images/check.png" alt="">
                        </div>
                        <h3 class="title">Parabéns!</h3>
                        <h4 class="msg">Você gerou com sucesso sua imagem promocional.</h4>
                        <h4 class="msg2">Quer receber novidades e dicas direto no seu e-mail?</h4>
                        <form id="form-email">
                            <div class="form-group half">
                                <input type="email" placeholder="Seu nome ou da sua empresa" class="form-control" id="email-form">
                                <input type="button" class="form-control" id="cta-email-form" value="Quero!">
                            </div>
                        </form>
                        <button onclick="FinalCard.downloadCard()">
                            Baixar Cartão
                        </button>
                    </div>

                </div>
            </div>

            <div class="col-md-6">
                <div class="canvas-content">
                    <canvas class="card-canvas" id="card-canvas"> </canvas>
                </div>
            </div>

        </div>
    </div>
</section>
