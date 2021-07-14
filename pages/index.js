import { useState, useEffect } from 'react';
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { IzeponKutMenu, IzeponkutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/IzeponkutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }}/>
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <IzeponkutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {

  const githubUser = 'izepon';

  const [verMais, setVerMais] = useState(false);
  const [verMaisComunidades, setVerMaisComunidades] = useState(false);
  const [seguidores, setSeguidores] = useState([]);
  const [seguidor, setSeguidor] = useState([]);
  const [comunidades, setComunidades] = useState([
    {
      id: 1,
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    },    
  ]);

  function githubSeguidores() {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((res) => res.json())
      .then((data) => setSeguidores(data))
      .catch((error) => console.log(error));
  }
  function githubSeguidor() {
    fetch(`https://api.github.com/users/${githubUser}/following`)
      .then((res) => res.json())
      .then((data) => setSeguidor(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    githubSeguidores(),
    githubSeguidor()
  }, []);

  function aplicarVerMais(e) {
    e.preventDefault();
    setVerMais(!verMais);
  }
  
  function aplicarCriarComunidade(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const comunidade = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: formData.get('image'),
    };

    if(formData.get('title').length === 0){
      return alert('Informe uma nome para sua Comunidade')
    }
    if(formData.get('image').length === 0){
      return alert('Coloque uma imagem URL para sua Comunidade')
    }
    setComunidades([...comunidades, comunidade]);
  }

  function aplicarVerMaisComunidade(e) {
    e.preventDefault();
    setVerMaisComunidades(!verMaisComunidades);
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
              <form onSubmit={(e) => aplicarCriarComunidade(e)}>
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

        <ProfileRelationsBoxWrapper verMaisItens={verMais}>
            <h2 className="smallTitle">
              Seguidores do Github ({seguidores.length})
            </h2>
            <ul>
            {seguidores.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`https://github.com/${item.login}`}>
                      <img src={`https://github.com/${item.login}.png`} />
                      <span>{item.login}</span>
                    </a>
                  </li>
                ); })}
            </ul>
            {seguidores.length > 6 && (
              <>
                <hr />
                <button className="toggleButton" onClick={(e) => aplicarVerMais(e)}>
                  {verMais ? 'Ver menos' : 'Ver mais'}
                </button>
              </>
            )}
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper verMaisItens={verMais}>
              <h2 className="smallTitle">
                Seguindo no Github ({seguidor.length})
              </h2>
              <ul>
              {seguidor.map((item) => {
                  return (
                    <li key={item.id}>
                      <a href={`https://github.com/${item.login}`}>
                        <img src={`https://github.com/${item.login}.png`} />
                        <span>{item.login}</span>
                      </a>
                    </li>
                  ); })}
              </ul>
              {seguidor.length > 6 && (
                <>
                  <hr />
                  <button className="toggleButton" onClick={(e) => aplicarVerMais(e)}>
                    {verMais ? 'Ver menos' : 'Ver mais'}
                  </button>
                </>
              )}
            </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper verMaisItens={verMaisComunidades} >
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((item) => {
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
            {comunidades.length > 6 && (
              <>
                <hr />
                <button className="toggleButton" onClick={(e) => aplicarVerMaisComunidade(e)}>
                  {verMaisComunidades ? 'Ver menos' : 'Ver mais'}
                </button>
              </>
            )}
          </ProfileRelationsBoxWrapper>
        </div>      
      </MainGrid>
    </>
  );
}
