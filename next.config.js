// Next.js’ i18n `locale` is used to determine the site:
const sites = {
  site1: { title: 'The 1st Site', description: 'This is the description for the first site.', domain: 'multi-domain-locale1.vercel.app' },
  site2: { title: 'The 2nd Site', description: 'This is the description for the second site.', domain: 'multi-domain-locale2.vercel.app' }
}
const siteKeys = Object.keys(sites)

// Selecting a language is instead handled via a `pseudoLocale` prop:
const pseudoLocales = ['en', 'se']

module.exports = {
  // next/config: publicRuntimeConfig available on both server and client – restart needed to change
  publicRuntimeConfig: {
    sites,
    pseudoLocales
  },

  // We "hijack" Next.js’ i18n system to use for different sites
  i18n: {
    locales: siteKeys,
    defaultLocale: siteKeys[0],
    domains: siteKeys.map(siteKey => (
      {
        domain: sites[siteKey].domain,
        defaultLocale: siteKey
      }
    ))
  },

  // Redirect / to default pseudoLocale
  redirects: () => (
    [
      {
        source: '/',
        destination: `/${pseudoLocales[0]}`,
        permanent: true
      }
    ]
  ),

  future: {
    webpack5: true
  }
}
