export type Data = {
  data: {
    quote: {
      __typename: string;
      name: string;
      marketCode: string;
      lastPrice: number;
      lastPriceDate: string;
      ongoingCharge: number;
      sectorName: string;
      currency: string;
    };
    profile: {
      objective: string;
    };
    ratings: {
      analystRating: number;
      SRRI: number;
      analystRatingLabel: string;
    };
    documents: Array<{
      id: string;
      type: string;
      url: string;
    }>;
    portfolio: {
      asset: Array<{
        label: string;
        value: number;
      }>;
      top10Holdings: Array<{
        name: string;
        weighting: number;
      }>;
    };
  };
};
