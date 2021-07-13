
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";


export default function Home() {
  return (
    <MainGrid>
      <div className="profileArea" style={{gridArea: 'profileArea'}}>
        <Box>
          <img src="https://github.com/izepon.png" />
        </Box>
      </div>
      <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
        <Box>Bem vindo</Box>
      </div>
      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        <Box>Amigos do Github</Box>
      </div>      
    </MainGrid>
  );
}
