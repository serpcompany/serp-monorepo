import type { Entities, MCPServers } from '@serp/types/types';

export const useMCPServers = async (
  page = 1,
  limit = 50,
  tag = '',
  topic = '',
  owner = '',
  categorySlug = '',
  name = '',
  sort = ''
) => {
  const data = await useFetchWithCache<Entities>(
    `/entities?page=${page}&limit=${limit}&name=${name}&tag=${tag}&topic=${topic}&owner=${owner}&categorySlug=${categorySlug}&sort=${sort}&module=mcp_server`
  );
  if (!data) {
    return data;
  }
  const { entities, ...rest } = data;
  return {
    ...rest,
    servers: entities
  } as MCPServers;
};
