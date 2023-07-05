import nodeFetch, { type Response } from "node-fetch"

import { type TokenStorage } from "../auth"

class HttpError extends Error {
  constructor(public response: Response) {
    super()
  }
}

type HttpErrorHandler = (error: HttpError) => unknown

// to fix similar problem https://github.com/developit/unfetch/issues/46
const fetch = nodeFetch

export class ApiClient {
  constructor(
    private readonly tokensStorage: TokenStorage,
    private HttpErrorHandlers: Record<number, HttpErrorHandler> = {},
  ) {}

  setHttpErrorHandler = (status: number, handler: HttpErrorHandler) => {
    this.HttpErrorHandlers[status] = handler
  }

  removeHttpErrorHandler = (status: number) => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.HttpErrorHandlers[status]
  }

  request = async (...args: Parameters<typeof fetch>): Promise<Response> => {
    const [url, init] = args

    try {
      const response = await fetch(url, { ...init, headers: this.headers() })

      if (response.status >= 400) {
        throw new HttpError(response)
      }

      return response
    } catch (error) {
      const err =
        error instanceof Error ? error : new Error("Error while fetching data")

      return this.handleError(err)
    }
  }

  private headers(): Record<string, string> {
    const accessToken = this.tokensStorage.getTokens().accessToken

    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    }
  }

  private readonly handleError = (error: Error) => {
    if (error instanceof HttpError) {
      const handler = this.HttpErrorHandlers[error.response.status]

      handler?.(error)
    }

    throw error
  }
}
