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
  const comunidade = [];
  const [isShowingMore, setIsShowingMore] = useState(false);
  // const [isShowingMoreFollows, setIsShowingMoreFollows] = useState(false);

  // const [isShowingMoreCommunities, setIsShowingMoreCommunities] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [follows, setFollows] = useState([]);

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
              <form onSubmit={function handleCreateCommunity(e){
                e.preventDefault();

              }}>
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

          <Box>Comunidades</Box>
        </div>      
      </MainGrid>
    </>
  );
}
