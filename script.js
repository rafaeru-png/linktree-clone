// Função principal que carrega os dados e renderiza a página
document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderProfile(data);
            renderLinks(data.links);
            renderSocialLinks(data.socialLinks);
        })
        .catch(error => {
            console.error('Erro ao carregar dados:', error);
        });
});

// Renderiza o perfil do usuário
function renderProfile(data) {
    const avatar = document.getElementById('avatar');
    const userName = document.getElementById('userName');
    const description = document.getElementById('description');

    avatar.src = data.avatar;
    avatar.alt = `Foto de ${data.name}`;
    
    // Formata o nome para deixar o último sobrenome em negrito
    const nameParts = data.name.split(' ');
    const lastName = nameParts.pop();
    userName.innerHTML = `${nameParts.join(' ')} <b>${lastName}</b>`;
    
    description.textContent = data.description;
}

// Renderiza os links principais
function renderLinks(links) {
    const linksContainer = document.getElementById('linksContainer');
    
    // Limita a 5 links conforme o desafio
    const limitedLinks = links.slice(0, 5);
    
    limitedLinks.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.textContent = link.title;
        linkElement.classList.add('link');
        linkElement.target = '_blank';
        linksContainer.appendChild(linkElement);
    });
}

// Renderiza os links de redes sociais
function renderSocialLinks(socialLinks) {
    const socialLinksContainer = document.getElementById('socialLinksContainer');
    
    socialLinks.forEach(social => {
        const socialLink = document.createElement('a');
        socialLink.href = social.url;
        socialLink.target = '_blank';
        socialLink.classList.add('social-link');
        
        // Cria o ícone baseado no nome da rede social
        const icon = document.createElement('i');
        icon.classList.add('fab', `fa-${social.icon}`);
        icon.setAttribute('aria-label', social.name);
        
        socialLink.appendChild(icon);
        socialLinksContainer.appendChild(socialLink);
    });
}