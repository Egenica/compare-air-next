import { Data } from '../../types/data';

export const mockFundData: Data = {
  data: {
    quote: {
      __typename: 'Quote',
      name: 'Test Fund',
      marketCode: 'TF',
      lastPrice: 100,
      lastPriceDate: '2023-01-01',
      ongoingCharge: 0.5,
      sectorName: 'Test Sector',
      currency: 'USD',
    },
    ratings: {
      analystRatingLabel: 'Test Rating',
      analystRating: 4,
      SRRI: 3,
    },
    profile: {
      objective: 'Test Objective',
    },

    portfolio: {
      asset: [
        {
          label: 'Stock',
          value: 25.53738,
        },
        {
          label: 'Bond',
          value: 54.25369,
        },
        {
          label: 'Cash',
          value: 19.69435,
        },
        {
          label: 'Other',
          value: 1.00772,
        },
        {
          label: 'Property',
          value: 0,
        },
      ],
      top10Holdings: [
        {
          name: 'Vanguard UK Invm Grd Bd Idx Ins Pl £ Acc',
          weighting: 16.0041,
        },
        {
          name: 'iShares ESG Ovrs Corp Bd Idx (UK) S Acc',
          weighting: 7.98883,
        },
        {
          name: 'SPDR S&P 500 ETF USD Acc',
          weighting: 7.32107,
        },
        {
          name: 'BlackRock ICS Sterling Liq Premier Acc',
          weighting: 5.06678,
        },
        {
          name: 'HSBC MSCI Emerg Mkts ETF',
          weighting: 5.0188,
        },
        {
          name: 'Amundi IS Prime Japan ETF DR',
          weighting: 4.91809,
        },
        {
          name: 'Vanguard FTSE UKAllShrIdxUnitTrInsPl£Acc',
          weighting: 4.79936,
        },
        {
          name: 'Invesco GBP Corporate Bond ETF Dist',
          weighting: 3.2933,
        },
        {
          name: 'SSGA SttStrtGlbHiYldBdESGScrnIdxIGBPIncH',
          weighting: 3.06649,
        },
        {
          name: 'United Kingdom of Great Britain and Northern Ireland 0.00375%',
          weighting: 2.76007,
        },
      ],
    },
    documents: [{ id: '1', url: 'http://example.com', type: 'PDF' }],
  },
};
