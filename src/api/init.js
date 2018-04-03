// import 'whatwg-fetch' // 其實create-react-app在config/polyfill就有包含惹QQ

const fetchAPI = (url, options) => {
  return fetch(url, options)
    .then((response)=> {
      return response
        .json()
        .then(response => (response))
    })
    .catch((error) =>(
      console.log(error)
    ))
}

export const fetchVideos = () => {
  return fetchAPI('https://merik.voicetube.com/demo/data', {
    method: 'GET',
    // cache: "no-cache"
  })
}