
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { IzeponKutMenu } from '../src/lib/IzeponkutCommons';

function ProfileSidebar(properties) {
  return (
    <Box>
      <img src={`https://github.com/${properties.githubUser}.png`} style={{ borderRadius: '8px' }}/>
    </Box>
  )
}

export default function Home() {

  const githubUser = 'izepon';

  return (
    <>
      <IzeponKutMenu />
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>Bem vindo</Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <Box>Amigos do Github</Box>
          <Box>Comunidades</Box>
        </div>      
      </MainGrid>
    </>
  );
}
