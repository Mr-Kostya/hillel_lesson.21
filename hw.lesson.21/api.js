class User {
    constructor(userRes) {
        this.login = userRes.login;
        this.avatar = userRes.avatar_url;
        this.publicRepos = userRes.public_repos;
        this.followers = userRes.followers;
        this.following = userRes.following;
    }
}

const getUser = (contact) =>
    fetch(`https://api.github.com/users/${contact}`).then((res) => {
        return new Promise((resolve, reject) => {
            if (res.status === 404) {
                res.json().then((errorRes) => {
                    reject(errorRes);
                });
                return;
            }

            res.json().then((res) => {
                resolve(new User(res));
            });
        });
    });