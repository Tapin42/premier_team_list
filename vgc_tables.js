var populateTables = function () {
    var parsed = showdown_parser.parse($("#inText").val());

    $.each($(".ptable"), function( i, elt) {
        if (i < parsed.length) {
            poke = parsed[i];
            $(this).find("#pokemon").text(poke.pokemon);
            $(this).find("#ability").text(poke.ability);
            $(this).find("#heldItem").text(poke.heldItem);
            poke.moves.length > 0 && $(this).find("#move1").text(poke.moves[0]);
            poke.moves.length > 1 && $(this).find("#move2").text(poke.moves[1]);
            poke.moves.length > 2 && $(this).find("#move3").text(poke.moves[2]);
            poke.moves.length > 3 && $(this).find("#move4").text(poke.moves[3]);
            $(this).find("#nature").text(poke.nature);
        } else {
            $(this).find("#pokemon").text('');
            $(this).find("#ability").text('');
            $(this).find("#heldItem").text('');
            $(this).find("#move1").text('');
            $(this).find("#move2").text('');
            $(this).find("#move3").text('');
            $(this).find("#move4").text('');
            $(this).find("#nature").text('');
        }
    });
};

var clearTables = function () {
    $("#inText").val('');
    populateTables();
};

var printTables = function () {
    window.print();
};