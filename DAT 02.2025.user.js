// ==UserScript==
// @name        💎 Diamantes Ataque Tools 9.0.1 _PT💎
// @namespace   https://www.offboardbr.tk
// @version     9.0.1
// @description Script de automatização I.O.
// @match       *.imperiaonline.org/imperia/game_v6/game/village.php*
// @match       *.gameofemperors.com/imperia/game_v6/game/village.php*
// @icon        https://photos.fife.usercontent.google.com/pw/AP1GczOK7EE1qbCAkFZsYHeuQs6i7vpZft34IikGIAUUHe-jMN2QQxBc5GBD8g=w712-h712-s-no-gm?authuser=0
// @copyright   2010 - 2024 ©rutiere_sena/creditos jmota
// @require     https://code.jquery.com/jquery-latest.js
// @require     https://code.jquery.com/jquery-3.6.3.min.js
// @require     https://code.jquery.com/ui/1.13.1/jquery-ui.min.js
// @grant	    GM_registerMenuCommand
// @grant	    GM_setValue
// @grant	    GM_getValue
// @grant       GM_addStyle
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */
//----------------------------------------------------------------------------------------------------------------- */
// ==================================================================== INÍCIO DO SCRIPT ================================================================
// Função de verificação de licença (MM-DD-YYYY e horário)
function verificarLicenca(tipoLicenca, validade = null) {
    if (!tipoLicenca) {
        console.log("Tipo de licença não especificado. Acesso negado.");
        return false;
    }
    tipoLicenca = tipoLicenca.toLowerCase();
    if (tipoLicenca === 'vitalicia') {
        console.log("Licença vitalícia. Acesso permitido.");
        return true;
    }
    if (tipoLicenca === 'data') {
        if (!validade) {
            console.log("Data de validade não fornecida. Acesso negado.");
            return false;
        }
        try {
            const [data, hora] = validade.split(' ');
            const partesData = data.split('-');
            if (partesData.length !== 3 || !hora) {
                console.log("Formato de data e hora inválido. Acesso negado.");
                return false;
            }
            const [mes, dia, ano] = partesData.map(num => parseInt(num, 10) - (partesData.indexOf(num) === 0 ? 1 : 0));
            const [horas, minutos] = hora.split(':').map(num => parseInt(num, 10));
            const dataExpiracao = new Date(ano, mes, dia, horas, minutos);
            const dataAtual = new Date();
            if (dataAtual <= dataExpiracao) {
                console.log(`Licença válida até ${validade}. Acesso permitido.`);
                return true;
            } else {
                console.log(`Licença expirada em ${validade}. Acesso negado.`);
                return false;
            }
        } catch (error) {
            console.log("Erro ao processar a data. Acesso negado.");
            return false;
        }
    }
    console.log("Tipo de licença inválido. Acesso negado.");
    return false;
}
// =================== INÍCIO DO CODIGO ===================
var login = '';
var $ = window.jQuery;
var $j = jQuery.noConflict();
var IdProfile = playerName;
// Definição do único usuário
var usuario = { nome: "rutiere", tipoLicenca: "data", validade: "09-03-2025 10:33" }; // Exemplo de licença válida
// Verificar licença do único usuário antes de executar o restante do código
if (!verificarLicenca(usuario.tipoLicenca, usuario.validade)) {
    console.log("Licença inválida. O script não será executado.");
    return; // Interrompe a execução do código se a licença não for válida
}
setTimeout(function () {
    var tempo_reload = 60000;
    var e = 0;
    var isActive = "false";
    var f = GM_getValue(playerName + "ScriptStart", "false");
    var g = GM_getValue(playerName + "ScriptAtaque", "true");
    var h = GM_getValue(playerName + "ScriptAtaqueAli", "true");
    var i = GM_getValue(playerName + "ScriptSpy", "true");
    var j = GM_getValue(playerName + "ScriptMsg", "true");
    var k = GM_getValue(playerName + "Scriptcaptcha", "true");
    var a = GM_getValue(playerName + "ScriptRefresh", "true");
    var v = GM_getValue(playerName + "ScriptMoverRec", "true");
    var p = GM_getValue(playerName + "ScriptEmpregarPop", "true");
    var r10 = GM_getValue(playerName + "ScriptReduzir10min", "true");
    var rv = GM_getValue(playerName + "ScriptRecVassalo", "true");
    var mad = GM_getValue(playerName + "ScriptMoverMad", "false");
    var fer = GM_getValue(playerName + "ScriptMoverFer", "false");
    var ped = GM_getValue(playerName + "ScriptMoverPed", "false");
    var ignore10 = GM_getValue(playerName + "ScriptAtaqueIgnore10", "true");
    var incognito = GM_getValue(playerName + "ScriptIncognito", "true");
    var imposto = GM_getValue(playerName + "ScriptImposto", "true");
    var assistencia = GM_getValue(playerName + "ScriptAssistencia", "true");
    var cinst = GM_getValue(playerName + "ScriptCinst", "true");
    var som_ataque = "https://www.soundrangers.com/demos/sirens/ambulance_siren.mp3";
    var som_alianca = "https://www.soundrangers.com/demos/sirens/firetruck_siren.mp3";
    var som_ignore10 = "https://www.soundrangers.com/demos/sirens/ambulance_siren.mp3";
    var som_spy = "https://www.soundrangers.com/demos/sirens/ambulance_siren.mp3";
    var som_mp = "https://www.soundrangers.com/demos/sirens/ambulance_siren.mp3";
    var som_captcha = "https://www.soundrangers.com/demos/sirens/ambulance_siren.mp3";
    var img_inactive = "https://img.icons8.com/?size=100&id=17333&format=png&color=000000";// IMAGEM DIAMANTE
    var img_active = "https://img.icons8.com/?size=100&id=12386&format=png&color=000000";// IMAGEM SINAL MENOS

    $('head').append(`
    <style type="text/css">
        .buttonPlayScript {
            display: inline-block;
            margin: 0px;
            color: #F1ECDC;
            font-weight: bold;
            font-family: inherit;
            text-align: center;
            text-shadow: 1px 1px #000000;
            text-decoration: none;
            white-space: nowrap;
            outline: none;
            cursor: pointer;
            background: url("https://ihcdn3.ioimg.org/iov6live/gui/buttons.png?v=71") repeat-x;
            border: 1px solid #000000; /* Borda preta */
            box-sizing: content-box;
            box-shadow: 0px 0px 0px 3px rgba(122,90,71,0.2),
                        0px 2px 0px 0px rgba(255,255,255,0.5) inset;
            min-width: 20px;
            height: 22px;
            line-height: 22px;
            padding: 0px 10px;
            font-size: 14px;
            text-transform: none;
            border-radius: 4px;
            vertical-align: top;
            margin-top: 3px;
        }
        .buttonPlayScript.Castanho {
            background-position: 0px -96px;
        }
        .buttonPlayScript.Castanho:hover {
            background-position: 0px -120px;
        }
        .buttonPlayScript.Vermelho {
            background-position: 0px -288px;
        }
        .buttonPlayScript.Vermelho:hover {
            background-position: 0px -312px;
        }
        .buttonPlayScript.Azul {
            background-position: 0px -752px;
        }
        .buttonPlayScript.Azul:hover {
            background-position: 0px -752px;
        }
        .buttonPlayScript.Verde {
            background-position: 0px -842px;
        }
        .buttonPlayScript.Verde:hover {
            background-position: 0px -842px;
        }

        .shield-icon {
            cursor: pointer;
            background-image: url('${img_inactive}');
            background-size: contain;
            background-repeat: no-repeat;
            width: 40px;
            height: 40px;
            display: inline-block;
            background-color: black; /* Fundo preto */
            border: 2px solid white; /* Borda branca */
            box-sizing: border-box; /* Inclui a borda no tamanho total */
        }
        
</style>
`);

    $('<div style="position:fixed;left:50px;height:60px;width: 200;z-index:0;bottom: 65px;text-align: center;align-items: center;display: flex;flex-direction: row;flex-wrap: wrap;justify-content: center;border: 0px solid #000604;border-radius: 5px;">'
        + '<audio id="AtaqueAudio" loop><source src="' + som_ataque + '" type="audio/wav"></audio>'
        + '<audio id="AtaqueAudioAli" loop><source src="' + som_alianca + '" type="audio/wav"></audio>'
        + '<audio id="AtaqueAudioIgnore10" loop><source src="' + som_ignore10 + '" type="audio/wav"></audio>'
        + '<audio id="SpyAudio" loop><source src="' + som_spy + '" type="audio/wav"></audio>'
        + '<audio id="captchaAudio" loop><source src="' + som_captcha + '" type="audio/wav"></audio>'
        + '<audio id="MessageAudio" loop><source src="' + som_mp + '" type="audio/wav"></audio>'
        + '<div id="Open_Aba_Açoes" class="shield-icon"></div>'
        + '</div>').appendTo('body');

    $('#Open_Aba_Açoes').on('click', function () {
        var isInactive = $(this).css('background-image').includes(img_inactive);
        $(this).css('background-image', isInactive ? 'url(' + img_active + ')' : 'url(' + img_inactive + ')');
    });


    // ========================================================================== JANELA DE OPÇÕES =======================================================================
    $('<div id="Aba_Açoes" class="window-wrapper active ui-draggable " style="top: -22 px; -webkit-transform-origin: 0px 0px; -webkit-transform: matrix(0.8, 0, 0, 0.8, 0, 0);display:none;">'
        +
        '<div class="window-title">' +
        '<a class="ui-ib fleft info"" title="Avaliar"></a>' +
        '<span class="ui-ib fleft title-separator"></span>' +
        '<a class="ui-ib fleft refresh"" title="Atualizar"></a>' +
        '<div class="title"><div class="arrow left disabled"></div>' +
        '<span class="txt-title">💎DAT version 8.0.1💎</span>' +
        '<div class="arrow right disabled"></div>' +
        '</div>'
        +
        '<a class="ui-ib fright close" href=""#" id="Close_Aba_Açoes" class="close" onmouseup="' +
        '$(this).closest(\'.ui-draggable\').removeClass(\'no-drag\');" onmousedown="' +
        '$(this).closest(\'.ui-draggable\').addClass(\'no-drag\');" title="Fechar"></a>'
        +
        '<span class="ui-ib fright title-separator"></span>' +
        '<a class="ui-ib fright help""></a></div>'
        +
        '<div id="messageboxScript" class="window-content">' +
        '<ul class="window-tabs narrow" style="display: block;">'
        +
        '<li class="Aba_Açoes active "><a href="#"><div style="background-position: -120px -360px;"></div>Ações</a></li>' +
        '<li class="Aba_Construcoes "><a href="#"><div></div>Construir</a></li>' +
        '<li class="Aba_Recrutamentos"><a href="#"><div></div>Recrutar</a></li>' +
        '<li class="Aba_Eventos"><a href="#"><div></div>Eventos</a></li>' +
        ////'<li class="Aba_Especializações"><a href="#"><div></div>Especializações</a></li>' +
        '<li class="Aba_Dobro"><a href="#"><div></div>Dobro</a></li>' +
        //'<li class="Aba_Pesquisa"><a href="#"><div></div>Pesquisa</a></li>' +
        '<li class="Aba_Extras"><a href="#"><div></div>Extras</a></li>' +
        '<li class="Aba_Suporte"><a href="#"><div></div>Suporte</a></li>'
        +
        '</ul>'
        +
        '<span class="window-decor-left"></span><span class="window-decor-right"></span>' +
        '<div class="window-size window-wide town-hall-main clear"">' +
        '<div class="content settings-empire"><div style="width:600px;margin: auto;">'
        +
        '<div class="centered-block" style=""> <div style="width:600px;margin: auto;">'
        +
        '<div style="height:18px;display:block;">' +
        '<div class="checkbox-wrap inline-ie"> <input type="checkbox" id="chkAtaque" class="checkbox ui-pass"> </div>Alerta de Ataque ' +
        '<button id="PrevAudioAtaque" style="float: right;" class="buttonPlayScript Verde">♫</button>' +
        '<button id="StopAudioAtaque" style="float: right;display:none;" class="buttonPlayScript Vermelho">♬</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:18px;display:block;">' +
        '<div class="checkbox-wrap inline-ie"> <input type="checkbox" id="chkAtaqueIgnore10" class="checkbox ui-pass"> </div>' +
        'Ignorar Ataques com mais de 10 minutos ' +
        '<button id="PrevAudioAtaqueIgnore10" style="float: right;" class="buttonPlayScript Verde">♫</button>' +
        '<button id="StopAudioAtaqueIgnore10" style="float: right;display:none;" class="buttonPlayScript Vermelho">♬</button>' +
        '</div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:25px;display:block;">' +
        '<div class="checkbox-wrap inline-ie"> <input type="checkbox" id="chkRefresh" class="checkbox ui-pass"> </div>Auto Reload da Página<hr class="divider"></div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <div></div>Mover Recursos para Provincia Atual ' +
        '<button id="bntmoverrecusos" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="Stopmoverrecusos" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider"></div><div style="height:25px;display:block;">'
        +
        '<div class="checkbox-wrap inline-ie"><input type="checkbox" id="chkEmpregarPop"  class="checkbox ui-pass"></div>Empregar População</div>' +
        '<div style="height:25px;display:block;">'
        +
        '<div class="checkbox-wrap inline-ie"><input type="checkbox" id="chkReduzir10min" class="checkbox ui-pass"></div>Reduzir 10 Minutos</div>' +
        '<div style="height:25px;display:block;">'
        +
        '<div class="checkbox-wrap inline-ie"><input type="checkbox" id="chkRecVassalo"   class="checkbox ui-pass"></div>Recolher Ouro dos Vassalos</div>' +
        '<div style="height:25px;display:block;">'
        +
        '<div class="checkbox-wrap inline-ie"><input type="checkbox" id="chkImposto"      class="checkbox ui-pass"></div>Manter Imposto Ótimo</div>' +
        '<div style="height:25px;display:block;">'
        +
        '<div class="checkbox-wrap inline-ie"><input type="checkbox" id="chkAssistencia"  class="checkbox ui-pass"></div>Solicitar Assistencia</div>' +
        '<div style="height:25px;display:block;">'
        +
        '<div class="checkbox-wrap inline-ie"><input type="checkbox" id="chkCinst"        class="checkbox ui-pass"></div>Construção instantânea</div>' +
        '<div style="height:18px;display:block;">'
        +
        '<div class="checkbox-wrap inline-ie"><input type="checkbox" id="chkIncognito"    class="checkbox ui-pass"></div>Manter Incógnito</div>' +
        '<div style="height:18px;display:block;">'
        +
        '<div></div><hr class="divider"></div>' +
        '<div style="height:18px;display:block;">'
        +
        '<div class="checkbox-wrap inline-ie"> <input type="checkbox" id="chkAtaqueAli"   class="checkbox ui-pass"> </div>Alerta de Ataque Aliança ' +
        '<button id="PrevAudioAtaqueAli" style="float: right;" class="buttonPlayScript Verde">♫</button>' +
        '<button id="StopAudioAtaqueAli" style="float: right;display:none;" class="buttonPlayScript Vermelho">♬</button></div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:18px;display:block;">' +
        '<div class="checkbox-wrap inline-ie"> <input type="checkbox" id="chkSpy" class="checkbox ui-pass"> </div>Alerta de Spy' +
        '<button id="PrevAudioSpy" style="float: right;" class="buttonPlayScript Verde">♬</button>' +
        '<button id="StopAudioSpy" style="float: right;display:none;" class="buttonPlayScript Vermelho">♬</button></div>'
        +
        '<hr class="divider"><div style="height:18px;display:block;"> '
        +
        '<div class="checkbox-wrap inline-ie"><input type="checkbox" id="chkMsg" class="checkbox ui-pass"> </div>Alerta de Mensagem Privada' +
        '<button id="PrevAudioMsg" style="float: right;" class="buttonPlayScript Verde">♫</button>' +
        '<button id="StopAudioMsg" style="float: right;display:none;" class="buttonPlayScript Vermelho">♬</button></div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:18px;display:block;"><div class="checkbox-wrap inline-ie"><input type="checkbox" id="chkcaptcha"class="checkbox ui-pass"></div>Alerta de Captcha' +
        '<button id="PrevAudiocaptcha" style="float: right;" class="buttonPlayScript Verde">♫</button>' +
        '<button id="StopAudiocaptcha" style="float: right;display:none;" class="buttonPlayScript Vermelho">♬</button></div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <div></div>ATIVAR ABA AÇOES ' +
        '<button id="play" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="Pause" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div id="confirmationSettings" class="centered"> <div class="centered-block" style="">' +
        '<button class="button blue " type="button" id="Btn_Salvar_Options" value="Guardar">Salvar</button>' +
        '<div class="centered-block" style="">'
        +
        '</div> </div> </div> '
        +
        '</div> </div> </div>'
        +
        '<div class="window-footer">2010 - 2024 ©rutiere_sena/creditos jmota<div class="window-footer-top"></div>' +
        '<div class="window-footer-top"> </div></div></div></div></div>').appendTo('body');
    // ========================================================================== ABA CONSTRUÇÕES ========================================================================
    $('<div id="Aba_Construcoes" class="window-wrapper active ui-draggable zoom" style="top: 0px; -webkit-transform-origin: 0px 0px; -webkit-transform: matrix(0.8, 0, 0, 0.8, 0, 0);display:none;">'
        +
        '<div class="window-title">' +
        '<a class="ui-ib fleft info"" title="Avaliar"></a>' +
        '<span class="ui-ib fleft title-separator"></span>' +
        '<a class="ui-ib fleft refresh"" title="Atualizar"></a>' +
        '<div class="title">' +
        '<div class="arrow left disabled"></div>' +
        '<span class="txt-title">💎DAT version 8.0.1💎</span>' +
        '<div class="arrow right disabled"></div>' +
        '</div>'
        +
        '<a class="ui-ib fright close" href=""#" id="Close_Aba_Construcoes" class="close" onmouseup="' +
        '$(this).closest(\'.ui-draggable\').removeClass(\'no-drag\');" onmousedown="' +
        '$(this).closest(\'.ui-draggable\').addClass(\'no-drag\');" title="Fechar"></a>'
        +
        '<span class="ui-ib fright title-separator"></span>' +
        '<a class="ui-ib fright help""></a></div>'
        +
        '<div id="messageboxScript" class="window-content">' +
        '<ul class="window-tabs narrow" style="display: block;">'
        +
        '<li class="Aba_Açoes "><a href="#"><div style="background-position: -120px -360px;"></div>Ações</a></li>' +
        '<li class="Aba_Construcoes active"><a href="#"><div></div>Construir</a></li>' +
        '<li class="Aba_Recrutamentos"><a href="#"><div></div>Recrutar</a></li>' +
        '<li class="Aba_Eventos"><a href="#"><div></div>Eventos</a></li>' +
        ////'<li class="Aba_Especializações"><a href="#"><div></div>Especializações</a></li>' +
        '<li class="Aba_Dobro"><a href="#"><div></div>Dobro</a></li>' +
        //'<li class="Aba_Pesquisa"><a href="#"><div></div>Pesquisa</a></li>' +
        '<li class="Aba_Extras"><a href="#"><div></div>Extras</a></li>' +
        '<li class="Aba_Suporte"><a href="#"><div></div>Suporte</a></li>'
        +
        '</ul>'
        +
        '<span class="window-decor-left"></span><span class="window-decor-right"></span>' +
        '<div class="window-size window-wide town-hall-main clear"">' +
        '<div class="content settings-empire"><div style="width:600px;margin: auto;">'
        +
        '<div class="centered-block" style=""> <div style="width:600px;margin: auto;">'
        +
        '<h2 class="title">PARTE ECONOMICA </h2>'
        +
        '</ul>'
        +
        '<div style="height:20px; display:block;  "> <div></div>Mercado ' +
        '<button id="bntCarregarMercado" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarMercado" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div></div>Monumentos ' +
        '<button id="bntCarregarMonumentos" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarMonumentos" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Estação de Transporte ' +
        '<button id="bntCarregarEstacaodeTransporte" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarEstacaodeTransporte" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Praça Central ' +
        '<button id="bntCarregarPraçaCentral" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarPraçaCentral" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:18px;display:block;"> <div</div>Casas ' +
        '<button id="bntCarregarCasas" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarCasas" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Fazendas ' +
        '<button id="bntCarregarFazendas" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarFazendas" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Serraria ' +
        '<button id="bntCarregarSerraria" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarSerraria" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Mina de Ferro ' +
        '<button id="bntCarregarMinaDeFerro" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarMinaDeFerro" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Pedreira ' +
        '<button id="bntCarregarPedreira" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarPedreira" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Estradas Imperiais ' +
        '<button id="bntCarregarEstradasImperiais" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarEstradasImperiais" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '</ul>'
        +
        '<h2 class="title"> PARTE MILITAR </h2>'
        +
        '</ul>'
        +
        '<div style="height:20px;display:block;"> <div</div>Quarteis ' +
        '<button id="bntCarregarQuarteis" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarQuarteis" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div> Quartel de Arqueiros ' +
        '<button id="bntCarregarquarteldearqueiro" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarquarteldearqueiro" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div> Quartel de Infantaria ' +
        '<button id="bntCarregarquarteldeinfantaria" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarquarteldeinfantaria" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div> Quartel de Cavalaria ' +
        '<button id="bntCarregarquarteldecavalaria" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarquarteldecavalaria" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div> Quartel de Espiões ' +
        '<button id="bntCarregarquarteldeespioes" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarquarteldeespioes" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div> Oficina de Máquinas de Cerco ' +
        '<button id="bntCarregaroficinamaquinacerco" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregaroficinamaquinacerco" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div> Construir Cortina de Muralhas ' +
        '<button id="bntCarregarcortinademuralha" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarcortinademuralha" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div> Construir Fosso ' +
        '<button id="bntCarregarfosso" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregarfosso" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div> Construir Torres ' +
        '<button id="bntCarregartorre" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopCarregartorre" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<h2 class="title">OBS:Crie um nivel de Grêmio dos Arquitetos para utilizar essa aba </h2>'
        +
        '</div> </div> </div> </div> '
        +
        '<div class="window-footer">  2010 - 2024 ©rutiere_sena/creditos jmota<div class="window-footer-top"></div>' +
        '<div class="window-footer-content"> </div> </div> </div> </div></div>').appendTo('body');
    // ========================================================================== ABA RECRUTAMENTOS ========================================================================
    $('<div id="Aba_Recrutamentos" class="window-wrapper active ui-draggable zoom" style="top: 0px; -webkit-transform-origin: 0px 0px; -webkit-transform: matrix(0.8, 0, 0, 0.8, 0, 0);display:none;">' +
        '<div class="window-title">' +
        '<a class="ui-ib fleft info"" title="Avaliar"></a>' +
        '<span class="ui-ib fleft title-separator"></span>' +
        '<a class="ui-ib fleft refresh"" title="Atualizar"></a>' +
        '<div class="title">' +
        '<div class="arrow left disabled"></div>' +
        '<span class="txt-title">💎DAT version 8.0.1💎</span>' +
        '<div class="arrow right disabled"></div>' +
        '</div>'
        +
        '<a class="ui-ib fright close" href=""#" id="Close_Aba_Recrutamentos" class="close" onmouseup="' +
        '$(this).closest(\'.ui-draggable\').removeClass(\'no-drag\');" onmousedown="' +
        '$(this).closest(\'.ui-draggable\').addClass(\'no-drag\');" title="Fechar"></a>'
        +
        '<span class="ui-ib fright title-separator"></span>' +
        '<a class="ui-ib fright help""></a></div>'
        +
        '<div id="messageboxScript" class="window-content">' +
        '<ul class="window-tabs narrow" style="display: block;">'
        +
        '<li class="Aba_Açoes "><a href="#"><div style="background-position: -120px -360px;"></div>Ações</a></li>' +
        '<li class="Aba_Construcoes "><a href="#"><div></div>Construir</a></li>' +
        '<li class="Aba_Recrutamentos active"><a href="#"><div></div>Recrutar</a></li>' +
        '<li class="Aba_Eventos"><a href="#"><div></div>Eventos</a></li>' +
        ////'<li class="Aba_Especializações"><a href="#"><div></div>Especializações</a></li>' +
        '<li class="Aba_Dobro"><a href="#"><div></div>Dobro</a></li>' +
        //'<li class="Aba_Pesquisa"><a href="#"><div></div>Pesquisa</a></li>' +
        '<li class="Aba_Extras"><a href="#"><div></div>Extras</a></li>' +
        '<li class="Aba_Suporte"><a href="#"><div></div>Suporte</a></li>'
        +
        '</ul>'
        +
        '<span class="window-decor-left"></span><span class="window-decor-right"></span>' +
        '<div class="window-size window-wide town-hall-main clear"">' +
        '<div class="content settings-empire"><div style="width:600px;margin: auto;">'
        +
        '<div class="centered-block" style=""> <div style="width:600px;margin: auto;">'
        +
        '</ul>'
        +
        '<h2 class="title">RECRUTAR ESPIOES</h2>'
        +
        '</ul>'
        +
        '<div style="height:20px;display:block;"> <div</div>Recrutar Espiões' +
        '<button  id="bntRecEspioes" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button  id="StopRecEspioes" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<h2 class="title">RECRUTAR LEVES</h2>'
        +
        '</ul>'

        +
        '<hr class="divider">'
        +
        '<div style=background-color:rgba(65,53,36,0.8)"height:20px;display:block;"> <div</div>Recrutar Arqueiros Leves' +
        '<button  id="bntRecArqueirosleves" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button  id="StopRecArqueirosleves" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Recrutar Espadachim Leves' +
        '<button  id="bntRecEspadachimLeves" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button  id="StopRecEspadachimLeves" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Recrutar Lanceiros Leves' +
        '<button  id="bntReclanceirosleves" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button  id="StopReclanceirosleves" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Recrutar Cavalos Leves' +
        '<button  id="bntRecCavalosleves" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button  id="StopRecCavalosleves" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<h2 class="title">RECRUTAR PESADOS</h2>'
        +
        '</ul>'
        +
        '<div style="height:20px;display:block;"> <div></div>Recrutar Arqueiros Pesados' +
        '<button id="bntRecArqueirospesados" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopRecArqueirospesados" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Recrutar Espadachim Pesado' +
        '<button id="bntRecEspadachimPesado" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopRecEspadachimPesado" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:18px;display:block;"> <div</div>Recrutar Lanceiros Pesados' +
        '<button id="bntReclanceirospesados" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopReclanceirospesados" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:18px;display:block;"> <div</div>Recrutar Cavalos Pesados' +
        '<button id="bntRec" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopRec" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<h2 class="title">RECRUTAR ELITES</h2>'
        +
        '</ul>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Recrutar Guardiões' +
        '<button id="bntRecGuardioes" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopRecGuardioes" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:18px;display:block;"> <div</div>Recrutar Falanges' +
        '<button id="bntRecFalanges" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopRecFalanges" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Recrutar Paladinos' +
        '<button id="bntRecPaladinos" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopRecPaladinos" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Recrutar Arqueiros' +
        '<button id="bntRecArqueiros" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopRecArqueiros" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<h2 class="title">EVOLUIR TROPAS ELITES</h2>'
        +
        '</ul>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <div></div>Evoluir Arqueiros' +
        '<button id="bntEvoarqueiroselite" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopEvoarqueiroselite" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <div></div>Evoluir Guardiões' +
        '<button id="bntEvoguardaselite" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopEvoguardaselite" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <div></div>Evoluir Falanges' +
        '<button id="bntEvoFalangeselite" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopEvoFalangeselite" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <div></div>Evoluir Paladinos' +
        '<button id="bntEvocavaloselite" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopEvocavaloselite" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<h2 class="title">EVOLUIR TROPAS HEROICAS</h2>'
        +
        '</ul>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <div></div>Evoluir Arqueiros Heroicos' +
        '<button id="bntEvoarqueirosher" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopEvoarqueirosher" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <div></div>Evoluir Espadas Heroicos' +
        '<button id="bntEvoguardasher" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopEvoguardasher" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <div></div>Evoluir Lanceiros Heroicos' +
        '<button id="bntEvoFalangesher" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopEvoFalangesher" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <div></div>Evoluir Cavalaria Heroica' +
        '<button id="bntEvocavalosher" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopEvocavalosher" style="float: right;display:none;" class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '</div> </div> </div> </div>'
        +
        '<div class="window-footer">  2010 - 2024 ©rutiere_sena/creditos jmota<div class="window-footer-top"></div>' +
        '<div class="window-footer-content"> </div> </div> </div> </div></div>').appendTo('body');
    // ========================================================================== ABA EVENTOS=============================================================================
    $('<div id="Aba_Eventos" class="window-wrapper active ui-draggable zoom" style="top: 0px; -webkit-transform-origin: 0px 0px; -webkit-transform: matrix(0.8, 0, 0, 0.8, 0, 0);display:none;">' +
        '<div class="window-title">' +
        '<a class="ui-ib fleft info"" title="Avaliar"></a>' +
        '<span class="ui-ib fleft title-separator"></span>' +
        '<a class="ui-ib fleft refresh"" title="Atualizar"></a>' +
        '<div class="title">' +
        '<div class="arrow left disabled"></div>' +
        '<span class="txt-title">💎DAT version 8.0.1💎</span>' +
        '<div class="arrow right disabled"></div>' +
        '</div>'
        +
        '<a class="ui-ib fright close" href=""#" id="Close_Aba_Eventos" class="close" onmouseup="' +
        '$(this).closest(\'.ui-draggable\').removeClass(\'no-drag\');" onmousedown="' +
        '$(this).closest(\'.ui-draggable\').addClass(\'no-drag\');" title="Fechar"></a>'
        +
        '<span class="ui-ib fright title-separator"></span>' +
        '<a class="ui-ib fright help""></a></div>'
        +
        '<div id="messageboxScript" class="window-content">' +
        '<ul class="window-tabs narrow" style="display: block;">'
        +
        '<li class="Aba_Açoes "><a href="#"><div style="background-position: -120px -360px;"></div>Ações</a></li>' +
        '<li class="Aba_Construcoes "><a href="#"><div></div>Construir</a></li>' +
        '<li class="Aba_Recrutamentos"><a href="#"><div></div>Recrutar</a></li>' +
        '<li class="Aba_Eventos active"><a href="#"><div></div>Eventos</a></li>' +
        ////'<li class="Aba_Especializações"><a href="#"><div></div>Especializações</a></li>' +
        '<li class="Aba_Dobro"><a href="#"><div></div>Dobro</a></li>' +
        //'<li class="Aba_Pesquisa"><a href="#"><div></div>Pesquisa</a></li>' +
        '<li class="Aba_Extras"><a href="#"><div></div>Extras</a></li>' +
        '<li class="Aba_Suporte"><a href="#"><div></div>Suporte</a></li>'
        +
        '</ul>'
        +
        '<span class="window-decor-left"></span><span class="window-decor-right"></span>' +
        '<div class="window-size window-wide town-hall-main clear"">' +
        '<div class="content settings-empire"><div style="width:600px;margin: auto;">'
        +
        '<div class="centered-block" style=""> <div style="width:600px;margin: auto;">'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <div></div>Atacar Fortaleza das Trevas' +
        '<button id="bntAtkFortaleza" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopAtkFortaleza" style="float: right;display:none;"class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div></div>Atacar Prisão de Pedra' +
        '<button id="bntAtkPrisao" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopAtkPrisao" style="float: right;display:none;"class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Atacar Cranio da Abundância' +
        '<button id="bntAtkCranio" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopAtkCranio" style="float: right;display:none;"class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div</div>Atacar Torre do Conhecimento' +
        '<button id="bntAtkTorre" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopAtkTorre" style="float: right;display:none;"class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:18px;display:block;"> <div</div>Atacar Castelo Eterno' +
        '<button id="bntAtkCastelo" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopAtkCastelo" style="float: right;display:none;"class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">' +
        '<div class="notice positive"><span></span>' +
        '<div class=""regime-holder""id=""regime-1"">' +
        '<div class=""regime-desc ui-ib"">' +
        '<ul class=""border-bonuses"">' +
        '<li class=""regime-little-icon regime-positive-icon positive-bonuses tleft">ORDEM DOS EVENTOS: <br></li>'
        +
        '<hr class="divider">'
        +
        '</div>'
        +
        '<li class="txt">1⃣ → Fortaleza das Trevas <br></li>' +
        '<li class="txt">2⃣ → Prisão de Pedra <br></li>' +
        '<li class="txt">3⃣ → Cranio da Abundância <br></li>' +
        '<li class="txt">4⃣ → Torre do Conhecimento <br></li>' +
        '<li class="txt">5⃣ → Castelo Eterno <br></li>'
        +
        '</ul>'
        +
        '</div> </div>' +
        '</div> </div> </div></div>'
        +
        '<div class="window-footer">  2010 - 2024 ©rutiere_sena/creditos jmota<div class="window-footer-top"></div>' +
        '<div class="window-footer-content"> </div> </div> </div> </div></div>').appendTo('body');
    // ========================================================================== ABA ESPECIALIZAÇOES=========================
    $('<div id="Aba_Especializações" class="window-wrapper active ui-draggable zoom" style="top: 0px; -webkit-transform-origin: 0px 0px; -webkit-transform: matrix(0.8, 0, 0, 0.8, 0, 0);display:none;">' +
        '<div class="window-title">' +
        '<a class="ui-ib fleft info"" title="Avaliar"></a>' +
        '<span class="ui-ib fleft title-separator"></span>' +
        '<a class="ui-ib fleft refresh"" title="Atualizar"></a>' +
        '<div class="title">' +
        '<div class="arrow left disabled"></div>' +
        '<span class="txt-title">💎DAT version 8.0.1💎</span>' +
        '<div class="arrow right disabled"></div>' +
        '</div>'
        +
        '<a class="ui-ib fright close" href=""#" id="Close_Aba_Especializações" class="close" onmouseup="' +
        '$(this).closest(\'.ui-draggable\').removeClass(\'no-drag\');" onmousedown="' +
        '$(this).closest(\'.ui-draggable\').addClass(\'no-drag\');" title="Fechar"></a>'
        +
        '<span class="ui-ib fright title-separator"></span>' +
        '<a class="ui-ib fright help""></a></div>'
        +
        '<div id="messageboxScript" class="window-content">' +
        '<ul class="window-tabs narrow" style="display: block;">'
        +
        '<li class="Aba_Açoes "><a href="#"><div style="background-position: -120px -360px;"></div>Ações</a></li>' +
        '<li class="Aba_Construcoes "><a href="#"><div></div>Construir</a></li>' +
        '<li class="Aba_Recrutamentos"><a href="#"><div></div>Recrutar</a></li>' +
        '<li class="Aba_Eventos"><a href="#"><div></div>Eventos</a></li>' +
        //'<li class="Aba_Especializações "><a href="#"><div></div>Especializações</a></li>' +
        '<li class="Aba_Dobro"><a href="#"><div></div>Dobro</a></li>' +
        //'<li class="Aba_Pesquisa"><a href="#"><div></div>Pesquisa</a></li>' +
        '<li class="Aba_Extras"><a href="#"><div></div>Extras</a></li>' +
        '<li class="Aba_Suporte"><a href="#"><div></div>Suporte</a></li>'
        +
        '</ul>'
        +
        '<span class="window-decor-left"></span><span class="window-decor-right"></span>' +
        '<div class="window-size window-wide town-hall-main clear"">' +
        '<div class="content settings-empire"><div style="width:600px;margin: auto;">'
        +
        '<div class="centered-block" style=""> <div style="width:600px;margin: auto;">'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <h2 class="title">Especializar Lanceiros</h2>' +
        '<button id="bnt" style="float: right;" class="buttonPlayScript Vermelho">EM BREVE</button>' +
        '<button id="Stop" style="float: right;display:none;"class="buttonPlayScript Verde">ON🔒</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <h2 class="title">Especializar Arqueiros</h2>' +
        '<button id="bnt" style="float: right;" class="buttonPlayScript Vermelho">EM BREVE</button>' +
        '<button id="Stop" style="float: right;display:none;"class="buttonPlayScript Verde">ON🔒</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <h2 class="title">Especializar Espadachins</h2>' +
        '<button id="bnt" style="float: right;" class="buttonPlayScript Vermelho">EM BREVE</button>' +
        '<button id="Stop" style="float: right;display:none;"class="buttonPlayScript Verde">ON🔒</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <h2 class="title">Especializar Cavalaria</h2>' +
        '<button id="bnt" style="float: right;" class="buttonPlayScript Vermelho">EM BREVE</button>' +
        '<button id="Stop" style="float: right;display:none;"class="buttonPlayScript Verde">ON🔒</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <h2 class="title">Especializar Cerco</h2>' +
        '<button id="bntAtkCI" style="float: right;" class="buttonPlayScript Vermelho">EM BREVE</button>' +
        '<button id="StopAtkCI" style="float: right;display:none;"class="buttonPlayScript Verde">ON🔒</button> </div>'
        +
        '<hr class="divider">'
        +
        '</div> </div> </div> </div>'
        +
        '<div class="window-footer">  2010 - 2024 ©rutiere_sena/creditos jmota<div class="window-footer-top"></div>' +
        '<div class="window-footer-content"> </div> </div> </div> </div></div>').appendTo('body');
    // ========================================================================== ABA DOBRO OU NADA=============================================================================
    $('<div id="Aba_Dobro" class="window-wrapper active ui-draggable zoom" style="top: 0px; -webkit-transform-origin: 0px 0px; -webkit-transform: matrix(0.8, 0, 0, 0.8, 0, 0);display:none;">' +
        '<div class="window-title">' +
        '<a class="ui-ib fleft info"" title="Avaliar"></a>' +
        '<span class="ui-ib fleft title-separator"></span>' +
        '<a class="ui-ib fleft refresh"" title="Atualizar"></a>' +
        '<div class="title">' +
        '<div class="arrow left disabled"></div>' +
        '<span class="txt-title">💎DAT version 8.0.1💎</span>' +
        '<div class="arrow right disabled"></div>' +
        '</div>'
        +
        '<a class="ui-ib fright close" href=""#" id="Close_Aba_Dobro" class="close" onmouseup="' +
        '$(this).closest(\'.ui-draggable\').removeClass(\'no-drag\');" onmousedown="' +
        '$(this).closest(\'.ui-draggable\').addClass(\'no-drag\');" title="Fechar"></a>'
        +
        '<span class="ui-ib fright title-separator"></span>' +
        '<a class="ui-ib fright help""></a></div>'
        +
        '<div id="messageboxScript" class="window-content">' +
        '<ul class="window-tabs narrow" style="display: block;">'
        +
        '<li class="Aba_Açoes "><a href="#"><div style="background-position: -120px -360px;"></div>Ações</a></li>' +
        '<li class="Aba_Construcoes "><a href="#"><div></div>Construir</a></li>' +
        '<li class="Aba_Recrutamentos"><a href="#"><div></div>Recrutar</a></li>' +
        '<li class="Aba_Eventos"><a href="#"><div></div>Eventos</a></li>' +
        ////'<li class="Aba_Especializações"><a href="#"><div></div>Especializações</a></li>' +
        '<li class="Aba_Dobro active"><a href="#"><div></div>Dobro</a></li>' +
        //'<li class="Aba_Pesquisa"><a href="#"><div></div>Pesquisa</a></li>' +
        '<li class="Aba_Extras"><a href="#"><div></div>Extras</a></li>' +
        '<li class="Aba_Suporte"><a href="#"><div></div>Suporte</a></li>'
        +
        '</ul>'
        +
        '<span class="window-decor-left"></span><span class="window-decor-right"></span>' +
        '<div class="window-size window-wide town-hall-main clear"">' +
        '<div class="content settings-empire"><div style="width:600px;margin: auto;">'
        +
        '<div class="centered-block" style=""> <div style="width:600px;margin: auto;">' +
        '<div class="gambling-content">' +
        '<div id="errMsg"></div>' +
        '<div class="gambling-holder mauto">' +
        '<div class="gambling-title tcenter">' +
        'Dobro <span>ou</span> nada <span>by</span> Rutiere0105 </div>' +
        '<div class="gmbl-btn w100">' +
        '<div class="gmbl-girl"></div>' +
        '<div class="gmbl-cards-holder">' +
        '<div class="gmbl-cards-text mauto" id="gmblText">' +
        '<p class="tleft io-animm-fix" style="">Compre a Planilha para Continuar Acertando o Dobro😁!' +
        '</div>' +
        '<div class="gmbl-color-btns tcenter w100">' +
        '<div class="visual-loading">' +
        '<div style="height:20px;display:block;"><button class="button bright-red vam" type="button" id="btnDobVerm" value="Carregar">VERMELHO</button>' +
        '&nbsp;&nbsp;&nbsp;ou&nbsp;&nbsp;&nbsp;' +
        '<button class="button  black vam" type="button" id="btnDobPreto" value="Carregar">PRETO</button>' +
        '<h3 class="title">Advinhe a Primeira Carta e Depois Clique para Dobrar sem Perder Nada</h3>' +
        '<h3class="title">Para Duvidas +55 88993067590</h3'
        +
        '</div></div>'
        +
        '</div> </div> </div> '
        +
        '<div class="window-footer-content"> </div> </div> </div> </div></div>').appendTo('body');
    // ========================================================================== ABA PESQUISA AVANÇADA=============================================================================
    /* $('<div id="Aba_Pesquisa" class="window-wrapper active ui-draggable zoom" style="top: 0px; -webkit-transform-origin: 0px 0px; -webkit-transform: matrix(0.8, 0, 0, 0.8, 0, 0);display:none;">' +
         '<div class="window-title">' +
         '<a class="ui-ib fleft info"" title="Avaliar"></a>' +
         '<span class="ui-ib fleft title-separator"></span>' +
         '<a class="ui-ib fleft refresh"" title="Atualizar"></a>' +
         '<div class="title">' +
         '<div class="arrow left disabled"></div>' +
         '<span class="txt-title">💎DAT version 8.0.1💎</span>' +
         '<div class="arrow right disabled"></div>' +
         '</div>'
         +
         '<a class="ui-ib fright close" href=""#" id="Close_Aba_Pesquisa" class="close" onmouseup="' +
         '$(this).closest(\'.ui-draggable\').removeClass(\'no-drag\');" onmousedown="' +
         '$(this).closest(\'.ui-draggable\').addClass(\'no-drag\');" title="Fechar"></a>'
         +
         '<span class="ui-ib fright title-separator"></span>' +
         '<a class="ui-ib fright help""></a></div>'
         +
         '<div id="messageboxScript" class="window-content">' +
         '<ul class="window-tabs narrow" style="display: block;">'
         +
         '<li class="Aba_Açoes "><a href="#"><div style="background-position: -120px -360px;"></div>Ações</a></li>' +
         '<li class="Aba_Construcoes"><a href="#"><div></div>Construir</a></li>' +
         '<li class="Aba_Recrutamentos"><a href="#"><div></div>Recrutar</a></li>' +
         '<li class="Aba_Eventos"><a href="#"><div></div>Eventos</a></li>' +
         ////'<li class="Aba_Especializações"><a href="#"><div></div>Especializações</a></li>' +
         '<li class="Aba_Dobro"><a href="#"><div></div>Dobro</a></li>' +
         '<li class="Aba_Pesquisa active"><a href="#"><div></div>Pesquisa</a></li>' +
         '<li class="Aba_Extras"><a href="#"><div></div>Extras</a></li>'+
        '<li class="Aba_Suporte"><a href="#"><div></div>Suporte</a></li>'
         +
         '</ul>'
         +
         '<span class="window-decor-left"></span><span class="window-decor-right"></span>' +
         '<div class="window-size window-wide town-hall-main clear"">'+
         '<div class="content settings-empire"><div style="width:600px;margin: auto;">'
         +
         '<div class="centered-block" style=""> <div style="width:600px;margin: auto;">'
        + '<button class="button blue" type="button" id="btnExport" value="Guardar" >Exportar🔒</button>'
        + '<hr class="divider">'+
        '<button class="button " type="button" id="bntCarregarRE" value="Carregar">RE🔒</button>'+
        '<button class="button " type="button" id="bntCarregarEC" value="Carregar">EC🔒</button>'+
        '<button class="button " type="button" id="bntCarregarPM" value="Carregar">PM🔒</button>'+
        '<button class="button " type="button" id="bntCarregarCM" value="Carregar">CM🔒</button>'+
        '<button class="button " type="button" id="bntCarregarCO" value="Carregar">CO🔒</button>'+
        '<div></div><hr class="divider"><div style="width:500px;margin: auto;"></div></div> </div> </div><table id="resultadosMilitares" class="data-grid middle"> <tr> <th>Aliança</th> <th>Jogador</th> <th>X</th> <th>Y</th> <th>Ir</th> </tr> </table>'
         +
         '</div> '
         +
         '<div class="window-footer">  2010 - 2024 ©rutiere_sena/creditos jmota<div class="window-footer-top"></div>' +
         '<div class="window-footer-content"></div> </div> </div>  </div></div>').appendTo('body');
*/
    // ========================================================================== ABA Extras ========================================================================
    $('<div id="Aba_Extras" class="window-wrapper active ui-draggable zoom" style="top: 0px; -webkit-transform-origin: 0px 0px; -webkit-transform: matrix(0.8, 0, 0, 0.8, 0, 0);display:none;">' +
        '<div class="window-title">' +
        '<a class="ui-ib fleft info"" title="Avaliar"></a>' +
        '<span class="ui-ib fleft title-separator"></span>' +
        '<a class="ui-ib fleft refresh"" title="Atualizar"></a>' +
        '<div class="title">' +
        '<div class="arrow left disabled"></div>' +
        '<span class="txt-title">💎DAT version 8.0.1💎</span>' +
        '<div class="arrow right disabled"></div>' +
        '</div>'
        +
        '<a class="ui-ib fright close" href=""#" id="Close_Aba_Extras" class="close" onmouseup="' +
        '$(this).closest(\'.ui-draggable\').removeClass(\'no-drag\');" onmousedown="' +
        '$(this).closest(\'.ui-draggable\').addClass(\'no-drag\');" title="Fechar"></a>'
        +
        '<span class="ui-ib fright title-separator"></span>' +
        '<a class="ui-ib fright help""></a></div>'
        +
        '<div id="messageboxScript" class="window-content">' +
        '<ul class="window-tabs narrow" style="display: block;">'
        +
        '<li class="Aba_Açoes "><a href="#"><div style="background-position: -120px -360px;"></div>Ações</a></li>' +
        '<li class="Aba_Construcoes "><a href="#"><div></div>Construir</a></li>' +
        '<li class="Aba_Recrutamentos"><a href="#"><div></div>Recrutar</a></li>' +
        '<li class="Aba_Eventos"><a href="#"><div></div>Eventos</a></li>' +
        ////'<li class="Aba_Especializações"><a href="#"><div></div>Especializações</a></li>' +
        '<li class="Aba_Dobro"><a href="#"><div></div>Dobro</a></li>' +
        //'<li class="Aba_Pesquisa"><a href="#"><div></div>Pesquisa</a></li>' +
        '<li class="Aba_Extras active"><a href="#"><div></div>Extras</a></li>' +
        '<li class="Aba_Suporte"><a href="#"><div></div>Suporte</a></li>'
        +
        '</ul>'
        +
        '<span class="window-decor-left"></span><span class="window-decor-right"></span>' +
        '<div class="window-size window-wide town-hall-main clear"">' +
        '<div class="content settings-empire"><div style="width:600px;margin: auto;">'
        +
        '<div class="centered-block" style=""> <div style="width:600px;margin: auto;">'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <div></div>50 Treinos de Governadores' +
        '<button id="bntTreinoGov" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopTreinoGov" style="float: right;display:none;"class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px; display:block;  "> <div></div>50 Treinos de Generais' +
        '<button id="bntTreinoGenerais" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopTreinoGenerais" style="float: right;display:none;"class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div></div> Atacar Caverna da Conquista' +
        '<button id="bntAtkCaverna" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopAtkCaverna" style="float: right;display:none;"class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div></div> Atacar Caverna Instantaneno' +
        '<button id="bntAtkCavernainst" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="StopAtkCavernainst" style="float: right;display:none;"class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div></div> Mover Exercito Entre Provincias' +
        '<button id="bntmovertrop" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="Stopmovertrop" style="float: right;display:none;"class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div></div> Caça Ovos 2024' +
        '<button id="bntacharovos" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="Stopacharovos" style="float: right;display:none;"class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div></div> Caçar Bolas 2024' +
        '<button id="bntacharbolas" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="Stopacharbolas" style="float: right;display:none;"class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">'
        +
        '<div style="height:20px;display:block;"> <div></div> Ler Cidades Independentes e Exportar' +
        '<button id="bntextcity" style="float: right;" class="buttonPlayScript Vermelho">OFF</button>' +
        '<button id="Stopextcity" style="float: right;display:none;"class="buttonPlayScript Verde">ON</button> </div>'
        +
        '<hr class="divider">' +
        '<div style="display: flex; justify-content: center; align-items: center;">' +
        '<div id="btnMovAllContainer" style="margin-right: 10px;">' +
        '<button class="button" type="button" id="btnMovAll" value="MovAll">Mover Recursos</button>' +
        '</div>' +
        '<div id="btnLinkContainer">' +
        '<a href="https://datscript.lojavirtualnuvem.com.br/br/" target="_blank" style="text-decoration: none;">' +
        '<button class="button" type="button" value="MovAll" style="background-color: green; color: white;">WEBSITE</button>' +
        '</a>' +
        '</div>'
        +
        '</div> </div></div>'
        +
        '</div> </div> '
        +
        '<div class="window-footer">  2010 - 2024 ©rutiere_sena/creditos jmota<div class="window-footer-top"></div>' +
        '<div class="window-footer-content"> </div> </div> </div> </div></div>').appendTo('body');
    // ========================================================================== ABA Suporte ========================================================================
    $('<div id="Aba_Suporte" class="window-wrapper active ui-draggable zoom" style="top: 0px; -webkit-transform-origin: 0px 0px; -webkit-transform: matrix(0.8, 0, 0, 0.8, 0, 0);display:none;">' +
        '<div class="window-title">' +
        '<a class="ui-ib fleft info"" title="Avaliar"></a>' +
        '<span class="ui-ib fleft title-separator"></span>' +
        '<a class="ui-ib fleft refresh"" title="Atualizar"></a>' +
        '<div class="title">' +
        '<div class="arrow left disabled"></div>' +
        '<span class="txt-title">💎DAT version 8.0.1💎</span>' +
        '<div class="arrow right disabled"></div>' +
        '</div>'
        +
        '<a class="ui-ib fright close" href=""#" id="Close_Aba_Suporte" class="close" onmouseup="' +
        '$(this).closest(\'.ui-draggable\').removeClass(\'no-drag\');" onmousedown="' +
        '$(this).closest(\'.ui-draggable\').addClass(\'no-drag\');" title="Fechar"></a>'
        +
        '<span class="ui-ib fright title-separator"></span>' +
        '<a class="ui-ib fright help""></a></div>'
        +
        '<div id="messageboxScript" class="window-content">' +
        '<ul class="window-tabs narrow" style="display: block;">'
        +
        '<li class="Aba_Açoes "><a href="#"><div style="background-position: -120px -360px;"></div>Ações</a></li>' +
        '<li class="Aba_Construcoes "><a href="#"><div></div>Construir</a></li>' +
        '<li class="Aba_Recrutamentos"><a href="#"><div></div>Recrutar</a></li>' +
        '<li class="Aba_Eventos"><a href="#"><div></div>Eventos</a></li>' +
        ////'<li class="Aba_Especializações"><a href="#"><div></div>Especializações</a></li>' +
        '<li class="Aba_Dobro"><a href="#"><div></div>Dobro</a></li>' +
        //'<li class="Aba_Pesquisa"><a href="#"><div></div>Pesquisa</a></li>' +
        '<li class="Aba_Extras"><a href="#"><div></div>Extras</a></li>' +
        '<li class="Aba_Suporte active"><a href="#"><div></div>Suporte</a></li>'
        +
        '</ul>'
        +
        '<span class="window-decor-left"></span><span class="window-decor-right"></span>' +
        '<div class="window-size window-wide town-hall-main clear"">' +
        '<div class="content settings-empire"><div style="width:600px;margin: auto;">'
        +
        '<div class="centered-block" style=""> <div style="width:600px;margin: auto;">'
        +
        '<div id="btnLinkContainer" style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">' +
        '<a href="URL_DO_SEU_LINK" target="_blank" style="text-decoration: none;">' +
        '<button class="button" type="button" value="MovAll" style="background-color: green; color: white; width: 150px; height: 40px;">SUPORTE</button>' +
        '</a>' +
        '<a href="URL_DO_SEU_LINK" target="_blank" style="text-decoration: none;">' +
        '<button class="button" type="button" value="MovAll" style="background-color: green; color: white; width: 150px; height: 40px;">DRIVE</button>' +
        '</a>' +
        '<a href="URL_DO_SEU_LINK" target="_blank" style="text-decoration: none;">' +
        '<button class="button" type="button" value="MovAll" style="background-color: green; color: white; width: 150px; height: 40px;">EM BREVE</button>' +
        '</a>' +
        '<a href="URL_DO_SEU_LINK" target="_blank" style="text-decoration: none;">' +
        '<button class="button" type="button" value="MovAll" style="background-color: green; color: white; width: 150px; height: 40px;">EM BREVE</button>' +
        '</a>' +






        '</div></div>'

        +
        '</div> </div>  </div> '
        +
        '<div class="window-footer">  2010 - 2024 ©rutiere_sena/creditos jmota<div class="window-footer-top"></div>' +
        '<div class="window-footer-content"> </div> </div> </div> </div></div>').appendTo('body');
    // ========================================================================== ABA OPÇÕES CSS ========================================================================
    $("#Aba_Açoes").draggable({
        cancel: ".no-drag"
    });
    $("#Open_Aba_Açoes").click(function (a) {
        if (isActive) {
            isActive = false;
            a.preventDefault();
            $("#Open_Aba_Açoes").addClass("" + img_inactive + "").removeClass("" + img_active + "");
            $("#Aba_Açoes").css("display", "none");
            $("#Aba_Construcoes").css({
                "display": "none"
            });
            $("#Aba_Recrutamentos").css({
                "display": "none"
            });
            $("#Aba_Dobro").css({
                "display": "none"
            });
            $("#Aba_Pesquisa").css({
                "display": "none"
            });
            $("#Aba_Eventos").css({
                "display": "none"
            });
            $("#Aba_Especializações").css({
                "display": "none"
            });
            $("#Aba_Extras").css({
                "display": "none"
            });
            $("#Aba_Suporte").css({
                "display": "none"
            });
            $("#Aba_Açoes").addClass("active");
        } else {
            isActive = true;
            a.preventDefault();
            var b = 618;
            var c = $(document).width();
            var d = ((c / 2) - (b / 2));
            $("#Open_Aba_Açoes").addClass("" + img_active + "").removeClass("" + img_inactive + "");
            $("#Aba_Construcoes").css({
                "display": "none"
            });
            $("#Aba_Recrutamentos").css({
                "display": "none"
            });
            $("#Aba_Eventos").css({
                "display": "none"
            });
            $("#Aba_Especializações").css({
                "display": "none"
            });
            $("#Aba_Extras").css({
                "display": "none"
            });
            $("#Aba_Dobro").css({
                "display": "none"
            });
            $("#Aba_Pesquisa").css({
                "display": "none"
            });
            $("#Aba_Suporte").css({
                "display": "none"
            });
            $("#Aba_Açoes").css({
                "display": "block",
                "left": d
            });
        }
    });
    $("#Close_Aba_Açoes").click(function (a) {
        a.preventDefault();
        $("#Open_Aba_Açoes").addClass("" + img_inactive + "").removeClass("" + img_active + "");
        $("#Aba_Açoes").css({
            "display": "none"
        });
    });
    $('.Aba_Açoes a').click(function (a) {
        a.preventDefault();
        var b = 618;
        var c = $(document).width();
        var d = ((c / 2) - (b / 2));
        $("#Open_Aba_Açoes").addClass("" + img_active + "").removeClass("" + img_inactive + "");
        $("#Aba_Açoes").css({
            "display": "block",
            "left": d
        });
        $("#Aba_Construcoes").css({
            "display": "none"
        });
        $("#Aba_Construcoes").addClass("active");
        $("#Aba_Recrutamentos").css({
            "display": "none"
        });
        $("#Aba_Recrutamentos").addClass("active");
        $("#Aba_Eventos").css({
            "display": "none"
        });
        $("#Aba_Eventos").addClass("active");
        $("#Aba_Especializações").css({
            "display": "none"
        });
        $("#Aba_Especializações").addClass("active");
        $("#Aba_Dobro").css({
            "display": "none"
        });
        $("#Aba_Dobro").addClass("active");
        $("#Aba_Pesquisa").css({
            "display": "none"
        });
        $("#Aba_Extras").addClass("active");
        $("#Aba_Suporte").css({
            "display": "none"
        });
        $("#Aba_Pesquisa").addClass("active");
        $("#Aba_Extras").css({
            "display": "none"
        });
        $("#Aba_Extras").addClass("active");
        $("#Aba_Açoes").addClass("active");
    });
    // ========================================================================== ABA Construcoes CSS ====================================================================
    $("#Aba_Construcoes").draggable({
        cancel: ".no-drag"
    });
    $("#cAba_Construcoes").click(function (a) {
        if (isActive) {
            isActive = false;
            a.preventDefault();
            $("#Aba_Construcoes").css("display", "none");
            $("#Aba_Construcoes").addClass("active");
        } else {
            isActive = true;
            a.preventDefault();
            var b = 618;
            var c = $(document).width();
            var d = ((c / 2) - (b / 2));
            $("#Aba_Construcoes").css({
                "display": "block",
                "left": d
            });
            $("#Aba_Construcoes").addClass("active");
        }
    });
    $("#Close_Aba_Construcoes").click(function (a) {
        a.preventDefault();
        $("#Open_Aba_Açoes").addClass("" + img_inactive + "").removeClass("" + img_active + "");
        $("#Aba_Construcoes").css({
            "display": "none"
        });
    });
    $('.Aba_Construcoes a').click(function (a) {
        a.preventDefault();
        var b = 618;
        var c = $(document).width();
        var d = ((c / 2) - (b / 2));
        $("#Open_Aba_Açoes").addClass("" + img_active + "").removeClass("" + img_inactive + "");
        $("#Aba_Açoes").css({
            "display": "none"
        });
        $("#Aba_Recrutamentos").css({
            "display": "none"
        });
        $("#Aba_Eventos").css({
            "display": "none"
        });
        $("#Aba_Especializações").css({
            "display": "none"
        });
        $("#Aba_Extras").css({
            "display": "none"
        });
        $("#Aba_Dobro").css({
            "display": "none"
        });
        $("#Aba_Pesquisa").css({
            "display": "none"
        });
        $("#Aba_Suporte").css({
            "display": "none"
        });
        $("#Aba_Construcoes").css({
            "display": "block",
            "left": d
        });
        $("#Aba_Construcoes").addClass("active");
        $("#AçoesScript").addClass("active");
    });
    // ========================================================================== ABA recrutamentos CSS ====================================================================
    $("#Aba_Recrutamentos").draggable({
        cancel: ".no-drag"
    });
    $("#cAba_Recrutamentos").click(function (a) {
        if (isActive) {
            isActive = false;
            a.preventDefault();
            $("#Aba_Recrutamentos").css("display", "none");
            $("#Aba_Recrutamentos").addClass("active");
        } else {
            isActive = true;
            a.preventDefault();
            var b = 618;
            var c = $(document).width();
            var d = ((c / 2) - (b / 2));
            $("#Aba_Recrutamentos").css({
                "display": "block",
                "left": d
            });
            $("#Aba_Recrutamentos").addClass("active");
        }
    });
    $("#Close_Aba_Recrutamentos").click(function (a) {
        a.preventDefault();
        $("#Open_Aba_Açoes").addClass("" + img_inactive + "").removeClass("" + img_active + "");
        $("#Aba_Recrutamentos").css({
            "display": "none"
        });
    });
    $('.Aba_Recrutamentos a').click(function (a) {
        a.preventDefault();
        var b = 618;
        var c = $(document).width();
        var d = ((c / 2) - (b / 2));
        $("#Open_Aba_Açoes").addClass("" + img_active + "").removeClass("" + img_inactive + "");
        $("#Aba_Açoes").css({
            "display": "none"
        });
        $("#Aba_Construcoes").css({
            "display": "none"
        });
        $("#Aba_Eventos").css({
            "display": "none"
        });
        $("#Aba_Especializações").css({
            "display": "none"
        });
        $("#Aba_Extras").css({
            "display": "none"
        });
        $("#Aba_Dobro").css({
            "display": "none"
        });
        $("#Aba_Pesquisa").css({
            "display": "none"
        });
        $("#Aba_Suporte").css({
            "display": "none"
        });
        $("#Aba_Recrutamentos").css({
            "display": "block",
            "left": d
        });
        $("#Aba_Recrutamentos").addClass("active");
        $("#AçoesScript").addClass("active");
    });
    // ========================================================================== ABA Eventos CSS ========================================================================
    $("#Aba_Eventos").draggable({
        cancel: ".no-drag"
    });
    $("#cAba_Eventos").click(function (a) {
        if (isActive) {
            isActive = false;
            a.preventDefault();
            $("#Aba_Eventos").css("display", "none");
            $("#Aba_Eventos").addClass("active");
        } else {
            isActive = true;
            a.preventDefault();
            var b = 618;
            var c = $(document).width();
            var d = ((c / 2) - (b / 2));
            $("#Aba_Eventos").css({
                "display": "block",
                "left": d
            });
            $("#Aba_Eventos").addClass("active");
        }
    });
    $("#Close_Aba_Eventos").click(function (a) {
        a.preventDefault();
        $("#Open_Aba_Açoes").addClass("" + img_inactive + "").removeClass("" + img_active + "");
        $("#Aba_Eventos").css({
            "display": "none"
        });
    });
    $('.Aba_Eventos a').click(function (a) {
        a.preventDefault();
        var b = 618;
        var c = $(document).width();
        var d = ((c / 2) - (b / 2));
        $("#Open_Aba_Açoes").addClass("" + img_active + "").removeClass("" + img_inactive + "");
        $("#Aba_Açoes").css({
            "display": "none"
        });
        $("#Aba_Construcoes").css({
            "display": "none"
        });
        $("#Aba_Recrutamentos").css({
            "display": "none"
        });
        $("#Aba_Extras").css({
            "display": "none"
        });
        $("#Aba_Especializações").css({
            "display": "none"
        });
        $("#Aba_Dobro").css({
            "display": "none"
        });
        $("#Aba_Pesquisa").css({
            "display": "none"
        });
        $("#Aba_Suporte").css({
            "display": "none"
        });
        $("#Aba_Eventos").css({
            "display": "block",
            "left": d
        });
        $("#Aba_Eventos").addClass("active");
        $("#AçoesScript").addClass("active");
    });
    // ======================================================================= ABA Especializaçoes CSS ========================================================================
    $("#Aba_Especializações").draggable({
        cancel: ".no-drag"
    });
    $("#cAba_Especializações").click(function (a) {
        if (isActive) {
            isActive = false;
            a.preventDefault();
            $("#Aba_Especializações").css("display", "none");
            $("#Aba_Especializações").addClass("active");
        } else {
            isActive = true;
            a.preventDefault();
            var b = 618;
            var c = $(document).width();
            var d = ((c / 2) - (b / 2));
            $("#Aba_Especializações").css({
                "display": "block",
                "left": d
            });
            $("#Aba_Especializações").addClass("active");
        }
    });
    $("#Close_Aba_Especializações").click(function (a) {
        a.preventDefault();
        $("#Open_Aba_Açoes").addClass("" + img_inactive + "").removeClass("" + img_active + "");
        $("#Aba_Especializações").css({
            "display": "none"
        });
    });
    $('.Aba_Especializações a').click(function (a) {
        a.preventDefault();
        var b = 618;
        var c = $(document).width();
        var d = ((c / 2) - (b / 2));
        $("#Open_Aba_Açoes").addClass("" + img_active + "").removeClass("" + img_inactive + "");
        $("#Aba_Açoes").css({
            "display": "none"
        });
        $("#Aba_Construcoes").css({
            "display": "none"
        });
        $("#Aba_Eventos").css({
            "display": "none"
        });
        $("#Aba_Recrutamentos").css({
            "display": "none"
        });
        $("#Aba_Dobro").css({
            "display": "none"
        });
        $("#Aba_Pesquisa").css({
            "display": "none"
        });
        $("#Aba_Extras").css({
            "display": "none"
        });
        $("#Aba_Suporte").css({
            "display": "none"
        });
        $("#Aba_Especializações").css({
            "display": "block",
            "left": d
        });
        $("#Aba_Especializaões").addClass("active");
        $("#AçoesScript").addClass("active");
    });
    // ======================================================================= ABA Dobro CSS ========================================================================
    $("#Aba_Dobro").draggable({
        cancel: ".no-drag"
    });
    $("#cAba_Dobro").click(function (a) {
        if (isActive) {
            isActive = false;
            a.preventDefault();
            $("#Aba_Dobro").css("display", "none");
            $("#Aba_Dobro").addClass("active");
        } else {
            isActive = true;
            a.preventDefault();
            var b = 618;
            var c = $(document).width();
            var d = ((c / 2) - (b / 2));
            $("#Aba_Dobro").css({
                "display": "block",
                "left": d
            });
            $("#Aba_Dobro").addClass("active");
        }
    });
    $("#Close_Aba_Dobro").click(function (a) {
        a.preventDefault();
        $("#Open_Aba_Açoes").addClass("" + img_inactive + "").removeClass("" + img_active + "");
        $("#Aba_Dobro").css({
            "display": "none"
        });
    });
    $('.Aba_Dobro a').click(function (a) {
        a.preventDefault();
        var b = 618;
        var c = $(document).width();
        var d = ((c / 2) - (b / 2));
        $("#Open_Aba_Açoes").addClass("" + img_active + "").removeClass("" + img_inactive + "");
        $("#Aba_Açoes").css({
            "display": "none"
        });
        $("#Aba_Construcoes").css({
            "display": "none"
        });
        $("#Aba_Eventos").css({
            "display": "none"
        });
        $("#Aba_Especializações").css({
            "display": "none"
        });
        $("#Aba_Recrutamentos").css({
            "display": "none"
        });
        $("#Aba_Pesquisa").css({
            "display": "none"
        });
        $("#Aba_Extras").css({
            "display": "none"
        });
        $("#Aba_Suporte").css({
            "display": "none"
        });
        $("#Aba_Dobro").css({
            "display": "block",
            "left": d
        });
        $("#Aba_Dobro").addClass("active");
        $("#AçoesScript").addClass("active");
    });
    // ======================================================================= ABA Pesquisa CSS ========================================================================
    $("#Aba_Pesquisa").draggable({
        cancel: ".no-drag"
    });
    $("#cAba_Pesquisa").click(function (a) {
        if (isActive) {
            isActive = false;
            a.preventDefault();
            $("#Aba_Pesquisa").css("display", "none");
            $("#Aba_Pesquisa").addClass("active");
        } else {
            isActive = true;
            a.preventDefault();
            var b = 618;
            var c = $(document).width();
            var d = ((c / 2) - (b / 2));
            $("#Aba_Pesquisa").css({
                "display": "block",
                "left": d
            });
            $("#Aba_Pesquisa").addClass("active");
        }
    });
    $("#Close_Aba_Pesquisa").click(function (a) {
        a.preventDefault();
        $("#Open_Aba_Açoes").addClass("" + img_inactive + "").removeClass("" + img_active + "");
        $("#Aba_Pesquisa").css({
            "display": "none"
        });
    });
    $('.Aba_Pesquisa a').click(function (a) {
        a.preventDefault();
        var b = 618;
        var c = $(document).width();
        var d = ((c / 2) - (b / 2));
        $("#Open_Aba_Açoes").addClass("" + img_active + "").removeClass("" + img_inactive + "");
        $("#Aba_Açoes").css({
            "display": "none"
        });
        $("#Aba_Construcoes").css({
            "display": "none"
        });
        $("#Aba_Eventos").css({
            "display": "none"
        });
        $("#Aba_Especializações").css({
            "display": "none"
        });
        $("#Aba_Recrutamentos").css({
            "display": "none"
        });
        $("#Aba_Dobro").css({
            "display": "none"
        });
        $("#Aba_Extras").css({
            "display": "none"
        });
        $("#Aba_Suporte").css({
            "display": "none"
        });
        $("#Aba_Pesquisa").css({
            "display": "block",
            "left": d
        });
        $("#Aba_Pesquisa").addClass("active");
        $("#AçoesScript").addClass("active");
    });
    // ======================================================================= ABA Extras CSS ========================================================================
    $("#Aba_Extras").draggable({
        cancel: ".no-drag"
    });
    $("#cAba_Extras").click(function (a) {
        if (isActive) {
            isActive = false;
            a.preventDefault();
            $("#Aba_Extras").css("display", "none");
            $("#Aba_Extras").addClass("active");
        } else {
            isActive = true;
            a.preventDefault();
            var b = 618;
            var c = $(document).width();
            var d = ((c / 2) - (b / 2));
            $("#Aba_Extras").css({
                "display": "block",
                "left": d
            });
            $("#Aba_Extras").addClass("active");
        }
    });
    $("#Close_Aba_Extras").click(function (a) {
        a.preventDefault();
        $("#Open_Aba_Açoes").addClass("" + img_inactive + "").removeClass("" + img_active + "");
        $("#Aba_Extras").css({
            "display": "none"
        });
    });
    $('.Aba_Extras a').click(function (a) {
        a.preventDefault();
        var b = 618;
        var c = $(document).width();
        var d = ((c / 2) - (b / 2));
        $("#Open_Aba_Açoes").addClass("" + img_active + "").removeClass("" + img_inactive + "");
        $("#Aba_Açoes").css({
            "display": "none"
        });
        $("#Aba_Construcoes").css({
            "display": "none"
        });
        $("#Aba_Eventos").css({
            "display": "none"
        });
        $("#Aba_Especializações").css({
            "display": "none"
        });
        $("#Aba_Recrutamentos").css({
            "display": "none"
        });
        $("#Aba_Dobro").css({
            "display": "none"
        });
        $("#Aba_Pesquisa").css({
            "display": "none"
        });
        $("#Aba_Suporte").css({
            "display": "none"
        });
        $("#Aba_Extras").css({
            "display": "block",
            "left": d
        });
        $("#Aba_Extras").addClass("active");
        $("#AçoesScript").addClass("active");
    });
    // ======================================================================= ABA Suporte CSS ========================================================================
    $("#Aba_Suporte").draggable({
        cancel: ".no-drag"
    });
    $("#cAba_Suporte").click(function (a) {
        if (isActive) {
            isActive = false;
            a.preventDefault();
            $("#Aba_Suporte").css("display", "none");
            $("#Aba_Suporte").addClass("active");
        } else {
            isActive = true;
            a.preventDefault();
            var b = 618;
            var c = $(document).width();
            var d = ((c / 2) - (b / 2));
            $("#Aba_Suporte").css({
                "display": "block",
                "left": d
            });
            $("#Aba_Suporte").addClass("active");
        }
    });
    $("#Close_Aba_Suporte").click(function (a) {
        a.preventDefault();
        $("#Open_Aba_Açoes").addClass("" + img_inactive + "").removeClass("" + img_active + "");
        $("#Aba_Suporte").css({
            "display": "none"
        });
    });
    $('.Aba_Suporte a').click(function (a) {
        a.preventDefault();
        var b = 618;
        var c = $(document).width();
        var d = ((c / 2) - (b / 2));
        $("#Open_Aba_Açoes").addClass("" + img_active + "").removeClass("" + img_inactive + "");
        $("#Aba_Açoes").css({
            "display": "none"
        });
        $("#Aba_Construcoes").css({
            "display": "none"
        });
        $("#Aba_Eventos").css({
            "display": "none"
        });
        $("#Aba_Especializações").css({
            "display": "none"
        });
        $("#Aba_Recrutamentos").css({
            "display": "none"
        });
        $("#Aba_Dobro").css({
            "display": "none"
        });
        $("#Aba_Pesquisa").css({
            "display": "none"
        });
        $("#Aba_Extras").css({
            "display": "none"
        });
        $("#Aba_Suporte").css({
            "display": "block",
            "left": d
        });
        $("#Aba_Suporte").addClass("active");
        $("#AçoesScript").addClass("active");
    });
    // ========================================================================== ABA OPÇÕES CONDIÇÕES ========================================================================
    $("#Btn_Salvar_Options").click(function () {
        try {
            GM_setValue(playerName + "ScriptAtaque", String($('#chkAtaque').prop('checked')));
            GM_setValue(playerName + "ScriptAtaqueAli", String($('#chkAtaqueAli').prop('checked')));
            GM_setValue(playerName + "ScriptSpy", String($('#chkSpy').prop('checked')));
            GM_setValue(playerName + "ScriptMsg", String($('#chkMsg').prop('checked')));
            GM_setValue(playerName + "Scriptcaptcha", String($('#chkcaptcha').prop('checked')));
            GM_setValue(playerName + "ScriptRefresh", String($('#chkRefresh').prop('checked')));
            GM_setValue(playerName + "ScriptMoverRec", String($('#chkMoverRec').prop('checked')));
            GM_setValue(playerName + "ScriptEmpregarPop", String($('#chkEmpregarPop').prop('checked')));
            GM_setValue(playerName + "ScriptReduzir10min", String($('#chkReduzir10min').prop('checked')));
            GM_setValue(playerName + "ScriptRecVassalo", String($('#chkRecVassalo').prop('checked')));
            GM_setValue(playerName + "ScriptIncognito", String($('#chkIncognito').prop('checked')));
            GM_setValue(playerName + "ScriptMoverMad", String($('#chkMoverMad').prop('checked')));
            GM_setValue(playerName + "ScriptMoverFer", String($('#chkMoverFer').prop('checked')));
            GM_setValue(playerName + "ScriptMoverPed", String($('#chkMoverPed').prop('checked')));
            GM_setValue(playerName + "ScriptAtaqueIgnore10", String($('#chkAtaqueIgnore10').prop('checked')));
            GM_setValue(playerName + "ScriptImposto", String($('#chkImposto').prop('checked')));
            GM_setValue(playerName + "ScriptAssistencia", String($('#chkAssistencia').prop('checked')));
            GM_setValue(playerName + "ScriptCinst", String($('#chkCinst').prop('checked')));
            $("#Open_Aba_Açoes").addClass("" + img_inactive + "").removeClass("" + img_active + "");
        } catch (err) {
            alert("Erro ao salvar configurações!");
        }
        f = GM_getValue(playerName + "ScriptStart", "false");
        g = GM_getValue(playerName + "ScriptAtaque", "true");
        h = GM_getValue(playerName + "ScriptAtaqueAli", "true");
        i = GM_getValue(playerName + "ScriptSpy", "true");
        j = GM_getValue(playerName + "ScriptMsg", "true");
        k = GM_getValue(playerName + "Scriptcaptcha", "true");
        a = GM_getValue(playerName + "ScriptRefresh", "true");
        v = GM_getValue(playerName + "ScriptMoverRec", "true");
        p = GM_getValue(playerName + "ScriptEmpregarPop", "true");
        r10 = GM_getValue(playerName + "ScriptReduzir10min", "true");
        rv = GM_getValue(playerName + "ScriptRecVassalo", "true");
        incognito = GM_getValue(playerName + "ScriptIncognito", "true");
        mad = GM_getValue(playerName + "ScriptMoverMad", "true");
        fer = GM_getValue(playerName + "ScriptMoverFer", "true");
        ped = GM_getValue(playerName + "ScriptMoverPed", "true");
        ignore10 = GM_getValue(playerName + "ScriptAtaqueIgnore10", "true");
        imposto = GM_getValue(playerName + "ScriptImposto", "true");
        assistencia = GM_getValue(playerName + "ScriptAssistencia", "true");
        cinst = GM_getValue(playerName + "ScriptCinst", "true");
        $("#Aba_Açoes").css("display", "none");
    });
    $("#chatAudio").trigger('load');
    $("#play").click(function () {
        $("#play").css("display", "none");
        $("#Pause").css("display", "inline-block");
        GM_setValue(playerName + "ScriptStart", "true");
        f = "true";
        e = setInterval(function () {
            console.log("Iniciando Funções");
            if (a == "true") {
                AutoRefresh();
            }
            setTimeout(function () {
                if (g == "true") {
                    if (ignore10 == "true") {
                        if ($(".attack-me .m-time.countdown.noHours.ui-refresh").length > 0) {
                            if ($('.attack-me .m-time.countdown.noHours.ui-refresh').text() < "10:00") {
                                $("#AtaqueAudioIgnore10").trigger('play');
                                xajax_viewMissions(container.open({
                                    saveName: 'missions',
                                    title: 'As minhas missões'
                                }))
                            }
                        }
                    } else
                        if (ignore10 == "false") {
                            if ($(".attack-me").length > 0) {
                                $("#AtaqueAudio").trigger('play');
                                xajax_viewMissions(container.open({
                                    saveName: 'missions',
                                    title: 'As minhas missões'
                                }))
                            }
                        }
                }
                if (h == "true") {
                    if (ignore10 == "true") {
                        if ($(".attack-alliance .m-time.countdown.noHours.ui-refresh").length > 0) {
                            if ($('.attack-alliance .m-time.countdown.noHours.ui-refresh').text() < "10:00") {
                                $("#AtaqueAudioAli").trigger('play');
                                xajax_viewMissions(container.open({
                                    saveName: 'missions',
                                    title: 'As minhas missões'
                                }))
                            }
                        }
                    } else
                        if (ignore10 == "false") {
                            if ($(".attack-alliance").length > 0) {
                                $("#AtaqueAudioAli").trigger('play');
                                xajax_viewMissions(container.open({
                                    saveName: 'missions',
                                    title: 'As minhas missões'
                                }))
                            }
                        }
                }
                if (i == "true") {
                    if ($(".checkin-a-mail .letter-2").length > 0) {
                        $("#SpyAudio").trigger('play');
                    }
                }
                if (j == "true") {
                    if ($(".checkin-a-mail .letter-0").length > 0) {
                        $("#MessageAudio").trigger('play');
                    }
                }
                if (k == "true") {
                    console.log('Verificação Captcha ----> Ok');
                    if ($(".robot-text").length > 0) {
                        $("#AtaqueAudio").trigger('play');
                    }
                }
                if (v == "true") {
                    MoverRecursos();
                }
                if (mad == "true") {
                    MoverMadeira();
                }
                if (fer == "true") {
                    MoverFerro();
                }
                if (ped == "true") {
                    MoverPedra();
                }
                if (p == "true") {
                    EmpregarPopulacao();
                }
                if (r10 == "true") {
                    Reduzir10minutos();
                }
                if (rv == "true") {
                    RecolherVassalo();
                }
                if (incognito === "true") {
                    Incognito();
                }
                if (imposto === "true") {
                    ImpostoOpt();
                }
                if (assistencia === "true") {
                    Assistencia();
                }
                if (cinst === "true") {
                    ConstInstantanea();
                }
            }, 5000);
        }, tempo_reload);
    });
    // ========================================================================== ABA OPÇÕES - FUNÇÕES ==========================================================================
    function AutoRefresh() {
        console.log('Atualizar Página ----> Ok')
        setTimeout(function () {
            $('a.ui-small-icon.refresh')[0].click()
        }, 3000)
    }
    function MoverRecursos() {
        console.log('Mover Recursos ----> Ok')
        $('a.ui-icon.ui-fr.supplies.low-shake-animation')[0].click()
        setTimeout(function () {
            xajax_doEndTransportMission('missions', {
                missionId: 'all'
            })
            $('.window-wrapper.ui-draggable.active').hide()
        }, 3000)
    };
    function MoverMadeira() {
        console.log('Mover Madeira ----> Ok')
        $('a.ui-icon.ui-fr.wood.low-shake-animation')[0].click()
        setTimeout(function () {
            xajax_doEndTransportMission('missions', {
                missionId: 'all'
            })
            $('.window-wrapper.ui-draggable.active').hide()
        }, 3000);
    }
    function MoverFerro() {
        console.log('Mover Ferro ----> Ok')
        $('a.ui-icon.ui-fr.iron.low-shake-animation')[0].click()
        setTimeout(function () {
            xajax_doEndTransportMission('missions', {
                missionId: 'all'
            })
            $('.window-wrapper.ui-draggable.active').hide()
        }, 3000);
    }
    function MoverPedra() {
        console.log('Mover Pedra ----> Ok')
        $('a.ui-icon.ui-fr.stone.low-shake-animation')[0].click()
        setTimeout(function () {
            xajax_doEndTransportMission('missions', {
                missionId: 'all'
            })
            $('.window-wrapper.ui-draggable.active').hide()
        }, 3000)
    }
    function EmpregarPopulacao() {
        console.log('Empregar População ----> Ok')
        xajax_doHireWorkersAllProvinces('fast_hire', {
            'workers': {
                'optimal': true
            }
        })
    }
    function Reduzir10minutos() {
        console.log('Reduzir 10 minutos ----> Ok')
        xajax_doAllBuildingCutShort('allBuildings', {})
    }
    function RecolherVassalo() {
        console.log('Recolher Vassalos ----> Ok')
        xajax_doCollectVassalGold('vassal-screen', {
            provinceId: 11755,
            allVassal: true
        })
    }
    function Incognito() {
        console.log('Manter Incógnito ----> Ok')
        xajax_doSetIncognito('Setting', {})
    }
    function Assistencia() {
        console.log('Assistencia ----> Ok')
        xajax_doAllBuildingCutShort('allBuildings', {})
        xajax_doGiveAssistanceAll('developmentBuilding')
        xajax_doAskForAssistance('developmentBuilding', {
            'tab': 'economic',
            'science': 0,
            'developmentType': 'building'
        })
    }
    function ConstInstantanea() {
        console.log('Construçao Instantânea ----> Ok')
        xajax_doFastFinishAllDevelopments('allBuildings', {
            'type': 'free'
        })
    }
    function ImpostoOpt() {
        console.log('Alterando o Imposto ---->')
        xajax_viewTaxList(container.open({
            saveName: 'province_tax_rate',
            title: 'Imposto de todos os dom%C3%ADnios'
        }))
        $('.window-wrapper.ui-draggable.active').hide()
        setTimeout(function () {
            $('#setHappyTax').click()
        }, 2000);
    }
    $("#Pause").click(function () {
        clearInterval(e);
        GM_setValue(playerName + "ScriptStart", "false");
        f = "false";
        $("#play").css("display", "inline-block");
        $("#Pause").css("display", "none");
        e = 0;
        $("#AtaqueAudio").trigger('pause');
        $("#AtaqueAudio").prop("currentTime", 0);
        $("#AtaqueAudioAli").trigger('pause');
        $("#AtaqueAudioAli").prop("currentTime", 0);
        $("#AtaqueAudioIgnore10").trigger('pause');
        $("#AtaqueAudioIgnore10").prop("currentTime", 0);
        $("#SpyAudio").trigger('pause');
        $("#SpyAudio").prop("currentTime", 0);
        $("#MessageAudio").trigger('pause');
        $("#MessageAudio").prop("currentTime", 0);
        $("#captchaAudio").trigger('pause');
        $("#captchaAudio").prop("currentTime", 0);
    })
    // ========================================================================== DOBRAR PARA VERMELHO ========================================================================
    $("#btnDobVerm").click(function () {
        javascript: void (xajax_doChooseCard('modal', { 'parentWinID': 'temple', 'gType': 'YWYyMmEyNjI5ZmE2MWI5MzM5YjQzZTA0ZjI0MGYzN2Q=', 'cType': 1 }))
    });
    // ========================================================================== DOBRAR PARA VERMELHO ========================================================================
    $("#btnDobPreto").click(function () {
        javascript: void (xajax_doChooseCard('modal', { 'parentWinID': 'temple', 'gType': 'YWYyMmEyNjI5ZmE2MWI5MzM5YjQzZTA0ZjI0MGYzN2Q=', 'cType': 2 }))
    });
    // ========================================================================== FUNÇÃO MOVER RECURSOS ========================================================================
    $("#btnMovAll").click(function () {
        console.log('Mover todos os recursos ---->');
        xajax_viewDepotStation(container.open({
            saveName: 'depot_station'
        }))
        $('.window-wrapper.ui-draggable.active').hide();
        setTimeout(function () {
            $('#depot_station_all').click();
        }, 1000);
        setTimeout(function () {
            $('#depotStationSend').click();
        }, 1500);
        setTimeout(function () {
            $('a.button.icons.end')[0].click();
            $('.window-wrapper.ui-draggable.active').hide();
        }, 2700);
    });
    // ==================================================================== BOTAO MOVER TROPAS ENTRE PROVINCIAS================================================================
    var movertrop = ""
    $("#Stopmovertrop").click(function () {
        $("#bntmovertrop").trigger('pause');
        $("#bntmovertrop").prop("currentTime", 0);
        $("#bntmovertrop").css("display", "block");
        $("#Stopmovertrop").css("display", "none");
        clearInterval(movertrop);
    });
    $("#bntmovertrop").click(function () {
        $("#bntmovertrop").trigger('play');
        $("#bntmovertrop").css("display", "none");
        $("#Stopmovertrop").css("display", "block");
        movertrop = function addJQuery(callback) {
            var script = document.createElement("script");
            script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
            script.addEventListener('load', function () {
                var script = document.createElement("script");
                script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
                document.body.appendChild(script);
            }, false);
            document.body.appendChild(script);
        }
        // xajax_doSwitchProvince({to:'prev'});
        xajax_doAssembleUnitsByGroup('', 'field');
        document.body.style.background = 'orange';
        setInterval(
            function checker() {
                if (document.getElementsByClassName('incoming province')[0] != null) {
                    xajax_changeProvArrow(1, 1)
                    xajax_premiumMoveAll(2)
                    xajax_doAssembleUnitsByGroup(container.open({ saveName: 'missions', title: 'As minhas missões' })),
                        document.body.style.background = 'red';
                }
                xajax_doSwitchProvince({ to: 'next' });
                xajax_doAssembleUnitsByGroup('', 'field');
                window.close('this');
                //xajax_settings(2,0,'',true)
                xajax_find_babysit(1, 1);
            }, 15000);
    })
    // ==================================================================== BOTOES ABA AÇOES ================================================================
    //=============================================================== BOTÃO MOVER RECUSOS==============================================================
    var moverrecusos = ""
    $("#Stopmoverrecusos").click(function () {
        $("#bntmoverrecusos").trigger('pause');
        $("#bntmoverrecusos").prop("currentTime", 0);
        $("#bntmoverrecusos").css("display", "block");
        $("#Stopmoverrecusos").css("display", "none");
        clearInterval(moverrecusos);
    });
    $("#bntmoverrecusos").click(function () {
        $("#bntmoverrecusos").trigger('play');
        $("#bntmoverrecusos").css("display", "none");
        $("#Stopmoverrecusos").css("display", "block");
        moverrecusos = setInterval(function () {
            void (xajax_doTransportNowByResource(container.open({ saveName: 'missions', title: 'As minhas missões' }), { 'tab': 2, 'type': 'all' }));
            setTimeout(function () {
                document.getElementsByClassName("button icons end")[0].click();
            }, 5000);
            void (container.close({ saveName: 'missions', cancelCallback: true, flow: true, closedWith: 'click' }))
        }, 15000);
    })
    //=============================================================== BOTÃO EMPREGAR POPULAÇAO==============================================================
    //=============================================================== BOTÃO EMPREGAR POPULAÇAO==============================================================
    // ==================================================================== BOTOES ABA CONSTRUÇOES ================================================================
    //===============================================================BOTÃO FAZENDA==============================================================
    var fazendas = ""
    $("#StopCarregarFazendas").click(function () {
        $("#bntCarregarFazendas").trigger('pause');
        $("#bntCarregarFazendas").prop("currentTime", 0);
        $("#bntCarregarFazendas").css("display", "block");
        $("#StopCarregarFazendas").css("display", "none");
        clearInterval(fazendas);
    });
    $("#bntCarregarFazendas").click(function () {
        $("#bntCarregarFazendas").trigger('play');
        $("#bntCarregarFazendas").css("display", "none");
        $("#StopCarregarFazendas").css("display", "block");
        fazendas = setInterval(function () {
            constroifazendas()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroifazendas()
        }
        function constroifazendas() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'economic_science',
                        'developmentId': 6,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development6 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO CASAS ==============================================================
    var casas = ""
    $("#StopCarregarCasas").click(function () {
        $("#bntCarregarCasas").trigger('pause');
        $("#bntCarregarCasas").prop("currentTime", 0);
        $("#bntCarregarCasas").css("display", "block");
        $("#StopCarregarCasas").css("display", "none");
        clearInterval(casas);
    });
    $("#bntCarregarCasas").click(function () {
        $("#bntCarregarCasas").trigger('play');
        $("#bntCarregarCasas").css("display", "none");
        $("#StopCarregarCasas").css("display", "block");
        casas = setInterval(function () {
            constroicasas()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroicasas()
        }
        function constroicasas() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'economic_science',
                        'developmentId': 5,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development5 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO ESTAÇÃO DE TRANSPORTE ==============================================================
    var estacaodetransporte = ""
    $("#StopCarregarEstacaodeTransporte").click(function () {
        $("#bntCarregarEstacaodeTransporte").trigger('pause');
        $("#bntCarregarEstacaodeTransporte").prop("currentTime", 0);
        $("#bntCarregarEstacaodeTransporte").css("display", "block");
        $("#StopCarregarEstacaodeTransporte").css("display", "none");
        clearInterval(estacaodetransporte);
    });
    $("#bntCarregarEstacaodeTransporte").click(function () {
        $("#bntCarregarEstacaodeTransporte").trigger('play');
        $("#bntCarregarEstacaodeTransporte").css("display", "none");
        $("#StopCarregarEstacaodeTransporte").css("display", "block");
        estacaodetransporte = setInterval(function () {
            constroiestacaodetransporte()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroiestacaodetransporte()
        }
        function constroiestacaodetransporte() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'economic_science',
                        'developmentId': 4,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development4 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO MONUMENTOS ==============================================================
    var monumentos = ""
    $("#StopCarregarMonumentos").click(function () {
        $("#bntCarregarMonumentos").trigger('pause');
        $("#bntCarregarMonumentos").prop("currentTime", 0);
        $("#bntCarregarMonumentos").css("display", "block");
        $("#StopCarregarMonumentos").css("display", "none");
        clearInterval(monumentos);
    });
    $("#bntCarregarMonumentos").click(function () {
        $("#bntCarregarMonumentos").trigger('play');
        $("#bntCarregarMonumentos").css("display", "none");
        $("#StopCarregarMonumentos").css("display", "block");
        monumentos = setInterval(function () {
            constroimonumentos()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroimonumentos()
        }
        function constroimonumentos() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'economic_science',
                        'developmentId': 16,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development16 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //===============================================================BOTÃO MERCADO==============================================================
    var CarregarMercado = ""
    $("#StopCarregarMercado").click(function () {
        $("#bntCarregarMercado").trigger('pause');
        $("#bntCarregarMercado").prop("currentTime", 0);
        $("#bntCarregarMercado").css("display", "block");
        $("#StopCarregarMercado").css("display", "none");
        clearInterval(CarregarMercado);
    });
    $("#bntCarregarMercado").click(function () {
        $("#bntCarregarMercado").trigger('play');
        $("#bntCarregarMercado").css("display", "none");
        $("#StopCarregarMercado").css("display", "block");
        CarregarMercado = setInterval(function () {
            constroimercado()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroimercado()
        }
        function constroimercado() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'economic_science',
                        'developmentId': 10,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development10 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO PRAÇA CENTRAL ==============================================================
    var praçacentral = ""
    $("#StopCarregarPraçaCentral").click(function () {
        $("#bntCarregarPraçaCentral").trigger('pause');
        $("#bntCarregarPraçaCentral").prop("currentTime", 0);
        $("#bntCarregarPraçaCentral").css("display", "block");
        $("#StopCarregarPraçaCentral").css("display", "none");
        clearInterval(praçacentral);
    });
    $("#bntCarregarPraçaCentral").click(function () {
        $("#bntCarregarPraçaCentral").trigger('play');
        $("#bntCarregarPraçaCentral").css("display", "none");
        $("#StopCarregarPraçaCentral").css("display", "block");
        praçacentral = setInterval(function () {
            // window.location.href= $(location).attr('href');
            controipraca();
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            controipraca();
        }
        function controipraca() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'economic_science',
                        'developmentId': 9,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development9 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO SERRARIA ==============================================================
    var serraria = ""
    $("#StopCarregarSerraria").click(function () {
        $("#bntCarregarSerraria").trigger('pause');
        $("#bntCarregarSerraria").prop("currentTime", 0);
        $("#bntCarregarSerraria").css("display", "block");
        $("#StopCarregarSerraria").css("display", "none");
        clearInterval(serraria);
    });
    $("#bntCarregarSerraria").click(function () {
        $("#bntCarregarSerraria").trigger('play');
        $("#bntCarregarSerraria").css("display", "none");
        $("#StopCarregarSerraria").css("display", "block");
        serraria = setInterval(function () {
            constroiserraria()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroiserraria()
        }
        function constroiserraria() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'economic_science',
                        'developmentId': 1,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development1 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO MINA DE FERRO ==============================================================
    var minadeferro = ""
    $("#StopCarregarMinaDeFerro").click(function () {
        $("#bntCarregarMinaDeFerro").trigger('pause');
        $("#bntCarregarMinaDeFerro").prop("currentTime", 0);
        $("#bntCarregarMinaDeFerro").css("display", "block");
        $("#StopCarregarMinaDeFerro").css("display", "none");
        clearInterval(minadeferro);
    });
    $("#bntCarregarMinaDeFerro").click(function () {
        $("#bntCarregarMinaDeFerro").trigger('play');
        $("#bntCarregarMinaDeFerro").css("display", "none");
        $("#StopCarregarMinaDeFerro").css("display", "block");
        serraria = setInterval(function () {
            constroiminadeferro()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroiminadeferro()
        }
        function constroiminadeferro() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'economic_science',
                        'developmentId': 2,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development2 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO PEDREIRA ==============================================================
    var pedreira = ""
    $("#StopCarregarPedreira").click(function () {
        $("#bntCarregarPedreira").trigger('pause');
        $("#bntCarregarPedreira").prop("currentTime", 0);
        $("#bntCarregarPedreira").css("display", "block");
        $("#StopCarregarPedreira").css("display", "none");
        clearInterval(pedreira);
    });
    $("#bntCarregarPedreira").click(function () {
        $("#bntCarregarPedreira").trigger('play');
        $("#bntCarregarPedreira").css("display", "none");
        $("#StopCarregarPedreira").css("display", "block");
        pedreira = setInterval(function () {
            constroipedreira()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroipedreira()
        }
        function constroipedreira() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'economic_science',
                        'developmentId': 3,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development3 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO ESTRADAS IMPERIAIS ==============================================================
    var estradasimperiais = ""
    $("#StopCarregarEstradasImperiais").click(function () {
        $("#bntCarregarEstradasImperiais").trigger('pause');
        $("#bntCarregarEstradasImperiais").prop("currentTime", 0);
        $("#bntCarregarEstradasImperiais").css("display", "block");
        $("#StopCarregarEstradasImperiais").css("display", "none");
        clearInterval(estradasimperiais);
    });
    $("#bntCarregarEstradasImperiais").click(function () {
        $("#bntCarregarEstradasImperiais").trigger('play');
        $("#bntCarregarEstradasImperiais").css("display", "none");
        $("#StopCarregarEstradasImperiais").css("display", "block");
        estradasimperiais = setInterval(function () {
            constroiestradasimperiais()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroiestradasimperiais()
        }
        function constroiestradasimperiais() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Estrada Imperial'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 15,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5000)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 15,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 15,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 15,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 41,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5000)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 41,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 41,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 41,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 42,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5000)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 42,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 42,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 42,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 43,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5000)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 43,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 43,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 43,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 44,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5000)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 44,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 44,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
            setTimeout(function () {
                xajax_doImperialRoadStart('developmentImperialRoad', {
                    'tab': 'list',
                    'developmentId': 44,
                    'science': 0,
                    'current_value': $('#developmentImperialRoad form#development41 input[name=current_value]').val()
                });
                SetFocusTop();
                return false
            }, 5900)
        }
    });
    // ==================================================================== FUNÇÕES BOTAO QUARTEL ================================================================
    var quarteis = ""
    $("#StopCarregarQuarteis").click(function () {
        $("#bntCarregarQuarteis").trigger('pause');
        $("#bntCarregarQuarteis").prop("currentTime", 0);
        $("#bntCarregarQuarteis").css("display", "block");
        $("#StopCarregarQuarteis").css("display", "none");
        clearInterval(quarteis);
    });
    $("#bntCarregarQuarteis").click(function () {
        $("#bntCarregarQuarteis").trigger('play');
        $("#bntCarregarQuarteis").css("display", "none");
        $("#StopCarregarQuarteis").css("display", "block");
        quarteis = setInterval(function () {
            constroiquartel()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroiquartel()
        }
        function constroiquartel() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            setTimeout(function () {
                xajax_doBuildingStart('developmentBuilding', {
                    'tab': 'military_science',
                    'developmentId': 23,
                    'science': 1,
                    'current_value': $('#developmentBuilding form#development23 input[name=current_value]').val()
                });
                SetFocusTop();
                return false;
            }, 5000);
            setTimeout(function () {
                xajax_doBuildingStart('developmentBuilding', {
                    'tab': 'military_science',
                    'developmentId': 22,
                    'science': 1,
                    'current_value': $('#developmentBuilding form#development22 input[name=current_value]').val()
                });
                SetFocusTop();
                return false;
            }, 5000);
            setTimeout(function () {
                xajax_doBuildingStart('developmentBuilding', {
                    'tab': 'military_science',
                    'developmentId': 24,
                    'science': 1,
                    'current_value': $('#developmentBuilding form#development24 input[name=current_value]').val()
                });
                SetFocusTop();
                return false;
            }, 5000);
            setTimeout(function () {
                xajax_doBuildingStart('developmentBuilding', {
                    'tab': 'military_science',
                    'developmentId': 26,
                    'science': 1,
                    'current_value': $('#developmentBuilding form#development26 input[name=current_value]').val()
                });
                SetFocusTop();
                return false;
            }, 5000);
            setTimeout(function () {
                xajax_doBuildingStart('developmentBuilding', {
                    'tab': 'military_science',
                    'developmentId': 25,
                    'science': 1,
                    'current_value': $('#developmentBuilding form#development25 input[name=current_value]').val()
                });
                SetFocusTop();
                return false;
            }, 5000);
        }
    });
    //=============================================================== BOTÃO QUARTEL DE ARQUEIROS ==============================================================
    var quarteldearqueiro = ""
    $("#StopCarregarquarteldearqueiro").click(function () {
        $("#bntCarregarquarteldearqueiro").trigger('pause');
        $("#bntCarregarquarteldearqueiro").prop("currentTime", 0);
        $("#bntCarregarquarteldearqueiro").css("display", "block");
        $("#StopCarregarquarteldearqueiro").css("display", "none");
        clearInterval(quarteldearqueiro);
    });
    $("#bntCarregarquarteldearqueiro").click(function () {
        $("#bntCarregarquarteldearqueiro").trigger('play');
        $("#bntCarregarquarteldearqueiro").css("display", "none");
        $("#StopCarregarquarteldearqueiro").css("display", "block");
        quarteldearqueiro = setInterval(function () {
            constroiquarteldearqueiro()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroiquarteldearqueiro()
        }
        function constroiquarteldearqueiro() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'military_science',
                        'developmentId': 23,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development23 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO QUARTEL DE INFANTARIA ==============================================================
    var quarteldeinfantaria = ""
    $("#StopCarregarquarteldeinfantaria").click(function () {
        $("#bntCarregarquarteldeinfantaria").trigger('pause');
        $("#bntCarregarquarteldeinfantaria").prop("currentTime", 0);
        $("#bntCarregarquarteldeinfantaria").css("display", "block");
        $("#StopCarregarquarteldeinfantaria").css("display", "none");
        clearInterval(quarteldeinfantaria);
    });
    $("#bntCarregarquarteldeinfantaria").click(function () {
        $("#bntCarregarquarteldeinfantaria").trigger('play');
        $("#bntCarregarquarteldeinfantaria").css("display", "none");
        $("#StopCarregarquarteldeinfantaria").css("display", "block");
        quarteldeinfantaria = setInterval(function () {
            constroiquarteldeinfantaria()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroiquarteldeinfantaria()
        }
        function constroiquarteldeinfantaria() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'military_science',
                        'developmentId': 22,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development22 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO QUARTEL DE CAVALARIA ==============================================================
    var quarteldecavalaria = ""
    $("#StopCarregarquarteldecavalaria").click(function () {
        $("#bntCarregarquarteldecavalaria").trigger('pause');
        $("#bntCarregarquarteldecavalaria").prop("currentTime", 0);
        $("#bntCarregarquarteldecavalaria").css("display", "block");
        $("#StopCarregarquarteldecavalaria").css("display", "none");
        clearInterval(quarteldecavalaria);
    });
    $("#bntCarregarquarteldecavalaria").click(function () {
        $("#bntCarregarquarteldecavalaria").trigger('play');
        $("#bntCarregarquarteldecavalaria").css("display", "none");
        $("#StopCarregarquarteldecavalaria").css("display", "block");
        quarteldecavalaria = setInterval(function () {
            constroiquarteldecavalaria()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroiquarteldecavalaria()
        }
        function constroiquarteldecavalaria() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'military_science',
                        'developmentId': 24,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development24 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO QUARTEL DE ESPIOES==============================================================
    var quarteldeespioes = ""
    $("#StopCarregarquarteldeespioes").click(function () {
        $("#bntCarregarquarteldeespioes").trigger('pause');
        $("#bntCarregarquarteldeespioes").prop("currentTime", 0);
        $("#bntCarregarquarteldeespioes").css("display", "block");
        $("#StopCarregarquarteldeespioes").css("display", "none");
        clearInterval(quarteldeespioes);
    });
    $("#bntCarregarquarteldeespioes").click(function () {
        $("#bntCarregarquarteldeespioes").trigger('play');
        $("#bntCarregarquarteldeespioes").css("display", "none");
        $("#StopCarregarquarteldeespioes").css("display", "block");
        quarteldeespioes = setInterval(function () {
            constroiquarteldeespioes()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroiquarteldeespioes()
        }
        function constroiquarteldeespioes() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'military_science',
                        'developmentId': 25,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development25 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO OFICINA DE MAQUINA DE CERCO ==============================================================
    var oficinamaquinacerco = ""
    $("#StopCarregaroficinamaquinacerco").click(function () {
        $("#bntCarregaroficinamaquinacerco").trigger('pause');
        $("#bntCarregaroficinamaquinacerco").prop("currentTime", 0);
        $("#bntCarregaroficinamaquinacerco").css("display", "block");
        $("#StopCarregaroficinamaquinacerco").css("display", "none");
        clearInterval(oficinamaquinacerco);
    });
    $("#bntCarregaroficinamaquinacerco").click(function () {
        $("#bntCarregaroficinamaquinacerco").trigger('play');
        $("#bntCarregaroficinamaquinacerco").css("display", "none");
        $("#StopCarregaroficinamaquinacerco").css("display", "block");
        oficinamaquinacerco = setInterval(function () {
            constroioficinamaquinacerco()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroioficinamaquinacerco()
        }
        function constroioficinamaquinacerco() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'military_science',
                        'developmentId': 26,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development26 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO CORTINA DE MURALHA ==============================================================
    var cortinademuralha = ""
    $("#StopCarregarcortinademuralha").click(function () {
        $("#bntCarregarcortinademuralha").trigger('pause');
        $("#bntCarregarcortinademuralha").prop("currentTime", 0);
        $("#bntCarregarcortinademuralha").css("display", "block");
        $("#StopCarregarcortinademuralha").css("display", "none");
        clearInterval(cortinademuralha);
    });
    $("#bntCarregarcortinademuralha").click(function () {
        $("#bntCarregarcortinademuralha").trigger('play');
        $("#bntCarregarcortinademuralha").css("display", "none");
        $("#StopCarregarcortinademuralha").css("display", "block");
        cortinademuralha = setInterval(function () {
            constroicortinademuralha()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroicortinademuralha()
        }
        function constroicortinademuralha() {
            ssetTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'military_science',
                        'developmentId': 30,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development30 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO FOSSO==============================================================
    var fosso = ""
    $("#StopCarregarfosso").click(function () {
        $("#bntCarregarfosso").trigger('pause');
        $("#bntCarregarfosso").prop("currentTime", 0);
        $("#bntCarregarfosso").css("display", "block");
        $("#StopCarregarfosso").css("display", "none");
        clearInterval(fosso);
    });
    $("#bntCarregarfosso").click(function () {
        $("#bntCarregarfosso").trigger('play');
        $("#bntCarregarfosso").css("display", "none");
        $("#StopCarregarfosso").css("display", "block");
        fosso = setInterval(function () {
            constroifosso()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroifosso()
        }
        function constroifosso() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'military_science',
                        'developmentId': 29,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development29 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    //=============================================================== BOTÃO TORRE ==============================================================
    var torre = ""
    $("#StopCarregartorre").click(function () {
        $("#bntCarregartorre").trigger('pause');
        $("#bntCarregartorre").prop("currentTime", 0);
        $("#bntCarregartorre").css("display", "block");
        $("#StopCarregartorre").css("display", "none");
        clearInterval(torre);
    });
    $("#bntCarregartorre").click(function () {
        $("#bntCarregartorre").trigger('play');
        $("#bntCarregartorre").css("display", "none");
        $("#StopCarregartorre").css("display", "block");
        torre = setInterval(function () {
            constroitorre()
        }, 24500);
        if ($('#missions .outgoing.province').html() == null) {
            constroitorre()
        }
        function constroitorre() {
            setTimeout(function () {
                xajax_viewBuildingList(container.open({
                    'saveName': 'developmentBuilding',
                    'position': 'center;center',
                    'title': 'Contrução'
                }))
            }, 1000)
            setTimeout(function () {
                agora()
            }, 8500)
            setTimeout(function () {
                xajax_doSwitchProvince({
                    to: 'next',
                    windowSwitch: 'developmentBuilding'
                })
            }, 9500)
        };
        function agora() {
            for (let i = 0; i < 5; i++) {
                setTimeout(function () {
                    xajax_doBuildingStart('developmentBuilding', {
                        'tab': 'military_science',
                        'developmentId': 28,
                        'science': 1,
                        'current_value': $('#developmentBuilding form#development28 input[name=current_value]').val()
                    });
                    SetFocusTop();
                    return false;
                }, 5000 * i);
            };
        }
    });
    // ==================================================================== BOTOES ABA RECRUTAMENTOS ================================================================
    //=============================================================== BOTAO RECRUTAR ESPIOES========================================================================
    var RecEspioes = ""
    $("#StopRecEspioes").click(function () {
        $("#bntRecEspioes").trigger('pause');
        $("#bntRecEspioes").prop("currentTime", 0);
        $("#bntRecEspioes").css("display", "block");
        $("#StopRecEspioes").css("display", "none");
        clearInterval(RecEspioes);
    });
    $("#bntRecEspioes").click(function () {
        $("#bntRecEspioes").trigger('play');
        $("#bntRecEspioes").css("display", "none");
        $("#StopRecEspioes").css("display", "block");
        RecEspioes =
            // Inicia o setInterval para chamar provincias a cada 20 segundos
            setInterval(function () {
                provincias();
            }, 3000);
        function provincias() {
            setTimeout(guardas, 1000);
            setTimeout(abretropasguardas, 3000);
            setTimeout(clicarecrutguardas, 6000);
            setTimeout(PROXIMO, 10000);
            function guardas() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'Espioes',
                        title: 'Espioes'
                    }), {
                        'barrackId': '5',
                        'tab': '1'
                    });
                }, 850);
            }
            function abretropasguardas() {
                var unit2 = $('.icon_KS').text();
                var unit222 = $('.max_KS.barracks-K').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_KS').val(str.trim()).keyup();
                        jQuery('#v-train_KS').val(str.trim()).keyup();
                    }, 550);
                }
            }
            function clicarecrutguardas() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }
            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'spies'
                    });
                }, 1000);
            }
        }
    });
    //=============================================================== BOTAO ARQUEIROS LEVES========================================================================
    var RecArqueirosleves = ""
    $("#StopRecArqueirosleves").click(function () {
        $("#bntRecArqueirosleves").trigger('pause');
        $("#bntRecArqueirosleves").prop("currentTime", 0);
        $("#bntRecArqueirosleves").css("display", "block");
        $("#StopRecArqueirosleves").css("display", "none");
        clearInterval(RecArqueirosleves);
    });
    $("#bntRecArqueirosleves").click(function () {
        $("#bntRecArqueirosleves").trigger('play');
        $("#bntRecArqueirosleves").css("display", "none");
        $("#StopRecArqueirosleves").css("display", "block");
        RecArqueirosleves = // Inicia o setInterval para chamar provincias a cada 20 segundos
            setInterval(function () {
                provincias();
            }, 3000);
        function provincias() {
            setTimeout(arcosl, 1000);
            setTimeout(abretropasarcosl, 3000);
            setTimeout(clicarecrutarcosl, 6000);
            setTimeout(PROXIMO, 10000);
            function arcosl() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'archer',
                        title: 'Quartel de Arqueiros'
                    }), {
                        'barrackId': '1',
                        'tab': '1'
                    });
                }, 850);
            }
            function abretropasarcosl() {
                var unit2 = $('.icon_S1').text();
                var unit222 = $('.max_S1.barracks-S').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_S1').val(str.trim()).keyup();
                        jQuery('#v-train_S1').val(str.trim()).keyup();
                    }, 550);
                }
            }
            function clicarecrutarcosl() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }
            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'archer'
                    });
                }, 1000);
            }
        }
    });
    //=============================================================== BOTAO RECRUTAR ESPADAS LEVES========================================================================
    var RecEspadachimLeves = ""
    $("#StopRecEspadachimLeves").click(function () {
        $("#bntRecEspadachimLeves").trigger('pause');
        $("#bntRecEspadachimLeves").prop("currentTime", 0);
        $("#bntRecEspadachimLeves").css("display", "block");
        $("#StopRecEspadachimLeves").css("display", "none");
        clearInterval(RecEspadachimLeves);
    });
    $("#bntRecEspadachimLeves").click(function () {
        $("#bntRecEspadachimLeves").trigger('play');
        $("#bntRecEspadachimLeves").css("display", "none");
        $("#StopRecEspadachimLeves").css("display", "block");
        RecEspadachimLeves = // Inicia o setInterval para chamar provincias a cada 20 segundos
            setInterval(function () {
                provincias();
            }, 3000);
        function provincias() {
            setTimeout(espadasl, 1000);
            setTimeout(abretropasespadal, 3000);
            setTimeout(clicarecrutespadal, 6000);
            setTimeout(PROXIMO, 10000);
            function espadasl() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'archer',
                        title: 'Quartel de Infantaria'
                    }), {
                        'barrackId': '2',
                        'tab': '1'
                    });
                }, 850);
            }
            function abretropasespadal() {
                var unit2 = $('.icon_M1').text();
                var unit222 = $('.max_M1.barracks-M').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_M1').val(str.trim()).keyup();
                        jQuery('#v-train_M1').val(str.trim()).keyup();
                    }, 550);
                }
            }
            function clicarecrutespadal() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }
            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'infantry'
                    });
                }, 1000);
            }
        }
    });
    //=============================================================== BOTAO RECRUTAR LANCEIROS LEVES========================================================================
    var Reclanceirosleves = ""
    $("#StopReclanceirosleves").click(function () {
        $("#bntReclanceirosleves").trigger('pause');
        $("#bntReclanceirosleves").prop("currentTime", 0);
        $("#bntReclanceirosleves").css("display", "block");
        $("#StopReclanceirosleves").css("display", "none");
        clearInterval(Reclanceirosleves);
    });
    $("#bntReclanceirosleves").click(function () {
        $("#bntReclanceirosleves").trigger('play');
        $("#bntReclanceirosleves").css("display", "none");
        $("#StopReclanceirosleves").css("display", "block");
        Reclanceirosleves =  // Inicia o setInterval para chamar provincias a cada 20 segundos
            setInterval(function () {
                provincias();
            }, 3000);
        function provincias() {
            setTimeout(lançal, 1000);
            setTimeout(abretropaslançal, 3000);
            setTimeout(clicarecrutlançal, 6000);
            setTimeout(PROXIMO, 10000);
            function lançal() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'infantry',
                        title: 'Quartel de Infantaria'
                    }), {
                        'barrackId': '2',
                        'tab': '1'
                    });
                }, 850);
            }
            function abretropaslançal() {
                var unit2 = $('.icon_P1').text();
                var unit222 = $('.max_P1.barracks-P').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_P1').val(str.trim()).keyup();
                        jQuery('#v-train_P1').val(str.trim()).keyup();
                    }, 550);
                }
            }
            function clicarecrutlançal() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }
            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'infantry'
                    });
                }, 1000);
            }
        }
    });
    //=============================================================== BOTAO RECRUTAR CAVALOS LEVES========================================================================
    var RecCavalosleves = ""
    $("#StopRecCavalosleves").click(function () {
        $("#bntRecCavalosleves").trigger('pause');
        $("#bntRecCavalosleves").prop("currentTime", 0);
        $("#bntRecCavalosleves").css("display", "block");
        $("#StopRecCavalosleves").css("display", "none");
        clearInterval(RecCavalosleves);
    });
    $("#bntRecCavalosleves").click(function () {
        $("#bntRecCavalosleves").trigger('play');
        $("#bntRecCavalosleves").css("display", "none");
        $("#StopRecCavalosleves").css("display", "block");
        RecCavalosleves = // Inicia o setInterval para chamar provincias a cada 20 segundos
            setInterval(function () {
                provincias();
            }, 3000);
        function provincias() {
            setTimeout(cavl, 1000);
            setTimeout(abretropascavl, 3000);
            setTimeout(clicarecrutcavl, 6000);
            setTimeout(PROXIMO, 10000);
            function cavl() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'cavalery',
                        title: 'Quartel de Cavalaria'
                    }), {
                        'barrackId': '3',
                        'tab': '1'
                    });
                }, 850);
            }
            function abretropascavl() {
                var unit2 = $('.icon_K1').text();
                var unit222 = $('.max_K1.barracks-K').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_K1').val(str.trim()).keyup();
                        jQuery('#v-train_K1').val(str.trim()).keyup();
                    }, 550);
                }
            }
            function clicarecrutcavl() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }
            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'cavalery'
                    });
                }, 1000);
            }
        }
    });
    //=============================================================== BOTAO RECRUTAR PESADOS=======================================================================
    //=============================================================== BOTAO ARQUEIROS PESADOS========================================================================
    var RecArqueirospesados = ""
    $("#StopRecArqueirospesados").click(function () {
        $("#bntRecArqueirospesados").trigger('pause');
        $("#bntRecArqueirospesados").prop("currentTime", 0);
        $("#bntRecArqueirospesados").css("display", "block");
        $("#StopRecArqueirospesados").css("display", "none");
        clearInterval(RecArqueirospesados);
    });
    $("#bntRecArqueirospesados").click(function () {
        $("#bntRecArqueirospesados").trigger('play');
        $("#bntRecArqueirospesados").css("display", "none");
        $("#StopRecArqueirospesados").css("display", "block");
        RecArqueirospesados = // Inicia o setInterval para chamar provincias a cada 20 segundos
            setInterval(function () {
                provincias();
            }, 3000);
        function provincias() {
            setTimeout(arcosp, 1000);
            setTimeout(abretropasarcosp, 3000);
            setTimeout(clicarecrutarcosp, 6000);
            setTimeout(PROXIMO, 10000);
            function arcosp() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'archer',
                        title: 'Quartel de Arqueiros'
                    }), {
                        'barrackId': '1',
                        'tab': '1'
                    });
                }, 850);
            }
            function abretropasarcosp() {
                var unit2 = $('.icon_S2').text();
                var unit222 = $('.max_S2.barracks-S').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_S2').val(str.trim()).keyup();
                        jQuery('#v-train_S2').val(str.trim()).keyup();
                    }, 550);
                }
            }
            function clicarecrutarcosp() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }
            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'archer'
                    });
                }, 1000);
            }
        }
    });
    //=============================================================== BOTAO ESPADAS PESADOS========================================================================
    var RecEspadachimPesado = ""
    $("#StopRecEspadachimPesado").click(function () {
        $("#bntRecEspadachimPesado").trigger('pause');
        $("#bntRecEspadachimPesado").prop("currentTime", 0);
        $("#bntRecEspadachimPesado").css("display", "block");
        $("#StopRecEspadachimPesado").css("display", "none");
        clearInterval(RecEspadachimPesado);
    });
    $("#bntRecEspadachimPesado").click(function () {
        $("#bntRecEspadachimPesado").trigger('play');
        $("#bntRecEspadachimPesado").css("display", "none");
        $("#StopRecEspadachimPesado").css("display", "block");
        RecEspadachimPesado = // Inicia o setInterval para chamar provincias a cada 20 segundos
            setInterval(function () {
                provincias();
            }, 3000);
        function provincias() {
            setTimeout(espadasp, 1000);
            setTimeout(abretropasespadap, 3000);
            setTimeout(clicarecrutespadap, 6000);
            setTimeout(PROXIMO, 10000);
            function espadasp() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'infantry',
                        title: 'Quartel de Infantaria'
                    }), {
                        'barrackId': '2',
                        'tab': '1'
                    });
                }, 850);
            }
            function abretropasespadap() {
                var unit2 = $('.icon_M2').text();
                var unit222 = $('.max_M2.barracks-M').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_M2').val(str.trim()).keyup();
                        jQuery('#v-train_M2').val(str.trim()).keyup();
                    }, 550);
                }
            }
            function clicarecrutespadap() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }
            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'infantry'
                    });
                }, 1000);
            }
        }
    });
    //=============================================================== BOTAO LANCEIROS PESADOS========================================================================
    var Reclanceirospesados = ""
    $("#StopReclanceirospesados").click(function () {
        $("#bntReclanceirospesados").trigger('pause');
        $("#bntReclanceirospesados").prop("currentTime", 0);
        $("#bntReclanceirospesados").css("display", "block");
        $("#StopReclanceirospesados").css("display", "none");
        clearInterval(Reclanceirospesados);
    });
    $("#bntReclanceirospesados").click(function () {
        $("#bntReclanceirospesados").trigger('play');
        $("#bntReclanceirospesados").css("display", "none");
        $("#StopReclanceirospesados").css("display", "block");
        Reclanceirospesados =   // Inicia o setInterval para chamar provincias a cada 20 segundos
            setInterval(function () {
                provincias();
            }, 3000);
        function provincias() {
            setTimeout(lançap, 1000);
            setTimeout(abretropaslançap, 3000);
            setTimeout(clicarecrutlançap, 6000);
            setTimeout(PROXIMO, 10000);
            function lançap() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'infantry',
                        title: 'Quartel de Infantaria'
                    }), {
                        'barrackId': '2',
                        'tab': '1'
                    });
                }, 850);
            }
            function abretropaslançap() {
                var unit2 = $('.icon_P2').text();
                var unit222 = $('.max_P2.barracks-P').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_P2').val(str.trim()).keyup();
                        jQuery('#v-train_P2').val(str.trim()).keyup();
                    }, 550);
                }
            }
            function clicarecrutlançap() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }
            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'infantry'
                    });
                }, 1000);
            }
        }
    });
    //=============================================================== BOTAO CAVALOS PESADOS========================================================================
    var RecCavalospesados = ""
    $("#StopRecCavalospesados").click(function () {
        $("#bntRecCavalospesados").trigger('pause');
        $("#bntRecCavalospesados").prop("currentTime", 0);
        $("#bntRecCavalospesados").css("display", "block");
        $("#StopRecCavalospesados").css("display", "none");
        clearInterval(RecCavalospesados);
    });
    $("#bntRecCavalospesados").click(function () {
        $("#bntRecCavalospesados").trigger('play');
        $("#bntRecCavalospesados").css("display", "none");
        $("#StopRecCavalospesados").css("display", "block");
        RecCavalospesados = // Inicia o setInterval para chamar provincias a cada 20 segundos
            setInterval(function () {
                provincias();
            }, 3000);
        function provincias() {
            setTimeout(cavp, 1000);
            setTimeout(abretropascavp, 3000);
            setTimeout(clicarecrutcavp, 6000);
            setTimeout(PROXIMO, 10000);
            function cavp() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'cavalery',
                        title: 'Quartel de Cavalaria'
                    }), {
                        'barrackId': '3',
                        'tab': '1'
                    });
                }, 850);
            }
            function abretropascavp() {
                var unit2 = $('.icon_K2').text();
                var unit222 = $('.max_K2.barracks-K').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_K2').val(str.trim()).keyup();
                        jQuery('#v-train_K2').val(str.trim()).keyup();
                    }, 550);
                }
            }
            function clicarecrutcavp() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }
            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'cavalery'
                    });
                }, 1000);
            }
        }
    });
    //=============================================================== BOTAO RECRUTAR ELITES========================================================================
    //=============================================================== BOTAO RECRUTAR GUARDIOES========================================================================
    var RecGuardioes = ""
    $("#StopRecGuardioes").click(function () {
        $("#bntRecGuardioes").trigger('pause');
        $("#bntRecGuardioes").prop("currentTime", 0);
        $("#bntRecGuardioes").css("display", "block");
        $("#StopRecGuardioes").css("display", "none");
        clearInterval(RecGuardioes);
    });
    $("#bntRecGuardioes").click(function () {
        $("#bntRecGuardioes").trigger('play');
        $("#bntRecGuardioes").css("display", "none");
        $("#StopRecGuardioes").css("display", "block");
        RecGuardioes =// Inicia o setInterval para chamar provincias a cada 20 segundos
            setInterval(function () {
                provincias();
            }, 3000);
        function provincias() {
            setTimeout(espadase, 1000);
            setTimeout(abretropasespadae, 3000);
            setTimeout(clicarecrutespadae, 6000);
            setTimeout(PROXIMO, 10000);
            function espadase() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'infantry',
                        title: 'Quartel de Infantaria'
                    }), {
                        'barrackId': '2',
                        'tab': '1'
                    });
                }, 850);
            }
            function abretropasespadae() {
                var unit2 = $('.icon_M3').text();
                var unit222 = $('.max_M3.barracks-M').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_M3').val(str.trim()).keyup();
                        jQuery('#v-train_M3').val(str.trim()).keyup();
                    }, 550);
                }
            }
            function clicarecrutespadae() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }
            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'infantry'
                    });
                }, 1000);
            }
        }
    });
    //=============================================================== BOTAO RECRUTAR FALANGES========================================================================
    var RecFalanges = ""
    $("#StopRecFalanges").click(function () {
        $("#bntRecFalanges").trigger('pause');
        $("#bntRecFalanges").prop("currentTime", 0);
        $("#bntRecFalanges").css("display", "block");
        $("#StopRecFalanges").css("display", "none");
        clearInterval(RecFalanges);
    });
    $("#bntRecFalanges").click(function () {
        $("#bntRecFalanges").trigger('play');
        $("#bntRecFalanges").css("display", "none");
        $("#StopRecFalanges").css("display", "block");
        RecFalanges =  // Inicia o setInterval para chamar provincias a cada 20 segundos
            setInterval(function () {
                provincias();
            }, 3000);
        function provincias() {
            setTimeout(lançae, 1000);
            setTimeout(abretropaslançae, 3000);
            setTimeout(clicarecrutlançae, 6000);
            setTimeout(PROXIMO, 10000);
            function lançae() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'infantry',
                        title: 'Quartel de Infantaria'
                    }), {
                        'barrackId': '2',
                        'tab': '1'
                    });
                }, 850);
            }
            function abretropaslançae() {
                var unit2 = $('.icon_P3').text();
                var unit222 = $('.max_P3.barracks-P').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_P3').val(str.trim()).keyup();
                        jQuery('#v-train_P3').val(str.trim()).keyup();
                    }, 550);
                }
            }
            function clicarecrutlançae() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }
            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'infantry'
                    });
                }, 1000);
            }
        }
    });
    //=============================================================== BOTAO RECRUTAR PALADINOS========================================================================
    var RecPaladinos = ""
    $("#StopRecPaladinos").click(function () {
        $("#bntRecPaladinos").trigger('pause');
        $("#bntRecPaladinos").prop("currentTime", 0);
        $("#bntRecPaladinos").css("display", "block");
        $("#StopRecPaladinos").css("display", "none");
        clearInterval(RecPaladinos);
    });
    $("#bntRecPaladinos").click(function () {
        $("#bntRecPaladinos").trigger('play');
        $("#bntRecPaladinos").css("display", "none");
        $("#StopRecPaladinos").css("display", "block");
        RecPaladinos = // Inicia o setInterval para chamar provincias a cada 20 segundos
            setInterval(function () {
                provincias();
            }, 3000);
        function provincias() {
            setTimeout(cave, 1000);
            setTimeout(abretropascave, 3000);
            setTimeout(clicarecrutcave, 6000);
            setTimeout(PROXIMO, 10000);
            function cave() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'cavalery',
                        title: 'Quartel de Cavalaria'
                    }), {
                        'barrackId': '3',
                        'tab': '1'
                    });
                }, 850);
            }
            function abretropascave() {
                var unit2 = $('.icon_K3').text();
                var unit222 = $('.max_K3.barracks-K').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_K3').val(str.trim()).keyup();
                        jQuery('#v-train_K3').val(str.trim()).keyup();
                    }, 550);
                }
            }
            function clicarecrutcave() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }
            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'cavalery'
                    });
                }, 1000);
            }
        }
    });
    //=============================================================== BOTAO RECRUTAR ARQUEIRO========================================================================
    var RecArqueiros = ""
    $("#StopRecArqueiros").click(function () {
        $("#bntRecArqueiros").trigger('pause');
        $("#bntRecArqueiros").prop("currentTime", 0);
        $("#bntRecArqueiros").css("display", "block");
        $("#StopRecArqueiros").css("display", "none");
        clearInterval(RecArqueiros);
    });
    $("#bntRecArqueiros").click(function () {
        $("#bntRecArqueiros").trigger('play');
        $("#bntRecArqueiros").css("display", "none");
        $("#StopRecArqueiros").css("display", "block");
        RecArqueiros = // Inicia o setInterval para chamar provincias a cada 20 segundos
            setInterval(function () {
                provincias();
            }, 3000);
        function provincias() {
            setTimeout(arcose, 1000);
            setTimeout(abretropasarcose, 3000);
            setTimeout(clicarecrutarcose, 6000);
            setTimeout(PROXIMO, 10000);
            function arcose() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'archer',
                        title: 'Quartel de Arqueiros'
                    }), {
                        'barrackId': '1',
                        'tab': '1'
                    });
                }, 850);
            }
            function abretropasarcose() {
                var unit2 = $('.icon_S3').text();
                var unit222 = $('.max_S3.barracks-S').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_S3').val(str.trim()).keyup();
                        jQuery('#v-train_S3').val(str.trim()).keyup();
                    }, 550);
                }
            }
            function clicarecrutarcose() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }
            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'archer'
                    });
                }, 1000);
            }
        }
    });
    //=============================================================== BOTÃO EVOLUIR ARQUEIRO ==============================================================
    var Evoarqueiroselite = "";

    $("#StopEvoarqueiroselite").click(function () {
        $("#bntEvoarqueiroselite").trigger('pause');
        $("#bntEvoarqueiroselite").prop("currentTime", 0);
        $("#bntEvoarqueiroselite").css("display", "block");
        $("#StopEvoarqueiroselite").css("display", "none");
        clearInterval(Evoarqueiroselite);
    });

    $("#bntEvoarqueiroselite").click(function () {
        $("#bntEvoarqueiroselite").trigger('play');
        $("#bntEvoarqueiroselite").css("display", "none");
        $("#StopEvoarqueiroselite").css("display", "block");

        Evoarqueiroselite = setInterval(function () {
            provincias();
        }, 15000); // Intervalo de 15 segundos entre execuções completas

        function provincias() {
            setTimeout(arcose, 1000);          // 1 segundo para abrir o quartel
            setTimeout(abretropasarcose, 4000); // 3 segundos para identificar tropas após abrir o quartel
            setTimeout(clicarecrutarcose, 8000); // 4 segundos para clicar em recrutar
            setTimeout(PROXIMO, 12000);         // 4 segundos para mudar de província após recrutar

            function arcose() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'archer',
                        title: 'Quartel de Arqueiros'
                    }), {
                        'barrackId': '1',
                        'tab': '4'
                    });
                }, 850);
            }

            function abretropasarcose() {
                var unit2 = $('.icon_S3').text();
                var unit222 = $('.max_S3').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_S3').val(str.trim()).keyup();
                        jQuery('#v-train_S3').val(str.trim()).keyup();
                    }, 550);
                }
            }

            function clicarecrutarcose() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }

            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'archer'
                    });
                }, 1000);
            }
        }
    });

    //=============================================================== BOTÃO EVOLUIR GUARDIOES ==============================================================
    var Evoguardaselite = "";

    $("#StopEvoguardaselite").click(function () {
        $("#bntEvoguardaselite").trigger('pause');
        $("#bntEvoguardaselite").prop("currentTime", 0);
        $("#bntEvoguardaselite").css("display", "block");
        $("#StopEvoguardaselite").css("display", "none");
        clearInterval(Evoguardaselite);
    });

    $("#bntEvoguardaselite").click(function () {
        $("#bntEvoguardaselite").trigger('play');
        $("#bntEvoguardaselite").css("display", "none");
        $("#StopEvoguardaselite").css("display", "block");

        Evoguardaselite = setInterval(function () {
            provincias();
        }, 3000); // Intervalo de 15 segundos entre execuções completas

        function provincias() {
            setTimeout(espadase, 1000);          // 1 segundo para abrir o quartel
            setTimeout(abretropasespadae, 4000); // 3 segundos para identificar tropas após abrir o quartel
            setTimeout(clicarecrutespadae, 7000); // 4 segundos para clicar em recrutar
            setTimeout(PROXIMO, 10000);         // 4 segundos para mudar de província após recrutar

            function espadase() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'infantry',
                        title: 'Quartel de Infantaria'
                    }), {
                        'barrackId': '2',
                        'tab': '4'
                    });
                }, 850);
            }

            function abretropasespadae() {
                var unit2 = $('.icon_M3').text();
                var unit222 = $('.max_M3').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_M3').val(str.trim()).keyup();
                        jQuery('#v-train_M3').val(str.trim()).keyup();
                    }, 550);
                }
            }

            function clicarecrutespadae() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 2900);
            }

            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'infantry'
                    });
                }, 1000);
            }
        }
    });


    //=============================================================== BOTÃO EVOLUIR FALANGES ==============================================================
    var EvoFalangeselite = "";

    $("#StopEvoFalangeselite").click(function () {
        $("#bntEvoFalangeselite").trigger('pause');
        $("#bntEvoFalangeselite").prop("currentTime", 0);
        $("#bntEvoFalangeselite").css("display", "block");
        $("#StopEvoFalangeselite").css("display", "none");
        clearInterval(EvoFalangeselite);
    });

    $("#bntEvoFalangeselite").click(function () {
        $("#bntEvoFalangeselite").trigger('play');
        $("#bntEvoFalangeselite").css("display", "none");
        $("#StopEvoFalangeselite").css("display", "block");

        EvoFalangeselite = setInterval(function () {
            provincias();
        }, 15000); // Intervalo de 15 segundos entre execuções completas

        function provincias() {
            setTimeout(lançae, 1000);          // 1 segundo para abrir o quartel
            setTimeout(abretropaslançae, 4000); // 3 segundos para identificar tropas após abrir o quartel
            setTimeout(clicarecrutlançae, 8000); // 4 segundos para clicar em recrutar
            setTimeout(PROXIMO, 12000);         // 4 segundos para mudar de província após recrutar

            function lançae() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'infantry',
                        title: 'Quartel de Infantaria'
                    }), {
                        'barrackId': '2',
                        'tab': '4'
                    });
                }, 850);
            }

            function abretropaslançae() {
                var unit2 = $('.icon_P3').text();
                var unit222 = $('.max_P3').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_P3').val(str.trim()).keyup();
                        jQuery('#v-train_P3').val(str.trim()).keyup();
                    }, 550);
                }
            }

            function clicarecrutlançae() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }

            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'infantry'
                    });
                }, 1000);
            }
        }
    });

    //=============================================================== BOTÃO EVOLUIR PALADINOS ==============================================================
    var Evocavaloselite = "";

    $("#StopEvocavaloselite").click(function () {
        $("#bntEvocavaloselite").trigger('pause');
        $("#bntEvocavaloselite").prop("currentTime", 0);
        $("#bntEvocavaloselite").css("display", "block");
        $("#StopEvocavaloselite").css("display", "none");
        clearInterval(Evocavaloselite);
    });

    $("#bntEvocavaloselite").click(function () {
        $("#bntEvocavaloselite").trigger('play');
        $("#bntEvocavaloselite").css("display", "none");
        $("#StopEvocavaloselite").css("display", "block");

        Evocavaloselite = setInterval(function () {
            provincias();
        }, 15000); // Intervalo de 15 segundos entre execuções completas

        function provincias() {
            setTimeout(cave, 1000);          // 1 segundo para abrir o quartel
            setTimeout(abretropascave, 4000); // 3 segundos para identificar tropas após abrir o quartel
            setTimeout(clicarecrutcave, 8000); // 4 segundos para clicar em recrutar
            setTimeout(PROXIMO, 12000);         // 4 segundos para mudar de província após recrutar

            function cave() {
                setTimeout(function () {
                    xajax_viewBarrackTabs(container.open({
                        saveName: 'cavalery',
                        title: 'Quartel de Cavalaria'
                    }), {
                        'barrackId': '3',
                        'tab': '4'
                    });
                }, 850);
            }

            function abretropascave() {
                var unit2 = $('.icon_K3').text();
                var unit222 = $('.max_K3').text();
                var tropas = unit222.trim();
                var str = tropas.replace(/\s/g, '');
                if (str >= 1) {
                    setTimeout(function () {
                        jQuery('#train_K3').val(str.trim()).keyup();
                        jQuery('#v-train_K3').val(str.trim()).keyup();
                    }, 550);
                }
            }

            function clicarecrutcave() {
                setTimeout(function () {
                    $('.large-circle-buttons.neutral-confirm.fright').click();
                }, 3900);
            }

            function PROXIMO() {
                setTimeout(function () {
                    xajax_doSwitchProvince({
                        to: 'next',
                        windowSwitch: 'cavalery'
                    });
                }, 1000);
            }
        }
    });

    //=============================================================== BOTÃO EVOLUIR PARA ELITES ==============================================================
    var Evoelite = "";
    $("#StopEvoelite").click(function () {
        $("#bntEvoelite").trigger('pause');
        $("#bntEvoelite").prop("currentTime", 0);
        $("#bntEvoelite").css("display", "block");
        $("#StopEvoelite").css("display", "none");
        clearInterval(Evoelite);
    });
    $("#bntEvoelite").click(function () {
        $("#bntEvoelite").trigger('play');
        $("#bntEvoelite").css("display", "none");
        $("#StopEvoelite").css("display", "block");
        Evoelite = setInterval(function () {
            makeFlashAction({ 'action': 'viewPalace', 'saveName': 'Palace', 'title': 'Palace' });
            xajax_viewPalace('Palace', { 'tab': 2 });
            setTimeout(getItemsCount.bind(undefined, upgradeArchers), 5000); // Aumentei para 5 segundos
        }, 20000);  // Aumentei para 20 segundos
    });
    var itemsCount;
    function getItemsCount(myCallback) {
        var len = $('.gp-card-location.tooltip-arrow.ui-pass').length;
        for (let i = len - 1; i >= 0; i--) {
            var item = $('.gp-card-location.tooltip-arrow.ui-pass').eq(i).attr('content');
            if (item.includes('province') || item.includes('colony')) {
                itemsCount = i + 1;
                break;
            }
        }
        myCallback(upgradeHorses);
    }
    function upgradeArchers(myCallback) {
        makeFlashAction({ 'action': 'viewBarrackTabs', 'saveName': 'archer', 'title': 'Archery Barracks', 'params': { 'barrackId': 1 } });
        xajax_viewBarrackTabs('archer', { 'barrackId': '1', 'tab': '4' });
        for (let i = 0; i < itemsCount; i++) {
            setTimeout(function () {
                xajax_doUpgrade('archer', { unit: 'S3', amount: parseInt($('.max_S3').text().replace(/\s/g, "")) });
                xajax_doSwitchProvince({ to: 'next', windowSwitch: 'archer' });
            }, i * 3000); // Aumentei para 3 segundos
        }
        setTimeout(myCallback.bind(undefined, upgradeInfantry), itemsCount * 3000 + 5000); // Ajustei os tempos de acordo
    }
    function upgradeHorses(myCallback) {
        makeFlashAction({ 'action': 'viewBarrackTabs', 'saveName': 'cavalry', 'title': 'Cavalry Barracks', 'params': { 'barrackId': 3 } });
        xajax_viewBarrackTabs('cavalry', { 'barrackId': '3', 'tab': '4' });
        for (let i = 0; i < itemsCount; i++) {
            setTimeout(function () {
                xajax_doUpgrade('cavalry', { unit: 'K3', amount: parseInt($('.max_K3').text().replace(/\s/g, "")) });
                xajax_doSwitchProvince({ to: 'next', windowSwitch: 'cavalry' });
            }, i * 3000); // Aumentei para 3 segundos
        }
        setTimeout(myCallback, itemsCount * 3000 + 5000); // Ajustei os tempos de acordo
    }
    function upgradeInfantry() {
        makeFlashAction({ 'action': 'viewBarrackTabs', 'saveName': 'infantry', 'title': 'Infantry Barracks', 'params': { 'barrackId': 2 } });
        xajax_viewBarrackTabs('infantry', { 'barrackId': '2', 'tab': '4' });
        for (let i = 0; i < itemsCount; i++) {
            setTimeout(function () {
                xajax_doUpgrade('infantry', { unit: 'M3', amount: parseInt($('.max_M3').text().replace(/\s/g, "")) });
                xajax_doUpgrade('infantry', { unit: 'P3', amount: parseInt($('.max_P3').text().replace(/\s/g, "")) });
                xajax_doSwitchProvince({ to: 'next', windowSwitch: 'infantry' });
            }, i * 4000); // Aumentei para 4 segundos
        }
    }
    // ==================================================================== BOTOES ABA EVENTOS ================================================================
    //=============================================================== FUNÇÃO ATACAR EVENTOS =======================================================================
    function AtacarEventos() {
        if ($(".mission-my").length > 0) {
            console.log('Aguardando Chegada de Tropas ---->');
        } else
            setTimeout(function () {
                xajax_viewOperationCenter(container.open({
                    saveName: 'operation-center',
                    title: 'Centro de Comando'
                }), {
                    'tab': 'attack',
                    'userId': "3001"
                });
                $('.window-wrapper.ui-draggable.active').hide();
                setTimeout(function () {
                    console.log('Evento ativo, enviando ataque----> OK');
                    $('a#select-all-army').click();
                }, 2000);
                setTimeout(function () {
                    siegeAttackCheck('$(\'#attackType\').val(\'1\'); xajax_doAttack(\'OperationCenter\', xajax.getFormValues(\'sendAttackForm\'));');
                    $('.window-wrapper.ui-draggable.active').hide();
                }, 2500);
                setTimeout(function () {
                    (container.close({
                        saveName: 'missions',
                        cancelCallback: true,
                        flow: true,
                        closedWith: 'click'
                    }));
                    $('.window-wrapper.ui-draggable.active').hide();
                }, 3500);
                setTimeout(function () {
                    (container.close({
                        saveName: 'terminalError',
                        cancelCallback: true,
                        flow: true,
                        closedWith: 'click'
                    }));
                    $('.window-wrapper.ui-draggable.active').hide();
                }, 4500);
            }, 2000);
    }
    //=============================================================== BOTAO ATACAR FORTALEZA========================================================================
    var AtkFortaleza = ""
    $("#StopAtkFortaleza").click(function () {
        $("#bntAtkFortaleza").trigger('pause');
        $("#bntAtkFortaleza").prop("currentTime", 0);
        $("#bntAtkFortaleza").css("display", "block");
        $("#StopAtkFortaleza").css("display", "none");
        clearInterval(AtkFortaleza);
    })
    $("#bntAtkFortaleza").click(function () {
        $("#bntAtkFortaleza").trigger('play');
        $("#bntAtkFortaleza").css("display", "none");
        $("#StopAtkFortaleza").css("display", "block");
        console.log('Inciando Script Fortaleza das Trevas ---->');
        AtkFortaleza = setInterval(function () {
            if ($(".ui-ftimer.countdown.stopSeconds.toHours").length > 0) {
                if ($('.clock').text() > "17:00:00") {
                    if ($('.clock').text() < "23:59:59") {
                        javascript: refreshUI('Atualizar');
                        AtacarEventos();
                    }
                }
            }
            if ($('.clock').text() < "17:00:00") {
                console.log('Aguardando Inicio da Fortaleza ---->');
            }
        }, 6000)
    })
    //=============================================================== BOTAO ATACAR PRISAO========================================================================
    var AtkPrisao = ""
    $("#StopAtkPrisao").click(function () {
        $("#bntAtkPrisao").trigger('pause');
        $("#bntAtkPrisao").prop("currentTime", 0);
        $("#bntAtkPrisao").css("display", "block");
        $("#StopAtkPrisao").css("display", "none");
        clearInterval(AtkPrisao);
    });
    $("#bntAtkPrisao").click(function () {
        $("#bntAtkPrisao").trigger('play');
        $("#bntAtkPrisao").css("display", "none");
        $("#StopAtkPrisao").css("display", "block");
        console.log('Inciando Script Atacar Prisão de Pedra ---->');
        AtkPrisao = setInterval(function () {
            if ($(".ui-ftimer.countdown.stopSeconds.toHours").length > 0) {
                if ($('.clock').text() > "17:00:00") {
                    if ($('.clock').text() < "23:59:59") {
                        javascript: refreshUI('Atualizar');
                        AtacarEventos();
                    }
                }
            }
            if ($('.clock').text() < "17:00:00") {
                console.log('Aguardando Inicio da Prisão ---->');
            }
        }, 6000);
    })
    //=============================================================== BOTAO ATACAR CRANIO ========================================================================
    var AtkCranio = ""
    $("#StopAtkCranio").click(function () {
        $("#bntAtkCranio").trigger('pause');
        $("#bntAtkCranio").prop("currentTime", 0);
        $("#bntAtkCranio").css("display", "block");
        $("#StopAtkCranio").css("display", "none");
        clearInterval(AtkCranio);
    });
    $("#bntAtkCranio").click(function () {
        $("#bntAtkCranio").trigger('play');
        $("#bntAtkCranio").css("display", "none");
        $("#StopAtkCranio").css("display", "block");
        console.log('Inciando Script Atacar Crânio ---->');
        AtkCranio = setInterval(function () {
            if ($(".ui-ftimer.countdown.stopSeconds.toHours").length > 0) {
                if ($('.clock').text() > "17:00:00") {
                    if ($('.clock').text() < "23:59:59") {
                        javascript: refreshUI('Atualizar');
                        AtacarEventos();
                    }
                }
            }
            if ($('.clock').text() < "17:00:00") {
                console.log('Aguardando Inicio do Crânio ---->');
            }
        }, 6000);
    })
    // ==================================================================== BOTOES ABA ESPECIALIZAÇÕES ================================================================
    // ==================================================================== BOTOES ABA DOBRO ================================================================
    // ==================================================================== BOTOES ABA PESQUISA ================================================================
    // ==================================================================== BOTOES ABA EXTRAS ================================================================
    //========================================================== BOTAO ATACAR CAVERNA DA CONQUISTA ==============================================================
    var AtkCaverna = null;
    var intervaloExecucao = (30 * 60 * 1000) + (10 * 1000); // 30 minutos e 10 segundos em milissegundos

    $("#StopAtkCaverna").click(function () {
        stopAtkCaverna();
    });

    $("#bntAtkCaverna").click(function () {
        startAtkCaverna();
    });

    function startAtkCaverna() {
        $("#bntAtkCaverna").trigger('play');
        $("#bntAtkCaverna").css("display", "none");
        $("#StopAtkCaverna").css("display", "block");
        console.log('Iniciando Script Atacar Caverna da Conquista ---->');

        // Executa o ataque imediatamente
        Atacar_Cav_Conquista();

        // Configura o intervalo para 30 minutos e 10 segundos
        AtkCaverna = setInterval(function () {
            console.log('Executando ataque às cavernas...');
            Atacar_Cav_Conquista();
        }, intervaloExecucao);
    }

    function stopAtkCaverna() {
        $("#bntAtkCaverna").trigger('pause');
        $("#bntAtkCaverna").prop("currentTime", 0);
        $("#bntAtkCaverna").css("display", "block");
        $("#StopAtkCaverna").css("display", "none");

        if (AtkCaverna !== null) {
            clearInterval(AtkCaverna);
            AtkCaverna = null;
        }
    }

    function Atacar_Cav_Conquista() {
        setTimeout(function () {
            xajax_viewOperationCenter(container.open({ saveName: 'operation-center', title: 'Centro de Comando' }), { 'tab': 'attack', 'userId': "5001" });
            $('.window-wrapper.ui-draggable.active').hide();

            setTimeout(function () {
                console.log('Caverna da Conquista, enviando ataque----> OK');
                $('a#select-all-army').click();
            }, 2000);

            setTimeout(function () {
                siegeAttackCheck('$(\'#attackType\').val(\'1\'); xajax_doAttack(\'OperationCenter\', xajax.getFormValues(\'sendAttackForm\'));');
                $('.window-wrapper.ui-draggable.active').hide();
            }, 2500);

            setTimeout(function () {
                container.close({ saveName: 'missions', cancelCallback: true, flow: true, closedWith: 'click' });
                $('.window-wrapper.ui-draggable.active').hide();
            }, 3500);

            setTimeout(function () {
                container.close({ saveName: 'terminalError', cancelCallback: true, flow: true, closedWith: 'click' });
                $('.window-wrapper.ui-draggable.active').hide();
            }, 4500);
        }, 2000);
    }

    //========================================================== BOTAO ATACAR CAVERNA DA CONQUISTA ==============================================================
    var AtkCavernainst = null;
    var intervaloExecucaoInst = (30 * 60 * 1000) + (10 * 1000); // Intervalo de 30 minutos e 10 segundos

    $("#StopAtkCavernainst").click(function () {
        stopAtkCavernainst();
    });

    $("#bntAtkCavernainst").click(function () {
        startAtkCavernainst();
    });

    function startAtkCavernainst() {
        $("#bntAtkCavernainst").trigger('play');
        $("#bntAtkCavernainst").css("display", "none");
        $("#StopAtkCavernainst").css("display", "block");
        console.log('Iniciando Script Atacar Caverna da Conquista ---->');

        // Executa o ataque imediatamente
        Atacar_Cav_Conquista_Inst();

        // Configura o intervalo
        AtkCavernainst = setInterval(function () {
            Atacar_Cav_Conquista_Inst();
        }, intervaloExecucaoInst);
    }

    function stopAtkCavernainst() {
        $("#bntAtkCavernainst").trigger('pause');
        $("#bntAtkCavernainst").prop("currentTime", 0);
        $("#bntAtkCavernainst").css("display", "block");
        $("#StopAtkCavernainst").css("display", "none");

        if (AtkCavernainst !== null) {
            clearInterval(AtkCavernainst);
            AtkCavernainst = null;
        }
    }

    function Atacar_Cav_Conquista_Inst() {

        setTimeout(function () {
            xajax_doUserDungeonBuyAndAttack(container.open({ saveName: 'operation-center', title: 'Centro de Comando' }), { 'tab': 'attack', 'userId': "5001" });
            $('.window-wrapper.ui-draggable.active').hide();

            setTimeout(function () {
                console.log('Caverna da Conquista, enviando ataque----> OK');
                $('a#select-all-army').click();
            }, 2000);

            setTimeout(function () {
                siegeAttackCheck('$(\'#attackType\').val(\'1\'); xajax_doAttack(\'OperationCenter\', xajax.getFormValues(\'sendAttackForm\'));');
                $('.window-wrapper.ui-draggable.active').hide();
            }, 2500);

            setTimeout(function () {
                container.close({ saveName: 'missions', cancelCallback: true, flow: true, closedWith: 'click' });
                $('.window-wrapper.ui-draggable.active').hide();
            }, 3500);

            setTimeout(function () {
                container.close({ saveName: 'terminalError', cancelCallback: true, flow: true, closedWith: 'click' });
                $('.window-wrapper.ui-draggable.active').hide();
            }, 4500);
        }, 2000);
    }


    //=================================================== FUNÇÃO LOOP TREINOS DE GENERAIS E GOVERNADORES =======================================================
    function loop_50x() {
        console.log('Iniciando Repetição----> Ok');
        let uGov = +prompt('Quantos treinos deseja executar? (até 50)');
        for (let i = 0; i < 50; i++) {
            if (i === uGov) {
                break;
            }
            (function (i) {
                console.log("Função Repetir " + i + " ----> Ok");
                setTimeout(function () {
                    console.log("Treino n. " + i);
                    setTimeout(function () {
                        console.log('Clica no botão + para selecionar Nobre-> OK');
                        $('.gp-icons.add.addPerson')[0].click()
                    }, 3000)
                    setTimeout(function () {
                        console.log('Clica no primeiro Quadro de Treino ----> OK');
                        $('.gp-card.empty.holding-num-0-0.s84.emptyHolding.selected')[0].click()
                    }, 6000)
                    setTimeout(function () {
                        console.log('Clica no botão Treinamento ----> OK');
                        $('.centered-block.visual-loading.fnone .button.blue')[0].click()
                    }, 8000)
                    setTimeout(function () {
                        console.log('Paga o treinamento ----> OK');
                        $('.button.small.monetization')[0].click()
                    }, 10000)
                }, 13000 * i);
            })(i);
        }
    }
    //=============================================================== BOTAO 50 TREINOS GOVERNADOR========================================================================
    var TreinoGov_ = ""
    $("#StopTreinoGov").click(function () {
        $("#bntTreinoGov").trigger('pause');
        $("#bntTreinoGov").prop("currentTime", 0);
        $("#bntTreinoGov").css("display", "block");
        $("#StopTreinoGov").css("display", "none");
        clearInterval(TreinoGov);
    });
    $("#bntTreinoGov").click(function () {
        $("#bntTreinoGov").trigger('play');
        $("#bntTreinoGov").css("display", "none");
        $("#StopTreinoGov").css("display", "block");
        TreinoGov_ = console.log('Iniciar Treino dos Generais ----> OK');
        setTimeout(function tgov() {
            console.log('Abre o Teclado ----> OK');
            $('.ui-small-icon.hot-keys')[0].click()
            setTimeout(function () {
                console.log('Abrindo Palácio ----> OK');
                $('.hotkey.palace.ui-ib')[0].click()
            }, 4000)
            setTimeout(function () {
                console.log('Vai para o treino de Governadores ----> OK');
                xajax_viewPalace('Palace', { tab: '2', subTab: 'training' })
            }, 6000)
            setTimeout(function () {
                console.log('Iniciar Repetição ----> OK');
                loop_50x()
            }, 7000)
        }, 3000)
    })
    //=============================================================== BOTAO 50 TREINOS GENERAIS========================================================================
    var TreinoGen = ""
    $("#StopTreinoGenerais").click(function () {
        $("#bntTreinoGenerais").trigger('pause');
        $("#bntTreinoGenerais").prop("currentTime", 0);
        $("#bntTreinoGenerais").css("display", "block");
        $("#StopTreinoGenerais").css("display", "none");
        clearInterval(TreinoGen);
    });
    $("#bntTreinoGenerais").click(function () {
        $("#bntTreinoGenerais").trigger('play');
        $("#bntTreinoGenerais").css("display", "none");
        $("#StopTreinoGenerais").css("display", "block");
        TreinoGen = console.log('Iniciar Treino dos Governadores ----> OK');
        setTimeout(function tgen() {
            console.log('Abre o Teclado ----> OK');
            $('.ui-small-icon.hot-keys')[0].click()
            setTimeout(function () {
                console.log('Abrindo Palácio ----> OK');
                $('.hotkey.palace.ui-ib')[0].click()
            }, 4000)
            setTimeout(function () {
                console.log('Vai para o treino de Generais ----> OK');
                xajax_viewPalace('Palace', { tab: '3', subTab: 'training' })
            }, 6000)
            setTimeout(function () {
                console.log('Iniciar Repetição ----> OK');
                loop_50x()
            }, 7000)
        }, 3000)
    })
    //-----------------------ACHAR OVOS---------------------------------------------
    var acharovos = "";
    $("#Stopacharovos").click(function () {
        $("#bntacharovos").trigger('pause');
        $("#bntacharovos").prop("currentTime", 0);
        $("#bntacharovos").css("display", "block");
        $("#Stopacharovos").css("display", "none");
        clearInterval(acharovos);
    });
    $("#bntacharovos").click(function () {
        $("#bntacharovos").trigger('play');
        $("#bntacharovos").css("display", "none");
        $("#Stopacharovos").css("display", "block");
        acharovos = setInterval(function () {
            searchForEggsWithIds(ids);
        }, 4000); // Intervalo de 4 segundos
        var ids = prompt("Insira os IDs das cidades separados por vírgula:").split(",");
        function searchForEggsWithIds(ids) {
            ids.forEach(function (id) {
                console.log("Executando busca para ID:", id); // Adicione esta linha
                xajax_searchForEggs(container.open({ saveName: 'eggsSearch', title: 'Caçar ovos' }), { id: id }, function () {
                    console.log("Busca concluída para ID:", id);
                });
            });
        }
    });
    //-----------------------ACHAR BOLAS---------------------------------------------
    var acharbolas = "";
    $("#Stopacharbolas").click(function () {
        $("#bntacharbolas").trigger('pause');
        $("#bntacharbolas").prop("currentTime", 0);
        $("#bntacharbolas").css("display", "block");
        $("#Stopacharbolas").css("display", "none");
        clearInterval(acharbolas);
    });
    $("#bntacharbolas").click(function () {
        $("#bntacharbolas").trigger('play');
        $("#bntacharbolas").css("display", "none");
        $("#Stopacharbolas").css("display", "block");
        acharbolas = setInterval(function () {
            searchForEggsWithIds(ids);
        }, 7000); // Intervalo de 7 segundos
        var ids = prompt("Insira os IDs das cidades separados por vírgula:").split(",");
        function searchForEggsWithIds(ids) {
            var completedSearches = 0;
            ids.forEach(function (id, index) {
                setTimeout(function () {
                    console.log("Executando busca para ID:", id);
                    xajax_searchForBalls(container.open({ saveName: 'ballsSearch', title: 'Caça às bolas' }), { id: id }, function () {
                        console.log("Busca concluída para ID:", id);
                        completedSearches++;
                        if (completedSearches === ids.length) {
                            alert("Todas as buscas foram concluídas!");
                        }
                    });
                }, index * 5000); // Atraso de 3 segundos entre cada iteração
            });
        }
    });
    // Simulator -----------------------------------------------------------------------------------------
    var newContTop
    var newContBot
    function CloneGenerals() {
        if (newContTop !== null) {
            newContTop.html('')
            newContTop.append($('#simulator-generals-top .simulator-general-holder').clone())
        }
        if (newContBot !== null) {
            newContBot.html('')
            newContBot.append($('#simulator-generals-bottom .simulator-general-holder').clone())
        }
    }
    function OnSimulator() {
        newContTop = $('<div></div>')
        $('#simulator-army-top').after(newContTop)
        newContBot = $('<div></div>')
        $('#simulator-army-bottom').after(newContBot)
        CloneGenerals()
        $('.table-header-icons.army').parent().click(function () {
            CloneGenerals()
        })
        $('.table-header-icons.settings').parent().click(function () {
            newContTop.html('')
            newContBot.html('')
        });
        $('.table-header-icons.generals').parent().click(function () {
            newContTop.html('')
            newContBot.html('')
        });
    }
    function hookFunctiono(object, functionName, callback) {
        (function (originalFunction) {
            object[functionName] = function () {
                var returnValue = originalFunction.apply(this, arguments)
                callback.apply(this, arguments);
                return returnValue
            }
        }(object[functionName]))
    }
    function InitSimulator() {
        hookFunctiono(container, 'onLoad', function (arg1) {
            if (typeof arg1 != 'undefined') {
                if (arg1 == 'operation-center' || arg1 == 'OperationCenter') {
                    var opc = $('#operation-center')
                    var simulatorsTab = $('.tab-simulators', opc)
                    if (simulatorsTab.hasClass('active')) {
                        OnSimulator()
                    }
                }
                else if (arg1 == 'simulator-generals-top' || arg1 == 'simulator-generals-bottom') {
                    CloneGenerals()
                }
            }
        });
    }
    $(document).ready(function () {
        function InitCheckSimulator() {
            if (typeof container !== 'undefined') {
                InitSimulator()
            }
            else {
                setTimeout(InitCheckSimulator, 500)
            }
        }
        InitCheckSimulator()
    })
    // ----------------------------------ATACAR CIDADES INDEPENDENTES-----------------------------------------------------------------
    const button = $("<button></button>").addClass("sim-skill skill-406 tooltip-arrow ui-pass").css({
        "display": "inline-block",
        "width": "41px",
        "height": "41px",
        "position": "fixed",
        "bottom": "75px",
        "left": "100px",
        "border": "1px solid #F0DEB2",
        "border-radius": "3px",
        "box-shadow": "0 0 2px #000",
        "padding": "0", // Garantir que o padding não afete o tamanho
        "margin": "0", // Garantir que a margem não afete o tamanho
        "box-sizing": "border-box" // Inclui a borda no tamanho total do elemento
    }).attr("title", "Atacar Cidades Independentes").on("click", createCustomWindow);
    $("body").append(button);
    // Criando a janela ----------------------------------------------------------------------------------
    function createCustomWindow() {
        var contador = 1; // valor inicial do contador
        let teste = [];
        $(document).ready(function () {
            var cssContent = {
                width: '800px',
                height: '720px',
                left: '30%',
                top: '50%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#B8A887',
                border: '',
                padding: '0px',
                borderRadius: '9px',
                position: 'flex'
            };
            var cssTitle = {
                color: '#fff'
            };
            // Criação da div principal
            var divContent = $('<div>', {
                id: 'messageboxcustomWindow',
                class: 'window-wrapper active ui-draggable',
                css: cssContent,
                append: $('<div>', {
                    class: 'window-title',
                    css: cssTitle,
                    append: [
                        $('<span>', {
                            class: 'txt-title',
                            text: '💎ATTACK INDEPENDENT CITIES by rutiere_sena💎'
                        }),
                        $('<a>', {
                            class: 'ui-ib fright close',
                            href: 'javascript:void(0)',
                            title: 'Fechar',
                            click: closeCustomWindow
                        }),
                    ]
                })
            })
                .appendTo('body').draggable({
                    handle: ".window-title",
                    containment: "parent"
                });
            // ---------------------------------------------------------------------------------------------------
            // Cria a div do botões ------------------------------------------------------------------------------
            const div_botoes = $('<div>', {
                class: 'div_botões',
                css: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            });
            // Cria 2 colunas na div botões ----------------------------------------------------------------------
            const div_coluna1 = $('<div>', {
                //text: 'Coluna 1',
                class: 'coluna 1',
                css: {
                    flex: '1',
                    display: 'flex', // adiciona esta linha
                    flexDirection: 'row', // adiciona esta linha
                    justifyContent: 'center', // adiciona esta linha
                }
            });
            const div_coluna2 = $('<div>', {
                //text: 'Coluna 2',
                class: 'coluna2',
                css: {
                    flex: '1',
                    display: 'flex', // adiciona esta linha
                    flexDirection: 'row', // adiciona esta linha
                    justifyContent: 'right', // adiciona esta linha
                    marginRight: '10px',
                }
            });
            div_botoes.append(div_coluna1, div_coluna2);
            // Criar o primeiro botão e adiciona na coluna 1 ------------------------------------------------------
            /*const btnSalvar = $('<button>', {
                text: 'Salvar',
                class: 'btn_salvar',
                click: function () {
                    contador++;
                    //cria()
                },
                css: {
                    width: '80px',
                    height: '18px',
                    display: 'flex',
                    backgroundColor: '',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid black',
                    borderRadius: '6px',
                    padding: '10px',
                    margin: '10px',
                    alignItems: 'center'
                }
            }).appendTo(div_coluna1);
*/
            // Criar o segundo botão e adiciona na coluna 1 ------------------------------------------------------
            const btn_ler_cidades = $('<button>', {
                text: 'Ler Ids',
                class: 'ler_cidades',
                click: function () {
                    ler_cidades()
                },
                css: {
                    width: '80px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid red',
                    borderRadius: '6px',
                    padding: '10px',
                    margin: '10px',
                    alignItems: 'center'
                }
            }).appendTo(div_coluna1);
            // ---------------------------------------------------------------------------------------------------
            // Abre a Universidade Militar - Oculta --------------------------------------------------------------
            makeFlashAction({
                'action': 'viewResearchList',
                'saveName': 'developmentResearchScienceMilitary',
                'title': 'Militares',
                'params': {
                    'tab': 'military',
                    'science': true
                }
            });
            $('.window-wrapper.ui-draggable.active').hide();
            function createInput(levelValue) {
                const doutrina_ = $('<label>', {
                    for: 'qtd_ataques',
                    class: 'dout_qtd_ataques',
                    text: 'Qtd de Ataques:'
                });
                $('<input>', {
                    type: 'text',
                    id: 'qtd_ataques',
                    class: 'inp_qtd_ataques',
                    css: {
                        width: '30px',
                        border: '1px solid red',
                        borderRadius: '6px',
                        height: '10px',
                        padding: '5px',
                        margin: '10px',
                        textAlign: 'center',
                    },
                    value: JSON.parse(localStorage.getItem('qtd_ataques')) || ''
                }).on('input', function () {
                    const doutrinas = $(this).val();
                    localStorage.setItem('qtd_ataques', JSON.stringify(doutrinas));
                }).appendTo(doutrina_);
                $('<span>', {
                    text: '  ' + levelValue + '  ',
                    class: 'level-value max',
                    title: 'Nível de sua Doutrina Militar ',
                    css: {
                        color: 'blue',
                        fontWeight: 'bold',
                        padding: '0px',
                        margin: '2px',
                    }
                }).appendTo(doutrina_);
                if (typeof div_coluna2 !== 'undefined') {
                    // Assegura que o elemento esteja visível
                    doutrina_.css({
                        display: 'block', // Garante que o elemento esteja visível
                        visibility: 'visible'
                    });
                    div_coluna2.append(doutrina_);
                } else {
                    console.warn('div_coluna2 não está definido');
                }
            }
            const observer = new MutationObserver(function (mutationsList, observer) {
                const levelElement = document.querySelector('.view-11.ui80.village-scale-half .window-wrapper.ui-draggable.io-animm-fix .development-row-258 .th-level .level-value');
                if (levelElement) {
                    const levelValue = levelElement.textContent.trim();
                    console.log(levelValue);
                    localStorage.setItem('levelValue', levelValue);
                    createInput(levelValue);
                    observer.disconnect(); // Para de observar após encontrar o elemento
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            // ---------------------------------------------------------------------------------------------------
            /*const nivelPrefixoCidade = {
              1001: 'cid_1001',
              1002: 'cid_1002',
              1003: 'cid_1003',
              1004: 'cid_1004',
              1005: 'cid_1005',
              1006: 'cid_1003',
              1007: 'cid_1007',
              1008: 'cid_1008',
              1009: 'cid_1009',
              1010: 'cid_1010',
              1011: 'cid_1011',
              1012: 'cid_1012',
              1013: 'cid_1013',
              1014: 'cid_1014',
              // adicione aqui outros níveis e seus prefixos correspondentes
            };
            */
            // Adicionar a div botões à divContent ---------------------------------------------------------------
            div_botoes.appendTo(divContent);
            // Cria div das linhas de ataque ---------------------------------------------------------------------
            const div_a = $('<div>', {
                id: 'div_a',
                class: 'class div_a',
                css: {
                    width: '760px',
                    height: '600px',
                    left: '1px',
                    hight: '1px',
                    top: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '',
                    border: '1px solid red',
                    padding: '12px',
                    borderRadius: '7px',
                    position: 'flex',
                    position: 'flex',
                    margin: '2px auto 0' // adicionado 70px de margem superior
                }
            })
            div_a.appendTo(divContent);
            // ---------------------------------------------------------------------------------------------------
            // Cria as linhas de configuração --------------------------------------------------------------------
            for (let i = contador; i <= 10; ++i) {
                const divInputs = $('<div>', {
                    class: 'inputs-container',
                    id: 'linha' + i,
                    css: {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: '1px solid red',
                        borderRadius: '50px',
                        padding: '12px',
                        marginBottom: '10px'
                    },
                    append: [
                        // ---------------------------------------------------------------------------------------------------
                        // Mapeia cada nível para o prefixo correspondente do identificador da cidade
                        // Cria o Campo Nível
                        $('<label>', {
                            for: `Nível-${i}`,
                            text: 'Nível:'
                        }),
                        $('<select>', {
                            id: `Nível-${i}`,
                            css: {
                                width: '50px',
                                height: '23px',
                                borderRadius: '6px',
                                marginRight: '10px'
                            },
                            append: Array.from({
                                length: 15
                            }, (_, j) => $('<option>', {
                                value: 1000 + j + 1,
                                text: (0 + j + 1).toString()
                            })),
                            // Preenche o valor do select com o valor salvo no localStorage
                            val: JSON.parse(localStorage.getItem(`Nível-${i}`)) || ''
                        }).on('change', function () {
                            const nivel = $(this).val();
                            // Salva o valor do select no localStorage
                            localStorage.setItem(`Nível-${i}`, JSON.stringify(nivel));
                            // Preenche o valor do input com o valor correspondente
                            const cidades = window[`cid_${nivel}`];
                            $(`#n_cidades-${i}`).val(cidades);
                            // Salva o valor do input no localStorage
                            localStorage.setItem(`n_cidades-${i}`, JSON.stringify(cidades));
                        }),
                        // Cria o Input do Numero de Cidades
                        $('<label>', {
                            for: `n_cidades-${i}`,
                            text: 'IDS:'
                        }),
                        // Obtém a lista de valores salvos no localStorage e preenche o valor do input
                        $('<input>', {
                            type: 'text',
                            id: `n_cidades-${i}`,
                            css: {
                                width: '320px',
                                height: '23px',
                                borderRadius: '6px',
                                marginRight: '10px'
                            },
                            // Preenche o valor do input com os valores salvos no localStorage
                            value: JSON.parse(localStorage.getItem(`n_cidades-${i}`)) || ''
                        }).on('input', function () {
                            const cidades = $(this).val();
                            // Salva a nova lista de valores no localStorage
                            localStorage.setItem(`n_cidades-${i}`, JSON.stringify(cidades));
                        }),
                        // Cria o Campo Formação -----------------------------------------------------------------------------
                        $('<label>', {
                            for: `n_form-${i}`,
                            text: 'Formação:'
                        }),
                        $('<select>', {
                            id: `n_form-${i}`,
                            css: {
                                width: '50px',
                                height: '23px',
                                borderRadius: '6px',
                                marginRight: '10px'
                            },
                            append: Array.from({
                                length: 10
                            }, (_, j) => $('<option>', {
                                value: -1 + j + 1,
                                text: (0 + j + 1).toString()
                            })),
                            // Preenche o valor do select com o valor salvo no localStorage
                            val: JSON.parse(localStorage.getItem(`n_form-${i}`)) || ''
                        }).on('change', function () {
                            const formacao = $(this).val();
                            // Salva o valor do select no localStorage
                            localStorage.setItem(`n_form-${i}`, JSON.stringify(formacao));
                        }),
                        // ---------------------------------------------------------------------------------------------------
                        // Cria o Botão de Atacar ----------------------------------------------------------------------------
                        $('<button>', {
                            text: 'Atacar',
                            css: {
                                width: '70px',
                                border: '1px solid red',
                                borderRadius: '6px'
                            },
                            click: function () {
                                AtacarTodos(`Nível-${i}`, `n_cidades-${i}`, `n_form-${i}`, `provinceIds-${i}`);
                            }
                        })
                        // ---------------------------------------------------------------------------------------------------
                    ]
                })
                divInputs.appendTo(div_a);
            }
        })
    }
    // ---------------------------------------------------------------------------------------------------
    function closeCustomWindow() {
        $('#messageboxcustomWindow').remove();
    }
    // ---------------------------------------------------------------------------------------------------
    function AtacarTodos(nivelId, cidadesId, formacaoId) {
        var level = $('#' + nivelId).val();
        var cities = $('#' + cidadesId).val();
        var formation = $('#' + formacaoId).val();
        var qtd_at = $('#qtd_ataques').val();
        var totalCities = qtd_at; // armazena o número total de cidades a serem atacadas
        var attackedCities = 0; // armazena quantas cidades já foram atacadas
        console.log('Executar ' + qtd_at + ' ataques', 'Atacando com nível:', level, 'cidades:', cities, 'formação:', formation);
        // Separa a lista de cidades em um array de cidades separadas
        var citiesArray = cities.split(',');
        // Seleciona apenas as três primeiras cidades
        var selectedCities = citiesArray.slice(0, qtd_at);
        // Itera sobre o array de cidades selecionadas e ataca cada uma delas
        selectedCities.forEach(function (city, index) {
            setTimeout(function () {
                console.log('Atacando cidade ' + city);
                xajax_viewOperationCenter(container.open({
                    saveName: 'operation-center',
                    title: 'Centro de Comando'
                }), {
                    'tab': 'attack',
                    'userId': level,
                    'provinceId': city
                });
                SetFocusTop();
                setTimeout(function () {
                    $('#preset' + formation).click();
                }, 2000);
                setTimeout(function () {
                    $('#attackType').val('1');
                    xajax_doAttack('OperationCenter', xajax.getFormValues('sendAttackForm'));
                    // incrementa a variável attackedCities a cada ataque
                    attackedCities++;
                    // Se já foram atacadas as "qtd_at" primeiras cidades, para de iterar
                    if (attackedCities >= totalCities) {
                        alert('Ataques concluídos!');
                    }
                }, 4000);
            }, index * 8000); // Aguarda 8 segundos entre cada ataque
        });
    }
    // ---------------------------------------------------------------------------------------------------
    // função para ler todas as cidades de todos os níveis que estejam espiadas --------------------------
    function ler_cidades() {
        async function extractCityNumbersFromReport(reportId) {
            const saveName = `mass-spy-report-${reportId}`;
            const title = 'Espionagem em massa: Cidade independente';
            // Abrir o relatório usando xajax_doMassSpy
            xajax_doMassSpy(container.open({
                saveName,
                title
            }), {
                uId: reportId
            });
            $('.window-wrapper.ui-draggable.active').hide();
            // Esperar um breve momento (por exemplo, 1 segundo) para o relatório ser carregado
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Extrair as informações do relatório e exibi-las no console, se houver informações de cidade
            const elementId = `#messageboxmass-spy-report-${reportId}`;
            const element = document.querySelector(elementId);
            if (element) {
                const cityNumbers = Array.from(element.querySelectorAll('td span.prov-pict[title]'), citySpan => citySpan.getAttribute('title').match(/\d+/)[0]);
                if (cityNumbers.length > 0) {
                    const varName = `cid_${reportId}`;
                    window[varName] = cityNumbers;
                    localStorage.setItem(varName, JSON.stringify(cityNumbers));
                    console.log(`Cidades Nível ${reportId}: ${cityNumbers.join(', ')}`);
                }
            }
        }
        async function extractCityNumbersFromReports() {
            for (let i = 1001; i <= 1015; i++) {
                await extractCityNumbersFromReport(i);
            }
        }
        extractCityNumbersFromReports();
    }
    //ler_cidades()
    //-============================================ FUNÇAO LER CIDADES INDEPENDENTES===================
    (function () {
        'use strict';
        async function ler_cidades() {
            async function extractCityNumbersFromReport(reportId) {
                const saveName = `mass-spy-report-${reportId}`;
                const title = 'Espionagem em massa: Cidade independente';
                // Abrir o relatório usando xajax_doMassSpy
                xajax_doMassSpy(container.open({
                    saveName,
                    title
                }), {
                    uId: reportId
                });
                $('.window-wrapper.ui-draggable.active').hide();
                // Esperar um breve momento (por exemplo, 2 segundos) para o relatório ser carregado
                await new Promise(resolve => setTimeout(resolve, 2000));
                // Extrair as informações do relatório e exibi-las no console, se houver informações de cidade
                const elementId = `#messageboxmass-spy-report-${reportId}`;
                const element = document.querySelector(elementId);
                if (element) {
                    const cityNumbers = Array.from(element.querySelectorAll('td span.prov-pict[title]'), citySpan => {
                        const match = citySpan.getAttribute('title').match(/\d+/);
                        return match ? match[0] : null;
                    }).filter(cityNumber => cityNumber !== null);
                    if (cityNumbers.length > 0) {
                        const varName = `cid_${reportId}`;
                        window[varName] = cityNumbers;
                        localStorage.setItem(varName, JSON.stringify(cityNumbers));
                        console.log(`Cidades Nível ${reportId}: ${cityNumbers.join(', ')}`);
                        return { level: reportId, cities: cityNumbers }; // Retorna objeto com nível e números das cidades
                    }
                }
                return null;
            }
            async function extractCityNumbersFromReports() {
                const allCityData = [];
                for (let i = 1001; i <= 1015; i++) {
                    const cityData = await extractCityNumbersFromReport(i);
                    if (cityData) {
                        allCityData.push(cityData);
                    }
                }
                return allCityData;
            }
            function formatCityData(cityData) {
                const formattedData = cityData.map(data => `Cidades Nível ${data.level}: ${data.cities.join(', ')}`);
                return formattedData.join('\n\n');
            }
            function downloadFile(content, fileName, contentType) {
                const a = document.createElement("a");
                const file = new Blob([content], { type: contentType });
                a.href = URL.createObjectURL(file);
                a.download = fileName;
                a.click();
            }
            // Extraímos todos os números das cidades e os salvamos em um arquivo
            extractCityNumbersFromReports().then(allCityData => {
                if (allCityData.length > 0) {
                    const fileContent = formatCityData(allCityData);
                    downloadFile(fileContent, 'cidades_por_nivel.txt', 'text/plain');
                }
            });
        }
        // Função para criar e adicionar o botão
        function addButton() {
            const button = document.createElement('button');
            button.innerHTML = 'Ler'; // Adiciona quebra de linha com <br>
            button.className = 'button';  // Adiciona a classe "button"
            button.type = 'button';       // Define o tipo "button"
            button.style.width = '20px';  // Define a largura do botão
            button.style.height = '20px'; // Define a altura do botão
            button.style.position = 'fixed';
            button.style.bottom = '80px'; // Define a posição do botão a partir da parte inferior
            button.style.right = '60px';   // Define a posição do botão a partir da direita
            button.style.zIndex = 800;
            button.style.padding = '10px';
            button.style.backgroundColor = '#8B4513'; // Define a cor de fundo do botão (castanho)
            button.style.color = '#fff';
            button.style.border = '1px solid #000'; // Define a borda preta
            button.style.borderRadius = '5px';
            button.style.cursor = 'pointer';
            button.style.textAlign = 'center'; // Centraliza o texto
            button.setAttribute("title", "Ler Cidades Espiadas e Exportar em .txt");
            button.addEventListener('click', ler_cidades);
            document.body.appendChild(button);
        }
        // Adiciona o botão ao carregar a página
        window.addEventListener('load', addButton);
    })();
    /*
    //------------------------------------------------------------------------------------ BOTAO ATAQUE DE 1 SEGUNDO
    var interval;
    var defaultIntervalTime = 10000; // Time in milliseconds
    var intervalTime;
    var unitErrorMargin = 0.05; // 5%
    var lang = "pt";
    String.prototype.replaceAll = function (find, replace) {
        var str = this;
        return str.replace(new RegExp(find, 'g'), replace);
    };
    function tolang(key) {
        var strings = {
            "en": {
                "title": "My mission queue",
                "paused": "Paused",
                "import": "Import",
                "export": "Export",
                "settings": "Settings",
                "destination": "Destination",
                "missiontype": "Mission Type",
                "distance": "Distance",
                "traveltime": "Travel Time",
                "armyunits": "Army Units",
                "totaltime": "Total time",
                "startqueue": "Start Queue",
                "pausequeue": "Pause Queue",
                "delete": "Delete",
                "deleteall": "Delete All",
                "playerinfo": "Player information",
                "capital": "Capital",
                "fortresssiege": "Fortress Siege",
                "queuefortsiege": "Queue Fortress Siege",
                "fieldbattle": "Field Battle",
                "queuefieldbattle": "Queue Field Battle",
                "noattacks": "There are no attacks in the queue.",
                "inqueue": "In Queue",
                "totaluserarmy": "Full Army",
                "unitnames": {
                    "P1": "Light Spearmen",
                    "P2": "Heavy Spearmen",
                    "P3": "Phalanx",
                    "S1": "Light Archers",
                    "S2": "Heavy Archers",
                    "S3": "Elite Archers",
                    "M1": "Light Swordsmen",
                    "M2": "Heavy Swordsmen",
                    "M3": "Guardians",
                    "K1": "Light Cavalry",
                    "K2": "Heavy Cavalry",
                    "K3": "Paladins",
                    "CT": "Supply Wagons",
                    "C1": "Battering Rams",
                    "C2": "Catapults",
                    "C3": "Trebuchets",
                    "C4": "Ballistae",
                },
            },
            "pt": { // Adicionando suporte ao português
                "title": "Minha fila de missões",
                "paused": "Pausado",
                "import": "Importar",
                "export": "Exportar",
                "settings": "Configurações",
                "destination": "Destino",
                "missiontype": "Tipo de Missão",
                "distance": "Distância",
                "traveltime": "Tempo de Viagem",
                "armyunits": "Unidades do Exército",
                "totaltime": "Tempo Total",
                "startqueue": "Iniciar Fila",
                "pausequeue": "Pausar Fila",
                "delete": "Excluir",
                "deleteall": "Excluir Tudo",
                "playerinfo": "Informações do Jogador",
                "capital": "Capital",
                "fortresssiege": "Cerco à Fortaleza",
                "queuefortsiege": "Fila de Cerco à Fortaleza",
                "fieldbattle": "Batalha de Campo",
                "queuefieldbattle": "Fila de Batalha de Campo",
                "noattacks": "Não há ataques na fila.",
                "inqueue": "Na Fila",
                "totaluserarmy": "Exército Completo",
                "unitnames": {
                    "P1": "Lanceiros Leves",
                    "P2": "Lanceiros Pesados",
                    "P3": "Falange",
                    "S1": "Arqueiros Leves",
                    "S2": "Arqueiros Pesados",
                    "S3": "Arqueiros de Elite",
                    "M1": "Espadachins Leves",
                    "M2": "Espadachins Pesados",
                    "M3": "Guardiões",
                    "K1": "Cavalaria Leve",
                    "K2": "Cavalaria Pesada",
                    "K3": "Paladinos",
                    "CT": "Carroças de Suprimentos",
                    "C1": "Arietes",
                    "C2": "Catapultas",
                    "C3": "Trebuchets",
                    "C4": "Balistas",
                },
            },
        };
        return strings[lang][key];
    }
    function GetNextQueueID() {
        var id = GM_getValue('attackqueueid' + uid + REALM, 1);
        GM_setValue('attackqueueid' + uid + REALM, parseInt(id) + 1);
        return parseInt(id);
    }
    function QueueAttack(obj) {
        obj.id = GetNextQueueID();
        GetAttackTime(obj, function (travelTime) {
            var list = GetQueueList();
            obj.travelTime = travelTime;
            list.push(obj);
            GM_setValue('attackqueue' + uid + REALM, JSON.stringify(list));
            UpdateQueueNotification();
        });
    }
    function DequeueAttack(id) {
        var list = GetQueueList();
        if (list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == id) {
                    list.splice(i, 1);
                }
            }
            GM_setValue('attackqueue' + uid + REALM, JSON.stringify(list));
        }
        UpdateQueueNotification();
        if (container.isOpen({ saveName: "queued-attacks" })) {
            OpenQueuedAttacks();
        }
    }
    function ClearAttackQueue() {
        GM_setValue('attackqueue' + uid + REALM, JSON.stringify([]));
        UpdateQueueNotification();
        if (container.isOpen({ saveName: "queued-attacks" })) {
            OpenQueuedAttacks();
        }
    }
    function GetQueueList() {
        var list = GM_getValue('attackqueue' + uid + REALM, null);
        if (list === null)
            return [];
        return JSON.parse(list);
    }
    function ImportQueueList(text) {
        var json;
        try {
            json = JSON.parse(text);
        }
        catch (err) {
            alert('Import failed! Error: ' + err);
            return;
        }
        // Corrections
        for (var i = 0; i < json.length; i++) {
            if (typeof json[i].attackType == 'undefined') {
                json[i].attackType = "1";
            }
        }
        GM_setValue('attackqueue' + uid + REALM, JSON.stringify(json));
        UpdateQueueNotification();
        OpenQueuedAttacks();
    }
    function GetQueuePauseState() {
        var state = GM_getValue('attackqueuestate' + uid + REALM, '1');
        return (state == '1');
    }
    function SetQueuePauseState(state) {
        GM_setValue('attackqueuestate' + uid + REALM, (state ? '1' : '0'));
        if (state) {
            $('#attackqueue-paused').show();
        } else {
            $('#attackqueue-paused').hide();
            Update();
        }
    }
    function QueueSetInterval(interval) {
        intervalTime = parseInt(interval);
        Update();
        GM_setValue('attackqueueinterval' + uid + REALM, intervalTime);
    }
    function QueueLoadInterval() {
        var interval = GM_getValue('attackqueueinterval' + uid + REALM, defaultIntervalTime);
        intervalTime = parseInt(interval);
    }
    function SaveUnitInput(key, value) {
        var inputs = GM_getValue('unitinputs' + uid + REALM, null);
        if (inputs === null) {
            inputs = {};
        } else {
            inputs = JSON.parse(inputs);
        }
        inputs[key] = value;
        GM_setValue('unitinputs' + uid + REALM, JSON.stringify(inputs));
    }
    function GetUnitInput(key) {
        var inputs = GM_getValue('unitinputs' + uid + REALM, null);
        if (inputs === null) {
            return 0;
        }
        inputs = JSON.parse(inputs);
        if (typeof inputs[key] == 'undefined') {
            return 0;
        }
        return inputs[key];
    }
    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }
    function StringToSeconds(timeStr) {
        if (timeStr.indexOf(':') == -"?") {
            return 0;
        }
        var timeArr = timeStr.split(':');
        var hours = parseInt(timeArr[0]);
        var minutes = parseInt(timeArr[1]);
        var seconds = parseInt(timeArr[""]);
        return (seconds + (minutes * 60) + (hours * 60 * 60));
    }
    function SecondsToString(totalSeconds) {
        var newhours = Math.floor(totalSeconds / 3600);
        var newminutes = Math.floor((totalSeconds / 60) % 60);
        var newseconds = totalSeconds % 60;
        return pad(newhours) + ':' + pad(newminutes) + ':' + pad(newseconds);
    }
    function DoubleTimeString(timeStr) {
        var totalSeconds = (StringToSeconds(timeStr) * 2);
        return SecondsToString(totalSeconds);
    }
    function GetTotalTime(queueList) {
        if (queueList.length == 0) {
            return '00:00:00';
        }
        var totalSeconds = 0;
        for (var i = 0; i < queueList.length; i++) {
            if (typeof queueList[i].travelTime != 'undefined') {
                totalSeconds += StringToSeconds(queueList[i].travelTime);
            }
        }
        return SecondsToString(totalSeconds);
    }
    function GetAttackTime(attackData, callback) {
        if (attackData.dName.toLowerCase().indexOf('worldboss') > -1) {
            callback('01:00:00');
            return;
        }
        var armyString = "<xjxobj></xjxobj>";
        if (attackData.army.length > 0) {
            var armyStrings = [];
            for (var i = 0; i < attackData.army.length; i++) {
                armyStrings.push("<e><k>" + attackData.army[i].name.replace('army[', '').replace(']', '') + "</k><v>S" + attackData.army[i].value + "</v></e>");
            }
            armyString = "<xjxobj>" + armyStrings.join("") + "</xjxobj>";
        }
        var sendData = "<xjxobj><e><k>generalId</k><v>S" + attackData.generalId + "</v></e><e><k>army</k><v>" + armyString + "</v></e><e><k>dUserId</k><v>S" + attackData.dUserId + "</v></e><e><k>dProvinceId</k><v>S" + attackData.dProvinceId + "</v></e><e><k>attackType</k><v>S" + attackData.attackType + "</v></e><e><k>dName</k><v>S" + attackData.dName + "</v></e><e><k>formation</k><v>S" + attackData.formation + "</v></e><e><k>vexok</k><v>Btrue</v></e></xjxobj>";
        $.post(location.protocol + "//" + location.host + "/imperia/game_v6/game/xajax_loader.php", {
            xjxfun: "viewAttackInfo",
            xjxr: Date.now(),
            xjxargs: ["SOperationCenter", sendData],
        },
            function (data) {
                var e1 = $(data).find("#attackInfoBox").get(0);
                var html = $(e1).html().replace("<![CDATA[S", "").replace("]]>", "");
                var div = $('<div></div>').html(html);
                var table = div.find('.table-army-info').get(0);
                var tr = $(table).find('tr').get(1);
                var td = $(tr).find('.info-values').get(1);
                callback(DoubleTimeString($(td).text()));
            }, "xml");
    }
    function ExecuteAttack(attackData) {
        var armyString = "<xjxobj></xjxobj>";
        if (attackData.army.length > 0) {
            var armyStrings = [];
            for (var i = 0; i < attackData.army.length; i++) {
                armyStrings.push("<e><k>" + attackData.army[i].name.replace('army[', '').replace(']', '') + "</k><v>S" + attackData.army[i].value + "</v></e>");
            }
            armyString = "<xjxobj>" + armyStrings.join("") + "</xjxobj>";
        } else {
            console.log('No army selected for queued attack.');
            return;
        }
        var sendData = "<xjxobj><e><k>generalId</k><v>S" + attackData.generalId + "</v></e><e><k>army</k><v>" + armyString + "</v></e><e><k>dUserId</k><v>S" + attackData.dUserId + "</v></e><e><k>dProvinceId</k><v>S" + attackData.dProvinceId + "</v></e><e><k>attackType</k><v>S" + attackData.attackType + "</v></e><e><k>dName</k><v>S" + attackData.dName + "</v></e><e><k>formation</k><v>S" + attackData.formation + "</v></e><e><k>vexok</k><v>Btrue</v></e></xjxobj>";
        $.post(location.protocol + "//" + location.host + "/imperia/game_v6/game/xajax_loader.php", {
            xjxfun: "doAttack",
            xjxr: Date.now(),
            xjxargs: ["SOperationCenter", sendData],
        },
            function (data) {
                refreshUI('Refresh');
            }, "xml");
        DequeueAttack(attackData.id);
    }
    function UpdateQueueNotification() {
        var queueList = GetQueueList();
        $('#widget-attackqueue').find('#count').html(queueList.length);
    }
    function GetFormDataValue(formData, key) {
        for (var i = 0; i < formData.length; i++) {
            if (formData[i].name == key) {
                return formData[i].value;
            }
        }
        return null;
    }
    function GetAvailableArmy(callback) {
        // Check for army
        $.post(location.protocol + "//" + location.host + "/imperia/game_v6/game/xajax_loader.php", {
            xjxfun: "viewOperationCenter",
            xjxr: Date.now(),
            xjxargs: ["Soperation-center", "<xjxobj><e><k>tab</k><v>Sattack</v></e><e><k>subTab</k><v>SloadAttack</v></e><e><k>vexok</k><v>Btrue</v></e></xjxobj>"],
        },
            function (data) {
                var e1 = $(data).find("#messageboxArmyAttacks").get(0);
                var html = $(e1).html().replace("<![CDATA[S", "").replace("]]>", "");
                html = $(html);
                var form = html.find("#sendAttackForm");
                var formData = form.serializeArray();
                var army = [];
                for (var i = 0; i < formData.length; i++) {
                    if (formData[i].name.indexOf('army') > -1) {
                        var keySearch = /army\[(.*)\]/;
                        var results = formData[i].name.match(keySearch);
                        if (results.length > 0) {
                            var maxUnits = $('#max_' + results[1], html).val();
                            formData[i].value = parseInt(maxUnits);
                            army.push(formData[i]);
                        }
                    }
                }
                callback(army);
            }, "xml");
    }
    function GetAvailableGenerals(callback) {
        // Check for general
        $.post(location.protocol + "//" + location.host + "/imperia/game_v6/game/xajax_loader.php", {
            xjxfun: "viewAssignGeneral",
            xjxr: Date.now(),
            xjxargs: ["Smodal", "<xjxobj><e><k>assignmentType</k><v>N1</v></e><e><k>vexok</k><v>Btrue</v></e></xjxobj>"],
        },
            function (data) {
                var e2 = $(data).find("#messageboxmodal").get(0);
                var html = $(e2).html();
                var search = /personId\=\"(\d+)\"/g;
                var results = html.match(search);
                var generals = [];
                if (results.length > 0) {
                    for (var i = 0; i < results.length; i++) {
                        var searchId = /personId\=\"(\d+)\"/;
                        var results2 = results[i].match(searchId);
                        if (results2.length > 0) {
                            generals.push(results2[1]);
                        }
                    }
                }
                callback(generals);
            }, "xml");
    }
    function GetUnitsFromArmyArray(armyArray, key) {
        for (var i = 0; i < armyArray.length; i++) {
            if (armyArray[i].name == key) {
                return armyArray[i].value;
            }
        }
        return 0;
    }
    function IsArmyAvailable(army, availableArmy) {
        for (var i = 0; i < army.length; i++) {
            var requestedUnits = army[i].value;
            var availableUnits = GetUnitsFromArmyArray(availableArmy, army[i].name);
            // Check if we dont have the units required
            if (availableUnits < requestedUnits) {
                return false;
            }
        }
        return true;
    }
    function IsGeneralAvailable(general, availableGenerals) {
        if (availableGenerals.indexOf(general) == -1) {
            return false;
        }
        return true;
    }
    function DeductArmyUnits(attackData, availableArmy) {
        for (var i = 0; i < attackData.army.length; i++) {
            for (var i2 = 0; i2 < availableArmy.length; i2++) {
                if (availableArmy[i2].name == attackData.army[i].name) {
                    availableArmy[i2].value = availableArmy[i2].value - attackData.army[i].value;
                }
            }
        }
        return availableArmy;
    }
    function ReduceArmyUnits(army, reduction) {
        for (var i = 0; i < army.length; i++) {
            army[i].value = army[i].value - Math.floor(army[i].value * reduction);
        }
        return army;
    }
    function RemoveGeneral(attackData, availableGenerals) {
        var index = availableGenerals.indexOf(attackData.generalId);
        if (index > -1) {
            availableGenerals.splice(index, 1);
        }
        return availableGenerals;
    }
    function Update() {
        clearTimeout(interval);
        interval = setTimeout(Update, intervalTime);
        if (GetQueuePauseState()) {
            return;
        }
        var queueList = GetQueueList();
        if (queueList.length > 0) {
            GetAvailableArmy(function (availableArmy) {
                GetAvailableGenerals(function (availableGenerals) {
                    var runAttacks = [];
                    for (var i = 0; i < queueList.length; i++) {
                        // Check if the general is available
                        if (queueList[i].generalId == "" || IsGeneralAvailable(queueList[i].generalId, availableGenerals)) {
                            var isAvailable = false;
                            // Check if we have the required army units
                            if (IsArmyAvailable(queueList[i].army, availableArmy)) {
                                isAvailable = true;
                            }
                            else {
                                // Reduce the army units by the error margin and check again
                                var reducedArmy = ReduceArmyUnits(JSON.parse(JSON.stringify(queueList[i].army)), unitErrorMargin);
                                if (IsArmyAvailable(reducedArmy, availableArmy)) {
                                    isAvailable = true;
                                    queueList[i].army = reducedArmy;
                                }
                            }
                            if (isAvailable) {
                                runAttacks.push(queueList[i]);
                                availableArmy = DeductArmyUnits(queueList[i], availableArmy);
                                availableGenerals = RemoveGeneral(queueList[i], availableGenerals);
                            }
                        }
                    }
                    for (var i2 = 0; i2 < runAttacks.length; i2++) {
                        // Execute the attack
                        ExecuteAttack(runAttacks[i2]);
                    }
                });
            });
        } else {
            SetQueuePauseState(true);
            UpdateQueueNotification();
        }
    }
    function GetQueuedAttackUnitsTooltip(attackData) {
        var html = '<table id="tooltip-qa' + attackData.id + '" class="ui-hide"><tbody>';
        html += '<tr><td colspan="2">' + attackData.generalCard + '</td></tr>';
        for (var i = 0; i < attackData.army.length; i++) {
            var key = attackData.army[i].name.replace('army[', '').replace(']', '');
            html += '<tr><td>' + tolang('unitnames')[key] + '</td><td class="numeral">' + attackData.army[i].value + '</td></tr>';
        }
        html += '</tbody></table>';
        return html;
    }
    function OpenQueuedAttacks() {
        var queueList = GetQueueList();
        var totalTime = GetTotalTime(queueList);
        container.open({ saveName: 'queued-attacks', title: tolang('title') });
        var cont = $('#queued-attacks .window-content');
        cont.html('<span class="window-decor-left"></span>' +
            '<span class="window-decor-right"></span>' +
            '<div class="window-wide queued-attacks-main">' +
            '<div class="content">' +
            '<div id="all-queued-attacks-list-id" class="queued-attacks">' +
            '<h3>' + tolang('title') + ' <span id="current-queue-state"' + (GetQueuePauseState() ? '' : ' style="display:none;"') + '>- <span style="color:#5F1D1D;">' + tolang('paused') + '</span></span>' +
            '<div class="fright tright" style="margin-bottom:15px;margin-right:20px;">' +
            '<div class="centered-block fright queue-operations" style="width: 500px;">' +
            '<button class="button small" type="button" id="queue-settings-btn">' + tolang('settings') + '</button>' +
            '<button class="button small" type="button" id="import-queue">' + tolang('import') + '</button>' +
            '<button class="button small" type="button" id="export-queue">' + tolang('export') + '</button>' +
            '</div>' +
            '</div>' +
            '</h3>' +
            '<table class="data-grid middle">' +
            '<tbody>' +
            '<tr>' +
            '<th title="' + tolang('destination') + '"><div class="table-header-icons from-to"></div></th>' +
            '<th title="' + tolang('missiontype') + '"><div class="table-header-icons type-mission"></div></th>' +
            '<th title="' + tolang('distance') + '"><span class="icon-op icon-distance"></span></th>' +
            '<th title="' + tolang('traveltime') + '" class="th-time"><div class="table-header-icons timer"></div></th>' +
            '<th title="' + tolang('armyunits') + '"><div class="table-header-icons army"></div></th>' +
            '<th><div class="table-header-icons actions"></div></th>' +
            '</tr>' +
            '</tbody>' +
            '</table>' +
            '<div class="th-header clear cutting-panel">' +
            '<div class="fleft tleft" style="margin-bottom:20px;">' +
            '<div class="centered-block fleft queue-time" style="width: 200px;">' +
            '' + tolang('totaltime') + ': ' + totalTime +
            '</div>' +
            '</div>' +
            '<div class="fright tright" style="margin-bottom:20px;">' +
            '<div class="centered-block fright queue-operations" style="width: 500px;">' +
            '<button class="button icons refresh" type="button" id="refresh-queue" style="margin:0;top:-1px;"><span></span></button>' +
            '<button class="button small" type="button" id="start-queue"' + (GetQueuePauseState() ? '' : ' style="display:none;"') + '>' + tolang('startqueue') + '</button>' +
            '<button class="button small" type="button" id="pause-queue"' + (GetQueuePauseState() ? ' style="display:none;"' : '') + '>' + tolang('pausequeue') + '</button>' +
            '<button class="button small" type="button" id="clear-queue">' + tolang('deleteall') + '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');
        var dataTable = $('.data-grid tbody', cont);
        if (queueList.length > 0) {
            for (var i = 0; i < queueList.length; i++) {
                var attackData = queueList[i];
                var name = "";
                if (attackData.isPlayer) {
                    name = '<a class="username" href="javascript:void(xajax_viewGameProfiles(container.open({saveName: \'profiles\', title: \'' + tolang('playerinfo') + '\'}), { tab: 1, \'userId\': ' + attackData.dUserId + ' }))">' + attackData.dName + '</a>';
                } else {
                    name = attackData.realName;
                }
                var tr = $('<tr class="queued-attack">' +
                    '<td><span class="ui-ib"><span class="ui-ib"><span class="prov-pict holding1" title="' + tolang('capital') + '"></span></span></span><span class="arrow-divider"></span>' + name + '</td>' +
                    '<td>' + (attackData.attackType == "1" ? tolang('fortresssiege') : tolang('fieldbattle')) + '</td>' +
                    '<td class="numeral" style="text-align:center;">' + attackData.distance + '</td>' +
                    '<td class="numeral" style="text-align:center;">' + attackData.travelTime + '</td>' +
                    '<td class="numeral tooltip-arrow" content="#tooltip-qa' + attackData.id + '" position="left;center" style="text-align:center;">' + attackData.armyTotal + GetQueuedAttackUnitsTooltip(attackData) + '</td>' +
                    '<td class="tcenter"><div class="centered-block visual-loading fnone"><button class="button icons red delete" type="button" title="' + tolang('delete') + '" name="delete" data-id="' + attackData.id + '"><span></span></button></div></td>' +
                    '</tr>');
                dataTable.append(tr);
            }
        }
        else {
            dataTable.append('<tr><td class="tcenter" colspan="6">' + tolang('noattacks') + '</td></tr>');
        }
        container.position();
        $('#queued-attacks').on('click', 'button.delete', function () {
            var id = $(this).attr('data-id');
            if (typeof id != 'undefined') {
                DequeueAttack(parseInt(id));
            }
        });
        $('button#refresh-queue', cont).click(function () {
            Update();
        });
        $('button#clear-queue', cont).click(function () {
            ClearAttackQueue();
        });
        $('button#start-queue', cont).click(function () {
            SetQueuePauseState(false);
            $('button#pause-queue', cont).show();
            $(this).hide();
            $('#current-queue-state', cont).hide();
        });
        $('button#pause-queue', cont).click(function () {
            SetQueuePauseState(true);
            $('button#start-queue', cont).show();
            $(this).hide();
            $('#current-queue-state', cont).show();
        });
        $('button#export-queue', cont).click(function () {
            container.open({ saveName: 'export-queued-attacks', title: tolang('export') });
            $('#export-queued-attacks .window-content').html(
                '<div class="window-tight export-queued-attacks-main">' +
                '<div class="content">' +
                '<textarea rows="10" style="width:480px;overflow-y:scroll;">' + JSON.stringify(GetQueueList()) + '</textarea>' +
                '</div>' +
                '</div>');
            container.position();
        });
        $('button#import-queue', cont).click(function () {
            container.open({ saveName: 'import-queued-attacks', title: tolang('import') });
            $('#import-queued-attacks .window-content').html(
                '<div class="window-tight import-queued-attacks-main">' +
                '<div class="content">' +
                '<textarea rows="10" style="width:480px;overflow-y:scroll;" id="queue-json"></textarea>' +
                '<div class="th-header clear cutting-panel">' +
                '<div class="fright tright" style="margin-bottom:20px;">' +
                '<div class="centered-block fright queue-operations" style="width: 500px;">' +
                '<button class="button small" type="button" id="import-queue-run">' + tolang('import') + '</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            $('#import-queued-attacks #import-queue-run').click(function () {
                var textarea = $('#import-queued-attacks #queue-json');
                ImportQueueList(textarea.val());
                container.close({ saveName: 'import-queued-attacks', flow: true, closedWith: 'click' });
            });
            container.position();
        });
        $('button#queue-settings-btn', cont).click(function () {
            OpenSettings();
        });
        ui.constructor();
    }
    function OpenSettings() {
        container.open({ saveName: 'queue-settings', title: tolang('settings') });
        var cont = $('#queue-settings .window-content');
        cont.html('<span class="window-decor-left"></span>' +
            '<span class="window-decor-right"></span>' +
            '<div class="window-tight queue-settings-main">' +
            '<div class="content">' +
            '<div class="th-header clear cutting-panel">' +
            '<div class="fleft tleft" style="margin-bottom:20px;">' +
            '<div class="centered-block fleft queue-time" style="width: 200px;">' +
            'Update interval: ' +
            '</div>' +
            '</div>' +
            '<div class="fright tright" style="margin-bottom:20px;">' +
            '<div class="centered-block fright queue-operations" style="width: 300px;">' +
            '<div id="update-interval-slider-wrap"><div id="update-interval-slider"></div></div>' +
            '<div id="update-interval-preview" style="text-align:center;">1 min</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');
        $('#update-interval-slider', cont).slider({
            min: 1,
            max: 60,
            change: function (event, ui) {
                $('#update-interval-preview', cont).html(ui.value + ' minute');
                QueueSetInterval(ui.value * 60000);
            },
            slide: function (event, ui) {
                $('#update-interval-preview', cont).html(ui.value + ' minute');
            }
        });
        $('#update-interval-slider', cont).slider('value', (intervalTime / 60000));
        container.position();
        ui.constructor();
    }
    function FormatFormData(formData) {
        var obj = {};
        obj.army = [];
        obj.armyTotal = 0;
        for (var i = 0; i < formData.length; i++) {
            var e = formData[i];
            if (e.name == "generalId") {
                obj.generalId = e.value;
            }
            else if (e.name == "dUserId") {
                obj.dUserId = e.value;
            }
            else if (e.name == "dProvinceId") {
                obj.dProvinceId = e.value;
            }
            else if (e.name == "dName") {
                obj.dName = e.value;
            }
            else if (e.name == "formation") {
                obj.formation = e.value;
            }
            else if (e.name == "attackType") {
                obj.attackType = e.value;
            }
            else if (e.name.indexOf('army') > -1 && e.value != '') {
                e.value = parseInt(e.value);
                obj.army.push(e);
                obj.armyTotal += e.value;
            }
        }
        return obj;
    }
    function CreateSlider() {
        var table = $('.oc-attack .choose-army');
        if (table.find('#army-slider-wrap').length > 0)
            return;
        var inputs = $('.unit-input', table);
        var selectAll = $('#select-all-army', table);
        inputs.each(function (i, e) {
            var a = $(e).children('a');
            if (typeof a.attr('id') == 'undefined')
                return;
            var key = a.attr('id').replace('current_max_army_', '');
            var max = $('#max_' + key).val();
            if (max == '0')
                return;
            $(e).attr('data-key', key);
            $(e).attr('data-max', max);
            $(e).addClass('hasUnits');
        });
        var pctText = $('<div style="text-align:center;padding-top:6px;">0%</div>');
        var sliderWrap = $('<div id="army-slider-wrap"></div>');
        var slider = $('<div id="army-slider"></div>');
        sliderWrap.append(slider);
        selectAll.parent().parent().append(sliderWrap);
        slider.slider({
            min: 0,
            max: 100,
            change: function (event, ui) {
                inputs.each(function (i, e) {
                    if (!$(e).hasClass('hasUnits'))
                        return;
                    var key = $(e).attr('data-key');
                    var max = $(e).attr('data-max');
                    var value = Math.floor(parseInt(max) * (ui.value / 100));
                    $('#army_' + key).val(value);
                    $('#army_' + key).trigger('keyup');
                    pctText.html(ui.value + '%');
                });
                calcArmyCapacity();
            },
            slide: function (event, ui) {
                pctText.html(ui.value + '%');
            }
        });
        sliderWrap.after(pctText);
    }
    function QueueAttackButtonClick() {
        var form = $('#sendAttackForm');
        if (typeof form != 'undefined' && form.length > 0) {
            var formData = form.serializeArray();
            var obj = FormatFormData(formData);
            if ($('#refreshInfo').length > 0) {
                var distance = $('#refreshInfo').parent().find('.info-values').get(1);
                obj.distance = $(distance).text();
            } else {
                obj.distance = "";
            }
            var table = $('.table-army-attack').find('tr').get(0);
            if ($(table).find('.search-wrapper').length > 0) {
                obj.isPlayer = true;
            }
            else {
                var td = $(table).find('td').get(0);
                td = $(td).clone();
                td.find('h4').remove();
                td.find('input').remove();
                obj.isPlayer = false;
                obj.realName = td.text().trim();
            }
            var generalCard = $('#attack-general').clone();
            generalCard.find('a.change').remove();
            generalCard.find('a').prop('href', null);
            obj.generalCard = generalCard.html().replaceAll('\n', '').replace(/\s{2,}/g, ' ');
            QueueAttack(obj);
        }
    }
    function CreateQueueAttackButton() {
        if ($('.oc-attack').find('.button[name="sendAttack"]').length > 0 && $('.oc-attack').find('.queueAttack').length == 0) {
            var qButton;
            var dName = $('#sendAttackForm #dName');
            if (typeof dName == 'undefined' || dName.text().indexOf('Nomad') == -1) {
                qButton = $('<button class="button queueAttack" type="button" onclick="return false;" style="opacity:1;">' + tolang('queuefortsiege') + '</button>');
                qButton.click(function () {
                    $('#attackType').val('1');
                    QueueAttackButtonClick();
                });
            }
            else if (dName.text().indexOf('Nomad') > -1) {
                qButton = $('<button class="button queueAttack" type="button" onclick="return false;" style="opacity:1;">' + tolang('queuefieldbattle') + '</button>');
                qButton.click(function () {
                    $('#attackType').val('2');
                    QueueAttackButtonClick();
                });
            }
            var qButtonCont = $('<div class="centered-block visual-loading fnone"></div>');
            $('.oc-attack .button[name="sendAttack"]').parent().parent().append(qButtonCont);
            qButtonCont.append(qButton);
        }
    }
    function GetTotalUserArmy(callback) {
        // Check for general
        $.post(location.protocol + "//" + location.host + "/imperia/game_v6/game/xajax_loader.php", {
            xjxfun: "viewSimulatorTotalUserArmy",
            xjxr: Date.now(),
            xjxargs: ["Sarmy-top", "<xjxobj><e><k>side</k><v>Stop</v></e><e><k>simulatorType</k><v>N1</v></e><e><k>vexok</k><v>Btrue</v></e></xjxobj>"],
        },
            function (data) {
                var e2 = $(data).find("#army-top-1").get(0);
                var content = $('<div>' + $(e2).html() + '</div>');
                var army = [];
                var holders = content.find('.simulator-unit-holder');
                for (var i = 0; i < holders.length; i++) {
                    var holder = $(holders.get(i));
                    var a = $('a.unit', holder);
                    var search = /\{\'unitId\'\:\'(.*)\'\}/;
                    var results = a.attr('href').match(search);
                    if (results.length > 0) {
                        army.push({ name: results[1], value: $(holder.find('input').get(0)).val() });
                    }
                }
                callback(army);
            }, "xml");
    }
    function LoadAndHookUnitInputs() {
        setTimeout(function () {
            var form = $('#sendAttackForm');
            if (typeof form != 'undefined' && form.length > 0) {
                form.find('input.unit-input').each(function (i, e) {
                    var id = $(e).prop('id');
                    $(e).val(GetUnitInput(id));
                    $(e).on('keyup', function () {
                        SaveUnitInput($(this).prop('id'), $(this).val());
                    });
                    $(e).trigger('keyup');
                    $(e).parent().find('a').click(function () {
                        $(e).trigger('keyup');
                    });
                });
                $('#select-all-army', form).on('click', function () {
                    form.find('input.unit-input').each(function (i, e) {
                        $(e).trigger('keyup');
                    });
                });
                $('#deselect-all-army', form).on('click', function () {
                    form.find('input.unit-input').each(function (i, e) {
                        $(e).trigger('keyup');
                    });
                });
            }
            var e12 = $('#ExcludeGarrisonArmy').parent().parent().parent();
            if ($('input#TotalUserArmy', e12).length == 0) {
                var totalCont = $('<label for="TotalUserArmy"><div class="checkbox-wrap ui-ib"><input class="checkbox ui-pass" id="TotalUserArmy" type="checkbox"></div>' + tolang('totaluserarmy') + '</label>');
                e12.append(totalCont);
                $('input', totalCont).on('change', function (e) {
                    if ($(this).is(':checked')) {
                        GetTotalUserArmy(function (army) {
                            for (var i = 0; i < army.length; i++) {
                                var input = $('input#army_' + army[i].name, form);
                                if (typeof input.attr('disabled') == 'undefined') {
                                    var unitInput = $('.unit-input[data-key="' + army[i].name + '"]', form);
                                    unitInput.attr('data-orig-max', unitInput.attr('data-max'));
                                    unitInput.attr('data-max', army[i].value);
                                } else {
                                    if (army[i].value.length > 0) {
                                        input.attr('disabled', null);
                                        input.parent().parent().removeClass('disabled');
                                        input.parent().addClass('hasUnits');
                                        input.parent().attr('data-key', army[i].name);
                                        input.parent().attr('data-orig-max', '0');
                                        input.parent().attr('data-max', army[i].value);
                                        $('#current_max_army_' + army[i].name, form).attr('onclick', "if(!$(this).hasClass('deactive')) {$('#army_" + army[i].name + "').val($('#max_" + army[i].name + "').val()); calcArmyCapacity();}");
                                    }
                                }
                                $('#max_' + army[i].name, form).val(army[i].value);
                                $('#current_max_army_' + army[i].name, form).html(army[i].value);
                            }
                        });
                    } else {
                        form.find('input.unit-input').each(function (i, e) {
                            var key = $(e).parent().attr('data-key');
                            var orig = $(e).parent().attr('data-orig-max');
                            $(e).parent().attr('data-max', orig);
                            $('#max_' + key, form).val(orig);
                            if (orig == '0') {
                                $(e).attr('disabled', 'disabled');
                                $(e).val('0');
                                $(e).parent().parent().addClass('disabled');
                                $(e).parent().removeClass('hasUnits');
                                $(e).parent().find('a').html('0');
                                $(e).parent().find('a').attr('onclick', null);
                            } else {
                                $(e).val(orig);
                                $(e).parent().find('a').html(orig);
                            }
                        });
                    }
                });
            }
        }, 200);
    }
    function OnWindowAttack() {
        CreateSlider();
        CreateQueueAttackButton();
        LoadAndHookUnitInputs();
    }
    function IsPlayerInQueue(userid) {
        var queueList = GetQueueList();
        if (queueList.length > 0) {
            for (var i = 0; i < queueList.length; i++) {
                if (parseInt(queueList[i].dUserId) == parseInt(userid)) {
                    return true;
                }
            }
        }
        return false;
    }
    function IsProvinceInQueue(userid, provinceid) {
        var queueList = GetQueueList();
        if (queueList.length > 0) {
            for (var i = 0; i < queueList.length; i++) {
                if (parseInt(queueList[i].dUserId) == parseInt(userid) && parseInt(queueList[i].dProvinceId) == parseInt(provinceid)) {
                    return true;
                }
            }
        }
        return false;
    }
    function OnWindowEspionage() {
        var opCenter = $('#operation-center .spy-wrapper');
        var dataGrid = $('.data-grid', opCenter);
        if (dataGrid.length > 0) {
            dataGrid.find('tr.stripe').each(function (i, e) {
                if (!$(e).hasClass('processed')) {
                    var idstring = $(e).next().attr('id').replace('hidden-tr-', '');
                    var idarr = idstring.split('-');
                    var userid = idarr[0];
                    var secondid = idarr[1];
                    var isNpc = /^\d+$/.test(secondid);
                    if (!isNpc && IsPlayerInQueue(userid)) {
                        var note = $('<div style="font-size:12px; padding-top:3px; color: #632626;">' + tolang('inqueue') + '</div>');
                        $('td:eq(1)', e).append(note);
                    }
                    else if (isNpc && IsProvinceInQueue(userid, secondid)) {
                        var note = $('<div style="font-size:12px; padding-top:3px; color: #632626;">' + tolang('inqueue') + '</div>');
                        $('td:eq(1)', e).append(note);
                    }
                    $(e).addClass('processed');
                }
            });
        }
    }
    function Init() {
        hookFunction(container, 'onLoad', function (arg1) {
            if (typeof arg1 != 'undefined') {
                if (arg1 == 'operation-center' || arg1 == 'OperationCenter') {
                    var opc = $('#operation-center');
                    var attackTab = $('.tab-attack', opc);
                    var esTab = $('.tab-espionage', opc);
                    if (attackTab.hasClass('active')) {
                        OnWindowAttack();
                    }
                    else if (esTab.hasClass('active')) {
                        OnWindowEspionage();
                    }
                }
                else if (arg1 == 'EspionageTabs') {
                    OnWindowEspionage();
                }
            }
        });
        if (document.documentElement.lang == "bg") {
            lang = "bg";
        }
        $('<style type="text/css">' +
            // Estilo para os wrappers dos sliders
            '#army-slider-wrap, #update-interval-slider-wrap {' +
            'position:relative;' +
            'z-index:1;' +
            'height:6px;' +
            'margin:0px 10px;' +
            'padding:7px 14px 7px 16px;' +
            'border-radius:15px;' +
            'border:1px solid rgba(120,108,86,0.8);' +
            'box-shadow:inset 0px 0px 6px rgba(0,0,0,0.2),1px 1px 1px rgba(255,237,196,0.25);' +
            'background:#A69674;' +
            'background:linear-gradient(to bottom, rgba(119,108,86,0.2) 0%, rgba(119,108,86,0.2) 100%);' +
            '}' +
            // Estilo para os sliders
            '#army-slider, #update-interval-slider {}' +
            // Estilo para os links dentro dos sliders
            '#army-slider a, #update-interval-slider a {' +
            'top:-13px;' +
            'width:36px;' +
            'margin-left:-18px;' +
            'height:36px;' +
            'outline:none;' +
            'background:url("http://ihcdn3.ioimg.org/iov6live/gui/custom-ui-sprite.png?v=724") no-repeat -2px -60px;' +
            '}' +
            // Estilo para os links dos sliders em hover
            '#army-slider a:hover, #update-interval-slider a:hover {' +
            'background-position:-2px -96px;' +
            '}' +
            // Estilo para o widget da fila de ataque
            '#widget-attackqueue {' +
            'top:140px;' +
            'right:51px;' +
            'width:250px;' +
            'height:0;' +
            '}' +
            // Estilo para os links dentro do widget da fila de ataque
            '.ui-attackqueue a {' +
            'background-position:0px -329px;' +
            'position:relative;' +
            'float:right;' +
            'width:44px;' +
            'height:28px;' +
            'margin-right:9px;' +
            '}' +
            // Estilo para o tempo exibido nos links da fila de ataque
            '.ui-attackqueue a .m-time {' +
            'position:absolute;' +
            'display:inline-block;' +
            'left:2px;' +
            'bottom:-12px;' +
            'width:38px;' +
            'padding:1px 0px;' +
            'color:#fff;' +
            'font-size:12px;' +
            'text-align:center;' +
            'background:rgba(0,0,0,0.5);' +
            'border-radius:0 0 3px 3px;' +
            '}' +
             //Estilo para o tempo exibido nos links da fila de ataque em hover
            '.ui-attackqueue a:hover .m-time {' +
            'box-shadow:0 0 2px #FFF;' +
            '}' +
            // Estilo para os botões das operações da fila de ataques
            '#queued-attacks .queue-operations button {' +
            'margin-left:8px;' +
            '}' +
            '</style>').appendTo("head");
        var notifyCont = $('<div id="widget-attackqueue" class="ui"><div class="ui-attackqueue"></div></div>');
        var notifyButton = $('<a class="ui-icon" href="javascript:void(0)" title="' + tolang('title') + '">' +
            '<span id="count" class="m-time">0</span>' +
            '<img id="attackqueue-paused" style="width:20px; height:20px; margin-top: -4px; margin-left: 28px; display: none;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAIEElEQVRoQ+2ZW0xUdx7Hv+fMDAwONkMJBtyEgSILVIRhRbSIyWATNepuYPeltqszyGVo1wc3vuxu0o3bh919MfVBW+4Muq1Nuq81YKJzWgVZapfxCi4iU4qF1IKzym3m3Da/Q2kLc/4wA5pNE/9Pk5n/5ff5/+7/4fATH9xPXH48B/h/a/C5BuY1sHfvXpvCcQ4OvJ3nYNfTjKLCp0Lx8aoqnD9//sunob1Va2DPvn1OA8e7kpLWOdavX4/1Kcl4MTERa+PjF8j3ZHISk0+e4OvRMfj9fjx8+I0gq4qn/ZNP2lYDsmKAXbv2OHmD4XhOdnZaYeFmrH3hBUxMTGB4+CuMjY1pn0Oh0ALZ4uPjER9vQXJyMhKsVow8eID+/rv+menp4xcutK8IJGqAnTt32niDybMhI8NRUrIdseZY3LnTh4GBe5icnIziMlVYLPHIyHgJIyMj+GpkRJDFkOvSpUtRmVZUAKWlu/Mt8bHCjpISa1ZWFnp9Pty+fSfspqOg0KaqqgJZViBLciAE2eHt6Lge6R4RAzhefdVpibOcLCv7lZXneHz62WVMjI9Hes6y81QAiqJAEsWAqEhHhYsXIzKpiABKS0vz4+IsQll5mfXRxASuXu1e9a3rEalQocgKJEkKKIrk8Hq9y2piWYDi4mLb2rVW369/U24lxxSET5e9zdVMUFVV04RImgjN2ru6upb0iWUBSnbs8O7evccRF2dGR8eF1cgW8VqCkGWZtCx0XrlcutTCJQG2bdvutKWlenbv2oWPP/4ngovCoiiG6KbC9uc5DrFmMziO/95Jg7OzUFSy9IXDZDLBZIpZ9K0KghBDIiRJdnV3dzL9YWmAV4qHqior09rbO/Dt+LcLDiHB//THP8BuD0+6ZAJvv/1n+L+c036azYZ33vkLDAbDgj04jkNvby/++re/g0AWD1mSIUqiv/tqVzpLC0yAoqIi58bcTZ6U5GRc6ewMWz89PY0LHe0wGo26e586fRoETuOX+/fD7a7RnTc7O4u9+/ZjzZo1Yb9rUUmSoMiSq6enR1cLTIDCwi3e8vJyx8WLlxAMBcM2n5mZQVfnFWY0OnPmLM599JG27sBrr+HQoYO6ADExMSjeXoK4uLjw31VAVmQKrcK1a5/r+oIuQEFBgS3hxUT/lsJCfHb5su7BBNB9tYsJ0NZ2Bh+eO6etff3AATidh5gA214p1gegJKeokGQJsiSm9fb2hkUkXYA8u91pz8v3fD06iiePn+gDzM6g51/sfODxtOGDDz7U1r7xxutwuZxMgKKt2xBn1tEAAWAuIomS6Lrh84WZkS7Apk15727duvWoz3cdrJ6NbPfa5z1MDbR6PDh79h+a0AcP/hYVLhcToHBLEcxms76fqpShZYp2J2/evPH7xZN0ATbm5npzsnMc9+/fBzh9N6Gw+MUX19gAra1oO3NWO8956CAqKiqYAJs3F2phV3fMJzZJFG7fuhXmB7rS5eTkeI2mGAfP88ymeTYYhK/330yAlpYWkBnRIPM5fPgwE8Be8AuYY2P1AUCOTDVSSOjr64sMICsr22s0Gh38orj94xOCwSBuXPcxAZqbW9DS2qotOVxRgcpKNkBevh2xSwCoc6WFcPduf2QAmZmZXqPJ5KCqkzUoK9+6eYMJ0NTUjObmZm15ZWUlqqoqmRrI3ZSH2JjF2fiH6ZTBSQMDAwORAWRkbPgOgJ2oCeDO7VtMgMamJjQ1NmlSVFVXobqqignw8sbcCABEYXDwXmQAaenpXpPR5OB4tgbEUAh9fexmprGxEfUNjZrQ7ppqVFdXMwFycl6GaQkNaCYkiYJ/aCgygNTUtHeNJsNRKsYYQQihkIj/3O1naqChoQF19fWa0LVuN2pq9EsJysQ/z8pGTEx4LURrqf6jjk0SxZPDw8ORhdHU1FQnxxs8VFVSwaU3QmII9wYGmAD19fV4//06bembb9bC7XYzNbAhMxMxYRXp3PT5/kBSFdeD4eHIEllKSorNaDT5KYyy4qgkihgcHGQC1NXV4fR772lC/O6tt1BbW8sEyMjIgFGnGv0egPplWUobHR2NrJSghSkpP/PyBo4ZiahKHBq6zwSg2z916pQm9JEjRzQt6A0yofT0l5hVraIqUGRZGB0djbyYo4OSk5OdAOfRkpmOGUmSiP7+/rAaf17IEydOgEKpFoWqKnHs2DFdAKpzsrOzYTSG+8C8+QCqa2xsLLpymk5LWrduiOf4NI4P9wOq1evr6uBwOBZUktToBAIB1LjdWrNCo6CgAA319UhKSloA8fjxY3R2dsJdWwvNXBcNqkQVRfE/fPhN9A0N7ZWYmOjkuDkt6DkDQZCKFw/CpSzOfedAc68NMsIbSoCSpa7wVAPR3qrqGh8fX1lLSYIlJCR4OZ53kBkt+wKgayTRf0mgZD6qogiPHj1aeVNPR1utVhsAH8dxVmZIil7GZVZoTX0AgD0QCKzuWYVOslis+TyvCBzPWZ+1HsjcVEUNKArvmJoKrP5ha/6qLBYL+cNJUgorua1WEZrZzN380ampqaf3tPgjiHxFUQWOw1M2JxJcS1sBnqebn1r25udlitovzWazTVVVDwDNsZ/GoJsHIASDwTIA/41mzxVLYDKZqEs/Tu9W2oHRwvzwSuenfURRjMhk9EJ2NMBhcw0GA4G4AM4R3UaqAMAjy/KKBF+xCS0hJIVb6qPtqqrq/snHcZxPURQfmQuAqP6JYZ27YhOK7raf3eznAM/ubiPb+bkGIrunZzfrf9Qqgl6vpGkuAAAAAElFTkSuQmCC" />' +
            '</a>');
        $('.ui-attackqueue', notifyCont).append(notifyButton);
        $('#imperia').append(notifyCont);
        if (GetQueuePauseState()) {
            $('#attackqueue-paused').show();
        }
        UpdateQueueNotification();
        notifyButton.click(function () {
            OpenQueuedAttacks();
        });
        /*document.dispatchEvent(new CustomEvent('addCommand', {
            detail: {
                command: "/queueinterval",
                capture: true,
                callback: QueueSetInterval,
            }
        }));
        QueueLoadInterval();
        interval = setTimeout(Update, intervalTime);
    }
    function InitCheck() {
        if (typeof io.showUI != 'undefined') {
            hookFunction(io, 'showUI', function () {
                Init();
            });
        }
        else {
            setTimeout(InitCheck, 500);
        }
    }
    function hookFunction(object, functionName, callback) {
        (function (originalFunction) {
            object[functionName] = function () {
                var returnValue = originalFunction.apply(this, arguments);
                callback.apply(this, arguments);
                return returnValue;
            };
        }(object[functionName]));
    }
    $(document).ready(function () {
        InitCheck();
    });
*/
    //===================================NOVA APARENCIA IMPERIA ONLINE==================================================
    (function () {
        'use strict';
        // Adiciona estilos CSS personalizados
        GM_addStyle(`
        body {
            background-color: #f0f0f0; /* Cor de fundo */
            font-family: 'Arial', sans-serif; /* Fonte mais confortável */
            margin: 0;
            padding: 0;
        }
        .header {
            background-color: #4CAF50; /* Cor do cabeçalho */
            color: white; /* Cor do texto no cabeçalho */
            padding: 15px;
            text-align: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        h1 {
            margin: 0;
            font-size: 24px;
        }
        .button {
            background-color: #008CBA; /* Cor dos botões */
            color: white;
            border: none;
            border-radius: 5px; /* Bordas arredondadas */
            padding: 10px 20px;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.2s;
            margin: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .button:hover {
            background-color: #005f75; /* Cor ao passar o mouse */
            transform: scale(1.05); /* Efeito de aumento ao passar o mouse */
        }
        .footer {
            text-align: center;
            padding: 10px;
            background-color: #4CAF50; /* Cor do rodapé */
            color: white;
            position: relative;
            bottom: 0;
            width: 100%;
            box-shadow: 0 -2px 5px rgba(0,0,0,0.2);
        }
    `);
    })();
    // Script Atacar Barbaros ---------------------------------------------------------------------------------------------------------
    var isActiveABAR = false;
    var intervalABAR = 82500;
    var timeoutABAR;
    var img_inactiveABAR = "ui-icon ui-main ui-fast-attack-barb";
    var img_activeABAR = "marriage-btn gp-icons cancel";
    InitAtBAR();
    function handle_mousedown(e) {
        if ($j(e.target).hasClass('message') || $j(e.target).hasClass('username')) {
            return;
        }
        if (e.ataqButtonBAR !== 0) {
            return;
        }
        window.my_dragging = {};
        my_dragging.pageX0 = e.pageX;
        my_dragging.pageY0 = e.pageY;
        my_dragging.elem = ataqAutoBAR;
        my_dragging.offset0 = $(ataqAutoBAR).offset();
        function handle_dragging(e) {
            var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
            var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
            $j(my_dragging.elem).offset({ top: top, left: left });
        }
        function handle_mouseup(e) {
            $j('body').off('mousemove', handle_dragging).off('mouseup', handle_mouseup);
        }
        $j('body').on('mouseup', handle_mouseup).on('mousemove', handle_dragging);
    }
    function autoSave() {
        clearTimeout(timeoutABAR);
        timeoutABAR = setTimeout(autoSave, intervalABAR);
        if (!isActiveABAR) {
            return;
        }
        var links = $j('.barb-card-buttons a.button');
        var userIds = []; // Lista vazia para armazenar userIds
        // Função para extrair userId e provinceId a partir do código
        function extractIdsFromCode(code) {
            let matchUserId = code.match(/'userId':'(\d+)'/);
            let matchProvinceId = code.match(/'provinceId':'(\d+)'/);
            let userId = matchUserId ? matchUserId[1] : null;
            let provinceId = matchProvinceId ? matchProvinceId[1] : null;
            return { userId, provinceId };
        }
        function performAttacks(combinations) {
            // Shuffle combinations randomly
            for (let i = combinations.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [combinations[i], combinations[j]] = [combinations[j], combinations[i]];
            }
            // Loop through shuffled combinations and perform attacks
            //     for (let i = 0; i < 19 * combinations.length; i++) {
            //         var { userId, provinceId } = combinations[i % combinations.length];
            if ($('#missions .outgoing.province').html() == null) {
                //	 autoSave();
            }
            //unction autoSave(){
            // Loop through shuffled combinations and perform 5 attacks
            for (let i = 0; i < 7; i++) {  // Realizar exatamente 5 ataques
                var { userId, provinceId } = combinations[i % combinations.length];
                setTimeout(function () {
                    $j(".ui-icon.mission-my .unit-count").each(function () {
                        var unitValue = $j(this).text();
                        console.log("Unidade encontrada: ", unitValue);
                    });
                }, 2000); // Espera 2 segundos antes de executar
                var unit = $j(".ui-icon.mission-my .m-count").text();
                console.log("Valor de m-count para ataques a mim: ", unit);
                //    var unit = $j(".ui-icon.mission-my .unit-count").text();
                if (unit >= 8) {
                    console.log('Aguardando Chegada de Tropas ---->');
                } else {
                    //s alert(unit)
                    (function (userId, provinceId, i) {
                        setTimeout(function () {
                            console.log('Ataque iniciado:', 'User ID:', userId, 'Province ID:', provinceId);
                            javascript: void (xajax_viewOperationCenter(container.open({ saveName: 'operation-center', title: 'Centro de Comando' }), { 'tab': 'attack', 'userId': userId, 'provinceId': provinceId }));
                        }, 2000);
                        setTimeout(function () {
                            $j('#preset0').click();
                        }, 5500);
                        setTimeout(function () {
                            $j('#attackType').val('2');
                            xajax_doAttack('OperationCenter', xajax.getFormValues('sendAttackForm'));
                        }, 10000);
                        setTimeout(function () {
                            javascript: void (container.close({ saveName: 'operation-center', cancelCallback: true, flow: true, closedWith: 'click' }));
                        }, 25000 * i);
                    })(userId, provinceId, i);
                    // }
                }
            }
        }
        // Extrair as combinações de userId e provinceId a partir dos links
        var combinations = [];
        links.each(function (index, element) {
            var hrefValue = $j(element).attr('href');
            let { userId, provinceId } = extractIdsFromCode(hrefValue);
            if (userId !== null && provinceId !== null) {
                userId = parseInt(userId);
                provinceId = parseInt(provinceId);
                console.log('User ID:', userId, 'Province ID:', provinceId);
                combinations.push({ userId, provinceId });
                // Adicionar userId na lista userIds, caso ainda não esteja presente
                if (!userIds.includes(userId)) {
                    userIds.push(userId);
                }
            }
        });
        // Agora a lista userIds conterá os valores únicos de userId obtidos dos links
        xajax_viewOperationCenter(container.open({ saveName: 'operation-center', title: 'Centro de Comando' }), { 'tab': 'attack', 'subTab': 'loadAttack', 'userId': 1007, 'provinceId': '1207' }); SetFocusTop();
        // Chamar a função para buscar a tela inicial antes de iniciar os ataques
        setTimeout(function () {
            console.log('Chamando xajax_viewMapFastSearch para carregar a primeira página');
            xajax_viewMapFastSearch(container.open({ saveName: 'mapFastSearch', title: 'Procura rápida de bárbaros' }), { 'order': 'ASC' });
        }, 900);
        // Tempo de espera para trocar para a página 2 após a primeira página ter carregado
        setTimeout(function () {
            console.log('Carregando a página 2 do mapa de pesquisa rápida');
            javascript: void (xajax_viewMapFastSearch(container.open({ saveName: 'mapFastSearch', title: 'Procura rápida de bárbaros' }), { 'order': 'ASC', 'page': '1' }));
            javascript: void (xajax_viewOperationCenter(container.open({ saveName: 'operation-center', title: 'Centro de Comando' }), { 'tab': 'attack', 'userId': userId, 'provinceId': provinceId }));
        }, 1300);
        // Chamar a função de ataque após carregar a segunda página
        setTimeout(function () {
            console.log('Iniciando ataques após o carregamento das páginas');
            performAttacks(combinations);
        }, 2500);
        // setTimeout(function() {
        //   javascript:void(xajax_viewMapFastSearch('mapFastSearch', { 'order': 'ASC', 'page': '1' }));
        //}, 1100);
    }
    function InitAtBAR() {
        $j('<style type="text/css">' +
            '#iniciarAtaqBAR { position:absolute;bottom:275px;left:100px;z-index:0; style="cursor:pointer;" }' +
            '</style>').appendTo("head");
        var ataqAutoBAR = 1;
        var ataqButtonBAR = 1;
        ataqAutoBAR = $j('<div id="ataqAutoBAR"></div>');
        ataqButtonBAR = $j('<div id="iniciarAtaqBAR" style="float: right;display:block;" title="Atacar Barbaros."<div class="' + img_inactiveABAR + '"style="cursor:pointer;"></div></div></div>');
        $j('#imperia').append(ataqButtonBAR);
        ataqButtonBAR.click(function () {
            if (isActiveABAR) {
                ataqAutoBAR.fadeOut('fast');
                console.log('Script de Ataques Encerrado ---->');
                isActiveABAR = false;
                ataqButtonBAR.addClass("" + img_inactiveABAR + "").removeClass("" + img_activeABAR + "");
            } else {
                ataqAutoBAR.fadeIn('fast');
                isActiveABAR = true;
                ataqButtonBAR.addClass("" + img_activeABAR + "").removeClass("" + img_inactiveABAR + "");
                autoSave();
            }
        });
        timeoutABAR = setTimeout(autoSave, intervalABAR);
    }
    function hookFunctionBAR(object, functionName, callback) {
        (function (originalFunction) {
            object[functionName] = function () {
                var returnValue = originalFunction.apply(this, arguments);
                callback.apply(this, arguments);
                return returnValue;
            };
        }(object[functionName]));
    }
    $j(document).ready(function () {
        var eventAtbar = document.createEvent('Event');
        eventAtbar.initEvent('addCommand', true, true);
        document.addEventListener('addCommand', function (e) {
            if (e.detail !== null) {
                ChatAddCommand(e.detail);
            }
        }, false);
        function InitCheckAtBAR() {
            if (typeof io.showUI != 'undefined') {
                hookFunctionBAR(io, 'showUI', function () {
                    InitAtBAR();
                });
            } else {
                setTimeout(InitCheckAtBAR, 500);
            }
        }
        InitCheckAtBAR();
    });

    // Script EVENTOS DE ALIANÇA ---------------------------------------------------------------------------------------------------------
    var isActiveAALLYEVE = false;
    var intervalAALLYEVE = 32500;
    var timeoutAALLYEVE;
    var img_inactiveALLYEVE = "sim-skill skill-413 tooltip-arrow ui-pass";
    var img_activeAALLYEVE = "marriage-btn gp-icons cancel";
    InitAtALLYEVE()
    function handle_mousedownALLYEVE(e) {
        if ($j(e.target).hasClass('message') || $j(e.target).hasClass('username')) {
            return;
        }
        if (e.ataqButtonALLYEVE !== 0) {
            return;
        }
        window.my_dragging = {};
        my_dragging.pageX0 = e.pageX;
        my_dragging.pageY0 = e.pageY;
        my_dragging.elem = depAuto;
        my_dragging.offset0 = $j(depAuto).offset();
        function handle_dragging(e) {
            var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
            var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
            $j(my_dragging.elem).offset({ top: top, left: left });
        }
        function handle_mouseup(e) { $j('body').off('mousemove', handle_dragging).off('mouseup', handle_mouseup); }
        $j('body').on('mouseup', handle_mouseup).on('mousemove', handle_dragging);
    }
    function controicasasALLYEVE() {
        clearTimeout(timeoutAALLYEVE);
        timeoutAALLYEVE = setTimeout(controicasasALLYEVE, intervalAALLYEVE);
        if (!isActiveAALLYEVE) {
            return;
        }
        setTimeout(function () {
            //casa
            xajax_viewAlliance('alliance', { 'tab': 11 })
        }, 500)
        setTimeout(function () {
            //casa
            javascript: void (xajax_viewAlliance(container.open({ saveName: 'alliance', title: 'Aliança' })))
        }, 1500)
        setTimeout(function () {
            //casa
            xajax_doAttackAllianceWorldboss(container.open({ saveName: 'operation-center' }))
        }, 2500)
        setTimeout(function () {
            $('#select-all-army').click();
        }, 3500);
        setTimeout(function () {
            // $('#preset0').click();
        }, 4000);
        setTimeout(function () {
            siegeAttackCheck('$(\'#attackType\').val(\'1\'); xajax_doAttack(\'OperationCenter\', xajax.getFormValues(\'sendAttackForm\'));');
        }, 7000);
    }
    function InitAtALLYEVE() {
        $j('<style type="text/css">' +
            '#iniciarAtaqALLYEVE { position:absolute;bottom:225px;left:100px;z-index:0; style="cursor:pointer; "} </style>').appendTo("head");
        var ataqAutoALLYEVE = 1
        var ataqButtonALLYEVE = 1
        ataqAutoALLYEVE = $j('<div id="ataqAutoALLYEVE"></div>')
        ataqButtonALLYEVE = $j('<div id="iniciarAtaqALLYEVE" style="float: right;display:block;" title="eventos da aliança" <div class="' + img_inactiveALLYEVE + '"style="cursor:pointer;"></div></div></div>');
        $j('#imperia').append(ataqButtonALLYEVE);
        ataqButtonALLYEVE.click(function () {
            if (isActiveAALLYEVE) {
                ataqAutoALLYEVE.fadeOut('fast');
                console.log('Script de Ataques Encerrado ---->');
                isActiveAALLYEVE = false;
                ataqButtonALLYEVE.addClass("" + img_inactiveALLYEVE + "").removeClass("" + img_activeAALLYEVE + "");
            } else {
                ataqAutoALLYEVE.fadeIn('fast');
                isActiveAALLYEVE = true;
                ataqButtonALLYEVE.addClass("" + img_activeAALLYEVE + "").removeClass("" + img_inactiveALLYEVE + "");
                controicasasALLYEVE();
            }
        });
        timeoutAALLYEVE = setTimeout(controicasasALLYEVE, intervalAALLYEVE);
    }
    function hookFunctionALLYEVE(object, functionName, callback) {
        (function (originalFunction) {
            object[functionName] = function () {
                var returnValue = originalFunction.apply(this, arguments);
                callback.apply(this, arguments);
                return returnValue;
            };
        }
            (object[functionName]));
    }
    $j(document).ready(function () {
        var eventAtALLYEVE = document.createEvent('Event');
        eventAtALLYEVE.initEvent('addCommand', true, true);
        document.addEventListener('addCommand', function (e) {
            if (e.detail !== null) {
                ChatAddCommand(e.detail);
            }
        }, false);
        function InitCheckAtALLYEVE() {
            if (typeof io.showUI != 'undefined') {
                hookFunctionALLYEVE(io, 'showUI', function () {
                    controicasasALLYEVE();
                });
            } else {
                setTimeout(InitCheckAtALLYEVE, 500);
            }
        }
        InitCheckAtALLYEVE();
    });
    // Script ENVIAR NOBRES NOS JOGOS OLIMPICOS ---------------------------------------------------------------------------------------------------------
    var isActiveASUMMER = false;
    var intervalASUMMER = 32500;
    var timeoutASUMMER;
    var img_inactiveSUMMER = "sim-skill skill-408 tooltip-arrow ui-pass";
    var img_activeASUMMER = "marriage-btn gp-icons cancel";
    InitAtSUMMER()
    function handle_mousedownSUMMER(e) {
        if ($j(e.target).hasClass('message') || $j(e.target).hasClass('username')) {
            return;
        }
        if (e.ataqButtonSUMMER !== 0) {
            return;
        }
        window.my_dragging = {};
        my_dragging.pageX0 = e.pageX;
        my_dragging.pageY0 = e.pageY;
        my_dragging.elem = depAuto;
        my_dragging.offset0 = $j(depAuto).offset();
        function handle_dragging(e) {
            var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
            var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
            $j(my_dragging.elem).offset({ top: top, left: left });
        }
        function handle_mouseup(e) { $j('body').off('mousemove', handle_dragging).off('mouseup', handle_mouseup); }
        $j('body').on('mouseup', handle_mouseup).on('mousemove', handle_dragging);
    }
    function controicasasSUMMER() {
        clearTimeout(timeoutASUMMER);
        timeoutASUMMER = setTimeout(controicasasSUMMER, intervalASUMMER);
        if (!isActiveASUMMER) {
            return;
        }
        setTimeout(function () {
            //  xajax_viewOlympicsPPAttackScreen(container.open({saveName:'olympicsPPAttack',title:'Grande Conselho'}), {})
        }, 600)
        setTimeout(function () {
            //  xajax_doOlympicsBuildCouncil('olympicsPPAttack')
        }, 1000)
        setTimeout(function () {
            xajax_viewPeopleForAttackMission(container.open({ saveName: 'ppAttackSend', title: 'Enviar delegação' }))
        }, 2000)
        setTimeout(function () {
            xajax_doSendPeopleForAttackMission('bossAttack', xajax.getFormValues('pp-attack-send')); return false;
        }, 2900)
        setTimeout(function () {
            $('#select-all-army').click()
        }, 4000)
        setTimeout(function () {
            $('.Enviar.delegação').click()
        }, 5000)
        setTimeout(function () {
            $('.sendAttack').click()
        }, 5500)
        setTimeout(function () {
            xajax_doSendPeopleForAttackMission('bossAttack', xajax.getFormValues('pp-attack-send')); return false;
        }, 6500)
        function a()
        //{xajax_doSendPeopleForAttackMission('ppAttackSend', xajax.getFormValues('pp-attack-send')); return false;;}
        { xajax_doSendPeopleForAttackMission('bossAttack', xajax.getFormValues('pp-attack-send')); return false; }
        setTimeout(function () {
            a();
            // $('.button').click()
        }, 7000)
        //   }
        setTimeout(function () {
            // javascript:void(container.close({saveName: 'olympicsPPAttack', cancelCallback: true, flow: true, closedWith: 'click'}))
        }, 6990)
        setTimeout(function () {
            //   javascript:void(container.close({saveName: 'ppAttackSend', cancelCallback: true, flow: true, closedWith: 'click'}))
        }, 7300)
        setTimeout(function () {
            //  javascript:void(container.close({saveName: 'olympicsPPAttack', cancelCallback: true, flow: true, closedWith: 'click'}))
        }, 8400)
    }
    function InitAtSUMMER() {
        $j('<style type="text/css">' +
            '#iniciarAtaqSUMMER { position:absolute;bottom:175px;left:100px;z-index:0; style="cursor:pointer; "} </style>').appendTo("head");
        var ataqAutoSUMMER = 1
        var ataqButtonSUMMER = 1
        ataqAutoSUMMER = $j('<div id="ataqAutoSUMMER"></div>')
        ataqButtonSUMMER = $j('<div id="iniciarAtaqSUMMER" style="float: right;display:block;" title="Enviar nobres jogos olimpicos" <div class="' + img_inactiveSUMMER + '"style="cursor:pointer;"></div></div></div>');
        $j('#imperia').append(ataqButtonSUMMER);
        ataqButtonSUMMER.click(function () {
            if (isActiveASUMMER) {
                ataqAutoSUMMER.fadeOut('fast');
                console.log('Script de Ataques Encerrado ---->');
                isActiveASUMMER = false;
                ataqButtonSUMMER.addClass("" + img_inactiveSUMMER + "").removeClass("" + img_activeASUMMER + "");
            } else {
                ataqAutoSUMMER.fadeIn('fast');
                isActiveASUMMER = true;
                ataqButtonSUMMER.addClass("" + img_activeASUMMER + "").removeClass("" + img_inactiveSUMMER + "");
                controicasasSUMMER();
            }
        });
        timeoutASUMMER = setTimeout(controicasasSUMMER, intervalASUMMER);
    }
    function hookFunctionSUMMER(object, functionName, callback) {
        (function (originalFunction) {
            object[functionName] = function () {
                var returnValue = originalFunction.apply(this, arguments);
                callback.apply(this, arguments);
                return returnValue;
            };
        }
            (object[functionName]));
    }
    $j(document).ready(function () {
        var eventAtSUMMER = document.createEvent('Event');
        eventAtSUMMER.initEvent('addCommand', true, true);
        document.addEventListener('addCommand', function (e) {
            if (e.detail !== null) {
                ChatAddCommand(e.detail);
            }
        }, false);
        function InitCheckAtSUMMER() {
            if (typeof io.showUI != 'undefined') {
                hookFunctionSUMMER(io, 'showUI', function () {
                    controicasasSUMMER();
                });
            } else {
                setTimeout(InitCheckAtSUMMER, 500);
            }
        }
        InitCheckAtSUMMER();
    });
    // Script Espionagem automatica para o jogos de inverno ---------------------------------------------------------------------------------------------------------
    var isActiveASUMMERSPY = false;
    var intervalASUMMERSPY = 32500;
    var timeoutASUMMERSPY;
    var img_inactiveSUMMERSPY = "unit race-1 unit-ks";
    var img_activeASUMMERSPY = "marriage-btn gp-icons cancel";
    InitAtSUMMERSPY()
    function handle_mousedownSUMMERSPY(e) {
        if ($j(e.target).hasClass('message') || $j(e.target).hasClass('username')) {
            return;
        }
        if (e.ataqButtonSUMMERSPY !== 0) {
            return;
        }
        window.my_dragging = {};
        my_dragging.pageX0 = e.pageX;
        my_dragging.pageY0 = e.pageY;
        my_dragging.elem = depAuto;
        my_dragging.offset0 = $j(depAuto).offset();
        function handle_dragging(e) {
            var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
            var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
            $j(my_dragging.elem).offset({ top: top, left: left });
        }
        function handle_mouseup(e) { $j('body').off('mousemove', handle_dragging).off('mouseup', handle_mouseup); }
        $j('body').on('mouseup', handle_mouseup).on('mousemove', handle_dragging);
    }
    function controicasasSUMMERSPY() {
        clearTimeout(timeoutASUMMERSPY);
        timeoutASUMMERSPY = setTimeout(controicasasSUMMERSPY, intervalASUMMERSPY);
        if (!isActiveASUMMERSPY) {
            return;
        }
        //1193 veterinar84
        //746 KayPea
        //654 pinokioo
        //1142 plamss79
        ///758 ASGAR47
        ///1078 rizava
        //1664 boom-boom
        //954 Rasode
        //1566_ERTOGRUL_
        //431 Ladybird_
        //1446 marin1995
        //64 marius90
        //1333 lordz.lucas
        //469 FB1306583001
        //715 fanemiron
        var contador = 0;
        var capital = 1;
        var nomesPlayers = [
            "Ladybird_", "KayPea", "pinokioo", "ASGAR47", "Rasode", "marius90", "FB1306583001", "fanemiron"
        ];
        var capitais = [
            ['#spy_count_2', '#spy_count_3', '#spy_count_9', '#spy_count_8', '#spy_count_7', '#spy_count_6', '#spy_count_4', '#spy_count_5', '#spy_count_3', '#spy_count_10', '#spy_count_11', '#spy_count_12'],
            ['#spy_count_2', '#spy_count_3', '#spy_count_9', '#spy_count_8', '#spy_count_7', '#spy_count_6', '#spy_count_4', '#spy_count_5', '#spy_count_3', '#spy_count_10', '#spy_count_11', '#spy_count_12'],
            ['#spy_count_2', '#spy_count_3', '#spy_count_9', '#spy_count_8', '#spy_count_7', '#spy_count_6', '#spy_count_4', '#spy_count_5', '#spy_count_3', '#spy_count_10', '#spy_count_11', '#spy_count_12'],
            ['#spy_count_2', '#spy_count_3', '#spy_count_9', '#spy_count_8', '#spy_count_7', '#spy_count_6', '#spy_count_4', '#spy_count_5', '#spy_count_3', '#spy_count_10', '#spy_count_11', '#spy_count_12'],
            ['#spy_count_2', '#spy_count_3', '#spy_count_9', '#spy_count_8', '#spy_count_7', '#spy_count_6', '#spy_count_4', '#spy_count_5', '#spy_count_3', '#spy_count_10', '#spy_count_11', '#spy_count_12'],
            ['#spy_count_2', '#spy_count_3', '#spy_count_9', '#spy_count_8', '#spy_count_7', '#spy_count_6', '#spy_count_4', '#spy_count_5', '#spy_count_3', '#spy_count_10', '#spy_count_11', '#spy_count_12'],
            ['#spy_count_2', '#spy_count_3', '#spy_count_9', '#spy_count_8', '#spy_count_7', '#spy_count_6', '#spy_count_4', '#spy_count_5', '#spy_count_3', '#spy_count_10', '#spy_count_11', '#spy_count_12'],
            ['#spy_count_2', '#spy_count_3', '#spy_count_9', '#spy_count_8', '#spy_count_7', '#spy_count_6', '#spy_count_4', '#spy_count_5', '#spy_count_3', '#spy_count_10', '#spy_count_11', '#spy_count_12'],
            ['#spy_count_2', '#spy_count_3', '#spy_count_9', '#spy_count_8', '#spy_count_7', '#spy_count_6', '#spy_count_4', '#spy_count_5', '#spy_count_3', '#spy_count_10', '#spy_count_11', '#spy_count_12'],
            ['#spy_count_2', '#spy_count_3', '#spy_count_9', '#spy_count_8', '#spy_count_7', '#spy_count_6', '#spy_count_4', '#spy_count_5', '#spy_count_3', '#spy_count_10', '#spy_count_11', '#spy_count_12']
        ];
        setTimeout(function () {
            javascript: void (xajax_viewOperationCenter(container.open({ "action": "viewOperationCenter", "saveName": "operation-center", "title": "Centro de Comando" }, { "menuTitle": "Centro de Comando", "callBack": "makeFlashAction", "action": { "action": "viewOperationCenter", "saveName": "operation-center", "title": "Centro de Comando" } })));
        }, 2000);
        setTimeout(function () {
            javascript: void (xajax_viewOperationCenter('Array', { 'tab': 'espionage', 'subTab': 'espionage_sub' }));
        }, 2300);
        setTimeout(function () {
            chamaplayer();
        }, 3300);
        setTimeout(function () {
            escolhecapital();
        }, 7000);
        setTimeout(function () {
            agora();
        }, 14000);
        function chamaplayer() {
            $('.button.icons.infiltrate').click();
            $('.button.icons.return').click();
            setTimeout(function () {
                var nomePlayer = nomesPlayers[contador];
                javascript: (function () { jQuery('#spy-search-filter').val(nomePlayer).keyup(); })();
            }, 1200);
            setTimeout(function () {
                $('.button.blue.search.fleft').click();
            }, 1400);
            setTimeout(function () {
                var qtd1 = $('#spies-count-quick-load').text();
            }, 1700);
        }
        function escolhecapital() {
            setTimeout(function () {
                if (capital > capitais[contador].length) {
                    capital = 1;
                    contador++; // Incrementa o contador para o próximo jogador
                    if (contador < nomesPlayers.length) {
                        controicasas(); // Chama a função controicasas() novamente para o próximo jogador
                    } else {
                        console.log("Espionagem concluída."); // Não há mais jogadores para espionar, encerre o processo aqui
                    }
                    return;
                }
                var capitalID = capitais[contador][capital - 1];
                var qtd = $('#spies-count-quick-load').text();
                javascript: (function () { jQuery(capitalID).val(qtd).keyup(); })();
                capital++; // Incrementa o valor da capital para a próxima iteração
            }, 1400);
        }
        function agora() {
            setTimeout(function () {
                xajax_doSendSpyToUser('spy_send', xajax.getFormValues('send-spy-form'));
                //  $('.button.icons.infiltrate').click();
            }, 1500);
            setTimeout(function () {
                //xajax_doSendSpyToUser('spy_send', xajax.getFormValues('send-spy-form'));
                $('.button.icons.infiltrate').click();
            }, 66900);
            setTimeout(function () {
                //   javascript:void(container.close({saveName: 'spy-report-44927', cancelCallback: true, flow: true, closedWith: 'click'}))
                var closeButton = document.querySelector('.ui-ib.fright.close');
                if (closeButton) {
                    closeButton.click();
                }
            }, 68900);
            setTimeout(function () {
                SetFocusTop();
                container.close({ saveName: 'missions', cancelCallback: true, flow: true, closedWith: 'click' });
                SetFocusTop();
            }, 69000);
            setTimeout(function () {
                javascript: void (container.close({ saveName: 'terminalError', cancelCallback: true, flow: true, closedWith: 'click' }))
                //   javascript:void(container.close({saveName: 'spy-report-45256', cancelCallback: true, flow: true, closedWith: 'click'}))
            }, 69800);
            setTimeout(function () {
                $('.button.icons.return').click();
            }, 69900);
            setTimeout(function () {
                controicasasSUMMERSPY();
            }, 99000);
        }
    }
    function InitAtSUMMERSPY() {
        $j('<style type="text/css">' +
            '#iniciarAtaqSUMMERSPY { position:absolute;bottom:125px;left:100px;z-index:0; style="cursor:pointer; "} </style>').appendTo("head");
        var ataqAutoSUMMERSPY = 1
        var ataqButtonSUMMERSPY = 1
        ataqAutoSUMMERSPY = $j('<div id="ataqAutoSUMMERSPY"></div>')
        ataqButtonSUMMERSPY = $j('<div id="iniciarAtaqSUMMERSPY" style="float: right;display:block;" title="Espionagem automatica para o jogos de inverno / verão" <div class="' + img_inactiveSUMMERSPY + '"style="cursor:pointer;"></div></div></div>');
        $j('#imperia').append(ataqButtonSUMMERSPY);
        ataqButtonSUMMERSPY.click(function () {
            if (isActiveASUMMERSPY) {
                ataqAutoSUMMERSPY.fadeOut('fast');
                console.log('Script de Ataques Encerrado ---->');
                isActiveASUMMERSPY = false;
                ataqButtonSUMMERSPY.addClass("" + img_inactiveSUMMERSPY + "").removeClass("" + img_activeASUMMERSPY + "");
            } else {
                ataqAutoSUMMERSPY.fadeIn('fast');
                isActiveASUMMERSPY = true;
                ataqButtonSUMMERSPY.addClass("" + img_activeASUMMERSPY + "").removeClass("" + img_inactiveSUMMERSPY + "");
                controicasasSUMMERSPY();
            }
        });
        timeoutASUMMERSPY = setTimeout(controicasasSUMMERSPY, intervalASUMMERSPY);
    }
    function hookFunctionSUMMERSPY(object, functionName, callback) {
        (function (originalFunction) {
            object[functionName] = function () {
                var returnValue = originalFunction.apply(this, arguments);
                callback.apply(this, arguments);
                return returnValue;
            };
        }
            (object[functionName]));
    }
    $j(document).ready(function () {
        var eventAtSUMMERSPY = document.createEvent('Event');
        eventAtSUMMERSPY.initEvent('addCommand', true, true);
        document.addEventListener('addCommand', function (e) {
            if (e.detail !== null) {
                ChatAddCommand(e.detail);
            }
        }, false);
        function InitCheckAtSUMMERSPY() {
            if (typeof io.showUI != 'undefined') {
                hookFunctionSUMMERSPY(io, 'showUI', function () {
                    controicasasSUMMERSPY();
                });
            } else {
                setTimeout(InitCheckAtSUMMERSPY, 500);
            }
        }
        InitCheckAtSUMMERSPY();
    });
    // ==================================================================== FUNÇÕES INICIADAS COM SCRIPT ================================================================
    setTimeout(function () {
        $("#wc-newsfeed-controls-widget .newsfeed-controls.ui-icons.arrow-down")[0].click();
    }, 3000);
    // ==========================================================================      FINAL    ========================================================================
}) // final função validação