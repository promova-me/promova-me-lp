<!-- Section Preview Content  -->
<?php
$colors = array('Azul','Cinza','Laranja','Verde','Vermelho');
?>
<section class="preview-content" id="preview-content">
    <div class="container">

        <h1 class="title">
            Mão na massa
        </h1>

        <div class="card-generator">

            <div class="row box">

                <div id="form-anchor"></div>

                <div class="col-md-6">
                    <div class="card-form">
                        <h4 class="title-form">Vamos começar? <br>Insira as informações</h4>

                        <form id="form-generate-card">

                            <div class="form-group">
                                <input type="text" placeholder="Seu nome ou da sua empresa" tabindex="1" class="form-control" id="name-form" maxlength="30" required="required" onchange="CardPreview.updateTextPreview(this)">
                            </div>
                            <div class="form-group">
                                <textarea rows="2" cols="50" placeholder="Descreva seu produto ou negócio" tabindex="2" class="form-control" id="desc-form" maxlength="80" required="required" onchange="CardPreview.updateTextPreview(this)"></textarea>
                            </div>
                            <div class="form-group">
                                <input type="tel" placeholder="Telefone para contato" tabindex="3" class="form-control" id="phone-form" required="required" onchange="CardPreview.updateTextPreview(this)">
                            </div>
                            <div class="form-group">
                                <input type="email" placeholder="E-mail" class="form-control" tabindex="5" id="email-form" required="required">
                            </div>
                            <div class="form-group">
                                <select class="form-control" id="layout-form" tabindex="6" onchange="CardPreview.updateColorPreview(this)">
                                    <option selected disabled value="">Selecione o lado onde ficará suas informações</option>
                                    <option value="left">Esquerda</option>
                                    <option value="bottom">Meio</option>
                                    <option value="right">Direita</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" id="color-form" tabindex="7">
                                    <option selected disabled value="">Escolha uma cor desejada</option>
                                    <?php
                                    foreach ($colors as $color){ ?>
                                        <option value="<?= strtolower($color) ?>"><?= $color ?></option>
                                        <?php
                                    } ?>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="file" tabindex="8" id="file-chooser" class="file-chooser form-control" accept="image/*" required="required" />
                            </div>
                            <span class="error-msg"></span>

                            <div class="form-group">
                                <ul class="terms">
                                    <li>
                                        <input class="styled-checkbox" tabindex="9" id="info-form" type="checkbox" value="value1">
                                        <label for="info-form"><span>Aceito compartilhar minhas informações com o Promova.me</span></label>
                                    </li>
                                    <li>
                                        <input class="styled-checkbox" tabindex="10" id="newsletter-form" type="checkbox" value="value1">
                                        <label for="newsletter-form">Quero receber novidades e dicas em meu e-mail</label>
                                    </li>
                                </ul>
                            </div>
                            <a class="cta cta-orange" id="btn-generate-card" tabindex="8">
                                <span>Gerar Grátis</span>
                            </a>
                        </form>
                    </div>

                    <div class="card-answer">
                        <div class="img-check">
                            <img src="/assets/images/check.png" alt="">
                        </div>
                        <h3 class="title">Pronto! Você gerou com sucesso sua imagem promocional.</h3>

                        <div class="bottom-share desktop" id="bottom-share">
                            <div class="share-content">
                                <h3 class="title-share">Baixe sua imagem agora</h3>
                                <div class="share-links">
                                    <div class="line">
                                        <a id="download" onclick="FinalCard.downloadCard()" data-toggle="modal" data-target="#myModal">
                                            <i class="fa fa-download" aria-hidden="true"></i>
                                            <span>Download</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <a class="cta cta-orange" id="back-to-generate">
                                <span>Refazer cartão</span>
                            </a>
                        </div>
                        <!-- Modal -->
                        <div class="modal fade" id="myModal" role="dialog">
                            <div class="modal-dialog">

                                <!-- Modal content-->
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title"><strong>Compartilhe seu cartão!</strong></h4>
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div class="modal-body">
                                        <p>Você pode promover o seu negócio postando o cartão nos stories do Instagram, Facebook e Whatsapp para as pessoas conhecerem mais sobre seu negócio! Não deixe também de enviar para possíveis clientes que poderiam se interessar pela sua empresa.</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Entendi</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 canvas-content">
                    <canvas class="card-canvas" id="card-canvas"> </canvas>

                    <div class="card-placeholder left" id="card-placeholder">
                        <div class="rectangle-bg red"></div>
                        <hr class="black-line left">
                        <div class="rectangle-infos">
                            <h1 class="name">Nome da Empresa</h1>
                            <h3 class="desc">Descrição do produto ou serviço</h3>
                            <h4 class="phone">Contato: (99) 99999-9999</h4>
                        </div>
                        <h5 class="footer-info left">Imagem gerada por https://promova.me</h5>
                    </div>

                    <div class="look-how">
                        <h5>Insira as informações e veja como ficará sua imagem</h5>
                        <i class="fa fa-eye" aria-hidden="true"></i>
                    </div>
                </div>

                <div class="bottom-share mobile" id="bottom-share">
                    <div class="share-content">
                        <h3 class="title-share">Baixe sua imagem agora</h3>
                        <div class="share-links">
                            <div class="line">
<!--                                <a id="download" onclick="FinalCard.downloadCard()">-->
                                    <a id="download" onclick="FinalCard.downloadCard()" data-toggle="modal" data-target="#myModal">
                                    <i class="fa fa-download" aria-hidden="true"></i>
                                    <span>Download</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <a class="cta cta-orange" id="back-to-generate-mobile">
                        <span>Refazer cartão</span>
                    </a>
                </div>

            </div>

        </div>
    </div>
</section>
