const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'vxuebgli',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-05-08',
});

module.exports = { client };
