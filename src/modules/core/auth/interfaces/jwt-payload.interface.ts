export interface JwtPayload {
  readonly sub: number;
  readonly iat: number;
  readonly exp: number;
}
