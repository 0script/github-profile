const URL='https://api.github.com/users/';

let main=document.getElementById('main');
const form=document.getElementById('form');

async function getUser(username){

    try{

        const { data }= await axios(URL+username);
        createUserCard(data);
        getRepos(username);
    }catch(err){
        if(err.response.status==404){
            createErrorCard('No profile with this username');
        }

    }
    
}


async function getRepos(username){
    try{

        const { data }= await axios(URL+username+'/repos?sort=created');
        addReposToCard(data);
    }catch(err){
        console.log(err);
        if(err.response.status==404){
            createErrorCard('Error fetching repos');
        }
        

    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const user=search.value;

    if(user){
        getUser(user);
        search.value='';
    }

});

function createUserCard(user){
    
    const cardHTML=`
            <div class="card">
            <img src="${user.avatar_url}"
                    alt=""
                    class="avatar"
            >
            <div class="user-info">
                    <h2>${user.name}</h2>
                    <p>
                            ${user.bio}
                    </p>
                    <ul>
                            <li> ${user.followers} <strong>Follower</strong></li>
                            <li> ${user.following} <strong>Following</strong></li>
                            <li> ${user.public_repos} <strong>Repos</strong></li>
                    </ul>

                    <div id="repos">
                    </div>
            </div>
        </div>
    `;

    main.innerHTML=cardHTML;
}

function createErrorCard(msg){
    const cardHTML=`
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `;

    main.innerHTML=cardHTML;
}

function addReposToCard(repos){
    const reposEl=document.getElementById('repos');

    repos.slice(0,10).forEach(repo => {
        const repoLink=document.createElement('a');
        repoLink.classList.add('repo');
        repoLink.href=repo.html_url;
        repoLink.target='_blank'
        repoLink.innerHTML=repo.name;

        reposEl.appendChild(repoLink);
    });
}