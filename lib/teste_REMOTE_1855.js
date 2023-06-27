//testeando funcao energia com base em uma Array conhecida.
function energia_tst() {
    var im = new Array(100);
    im = [
        5, 5, 0, 5, 0, 5, 5, 5, 5, 5,
        5, 5, 0, 0, 0, 0, 0, 5, 5, 5,
        5, 0, 2, 0, 5, 0, 0, 5, 5, 5,
        0, 5, 5, 0, 5, 0, 5, 5, 5, 5,
        0, 5, 2, 0, 5, 0, 5, 5, 5, 5,
        5, 0, 1, 0, 5, 0, 5, 5, 5, 5,
        5, 0, 2, 0, 5, 0, 5, 5, 5, 5,
        5, 2, 5, 0, 5, 0, 5, 5, 5, 5,
        5, 0, 5, 0, 5, 0, 5, 5, 5, 5,
        5, 0, 5, 0, 5, 0, 5, 5, 5, 5
    ];
   var en =  energia(im, 10, 10);
   var caminho = caminhoMenorEnergia(en,10,10);
   console.log(caminho)


}