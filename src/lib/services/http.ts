import { normalizePath } from '@/lib/utils';
import { LoginResType } from '@/schemaValidations/auth.schema';
import { redirect } from 'next/navigation';

type CustomOptions = Omit<RequestInit, 'method'> & {
    baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 404;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
    message: string;
    errors: {
        field: string;
        message: string;
    }[];
};

export class HttpError extends Error {
    status: number;
    payload: {
        message: string;
        [key: string]: unknown;
    };
    constructor({
        status,
        payload,
    }: {
        status: number;
        payload: { message: string; [key: string]: unknown };
    }) {
        super(payload.message || 'Http Error');
        this.status = status;
        this.payload = payload;
    }
}

export class EntityError extends HttpError {
    status: 404;
    payload: EntityErrorPayload;
    constructor({ status, payload }: { status: 404; payload: EntityErrorPayload }) {
        super({ status, payload });
        this.status = status;
        this.payload = payload;
    }
}

let clientLogoutRequest: null | Promise<Response> = null;

export const isClient = () => typeof window !== 'undefined';

const request = async <Response>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options?: CustomOptions | undefined,
) => {
    let body: FormData | string | undefined = undefined;

    // Handle request body
    if (options?.body instanceof FormData) {
        body = options.body;
    } else if (options?.body) {
        body = JSON.stringify(options.body);
    }

    // Set base headers
    const baseHeaders: { [key: string]: string } =
        body instanceof FormData
            ? {}
            : {
                  'Content-Type': 'application/json',
              };

    // Add Authorization header if session token exists
    if (isClient()) {
        const sessionToken = localStorage.getItem('sessionToken');
        if (sessionToken) {
            baseHeaders.Authorization = `Bearer ${sessionToken}`;
        }
    }

    // Determine base URL
    const baseUrl = options?.baseUrl ?? process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
        throw new Error('Base URL is not defined. Please check your environment variables.');
    }

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

    // Make the request
    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers,
        } as HeadersInit,
        body,
        method,
    });

    const payload: Response = await res.json();
    const data = {
        status: res.status,
        payload,
    };

    // Handle errors
    if (!res.ok) {
        if (res.status === ENTITY_ERROR_STATUS) {
            throw new EntityError({
                status: 404,
                payload: data.payload as EntityErrorPayload,
            });
        } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
            if (isClient()) {
                if (!clientLogoutRequest) {
                    clientLogoutRequest = fetch('/api/auth/logout', {
                        method: 'POST',
                        body: JSON.stringify({ force: true }),
                        headers: {
                            ...baseHeaders,
                        } as HeadersInit,
                    });
                    try {
                        await clientLogoutRequest;
                    } catch (error) {
                        console.error('Error during logout:', error); // Log the error
                    } finally {
                        localStorage.removeItem('sessionToken');
                        localStorage.removeItem('sessionTokenExpiresAt');
                        clientLogoutRequest = null;
                        location.href = '/login';
                    }
                }
            } else {
                const sessionToken = (options?.headers as HeadersInit)?.Authorization?.split(
                    'Bearer ',
                )[1];
                redirect(`/logout?sessionToken=${sessionToken}`);
            }
        } else {
            throw new HttpError(data);
        }
    }

    // Handle client-side token management
    if (isClient()) {
        if (['auth/login', 'auth/register'].some((item) => item === normalizePath(url))) {
            const { token, expiresAt } = (payload as LoginResType).data;
            localStorage.setItem('sessionToken', token);
            localStorage.setItem('sessionTokenExpiresAt', expiresAt);
        } else if ('auth/logout' === normalizePath(url)) {
            localStorage.removeItem('sessionToken');
            localStorage.removeItem('sessionTokenExpiresAt');
        }
    }

    return data;
};

const http = {
    get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('GET', url, options);
    },
    post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('POST', url, { ...options, body });
    },
    put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('PUT', url, { ...options, body });
    },
    delete<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('DELETE', url, { ...options });
    },
};

export default http;
