
// ログイン機能を実装する
new Vue({
    el: '#app',
    data: {
        username: "",
        password: ""
    },
    methods: {
        login : async function(){

            const data = {
                "username": this.username,
                "password": this.password
            }
            const body = new URLSearchParams(data)
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': body.length
              };
            const res = await fetch(
                'http://localhost:8000/auth',
                // `https://sake-api.herokuapp.com/auth`,
                {
                    method: 'POST',
                    body: body,
                    headers: headers
                }
            )
            //const res = await fetch(`https://sake-api.herokuapp.com/auth`,{method: 'POST',body: params})
            const json = await res.json()
            console.log(json)
        }
    }
})
