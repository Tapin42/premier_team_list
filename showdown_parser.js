var sample = "\
Shaggy (Trevenant) (M) @ Sitrus Berry\n\
Ability: Harvest\n\
Level: 50\n\
EVs: 252 HP / 252 Atk / 4 SDef\n\
Docile Nature\n\
IVs: 0 Spd\n\
- Trick Room\n\
- Forest's Curse\n\
- Wood Hammer\n\
- Shadow Claw\n\
\n\
Daphne (Charizard-Mega-Y) (F) @ Charizardite Y\n\
Ability: Drought\n\
Level: 50\n\
EVs: 4 HP / 252 SAtk / 252 Spd\n\
Modest Nature\n\
- Fire Blast\n\
- Heat Wave\n\
- Protect\n\
- Air Slash\n\
\n\
Fred (Clawitzer) (M) @ Assault Vest\n\
Ability: Mega Launcher\n\
Level: 50\n\
EVs: 252 HP / 252 SAtk / 4 SDef\n\
Quiet Nature\n\
IVs: 0 Spd\n\
- Aura Sphere\n\
- Dark Pulse\n\
- Water Pulse\n\
- Dragon Pulse\n\
\n\
Scooby (Conkeldurr) (M) @ Iron Ball\n\
Ability: Iron Fist\n\
Level: 50\n\
Brave Nature\n\
IVs: 0 Spd\n\
- Drain Punch\n\
- Mach Punch\n\
- Fling\n\
- Substitute\n\
\n\
Velma (Rotom-Heat) @ Charti Berry\n\
Ability: Levitate\n\
Level: 50\n\
EVs: 252 HP / 4 SAtk / 252 Spd\n\
Timid Nature\n\
- Will-O-Wisp\n\
- Volt Switch\n\
- Thunderbolt\n\
- Overheat\n\
\n\
Banette-Mega @ Banettite\n\
Ability: Prankster\n\
Level: 50\n\
EVs: 252 HP / 4 Atk / 252 SDef\n\
Sassy Nature\n\
IVs: 0 Spd\n\
- Trick Room\n\
- Taunt\n\
- Will-O-Wisp\n\
- Gunk Shot\n\
";

var showdown_parser = (function() {

    var nameLinePat = /^([^\s]+)\s?(\([^\)]*\))?\s?(?:\([MF]\))? @ (.*)$/;
    var abilityLinePat = /^Ability: (.*)$/;
    var natureLinePat = /^(.*) Nature$/;
    var moveLinePat = /^-\s?(.*)$/;

    return {
        parse: function (data) {
            var allPokes = [];
            var lines = data.split('\n');

            var curPoke = {};
            var bits;
            for (var i=0; i<lines.length; i++) {
                var curLine = lines[i].trim();

                if (curLine.length === 0) {
                    if (Object.keys(curPoke).length) {
                        allPokes.push(curPoke);
                    }
                    curPoke = {};
                } else if (nameLinePat.test(curLine)) {
                    bits = nameLinePat.exec(curLine);

                    if (bits[2]) {
                        curPoke.nickname = bits[1];
                        curPoke.pokemon = bits[2].slice(1,bits[2].length-1);
                        curPoke.heldItem = bits[3];
                    } else {
                        curPoke.pokemon = bits[1];
                        curPoke.heldItem = bits[3];
                    }
                } else if (abilityLinePat.test(curLine)) {
                    bits = abilityLinePat.exec(curLine);

                    curPoke.ability = bits[1];
                } else if (natureLinePat.test(curLine)) {
                    bits = natureLinePat.exec(curLine);

                    curPoke.nature = bits[1];
                } else if (moveLinePat.test(curLine)) {
                    bits = moveLinePat.exec(curLine);

                    if (curPoke.moves) {
                        curPoke.moves.push(bits[1]);
                    } else {
                        curPoke.moves = [bits[1]];
                    }
                }
            }

            if (Object.keys(curPoke).length) {
                allPokes.push(curPoke);
            }

            return allPokes;
        }
    }
})();
