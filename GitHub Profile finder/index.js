const searchForm = document.getElementById("searchForm")
const serachInputEl = document.getElementById("searchInput");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const initialPlaceholder = serachInputEl.placeholder;
serachInputEl.addEventListener("focus", () => {
    serachInputEl.placeholder = "";
})
serachInputEl.addEventListener("blur", () => {
    if (serachInputEl.value === "") {
        serachInputEl.placeholder = initialPlaceholder;
    }
})

const generateProfile = (profile)=>{
    return (`
        <div class="profile-box">
            <div class="top-section">
                <div class="left">
                    <div class="avatar">
                        <img src="${profile.avatar_url}" alt="avatar">
                    </div>
                    <div class="self">
                        <h3>${profile.name?profile.name:"Name Not Found"}</h3>
                        <h3>${profile.login}</h3>
                    </div>
                </div>
                <a href="${profile.html_url}" target="_blank">
                    <button class="primary-btn">Check Profile</button>
                </a>
            </div>
            <div class="about-section">
                <h2>About</h2>
                <p>${profile.bio?profile.bio:"Bio Not Found"}</p>
            </div>
            <div class="status">
                <div class="status-item">
                    <h3>Followers</h3>
                    <p>${profile.followers}</p>
                </div>
                <div class="status-item">
                    <h3>Followings</h3>
                    <p>${profile.following}</p>
                </div>
                <div class="status-item">
                    <h3>Repos</h3>
                    <p>${profile.public_repos}</p>
                </div>
            </div>
        </div>
    `)
}

const url = "https://api.github.com/users";

const fetchProfile = async () => {
    const username = serachInputEl.value;
    console.log(username);
    loadingEl.innerText = "loading....";
    loadingEl.style.color = "black";
    try {
        const res = await fetch(`${url}/${username}`);
        const data = await res.json();
        // console.log("data", data);
        if (data.login) {
            loadingEl.innerText = "";
            profileContainerEl.innerHTML = generateProfile(data);
        } else {
            profileContainerEl.innerText = "";
            loadingEl.innerHTML = "Profile Not Found!";
            loadingEl.style.color = "red";
        }
    } catch (error) {
        console.log(error);
        loadingEl.innerText = "";
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetchProfile()
})



















