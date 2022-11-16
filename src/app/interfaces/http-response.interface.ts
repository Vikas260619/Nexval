export interface HttpResponse {
  code: number;
  apiVersion: string;
  success: boolean;
  data: any;
  message?: string;
  token: string;
}
