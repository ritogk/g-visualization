import { baseUrl } from '@/env'
import { Configuration } from '@/openapi'

const apiConfig = new Configuration({
  basePath: baseUrl,
  // credentials: 'include',
})

export { apiConfig }
