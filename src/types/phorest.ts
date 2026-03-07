export interface PhorestClient {
  clientId: string;
  email?: string;
  mobile?: string;
  loyaltyPoints: number;
}

export interface PhorestClientSearchResponse {
  _embedded: {
    clients: PhorestClient[];
  };
}
