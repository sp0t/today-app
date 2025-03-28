import {BackgroundItem} from '../interface/login'
import { images } from '../styles'

export const loginBackgroundData: BackgroundItem[] = [
    {
        topImage: images.login.LearnTop,
        bottomImage: images.login.LearnBottom,
        activeCorner: 'learn',
    },
    {
        topImage: images.login.InvestTop,
        bottomImage: images.login.InvestBottom,
        activeCorner: 'invest',
    },
    {
        topImage: images.login.SendTop,
        bottomImage: images.login.SendBottom,
        activeCorner: 'send',
    },
    {
        topImage: images.login.TradeTop,
        bottomImage: images.login.TradeBottom,
        activeCorner: 'trade',
   },
]