import { BackgroundItem } from '../interface/login'
import { images } from '../styles'

export const enum ACTIVECORNER {
    LEARN = 'learn',
    INVEST = 'invest',
    SEND = 'send',
    TRADE = 'trade',
}

export const loginBackgroundData: BackgroundItem[] = [
    {
        topImage: images.login.LearnTop,
        bottomImage: images.login.LearnBottom,
        activeCorner: ACTIVECORNER.LEARN,
    },
    {
        topImage: images.login.InvestTop,
        bottomImage: images.login.InvestBottom,
        activeCorner: ACTIVECORNER.INVEST,
    },
    {
        topImage: images.login.SendTop,
        bottomImage: images.login.SendBottom,
        activeCorner: ACTIVECORNER.SEND,
    },
    {
        topImage: images.login.TradeTop,
        bottomImage: images.login.TradeBottom,
        activeCorner: ACTIVECORNER.TRADE,
    },
]