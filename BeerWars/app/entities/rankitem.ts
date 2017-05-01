export class RankItem {
    constructor(
        public Name: string,
        public Value: number)
    { }
}

export class RankItemDefinitions {
    static LightSide: RankItem[] =
    [
        new RankItem('Youngling', 1),
        new RankItem('Padawan', 10),
        new RankItem('Jedi Knight', 50),
        new RankItem('Jedi Master', 100),
        new RankItem('Grand Master', 200)
    ];

    static DarkSide: RankItem[] =
    [
        new RankItem('Apprentice', 1),
        new RankItem('Master', 10),
        new RankItem('Lord', 50),
        new RankItem('Overlord', 100),
        new RankItem('Dark Lord', 200)
    ];
}