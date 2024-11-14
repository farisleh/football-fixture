import { fetchFixtureData } from '../src/scrapper';
import 'dotenv/config';

describe('fetchFixtureData', () => {
    it('should return a JSON array of fixtures with required fields', async () => {
        const result = await fetchFixtureData();
        expect(result.results).toBeInstanceOf(Array);
        result.results.forEach(fixture => {
            expect(fixture).toHaveProperty('tournament');
            expect(fixture).toHaveProperty('teamA');
            expect(fixture).toHaveProperty('teamB');
            expect(fixture).toHaveProperty('venue');
            expect(fixture).toHaveProperty('datetime');
        });
    });
});
