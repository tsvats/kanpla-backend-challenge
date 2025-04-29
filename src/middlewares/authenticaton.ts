import type { FastifyReply } from 'fastify'

import { FastifyRequest } from 'fastify'

// This method is just a mock
export function authenticate(
    _request: FastifyRequest,
    _reply: FastifyReply,
    done: () => void,
) {
    // - Here we should check if the user is authenticated
    // - If the user is not authenticated, we should return a 401 Unauthorized status
    // - If the user is authenticated, we should return the user
    done()
}
