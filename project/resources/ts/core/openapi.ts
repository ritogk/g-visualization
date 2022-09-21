import { baseUrl } from '@/env'
import { Configuration } from '@/core/openapiClient'

const apiConfig = new Configuration({
  basePath: baseUrl,
  // credentials: 'include',
})

export { apiConfig }
