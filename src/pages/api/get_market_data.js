import Axios from 'axios';
import _ from 'lodash';

export default async function handler(req, res) {
    let response = await Axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`)
    let data = response.data
    data = _.orderBy(data, ['market_cap'], ['desc'])
    res.status(200).json(data)
}