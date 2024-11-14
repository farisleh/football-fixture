export interface Fixture {
    tournament: string;
    teamA: string;
    teamB: string;
    venue: string;
    datetime: Date;
}

export interface ScrapeResult {
    results: Fixture[];
}
