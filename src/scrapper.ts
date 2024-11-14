import axios from 'axios';
import * as cheerio from 'cheerio';
import moment from 'moment';
import { Fixture, ScrapeResult } from './types';

export async function fetchFixtureData(): Promise<ScrapeResult> {
    try {
        const { data } = await axios.get(process.env.BASE_URL!);
        const $ = cheerio.load(data);

        const fixtureSlugs = $('a.matches__link').map((_, el) => $(el).attr('href')).get();
        const getFixtureDetails: any = fixtureSlugs.map(fixtureSlugs => fetchFixtureDetails(fixtureSlugs));
        const fixtureDetails = await Promise.all(getFixtureDetails);

        return { results: fixtureDetails };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function fetchFixtureDetails(slug: string): Promise<Fixture> {
    const { data } = await axios.get(`${process.env.BASE_URL}${slug}`);
    const $ = cheerio.load(data);

    const matchDetails = $('p.sdc-site-match-header__detail-fixture').text();
    const tournament = matchDetails.split('. ').slice(1)[0]?.replace(/\.\n/, '').trim();
    const [teamA, teamB] = matchDetails.split('.')[0].trim().split(' vs ');
    const venue = $('span.sdc-site-match-header__detail-venue').text().replace(/\.\s*$/, '');
    const datetimeString = $('time.sdc-site-match-header__detail-time').text();
    const formattedString = datetimeString.replace(/, /, '');
    const datetime =  moment(formattedString, "hh:mma, D MMMM YYYY").utcOffset(0, true).toDate();

    return { tournament, teamA, teamB, venue, datetime };
}
