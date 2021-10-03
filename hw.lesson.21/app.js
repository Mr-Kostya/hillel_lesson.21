const form = document.getElementById("get_contact");

class UserController {

    static userBlockEl = document.getElementById("user");
    static BlockClass = "user-block";
    static ImageClass = "user-image";
    static InfoRowClass = "user-info-row";
    static ErrorClass = "user-error";

    setUser(user) {
        this.#removePreviousUserViews();
        UserController.userBlockEl.appendChild(this.#createUserView(user));
    }

    setError(message) {
        this.#removePreviousUserViews();
        UserController.userBlockEl.appendChild(this.#createErrorView(message));
    }

    #removePreviousUserViews() {
        const userView = document.getElementsByClassName(UserController.BlockClass);
        Array.prototype.forEach.call(userView, (element) => element.remove());
    }

    #createErrorView(message) {
        const wrapperEl = document.createElement("div");
        wrapperEl.classList.add(UserController.BlockClass);

        const errorText = document.createElement("p");
        errorText.classList.add(UserController.ErrorClass);
        errorText.textContent = message;

        wrapperEl.appendChild(errorText);
        return wrapperEl;
    }

    #createUserView(user) {
        const wrapperEl = document.createElement("div");
        wrapperEl.classList.add(UserController.BlockClass);

        const titleEl = document.createElement("p");
        titleEl.textContent = user.login;

        const avatarEl = document.createElement("img");
        avatarEl.classList.add(UserController.ImageClass);
        avatarEl.setAttribute("src", user.avatar);

        const repos = this.#createInfoRowView("Public Repos", user.publicRepos);
        const followers = this.#createInfoRowView("Followers", user.followers);
        const following = this.#createInfoRowView("Following", user.following);

        wrapperEl.appendChild(titleEl);
        wrapperEl.appendChild(avatarEl);
        wrapperEl.appendChild(repos);
        wrapperEl.appendChild(followers);
        wrapperEl.appendChild(following);

        return wrapperEl;
    }

    #createInfoRowView(title, value) {
        const infoRow = document.createElement("div");
        infoRow.classList.add(UserController.InfoRowClass);

        const infoRowTitle = document.createElement("p");
        infoRowTitle.textContent = title;

        const infoRowValue = document.createElement("p");
        infoRowValue.textContent = value;

        infoRow.appendChild(infoRowTitle);
        infoRow.appendChild(infoRowValue);
        return infoRow;
    }
}

const viewController = new UserController();

const handleGetUser = (e) => {
    e.preventDefault();

    const contact = e.target.elements["contact"].value;
    if (!contact) {
        return;
    }

    getUser (contact)
        .then((user) => viewController.setUser(user))
        .catch((err) => viewController.setError(err.message));
};

form.addEventListener("submit", handleGetUser);
