import {
    Grid,
    Typography,
    Button,
    FormControl,
    Container,
    Box,
    Tooltip,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Axios from 'axios';
import Doge from '../../public/doge.gif'
import useSWR from 'swr'
import numeral from 'numeral'

import LinearProgressWithLabel from '../components/LinearProgressWithLabel';

const FTX_REF_LINK = 'https://ftx.com/#a=3683412';
const FTX_US_REF_LINK = 'https://ftx.us/#a=5538149'

const fetcher = async (url) => {
    let res = await Axios.get(url)
    return res.data
}

const FTXRefLink = () => {
    const { data, error } = useSWR('https://extreme-ip-lookup.com/json/', fetcher)
    if (error || !data) return (
        <FormControl>
            <Button size="large" color="primary" variant="contained" href={FTX_REF_LINK} target='_blank'>Buy Doge on FTX</Button>
        </FormControl>)

    return (
        <FormControl>
            {data.country === 'US' ?
                <Button size="large" color="primary" variant="contained" href={FTX_US_REF_LINK} target='_blank'>Buy Doge on FTX.US</Button>
                : <Button size="large" color="primary" variant="contained" href={FTX_REF_LINK} target='_blank'>Buy Doge on FTX</Button>
            }
        </FormControl>
    )
}

const Main = () => {

    const { data, error } = useSWR('/api/get_market_data', fetcher)

    if (error) return (<Typography>Error loading data</Typography>)
    if (!data) return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={12}>
                <Grid container justify="center">
                    <img src={Doge} />
                </Grid>
            </Grid>
        </Grid>
    )

    return <Home data={data} />
}

const Change = withStyles((theme) => ({
    root: props => ({
        color: props.value <= 0.01 ?
            theme.palette.text.primary
            : (Math.sign(props.value) == -1
                ? theme.palette.pricechange.down.text
                : theme.palette.pricechange.up.text)
    }),
}))(({ children, classes, ...props }) => {
    // let sign = (props.value == '' ? '' : (Math.sign(props.value) == -1 ? '' : '+'))

    if (props.value <= 0.01) {
        return (
            <Typography
                variant="h6"
                align="right"
                className={classes.root}
                {...props}
            >
                $0.00 (0.00%)
            </Typography>
        )
    }

    return (
        <Typography
            variant="h6"
            align="right"
            className={classes.root}
            {...props}
        >
            {children}
        </Typography>
    );
});


const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 2px 10px rgba(0,0,0,0.15)',
    },
    ticker: {
        color: '#8f8f8f'
    }
}));


const Home = ({ data }) => {

    const classes = useStyles();

    let doge = data.filter(coin => coin.symbol.toUpperCase() === 'DOGE')


    return (
        <Grid container spacing={10}>
            <Grid item xs={12}>
                <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item xs={12}>
                        <Box
                            display="flex"
                        >
                            <Box m="auto">
                                <img src={Doge} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6">Symbol</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="h6">Price</Typography>

                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="h6">24h Change</Typography>

                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="h6">24h Vol</Typography>

                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Based on circulating supply" placement="top-end">
                                                <Typography variant="h6">Market cap</Typography>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="h6">Flippening Progress 🚀</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {data.map((coin) => {
                                        let { symbol, name, market_cap, current_price, total_volume, image, price_change_percentage_24h, price_change_24h } = coin
                                        if (symbol.toUpperCase() != 'DOGE') {
                                            return (
                                                <TableRow key={symbol}>
                                                    <TableCell>
                                                        <Grid container spacing={1} alignItems="center">
                                                            <Grid item>
                                                                <Box
                                                                    display="flex"
                                                                    justifyContent="center"
                                                                    alignItems="center"
                                                                >
                                                                    <img src={image} height={24} />
                                                                </Box>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography variant="h6">{name}</Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography variant="h6" classes={{ root: classes.ticker }}>{symbol.toUpperCase()}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography variant="h6">{numeral(current_price).format('$0,0.00')}</Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Change value={price_change_24h}>{numeral(price_change_24h).format('$0,0.00')} ({numeral(price_change_percentage_24h).format('0.00')}%)</Change>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography variant="h6">{numeral(market_cap).format('$0.00a')}</Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography variant="h6">{numeral(total_volume).format('$0.00a')}</Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <LinearProgressWithLabel value={(doge[0].market_cap / market_cap) * 100} />

                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                        return (
                                            <TableRow key={symbol} classes={{ root: classes.root }}>
                                                <TableCell>
                                                    <Grid container spacing={1} alignItems="center">
                                                        <Grid item>
                                                            <Box
                                                                display="flex"
                                                                justifyContent="center"
                                                                alignItems="center"
                                                            >
                                                                <img src={image} height={24} />
                                                            </Box>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="h6">{name}</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="h6" classes={{ root: classes.ticker }}>{symbol.toUpperCase()}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="h6">{numeral(current_price).format('$0,0.00')}</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Change value={price_change_24h}>{numeral(price_change_24h).format('$0,0.00')} ({numeral(price_change_percentage_24h).format('0.00')}%)</Change>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="h6">{numeral(market_cap).format('$0.00a')}</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="h6">{numeral(total_volume).format('$0.00a')}</Typography>
                                                </TableCell>
                                                <TableCell align="right">

                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom>What is the Flippening?</Typography>
                        <Typography variant="h5">The term "Flippening" refers to the hypothetical moment of Dogecoin (DOGE) becoming the biggest cryptocurrency. Market cap based on circulating supply is the main metric to determine "The Flippening".</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Box style={{ width: '550px' }}>
                                <TwitterTweetEmbed
                                    tweetId={'1284291528328790016'}
                                />
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider></Divider>
            </Grid>

            <Grid item xs={12}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    pb={8}
                >
                    <FTXRefLink />
                </Box>
            </Grid>

        </Grid>

    )
}

export default Main;

