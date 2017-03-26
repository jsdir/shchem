const parseJSON = res => res.json()

export const searchCompounds = query => (
  fetch(`/api/v1/compounds/query?query=${encodeURIComponent(query)}`)
    .then(parseJSON)
)

export const createJob = data => (
  fetch('/api/v1/jobs', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(parseJSON)
)
