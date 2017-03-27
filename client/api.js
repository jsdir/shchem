const parseJSON = res => res.json()

export const searchCompounds = query => (
  fetch(`/api/v1/compounds/query?query=${encodeURIComponent(query)}`)
    .then(parseJSON)
)

export const createJob = pdbId => (
  fetch(`/api/v1/docking/start/${pdbId}`, {
    method: 'post'
  }).then(parseJSON).then(data => data.jobId)
)

export const getJob = jobId => (
  fetch(`/api/v1/docking/job/${jobId}`)
    .then(parseJSON)
)
