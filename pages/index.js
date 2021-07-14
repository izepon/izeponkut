import { useState, useEffect } from 'react';
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { IzeponKutMenu, IzeponkutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/IzeponkutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(properties) {
  return (
    <Box>
      <img src={`https://github.com/${properties.githubUser}.png`} style={{ borderRadius: '8px' }}/>
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${properties.githubUser}`}>
          @{properties.githubUser}
        </a>
      </p>
      <hr />
      <IzeponkutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {

  const githubUser = 'izepon';

  const [isShowingMore, setIsShowingMore] = useState(false);
  const [isShowingMoreCommunities, setIsShowingMoreCommunities] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [follows, setFollows] = useState([]);
  const [communities, setCommunities] = useState([
    {
      id: 1,
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    },    
  ]);

  function getGithubFollowers() {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((res) => res.json())
      .then((data) => setFollowers(data))
      .catch((error) => console.log(error));
  }
  function getGithubFollows() {
    fetch(`https://api.github.com/users/${githubUser}/following`)
      .then((res) => res.json())
      .then((data) => setFollows(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getGithubFollowers(),
    getGithubFollows()
  }, []);

  function handleShowMore(e) {
    e.preventDefault();
    setIsShowingMore(!isShowingMore);
  }
  
  function handleCreateCommunity(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    console.log('Campo: ', formData.get('title'));
    console.log('Campo: ', formData.get('image'));

    const community = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: formData.get('image'),
    };

    setCommunities([...communities, community]);
  }

  function handleShowMoreCommunities(e) {
    e.preventDefault();
    setIsShowingMoreCommunities(!isShowingMoreCommunities);
  }


  return (
    <>
      <IzeponKutMenu />
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet recados={335} fotos={35} videos={11} fas={65} mensagens={12} confiavel={3} legal={3} sexy={3}/>
            </Box>

            <Box>
              <h2 className="subTitle">O que você deseja fazer?</h2>
              <form onSubmit={(e) => handleCreateCommunity(e)}>
                <div>
                  <input placeholder="Qual vai ser o nome da sua comunidade?" name="title" aria-label="Qual vai ser o nome da sua comunidade?" type="text"/>
                </div>
                <div>
                  <input placeholder="Coloque uma URL para usarmos de capa" name="image" aria-label="Coloque uma URL para usarmos de capa" type="text"/>
                </div>
                <button>
                  Criar Comunidade
                </button>
              </form>
            </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>

        <ProfileRelationsBoxWrapper isShowingMoreItems={isShowingMore}>
            <h2 className="smallTitle">
              Seguidores do Github ({followers.length})
            </h2>
            <ul>
            {followers.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`https://github.com/${item.login}`}>
                      <img src={`https://github.com/${item.login}.png`} />
                      <span>{item.login}</span>
                    </a>
                  </li>
                ); })}
            </ul>
            {followers.length > 6 && (
              <>
                <hr />
                <button className="toggleButton" onClick={(e) => handleShowMore(e)}>
                  {isShowingMore ? 'Ver menos' : 'Ver mais'}
                </button>
              </>
            )}
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper isShowingMoreItems={isShowingMore}>
              <h2 className="smallTitle">
                Seguindo no Github ({follows.length})
              </h2>
              <ul>
              {follows.map((item) => {
                  return (
                    <li key={item.id}>
                      <a href={`https://github.com/${item.login}`}>
                        <img src={`https://github.com/${item.login}.png`} />
                        <span>{item.login}</span>
                      </a>
                    </li>
                  ); })}
              </ul>
              {follows.length > 6 && (
                <>
                  <hr />
                  <button className="toggleButton" onClick={(e) => handleShowMore(e)}>
                    {isShowingMore ? 'Ver menos' : 'Ver mais'}
                  </button>
                </>
              )}
            </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper
            isShowingMoreItems={isShowingMoreCommunities}
          >
            <h2 className="smallTitle">Comunidades ({communities.length})</h2>
            <ul>
              {communities.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/users/${item.title}`}>
                      <img src={item.image} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            {communities.length > 6 && (
              <>
                <hr />
                <button
                  className="toggleButton"
                  onClick={(e) => handleShowMoreCommunities(e)}
                >
                  {isShowingMoreCommunities ? 'Ver menos' : 'Ver mais'}
                </button>
              </>
            )}
          </ProfileRelationsBoxWrapper>
        </div>      
      </MainGrid>
    </>
  );
}
