const parseJSON = res => res.json()

export const searchCompounds = query => (
  fetch(`/api/v1/compounds/query?query=${encodeURIComponent(query)}`)
    .then(parseJSON)
)
