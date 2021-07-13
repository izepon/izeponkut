
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { IzeponKutMenu, OrkutNostalgicIconSet } from '../src/lib/IzeponkutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(properties) {
  return (
    <Box>
      <img src={`https://github.com/${properties.githubUser}.png`} style={{ borderRadius: '8px' }}/>
    </Box>
  )
}

export default function Home() {

  const githubUser = 'izepon';
  const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini','marcobrunodev', 'felipefialho'];

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

            <OrkutNostalgicIconSet />
            </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos do Github ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                   return (
                       <li>
                        <a href={`/users/${itemAtual}`} key={itemAtual}>
                          <img src={`https://github.com/${itemAtual}.png`} />
                          <span>{itemAtual}</span>
                        </a>
                      </li>
                   )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>Comunidades</Box>
        </div>      
      </MainGrid>
    </>
  );
}
