class API {
  constructor() {
    this.api = {
      key: "71c231ba2b6e4cf08293371168d3abe9",
      root: "https://www.bungie.net/Platform",
      auth: "https://www.bungie.net/en/OAuth/Authorize",
      id: "25423"
    }
  }

  login () = {
    window.location.replace(`https://www.bungie.net/en/oauth/authorize?client_id=${this.api.id}&response_type=code&state=${state}`)
  }
}
export default API