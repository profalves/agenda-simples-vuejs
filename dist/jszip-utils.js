/ * !
JSZipUtils - Uma coleção de utilitários de navegador cruzado para acompanhar o JSZip.
<http://stuk.github.io/jszip-utils>
(c) 2014 Stuart Knightley, David Duponchel
Dupla licenciada sob a licença MIT ou GPLv3. Consulte https://raw.github.com/Stuk/jszip-utils/master/LICENSE.markdown.
* /
! função ( e ) { " objeto " == tipo de  exportação ? módulo . export = e () : " function " == typeof define && define . Amd ? define (e) : " indefinido " ! = tipo de  janela ? janela . JSZipUtils = e () : " indefinido " ! = Typeof global ? global . JSZipUtils = e () : " indefinido " ! = Typeof self && ( self . JSZipUtils = e ())} ( function () { var define, module , exports ; return ( função  e ( t , n , r ) { function  s ( o , u ) { if ( ! n [o]) {se ( ! t [o]) { var a = typeof requer == " função " && requerem; se ( ! u && a) retornar  um (o ,! 0 ); se (i) retornar  i (o ,! 0 ); lança um  novo  erro ( " Não é possível encontrar o módulo " + o + " ' " )} var f = n [o] ={exports : {}}; t [o] [ 0 ]. chamada ( f . exportações , função ( e ) { var n = t [o] [ 1 ] [e]; retorno  s (n ? n : e)}, f, f . exportações , e, t, n, r) } return n [o]. exportações } var i = typeof requer == " função " && requerem; para ( var o =0 ; o < r . comprimento ; o ++ ) s (r [o]); return s}) ({ 1 : [ função ( requer , módulo , exportações ) {
" uso rigoroso " ;

var JSZipUtils = {};
// basta usar o responseText com xhr1, resposta com xhr2.
// A transformação não descarta o byte de alta ordem (com responseText)
// porque o JSZip lida com esse caso. Se não for usado com o JSZip, talvez seja necessário
// faça isso, consulte https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
JSZipUtils . _getBinaryFromXHR  =  function ( xhr ) {
    // para xhr.responseText, a máscara 0xFF é aplicada pela JSZip
    retornar  xhr . resposta  ||  xhr . responseText ;
};

// tirado da jQuery
função  createStandardXHR () {
    tente {
        retornar  nova  janela.XMLHttpRequest ();
    } catch (e) {}
}

function  createActiveXHR () {
    tente {
        devolva  nova  janela.ActiveXObject ( " Microsoft.XMLHTTP " );
    } catch (e) {}
}

// Criar o objeto de solicitação
var createXHR =  janela . ActiveXObject  ?
    / * A Microsoft falhou corretamente
     * implementar o XMLHttpRequest no IE7 (não é possível solicitar arquivos locais),
     * então usamos o ActiveXObject quando está disponível
     * Além disso XMLHttpRequest pode ser desativado no IE7 / IE8 para
     * precisamos de um retorno.
     * /
    function () {
    retornar  createStandardXHR () ||  createActiveXHR ();
} :
    // Para todos os outros navegadores, use o objeto XMLHttpRequest padrão
    createStandardXHR;



JSZipUtils . getBinaryContent  =  função ( caminho , retorno de chamada ) {
    / *
     * Aqui está a parte complicada: obter os dados.
     * Em firefox / chrome / opera / ... configurando o mimeType para 'text / plain; charset = x-user-defined '
     * é suficiente, o resultado está no padrão xhr.responseText.
     * cf https://developer.mozilla.org/En/XMLHttpRequest/Using_XMLHttpRequest#Receiving_binary_data_in_older_browsers
     * No IE <= 9, devemos usar (o IE somente) atributo responseBody
     * (para dados binários, seu conteúdo é diferente de responseText).
     * No IE 10, o truque 'charset = x-user-defined' não funciona, apenas o
     * ResponseType irá funcionar:
     * http://msdn.microsoft.com/en-us/library/ie/hh673569%28v=vs.85%29.aspx#Binary_Object_upload_and_download
     *
     * Eu gostaria de usar jQuery para evitar esta loucura XHR, mas não é compatível
     * o atributo responseType: http://bugs.jquery.com/ticket/11461
     * /
    tente {

        var xhr =  createXHR ();

        xhr . abrir ( ' GET ' , caminho, verdadeiro );

        // navegadores recentes
        se ( " responseType "  no xhr) {
            xhr . responseType  =  " arraybuffer " ;
        }

        // navegador mais antigo
        se ( xhr . overrideMimeType ) {
            xhr . overrideMimeType ( " text / plain; charset = x-user-defined " );
        }

        xhr . onreadystatechange  =  function ( evt ) {
            arquivo var , erro;
            // use `xhr` e não` this` ... obrigado IE
            se ( xhr . readyState  ===  4 ) {
                se ( xhr . status  ===  200  ||  xhr . status  ===  0 ) {
                    arquivo =  nulo ;
                    err =  null ;
                    tente {
                        arquivo =  JSZipUtils . _getBinaryFromXHR (xhr);
                    } catch (e) {
                        err =  new  Error (e);
                    }
                    retorno de chamada (erro, arquivo);
                } else {
                    retorno de chamada ( novo  erro ( " erro Ajax para "  + caminho +  " : "  +  this . status  +  "  "  +  this . statusText ), null );
                }
            }
        };

        xhr . enviar ();

    } catch (e) {
        retorno de chamada ( novo  erro (e), nulo );
    }
};

// exportar
módulo . exportações  = JSZipUtils;

// reforçando o estilo de codificação de Stuk
// vim: set shiftwidth = 4 softtabstop = 4:

}, {}]}, {}, [ 1 ])
( 1 )
});
;