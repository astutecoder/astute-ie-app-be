export class CResponse<ResponseMessageType> {
  constructor(
    public code: number,
    public success: boolean,
    public data: ResponseMessageType | string | null,
    public error: string | null
  ) {}
}
