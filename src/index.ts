import { fetchFixtureData } from './scrapper';
import 'dotenv/config';

(async () => {
    try {
        const data = await fetchFixtureData();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
})();
