"use strict";
var RankItem = (function () {
    function RankItem(Name, Value) {
        this.Name = Name;
        this.Value = Value;
    }
    return RankItem;
}());
exports.RankItem = RankItem;
var RankItemDefinitions = (function () {
    function RankItemDefinitions() {
    }
    return RankItemDefinitions;
}());
RankItemDefinitions.LightSide = [
    new RankItem('Youngling', 1),
    new RankItem('Padawan', 10),
    new RankItem('Jedi Knight', 50),
    new RankItem('Jedi Master', 100),
    new RankItem('Grand Master', 200)
];
RankItemDefinitions.DarkSide = [
    new RankItem('Apprentice', 1),
    new RankItem('Master', 10),
    new RankItem('Lord', 50),
    new RankItem('Overlord', 100),
    new RankItem('Dark Lord', 200)
];
exports.RankItemDefinitions = RankItemDefinitions;
//# sourceMappingURL=rankitem.js.map