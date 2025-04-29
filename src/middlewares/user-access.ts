import type { FastifyReply } from 'fastify'

import { FastifyRequest } from 'fastify'

// This method is just a mock
export function userHasAccess(
    _request: FastifyRequest,
    _reply: FastifyReply,
    done: () => void,
) {
    // - If the user is not the same as the one in the request, we should return a 403 Forbidden status
    done()
}
