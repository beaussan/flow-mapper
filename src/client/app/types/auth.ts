export interface Token {
  token: string;
  expiresIn: string;
}

export interface User {
  id: string;
  authType: number;
  localEmail?: string;
  googleEmail?: string;
  googleDisplayName?: string;
  facebookEmail?: string;
  twitterUsername?: string;
  twitterDisplayName?: string;
  isSuperUser: boolean;
  roles: [
    {
      id: number;
      key: number;
    }
  ];
}
